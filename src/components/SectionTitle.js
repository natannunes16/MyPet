import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function SectionTitle({ title, rightLabel, onRightPress, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {rightLabel && onRightPress && (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={styles.rightLabel}>{rightLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: typography.h4,
    fontFamily: typography.bold,
    color: colors.text,
  },
  rightLabel: {
    fontSize: typography.bodySm,
    fontFamily: typography.semiBold,
    color: colors.primary,
  }
});
