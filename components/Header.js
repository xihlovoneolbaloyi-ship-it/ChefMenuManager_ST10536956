import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export default function Header({ title, onBack, rightLabel }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          hitSlop={8}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightLabel ? <Text style={styles.right}>{rightLabel}</Text> : <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 72,
    backgroundColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 12
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  backText: {
    color: colors.white,
    fontSize: 30,
    lineHeight: 31,
    marginTop: -2
  },
  title: {
    flex: 1,
    color: colors.white,
    fontSize: 19,
    fontWeight: '800'
  },
  right: {
    color: '#D9E9E1',
    fontSize: 13,
    fontWeight: '700'
  },
  spacer: { width: 38 },
  pressed: { opacity: 0.75 }
});
