import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  Dimensions, SafeAreaView, PanResponder, Platform, DeviceEventEmitter
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import * as ImageManipulator from 'expo-image-manipulator';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const HEADER_HEIGHT = 56;
const RATIOS_BAR_HEIGHT = 100;
const IMAGE_AREA_PADDING = 0;
const IMAGE_AREA_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - RATIOS_BAR_HEIGHT - 80;
const IMAGE_AREA_WIDTH = SCREEN_WIDTH;

const ASPECT_RATIOS = [
  { label: 'Livre', ratio: null, icon: 'crop-outline' },
  { label: '1:1', ratio: 1, icon: null },
  { label: '4:5', ratio: 4 / 5, icon: null },
  { label: '3:4', ratio: 3 / 4, icon: null },
  { label: '9:16', ratio: 9 / 16, icon: null },
  { label: '16:9', ratio: 16 / 9, icon: null },
];

export default function ImageCropScreen({ route, navigation }) {
  const { imageUri, imageWidth, imageHeight, onCropDone } = route.params;

  const [selectedRatio, setSelectedRatio] = useState(0); // index
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [imageLayout, setImageLayout] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const cropRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });

  // Calculate how image fits in the display area
  const calculateImageLayout = useCallback(() => {
    const imgAspect = imageWidth / imageHeight;
    const areaAspect = IMAGE_AREA_WIDTH / IMAGE_AREA_HEIGHT;

    let dispW, dispH;
    if (imgAspect > areaAspect) {
      dispW = IMAGE_AREA_WIDTH;
      dispH = IMAGE_AREA_WIDTH / imgAspect;
    } else {
      dispH = IMAGE_AREA_HEIGHT;
      dispW = IMAGE_AREA_HEIGHT * imgAspect;
    }

    const offsetX = (IMAGE_AREA_WIDTH - dispW) / 2;
    const offsetY = (IMAGE_AREA_HEIGHT - dispH) / 2;

    return { x: offsetX, y: offsetY, w: dispW, h: dispH };
  }, [imageWidth, imageHeight]);

  // Calculate crop box for a given ratio
  const calculateCropBox = useCallback((ratioIndex, imgLayout) => {
    const ratioObj = ASPECT_RATIOS[ratioIndex];
    const { x: imgX, y: imgY, w: imgW, h: imgH } = imgLayout;

    let cropW, cropH;

    if (ratioObj.ratio === null) {
      // Free = full image
      cropW = imgW;
      cropH = imgH;
    } else {
      const targetAspect = ratioObj.ratio;
      const imageDisplayAspect = imgW / imgH;

      if (targetAspect > imageDisplayAspect) {
        cropW = imgW;
        cropH = imgW / targetAspect;
      } else {
        cropH = imgH;
        cropW = imgH * targetAspect;
      }
    }

    // Center the crop box on the image
    const cropX = imgX + (imgW - cropW) / 2;
    const cropY = imgY + (imgH - cropH) / 2;

    return { x: cropX, y: cropY, w: cropW, h: cropH };
  }, []);

  // Initialize
  useEffect(() => {
    const layout = calculateImageLayout();
    setImageLayout(layout);
    const crop = calculateCropBox(selectedRatio, layout);
    setCropBox(crop);
    cropRef.current = crop;
  }, []);

  // Handle ratio change
  const onRatioChange = (index) => {
    setSelectedRatio(index);
    const crop = calculateCropBox(index, imageLayout);
    setCropBox(crop);
    cropRef.current = crop;
  };

  // PanResponder for dragging the crop box
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startPosRef.current = { x: cropRef.current.x, y: cropRef.current.y };
      },
      onPanResponderMove: (_, gesture) => {
        const { dx, dy } = gesture;
        const { w: cropW, h: cropH } = cropRef.current;

        // Clamp within image bounds
        let newX = startPosRef.current.x + dx;
        let newY = startPosRef.current.y + dy;

        newX = Math.max(imageLayout.x, Math.min(newX, imageLayout.x + imageLayout.w - cropW));
        newY = Math.max(imageLayout.y, Math.min(newY, imageLayout.y + imageLayout.h - cropH));

        cropRef.current = { ...cropRef.current, x: newX, y: newY };
        setCropBox({ ...cropRef.current });
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  // Confirm crop
  const handleConfirm = async () => {
    try {
      // Convert display coords to original image coords
      const scaleX = imageWidth / imageLayout.w;
      const scaleY = imageHeight / imageLayout.h;

      const originX = Math.round((cropBox.x - imageLayout.x) * scaleX);
      const originY = Math.round((cropBox.y - imageLayout.y) * scaleY);
      const cropWidth = Math.round(cropBox.w * scaleX);
      const cropHeight = Math.round(cropBox.h * scaleY);

      // Clamp values to valid range
      const safeOriginX = Math.max(0, Math.min(originX, imageWidth - 1));
      const safeOriginY = Math.max(0, Math.min(originY, imageHeight - 1));
      const safeWidth = Math.min(cropWidth, imageWidth - safeOriginX);
      const safeHeight = Math.min(cropHeight, imageHeight - safeOriginY);

      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ crop: { originX: safeOriginX, originY: safeOriginY, width: safeWidth, height: safeHeight } }],
        { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG }
      );

      DeviceEventEmitter.emit('onCropDone', {
        uri: result.uri,
        width: result.width,
        height: result.height,
      });
      navigation.goBack();
    } catch (e) {
      console.log('Crop error:', e);
      DeviceEventEmitter.emit('onCropDone', {
        uri: imageUri,
        width: imageWidth,
        height: imageHeight,
      });
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Foto</Text>
        <TouchableOpacity onPress={handleConfirm} style={styles.confirmBtn}>
          <Ionicons name="checkmark" size={22} color="#FFF" />
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

      {/* Image area */}
      <View style={styles.imageArea}>
        {/* Original image */}
        <Image
          source={{ uri: imageUri }}
          style={{
            position: 'absolute',
            left: imageLayout.x,
            top: imageLayout.y,
            width: imageLayout.w,
            height: imageLayout.h,
          }}
          resizeMode="contain"
        />

        {/* Dark overlay - TOP */}
        <View style={[styles.darkOverlay, {
          left: 0, top: 0, right: 0,
          height: Math.max(0, cropBox.y),
        }]} />

        {/* Dark overlay - BOTTOM */}
        <View style={[styles.darkOverlay, {
          left: 0, right: 0, bottom: 0,
          height: Math.max(0, IMAGE_AREA_HEIGHT - cropBox.y - cropBox.h),
        }]} />

        {/* Dark overlay - LEFT */}
        <View style={[styles.darkOverlay, {
          left: 0,
          top: cropBox.y,
          width: Math.max(0, cropBox.x),
          height: cropBox.h,
        }]} />

        {/* Dark overlay - RIGHT */}
        <View style={[styles.darkOverlay, {
          right: 0,
          top: cropBox.y,
          width: Math.max(0, IMAGE_AREA_WIDTH - cropBox.x - cropBox.w),
          height: cropBox.h,
        }]} />

        {/* Crop frame (draggable) */}
        <View
          {...panResponder.panHandlers}
          style={[styles.cropFrame, {
            left: cropBox.x,
            top: cropBox.y,
            width: cropBox.w,
            height: cropBox.h,
          }]}
        >
          {/* Grid lines */}
          <View style={[styles.gridLineH, { top: '33.3%' }]} />
          <View style={[styles.gridLineH, { top: '66.6%' }]} />
          <View style={[styles.gridLineV, { left: '33.3%' }]} />
          <View style={[styles.gridLineV, { left: '66.6%' }]} />

          {/* Corner handles */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>
      </View>

      {/* Aspect ratio selector */}
      <View style={styles.ratiosBar}>
        <View style={styles.ratiosRow}>
          {ASPECT_RATIOS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.ratioBtn, selectedRatio === index && styles.ratioBtnActive]}
              onPress={() => onRatioChange(index)}
            >
              {item.icon ? (
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={selectedRatio === index ? colors.primary : 'rgba(255,255,255,0.6)'}
                />
              ) : null}
              <Text style={[
                styles.ratioLabel,
                selectedRatio === index && styles.ratioLabelActive,
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  headerBtn: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  confirmText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  imageArea: {
    width: IMAGE_AREA_WIDTH,
    height: IMAGE_AREA_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  darkOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 2,
  },
  cropFrame: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFF',
    zIndex: 3,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FFF',
    borderWidth: 3,
  },
  cornerTL: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTR: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerBL: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerBR: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  ratiosBar: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  ratiosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ratioBtn: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  ratioBtnActive: {
    backgroundColor: 'rgba(255,184,0,0.15)',
  },
  ratioLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: '600',
  },
  ratioLabelActive: {
    color: colors.primary,
  },
});
