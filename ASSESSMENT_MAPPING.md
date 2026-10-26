# Assessment Mapping: Final PoE (Part 3)

| Requirement | Implementation |
|---|---|
| Edit menu item | `MenuItemCard` Edit → `AddMenuItemScreen` with `editItem` param |
| Update menu item | `updateMenuItem()` in `context/MenuContext.js` |
| Delete menu item | `removeMenuItem()` + Alert confirmation on Menu List |
| Search by name | `SearchBar` + filter logic in `MenuListScreen` |
| Filter by course | `FilterChips` (All / Starter / Main Course / Dessert / Beverage) |
| Clear search/filter | Clear button on search + “Clear filters” link |
| Total number of items | Home strip + Summary `StatCard` |
| Average price | `averagePrice` in context + Summary / Home |
| Count per course | `courseCounts` + Summary breakdown |
| Reusable components | `SearchBar`, `FilterChips`, `StatCard`, `Button`, `Header`, `MenuItemCard` |
| Reusable validation | `utils/validation.js` |
| UX / feedback | Validation errors, success screens, delete alerts, empty states |

## Screens

| Screen | File |
|---|---|
| Home | `screens/HomeScreen.js` |
| Add / Edit | `screens/AddMenuItemScreen.js` |
| Menu list | `screens/MenuListScreen.js` |
| Confirmation | `screens/ConfirmationScreen.js` |
| Statistics | `screens/SummaryScreen.js` |
