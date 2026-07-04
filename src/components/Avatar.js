import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function Avatar({ 
  source, 
  size = 'md', 
  hasBorder = false,
  borderColor = colors.primary
}) {
  
  const getDimensions = () => {
    switch(size) {
      case 'sm': return 32;
      case 'md': return 48;
      case 'lg': return 64;
      case 'xl': return 80;
      case 'story': return 68; // For feed stories
      default: return 48;
    }
  };

  const dim = getDimensions();

  return (
    <View style={[
      styles.container,
      {
        width: hasBorder ? dim + 6 : dim,
        height: hasBorder ? dim + 6 : dim,
        borderRadius: (hasBorder ? dim + 6 : dim) / 2,
        borderWidth: hasBorder ? 2 : 0,
        borderColor: borderColor,
      }
    ]}>
      <Image 
        source={source} 
        style={{
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: colors.surface
        }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
