import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomInput } from '../../components/CustomInput';
import { createItem } from '../../services/resourceService';
import { PriorityLevel } from '../../types/Entity';

export default function CreateTicketScreen() {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Media');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = 'El título es obligatorio.';
    if (!department.trim()) errs.department = 'El departamento es obligatorio.';
    if (!description.trim()) errs.description = 'La descripción es obligatoria.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSubmitting(true);
      await createItem({
        title,
        department,
        priority,
        status: 'Abierto',
        description,
        createdAt: new Date().toISOString(),
      });
      Alert.alert('Éxito', 'Ticket creado correctamente.');
      setTitle('');
      setDepartment('');
      setDescription('');
      setPriority('Media');
      router.push('/(tabs)');
    } catch (err) {
      Alert.alert('Error', 'No se pudo guardar el ticket.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Registrar Nueva Incidencia</Text>

      <CustomInput label="Título del problema" value={title} onChangeText={setTitle} error={errors.title} placeholder="Ej: Impresora fuera de servicio" />
      <CustomInput label="Departamento" value={department} onChangeText={setDepartment} error={errors.department} placeholder="Ej: Contabilidad" />

      <Text style={styles.label}>Prioridad</Text>
      <View style={styles.priorityRow}>
        {(['Baja', 'Media', 'Alta'] as PriorityLevel[]).map((p) => (
          <TouchableOpacity key={p} style={[styles.pOption, priority === p && styles.pOptionActive]} onPress={() => setPriority(p)}>
            <Text style={[styles.pText, priority === p && styles.pTextActive]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomInput label="Descripción del fallo" value={description} onChangeText={setDescription} error={errors.description} multiline numberOfLines={4} placeholder="Detalles de la falla..." />

      <TouchableOpacity style={[styles.button, submitting && styles.buttonDisabled]} onPress={handleSubmit} disabled={submitting}>
        <Text style={styles.buttonText}>{submitting ? 'Guardando...' : 'Crear Ticket'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#1A1A1A' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  priorityRow: { flexDirection: 'row', marginBottom: 15 },
  pOption: { flex: 1, paddingVertical: 10, borderWidth: 1, borderColor: '#CCC', alignItems: 'center', borderRadius: 8, marginRight: 6 },
  pOptionActive: { backgroundColor: '#0066CC', borderColor: '#0066CC' },
  pText: { fontSize: 13, color: '#333' },
  pTextActive: { color: '#FFF', fontWeight: 'bold' },
  button: { backgroundColor: '#0066CC', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  buttonDisabled: { backgroundColor: '#999' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});