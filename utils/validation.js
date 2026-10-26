/**
 * Shared form validation for add/edit menu item screens.
 * Returns an errors object; empty object means valid.
 */
export function validateMenuItemForm(form) {
  const errors = {};

  if (!form.dishName || !form.dishName.trim()) {
    errors.dishName = 'Dish name is required.';
  }

  if (!form.description || !form.description.trim()) {
    errors.description = 'Description is required.';
  }

  if (!form.course) {
    errors.course = 'Please select a course.';
  }

  if (!form.price || !String(form.price).trim()) {
    errors.price = 'Price is required.';
  } else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
    errors.price = 'Enter a valid price greater than R0.';
  }

  return errors;
}

export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}
