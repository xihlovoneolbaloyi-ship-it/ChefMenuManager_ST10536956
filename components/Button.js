import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/colors';

export default function Button({ title, onPress, variant = 'primary', disabled = false, loading = false }) {
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.secondary,
        (pressed || disabled) && styles.pressed,
        disabled && styles.disabled
      ]}
    >
      {loading ? (
        <ActivityIndicator color={primary ? colors.white : colors.green} />
      ) : (
        <Text style={[styles.text, primary ? styles.primaryText : styles.secondaryText]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  primary: { backgroundColor: colors.orange },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border
  },
  text: { fontSize: 15, fontWeight: '800' },
  primaryText: { color: colors.white },
  secondaryText: { color: colors.green },
  pressed: { opacity: 0.78 },
  disabled: { opacity: 0.5 }
});
