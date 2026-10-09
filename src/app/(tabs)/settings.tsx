import { StyleSheet, Text, View } from 'react-native';
import { api } from '../../services/api';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración del Servidor</Text>
      <Text style={styles.label}>BaseURL Configurada:</Text>
      <Text style={styles.url}>{api.defaults.baseURL}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 14, color: '#666' },
  url: { fontSize: 15, fontWeight: '600', color: '#0066CC', marginTop: 5 },
});