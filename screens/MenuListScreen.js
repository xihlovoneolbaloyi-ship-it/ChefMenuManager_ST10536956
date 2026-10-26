import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import MenuItemCard from '../components/MenuItemCard';
import EmptyMenuState from '../components/EmptyMenuState';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import { useMenu } from '../context/MenuContext';
import { colors } from '../styles/colors';

const COURSE_ORDER = ['Starter', 'Main Course', 'Dessert', 'Beverage'];

export default function MenuListScreen({ navigation }) {
  const { menuItems, removeMenuItem, totalPrice } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesSearch = !query || item.dishName.toLowerCase().includes(query);
      const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
      return matchesSearch && matchesCourse;
    });
  }, [menuItems, searchQuery, courseFilter]);

  const listData = useMemo(() => {
    const rows = [];
    COURSE_ORDER.forEach((course) => {
      const items = filteredItems.filter((item) => item.course === course);
      if (items.length) {
        rows.push({ type: 'header', id: `header-${course}`, title: course });
        items.forEach((item) => rows.push({ type: 'item', id: item.id, item }));
      }
    });
    return rows;
  }, [filteredItems]);

  const hasActiveFilters = searchQuery.trim().length > 0 || courseFilter !== 'All';

  const clearFilters = () => {
    setSearchQuery('');
    setCourseFilter('All');
  };

  const confirmRemove = (id) => {
    const item = menuItems.find((entry) => entry.id === id);
    if (!item) return;
    Alert.alert('Delete Menu Item', `Delete "${item.dishName}" from the menu? This cannot be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          removeMenuItem(id);
          Alert.alert('Deleted', `"${item.dishName}" has been removed from the menu.`);
        }
      }
    ]);
  };

  const handleEdit = (item) => {
    navigation.navigate('AddMenuItem', { editItem: item });
  };

  const renderRow = ({ item }) => {
    if (item.type === 'header') {
      return <Text style={styles.sectionTitle}>{item.title}</Text>;
    }
    return (
      <MenuItemCard
        item={item.item}
        onEdit={handleEdit}
        onRemove={confirmRemove}
      />
    );
  };

  const filterHeader = (
    <View style={styles.filterSection}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />
      <View style={styles.chipGap} />
      <FilterChips selected={courseFilter} onSelect={setCourseFilter} />
      {hasActiveFilters ? (
        <View style={styles.filterMeta}>
          <Text style={styles.resultCount}>
            {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
          </Text>
          <Text style={styles.clearLink} onPress={clearFilters}>
            Clear filters
          </Text>
        </View>
      ) : null}
      {menuItems.length > 0 && !hasActiveFilters ? (
        <View style={styles.summaryStrip}>
          <Text style={styles.summaryLabel}>CURRENT MENU VALUE</Text>
          <Text style={styles.summaryValue}>R{totalPrice.toFixed(2)}</Text>
        </View>
      ) : null}
    </View>
  );

  const footer = (
    <View style={styles.actions}>
      <Button
        title="＋  Add New Dish"
        variant={menuItems.length ? 'secondary' : 'primary'}
        onPress={() => navigation.navigate('AddMenuItem')}
      />
      {menuItems.length > 0 ? (
        <>
          <View style={styles.gap} />
          <Button title="▣  View Statistics" onPress={() => navigation.navigate('Summary')} />
        </>
      ) : null}
    </View>
  );

  const showEmptyFilter = menuItems.length > 0 && filteredItems.length === 0;

  return (
    <View style={styles.safe}>
      <Header
        title="Menu Items"
        onBack={() => navigation.goBack()}
        rightLabel={`${menuItems.length} ${menuItems.length === 1 ? 'item' : 'items'}`}
      />
      {menuItems.length === 0 ? (
        <FlatList
          data={[]}
          ListHeaderComponent={<EmptyMenuState />}
          ListFooterComponent={footer}
          contentContainerStyle={styles.emptyContent}
        />
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id}
          renderItem={renderRow}
          contentContainerStyle={styles.content}
          ListHeaderComponent={filterHeader}
          ListEmptyComponent={
            showEmptyFilter ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsTitle}>No matching dishes</Text>
                <Text style={styles.noResultsText}>
                  Try a different search term or course filter.
                </Text>
                <Text style={styles.clearLink} onPress={clearFilters}>
                  Clear filters
                </Text>
              </View>
            ) : null
          }
          ListFooterComponent={footer}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 34 },
  emptyContent: { padding: 20, paddingBottom: 34, flexGrow: 1 },
  filterSection: { marginBottom: 12 },
  chipGap: { height: 12 },
  filterMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4
  },
  resultCount: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  clearLink: { color: colors.orange, fontSize: 13, fontWeight: '800' },
  summaryStrip: {
    backgroundColor: colors.greenLight,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  summaryLabel: { color: colors.green, fontSize: 11, fontWeight: '900', letterSpacing: 0.4 },
  summaryValue: { color: colors.green, fontSize: 18, fontWeight: '900' },
  sectionTitle: {
    color: colors.green,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 9,
    marginTop: 8,
    marginLeft: 2
  },
  noResults: {
    alignItems: 'center',
    padding: 28,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12
  },
  noResultsTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: 6 },
  noResultsText: { color: colors.muted, fontSize: 13, textAlign: 'center', marginBottom: 12 },
  actions: { marginTop: 12 },
  gap: { height: 10 }
});
