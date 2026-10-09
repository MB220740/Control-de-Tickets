import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { deleteItem, getItemById, updateItem } from '../../services/resourceService';
import { EntityItem, TicketStatus } from '../../types/Entity';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [ticket, setTicket] = useState<EntityItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchTicket = async () => {
    if (!id) return;
    try {
      const data = await getItemById(id);
      setTicket(data);
    } catch (err) {
      Alert.alert('Error', 'No se pudo cargar el detalle del ticket.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket) return;
    try {
      setLoading(true);
      const updated = await updateItem(ticket.id, { status: newStatus });
      setTicket(updated);
      Alert.alert('Actualizado', `Estado cambiado a "${newStatus}"`);
    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar el estado.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de anular/eliminar este ticket?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              if (id) {
                await deleteItem(id);
                Alert.alert('Eliminado', 'El ticket fue eliminado.');
                router.back();
              }
            } catch (err) {
              Alert.alert('Error', 'No se pudo eliminar el ticket.');
            }
          },
        },
      ]
    );
  };

  if (loading) return <LoadingSpinner message="Cargando información..." />;
  if (!ticket) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.meta}>Departamento: {ticket.department}</Text>
      <Text style={styles.meta}>Prioridad: {ticket.priority}</Text>
      <Text style={styles.meta}>Estado actual: {ticket.status}</Text>

      <Text style={styles.sectionTitle}>Descripción:</Text>
      <Text style={styles.description}>{ticket.description}</Text>

      <Text style={styles.sectionTitle}>Cambiar Estado (PUT/PATCH):</Text>
      <View style={styles.statusButtons}>
        {(['Abierto', 'En Proceso', 'Resuelto'] as TicketStatus[]).map((st) => (
          <TouchableOpacity
            key={st}
            style={[styles.statusBtn, ticket.status === st && styles.statusBtnActive]}
            onPress={() => handleStatusChange(st)}
          >
            <Text style={[styles.statusBtnText, ticket.status === st && styles.statusBtnTextActive]}>
              {st}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Eliminar Ticket (DELETE)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  meta: { fontSize: 14, color: '#555', marginBottom: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 8, color: '#333' },
  description: { fontSize: 15, color: '#444', lineHeight: 22, backgroundColor: '#F9F9F9', padding: 12, borderRadius: 8 },
  statusButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  statusBtn: { flex: 1, paddingVertical: 10, borderWidth: 1, borderColor: '#CCC', borderRadius: 6, alignItems: 'center', marginHorizontal: 2 },
  statusBtnActive: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  statusBtnText: { fontSize: 12, color: '#333' },
  statusBtnTextActive: { color: '#FFF', fontWeight: 'bold' },
  deleteButton: { backgroundColor: '#D32F2F', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 30, marginBottom: 40 },
  deleteText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
});