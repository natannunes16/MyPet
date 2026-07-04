import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, shadows } from '../theme';

export default function AppHeader({ 
  title, 
  showBack = false, 
  rightIcon, 
  onRightPress,
  transparent = false
}) {
  const navigation = useNavigation();

  return (
    <View style={[
      styles.header, 
      transparent ? styles.transparent : styles.solid
    ]}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onRightPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={rightIcon} size={24} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: spacing.md,
  },
  solid: {
    backgroundColor: colors.white,
    ...shadows.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: typography.h4,
    fontFamily: typography.bold,
    color: colors.text,
  },
  iconButton: {
    padding: spacing.xs,
  },
  iconPlaceholder: {
    width: 24,
  }
});
