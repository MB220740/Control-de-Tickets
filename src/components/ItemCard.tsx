import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EntityItem } from '../types/Entity';

interface Props {
  item: EntityItem;
  onPress: () => void;
}

export const ItemCard: React.FC<Props> = ({ item, onPress }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return '#D32F2F';
      case 'Media': return '#F57C00';
      case 'Baja': return '#388E3C';
      default: return '#757575';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Abierto': return '#0288D1';
      case 'En Proceso': return '#ED6C02';
      case 'Resuelto': return '#2E7D32';
      default: return '#757575';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={[styles.badge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.badgeText}>{item.priority}</Text>
        </View>
      </View>

      <Text style={styles.dept}>Depto: {item.department}</Text>
      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

      <View style={styles.footer}>
        <View style={[styles.statusBadge, { borderColor: getStatusColor(item.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', flex: 1, color: '#1A1A1A' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginLeft: 8 },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  dept: { fontSize: 13, color: '#666', marginTop: 4 },
  description: { fontSize: 14, color: '#444', marginTop: 8 },
  footer: { marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end' },
  statusBadge: { borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 6 },
  statusText: { fontSize: 12, fontWeight: '600' },
});