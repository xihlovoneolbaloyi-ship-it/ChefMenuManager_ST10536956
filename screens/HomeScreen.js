import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import { useMenu } from '../context/MenuContext';
import { colors } from '../styles/colors';

export default function HomeScreen({ navigation }) {
  const { menuItems, totalPrice, averagePrice } = useMenu();
  const hasItems = menuItems.length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header title="Chef Menu Manager" />
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>🍽️</Text>
          <Text style={styles.heroTitle}>Chef Menu Manager</Text>
          <Text style={styles.heroSubtitle}>Manage your restaurant menu easily</Text>
        </View>

        {hasItems ? (
          <View style={styles.statsRow}>
            <StatCard
              label="ITEMS"
              value={String(menuItems.length)}
              highlight
            />
            <View style={styles.statsSpacer} />
            <StatCard
              label="AVG PRICE"
              value={`R${averagePrice.toFixed(0)}`}
            />
            <View style={styles.statsSpacer} />
            <StatCard
              label="TOTAL"
              value={`R${totalPrice.toFixed(0)}`}
            />
          </View>
        ) : null}

        <View style={styles.actionCard}>
          <Button title="＋  Add Menu Item" onPress={() => navigation.navigate('AddMenuItem')} />
          <View style={styles.gap} />
          <Button
            title={`▣  View Menu${hasItems ? ` (${menuItems.length})` : ''}`}
            variant="secondary"
            onPress={() => navigation.navigate('MenuList')}
          />
          {hasItems ? (
            <>
              <View style={styles.gap} />
              <Button
                title="📊  Menu Statistics"
                variant="secondary"
                onPress={() => navigation.navigate('Summary')}
              />
            </>
          ) : null}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Built for Chef Christoffel</Text>
          <Text style={styles.infoText}>
            Capture dishes, edit or delete items, search and filter by course, and view menu statistics — all in one place.
          </Text>
        </View>

        <Text style={styles.footer}>ST10536956 • MAST5112 • 2026</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 20 },
  hero: {
    backgroundColor: colors.green,
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    marginTop: 10
  },
  emoji: { fontSize: 40, marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 25, fontWeight: '900', textAlign: 'center' },
  heroSubtitle: { color: '#CFE1D8', fontSize: 14, marginTop: 8, textAlign: 'center' },
  statsRow: { flexDirection: 'row', marginTop: 14 },
  statsSpacer: { width: 8 },
  actionCard: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  gap: { height: 10 },
  infoCard: { marginTop: 18, padding: 18, backgroundColor: colors.greenLight, borderRadius: 14 },
  infoTitle: { color: colors.green, fontWeight: '900', fontSize: 14, marginBottom: 5 },
  infoText: { color: colors.text, fontSize: 13, lineHeight: 19 },
  footer: {
    color: '#A0AAA5',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 'auto',
    paddingTop: 24
  }
});
