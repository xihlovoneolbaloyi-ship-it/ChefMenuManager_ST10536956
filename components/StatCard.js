import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export default function StatCard({ label, value, sublabel, highlight = false }) {
  return (
    <View style={[styles.card, highlight && styles.highlight]}>
      <Text style={[styles.label, highlight && styles.labelLight]}>{label}</Text>
      <Text style={[styles.value, highlight && styles.valueLight]}>{value}</Text>
      {sublabel ? (
        <Text style={[styles.sublabel, highlight && styles.sublabelLight]}>{sublabel}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    minWidth: 100
  },
  highlight: {
    backgroundColor: colors.green,
    borderColor: colors.green
  },
  label: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginBottom: 6
  },
  labelLight: { color: '#A9E0C4' },
  value: {
    color: colors.green,
    fontSize: 22,
    fontWeight: '900'
  },
  valueLight: { color: colors.white },
  sublabel: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4
  },
  sublabelLight: { color: 'rgba(255,255,255,0.75)' }
});
