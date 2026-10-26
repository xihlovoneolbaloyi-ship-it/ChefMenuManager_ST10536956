import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { colors } from '../styles/colors';

export default function ConfirmationScreen({ navigation, route }) {
  const dishName = route.params?.dishName || 'Menu item';
  const mode = route.params?.mode || 'add';
  const isEdit = mode === 'edit';

  return (
    <View style={styles.safe}>
      <View style={styles.center}>
        <View style={styles.card}>
          <View style={styles.successCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={styles.title}>{isEdit ? 'Updated!' : 'Success!'}</Text>
          <Text style={styles.message}>
            {isEdit
              ? `"${dishName}" was updated successfully.`
              : `"${dishName}" was saved successfully.`}
          </Text>
          <View style={styles.gap} />
          <Button title="View Menu" onPress={() => navigation.replace('MenuList')} />
          <View style={styles.gapSmall} />
          <Button
            title={isEdit ? 'Edit Another' : 'Add Another Dish'}
            variant="secondary"
            onPress={() => navigation.replace('AddMenuItem')}
          />
          <Text style={styles.helper}>
            {isEdit
              ? 'Your changes are reflected in the menu list.'
              : 'Your menu is ready for the next dish.'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3
  },
  successCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.successBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  check: { color: colors.success, fontSize: 40, fontWeight: '900' },
  title: { color: colors.text, fontSize: 25, fontWeight: '900' },
  message: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 7
  },
  gap: { height: 14, width: '100%' },
  gapSmall: { height: 9, width: '100%' },
  helper: { color: '#98A19D', fontSize: 11, marginTop: 17, textAlign: 'center' }
});
