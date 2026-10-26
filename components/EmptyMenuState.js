import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export default function EmptyMenuState() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🍽️</Text>
      <Text style={styles.title}>No Menu Items Yet</Text>
      <Text style={styles.message}>Add your first menu item to get started.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 30,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  icon: { fontSize: 42, marginBottom: 12 },
  title: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 6 },
  message: { color: colors.muted, fontSize: 14, textAlign: 'center' }
});
