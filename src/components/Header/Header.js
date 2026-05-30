import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function Header({ title, showLogo = true, style }) {
  return (
    <View style={[styles.container, style]}>
      {showLogo && <Image source={require('../../assets/logo.png')} style={styles.logo} />}
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
});
