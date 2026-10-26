# Chef Menu Manager

**Student:** Xihlovo Neol Baloyi  
**Student Number:** ST10536956  
**Module:** MAST5112 – Mobile App Scripting  
**Qualification:** IIE Higher Certificate in Mobile Application and Web Development  
**Year:** 2026  
**Application:** Chef Menu Manager (Part 3 – Final PoE)

## Purpose

Chef Menu Manager is a React Native / Expo mobile application that allows Chef Christoffel to capture, edit, delete and organise menu dishes by course, search and filter the menu, and view clear menu statistics.

## Changelog (Part 2 → Part 3)

### 1. Manage Menu Items
- **Edit** existing menu items via Edit on each card (navigates to Add/Edit form pre-filled).
- **Update** persists changes immediately through `updateMenuItem` in context.
- **Delete** with confirmation dialog and success feedback (already present in Part 2, improved messaging).

### 2. Search and Filter
- **Search** by dish name (case-insensitive) via reusable `SearchBar`.
- **Filter** by course: All, Starter, Main Course, Dessert, Beverage via `FilterChips`.
- **Clear filters** restores the full list; empty-result state when nothing matches.

### 3. Display Menu Statistics
- **Total number** of menu items.
- **Average price** of all items.
- **Count per course** with course subtotals.
- Presented on Home (quick strip) and dedicated **Menu Statistics** screen using `StatCard`.

### 4. Application enhancements (refactoring)
- Shared **validation** in `utils/validation.js`.
- New reusable components: `SearchBar`, `FilterChips`, `StatCard`.
- Context extended with `updateMenuItem`, `averagePrice`, `courseCounts`, memoised callbacks.
- Add screen supports **add and edit** modes (one form, less duplication).
- Clearer navigation labels and consistent success/error messaging.

### 5. User experience
- Field-level validation and error styling retained and reused for edit.
- Confirmation screen distinguishes add vs update.
- Delete confirmation + post-delete alert.
- Consistent green/orange visual language across all screens.
- Empty states for no items and no search results.

## Screens

1. Home – welcome, live stats strip, navigation
2. Add / Edit Menu Item – shared form with validation
3. Menu Items – list, search, filter, edit, delete
4. Confirmation – success after add or update
5. Menu Statistics – totals, average, per-course breakdown

## Run with Expo Go

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go. For Android emulator use `npm run android`.

## Demonstration checklist (video)

1. Home screen and empty stats when no items.
2. Add dishes with validation (empty save → errors).
3. Success confirmation after save.
4. View Menu – search by name.
5. Filter by Starter / Main Course / Dessert.
6. Clear filters.
7. Edit a dish and show Updated confirmation.
8. Delete a dish with confirmation.
9. Menu Statistics – total items, average price, counts per course.
10. Navigation between Home, Menu, Statistics.

## Notes

Menu data is kept in application memory for the current session. No database is required for this assessment stage.
