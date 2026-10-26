import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import Button from '../components/Button';
import { useMenu } from '../context/MenuContext';
import { validateMenuItemForm, isFormValid } from '../utils/validation';
import { colors } from '../styles/colors';

const INITIAL_FORM = { dishName: '', description: '', course: '', price: '' };

export default function AddMenuItemScreen({ navigation, route }) {
  const { addMenuItem, updateMenuItem } = useMenu();
  const editItem = route.params?.editItem || null;
  const isEditing = Boolean(editItem);

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editItem) {
      setForm({
        dishName: editItem.dishName || '',
        description: editItem.description || '',
        course: editItem.course || '',
        price: String(editItem.price ?? '')
      });
      setErrors({});
    } else {
      setForm(INITIAL_FORM);
      setErrors({});
    }
  }, [editItem]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSave = () => {
    const nextErrors = validateMenuItemForm(form);
    setErrors(nextErrors);
    if (!isFormValid(nextErrors)) return;

    if (isEditing) {
      const updated = updateMenuItem(editItem.id, form);
      navigation.replace('Confirmation', {
        dishName: updated?.dishName || form.dishName,
        mode: 'edit'
      });
    } else {
      const item = addMenuItem(form);
      setForm(INITIAL_FORM);
      setErrors({});
      navigation.replace('Confirmation', {
        dishName: item.dishName,
        mode: 'add'
      });
    }
  };

  const handleClear = () => {
    if (isEditing && editItem) {
      setForm({
        dishName: editItem.dishName || '',
        description: editItem.description || '',
        course: editItem.course || '',
        price: String(editItem.price ?? '')
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header
        title={isEditing ? 'Edit Menu Item' : 'Add Menu Item'}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.formCard}>
          <Text style={styles.intro}>
            {isEditing
              ? 'Update the dish details below. All fields are required.'
              : 'Enter the details for a new dish. All fields are required.'}
          </Text>

          <FieldLabel label="DISH NAME" required />
          <TextInput
            value={form.dishName}
            onChangeText={(value) => updateField('dishName', value)}
            placeholder="e.g. Greek Salad"
            placeholderTextColor="#A2AAA6"
            style={[styles.input, errors.dishName && styles.inputError]}
            returnKeyType="next"
          />
          <ErrorText message={errors.dishName} />

          <FieldLabel label="DESCRIPTION" required />
          <TextInput
            value={form.description}
            onChangeText={(value) => updateField('description', value)}
            placeholder="Brief description of the dish..."
            placeholderTextColor="#A2AAA6"
            style={[styles.input, styles.descriptionInput, errors.description && styles.inputError]}
            multiline
            textAlignVertical="top"
          />
          <ErrorText message={errors.description} />

          <FieldLabel label="MEAL COURSE" required />
          <View style={[styles.pickerWrap, errors.course && styles.inputError]}>
            <Picker
              selectedValue={form.course}
              onValueChange={(value) => updateField('course', value)}
              style={styles.picker}
            >
              <Picker.Item label="Select a course" value="" />
              <Picker.Item label="Starter" value="Starter" />
              <Picker.Item label="Main Course" value="Main Course" />
              <Picker.Item label="Dessert" value="Dessert" />
              <Picker.Item label="Beverage" value="Beverage" />
            </Picker>
          </View>
          <ErrorText message={errors.course} />

          <FieldLabel label="PRICE (R)" required />
          <TextInput
            value={form.price}
            onChangeText={(value) => updateField('price', value.replace(/[^0-9.]/g, ''))}
            placeholder="e.g. 75.00"
            placeholderTextColor="#A2AAA6"
            style={[styles.input, errors.price && styles.inputError]}
            keyboardType="decimal-pad"
          />
          <ErrorText message={errors.price} />

          <View style={styles.buttonGap} />
          <Button
            title={isEditing ? '✓  Update Dish' : '✓  Save Dish'}
            onPress={handleSave}
          />
          <View style={styles.buttonGapSmall} />
          <Button
            title={isEditing ? 'Reset Changes' : 'Clear Form'}
            variant="secondary"
            onPress={handleClear}
          />

          <View style={styles.tip}>
            <Text style={styles.tipTitle}>Input guidance</Text>
            <Text style={styles.tipText}>
              Use a clear dish name, a short description, one meal course and a positive price.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FieldLabel({ label, required }) {
  return (
    <Text style={styles.label}>
      {label}
      {required ? <Text style={styles.required}> *</Text> : null}
    </Text>
  );
}

function ErrorText({ message }) {
  if (!message) return null;
  return <Text style={styles.error}>{message}</Text>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 34 },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18
  },
  intro: { color: colors.muted, fontSize: 14, lineHeight: 20, marginBottom: 16 },
  label: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 6,
    marginTop: 10
  },
  required: { color: colors.error },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.background
  },
  descriptionInput: { minHeight: 90 },
  inputError: { borderColor: colors.error, backgroundColor: colors.errorBackground },
  pickerWrap: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.background
  },
  picker: { width: '100%' },
  error: { color: colors.error, fontSize: 12, marginTop: 4, fontWeight: '600' },
  buttonGap: { height: 18 },
  buttonGapSmall: { height: 10 },
  tip: {
    marginTop: 18,
    padding: 14,
    backgroundColor: colors.greenLight,
    borderRadius: 12
  },
  tipTitle: { color: colors.green, fontWeight: '900', fontSize: 12, marginBottom: 4 },
  tipText: { color: colors.text, fontSize: 12, lineHeight: 18 }
});
