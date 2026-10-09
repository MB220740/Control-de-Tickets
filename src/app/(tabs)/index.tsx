import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ItemCard } from '../../components/ItemCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { getItems } from '../../services/resourceService';
import { EntityItem } from '../../types/Entity';

export default function TicketListScreen() {
  const [tickets, setTickets] = useState<EntityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>('Todas');

  const router = useRouter();

  const fetchTickets = async () => {
    try {
      setError(null);
      const data = await getItems();
      setTickets(data);
    } catch (err) {
      setError('Error al obtener la lista de tickets.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTickets();
    }, [])
  );

  const filteredTickets = selectedPriority === 'Todas'
    ? tickets
    : tickets.filter((t) => t.priority === selectedPriority);

  if (loading) return <LoadingSpinner message="Cargando tickets..." />;

  return (
    <View style={styles.container}>
      {/* Filtros por Prioridad */}
      <View style={styles.filterContainer}>
        {['Todas', 'Alta', 'Media', 'Baja'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.filterChip, selectedPriority === p && styles.filterChipActive]}
            onPress={() => setSelectedPriority(p)}
          >
            <Text style={[styles.filterText, selectedPriority === p && styles.filterTextActive]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchTickets}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredTickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard item={item} onPress={() => router.push(`/detail/${item.id}`)} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchTickets(); }} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay tickets registrados con esta prioridad.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8' },
  filterContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#FFF' },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#E0E0E0', marginRight: 8 },
  filterChipActive: { backgroundColor: '#0066CC' },
  filterText: { fontSize: 13, color: '#333' },
  filterTextActive: { color: '#FFF', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#888', fontSize: 14 },
  errorBox: { padding: 20, alignItems: 'center' },
  errorText: { color: '#D32F2F', fontSize: 14, marginBottom: 10 },
  retryButton: { backgroundColor: '#0066CC', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  retryText: { color: '#FFF', fontWeight: 'bold' },
});