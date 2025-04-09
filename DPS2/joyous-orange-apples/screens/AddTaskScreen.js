import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTaskScreen({ route, navigation }) {
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [equipo, setEquipo] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Recibir tarea para editar, si existe
  useEffect(() => {
    if (route.params?.tarea) {
      const tareaEditada = route.params.tarea;
      setNombre(tareaEditada.nombre);
      setMateria(tareaEditada.materia);
      setEquipo(tareaEditada.equipo);
      setFechaEntrega(new Date(tareaEditada.fechaEntrega));
    }
  }, [route.params?.tarea]);

  const handleAdd = () => {
    const nuevaTarea = {
      id: route.params?.tarea?.id || Date.now().toString(), // Si es tarea nueva, se crea un ID único
      nombre,
      materia,
      equipo,
      fechaEntrega: fechaEntrega.toISOString(),
    };

    // Si estamos editando, actualizamos, si no, agregamos una nueva
    if (route.params?.onAdd) {
      route.params.onAdd(nuevaTarea);
    }

    navigation.goBack(); // Regresar a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la actividad</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Materia o categoría</Text>
      <TextInput style={styles.input} value={materia} onChangeText={setMateria} />

      <Text style={styles.label}>Equipo de trabajo</Text>
      <TextInput style={styles.input} value={equipo} onChangeText={setEquipo} />

      <Text style={styles.label}>Fecha de entrega</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text>{fechaEntrega.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={fechaEntrega}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setFechaEntrega(selectedDate); // Actualiza la fecha seleccionada
            }
          }}
        />
      )}

      <Button title="Guardar Tarea" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
