import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export default function MenuItemCard({ item, onEdit, onRemove }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.main}>
          <Text style={styles.name}>{item.dishName}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        </View>
        <Text style={styles.price}>R{Number(item.price).toFixed(2)}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.coursePill}>
          <Text style={styles.courseText}>{item.course}</Text>
        </View>
        <View style={styles.actions}>
          {onEdit ? (
            <Pressable
              onPress={() => onEdit(item)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Edit ${item.dishName}`}
              style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.edit}>Edit</Text>
            </Pressable>
          ) : null}
          {onRemove ? (
            <Pressable
              onPress={() => onRemove(item.id)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.dishName}`}
              style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.remove}>Delete</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  row: { flexDirection: 'row', gap: 12 },
  main: { flex: 1 },
  name: { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: 5 },
  description: { color: colors.muted, fontSize: 13, lineHeight: 18 },
  price: { color: colors.green, fontSize: 15, fontWeight: '900' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  coursePill: { backgroundColor: colors.greenLight, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  courseText: { color: colors.green, fontSize: 12, fontWeight: '800' },
  actions: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  actionBtn: { paddingVertical: 4, paddingHorizontal: 2 },
  edit: { color: colors.orange, fontSize: 13, fontWeight: '800' },
  remove: { color: colors.error, fontSize: 13, fontWeight: '800' }
});
