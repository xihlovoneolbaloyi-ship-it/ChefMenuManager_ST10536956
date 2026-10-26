import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import { useMenu } from '../context/MenuContext';
import { colors } from '../styles/colors';

const COURSES = ['Starter', 'Main Course', 'Dessert', 'Beverage'];

export default function SummaryScreen({ navigation }) {
  const { menuItems, totalPrice, averagePrice, courseCounts } = useMenu();

  return (
    <View style={styles.safe}>
      <Header title="Menu Statistics" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>OVERVIEW</Text>
        <View style={styles.statsRow}>
          <StatCard
            label="TOTAL ITEMS"
            value={String(menuItems.length)}
            sublabel={menuItems.length === 1 ? 'dish' : 'dishes'}
            highlight
          />
          <View style={styles.statsSpacer} />
          <StatCard
            label="AVERAGE PRICE"
            value={`R${averagePrice.toFixed(2)}`}
            sublabel="per dish"
          />
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>TOTAL MENU VALUE</Text>
          <Text style={styles.total}>R{totalPrice.toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionLabel}>ITEMS BY COURSE</Text>
        <View style={styles.breakdownCard}>
          {COURSES.map((course, index) => {
            const count = courseCounts[course] || 0;
            const items = menuItems.filter((item) => item.course === course);
            const courseTotal = items.reduce((sum, item) => sum + item.price, 0);
            const isLast = index === COURSES.length - 1;
            return (
              <View
                key={course}
                style={[styles.breakdownRow, isLast && styles.breakdownRowLast]}
              >
                <View style={styles.courseInfo}>
                  <Text style={styles.course}>{course}</Text>
                  <Text style={styles.itemCount}>
                    {count} {count === 1 ? 'item' : 'items'}
                    {count > 0 ? ` · R${courseTotal.toFixed(2)}` : ''}
                  </Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{count}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {menuItems.length === 0 ? (
          <View style={styles.emptyHint}>
            <Text style={styles.emptyHintText}>
              Add menu items to see statistics for your menu.
            </Text>
          </View>
        ) : null}

        <View style={styles.gap} />
        <Button title="⌂  Back to Home" onPress={() => navigation.popToTop()} />
        <View style={styles.gapSmall} />
        <Button
          title="View Menu Items"
          variant="secondary"
          onPress={() => navigation.navigate('MenuList')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 34 },
  sectionLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 4
  },
  statsRow: { flexDirection: 'row', marginBottom: 14 },
  statsSpacer: { width: 12 },
  totalCard: {
    backgroundColor: colors.green,
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  totalLabel: {
    color: '#A9E0C4',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1
  },
  total: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '900',
    marginTop: 6
  },
  breakdownCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 17
  },
  breakdownRow: {
    minHeight: 68,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1EF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  breakdownRowLast: { borderBottomWidth: 0 },
  courseInfo: { flex: 1 },
  course: { color: colors.text, fontSize: 14, fontWeight: '800' },
  itemCount: { color: colors.muted, fontSize: 12, marginTop: 3 },
  countBadge: {
    backgroundColor: colors.greenLight,
    borderRadius: 999,
    minWidth: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  countBadgeText: { color: colors.green, fontSize: 15, fontWeight: '900' },
  emptyHint: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.greenLight,
    borderRadius: 12
  },
  emptyHintText: { color: colors.green, fontSize: 13, textAlign: 'center' },
  gap: { height: 16 },
  gapSmall: { height: 9 }
});
