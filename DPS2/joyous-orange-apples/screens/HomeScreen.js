import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const getColor = (fechaEntregaStr) => {
  const fechaEntrega = new Date(fechaEntregaStr);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Resetear las horas para comparaciones exactas
  fechaEntrega.setHours(0, 0, 0, 0); // Resetear las horas para comparaciones exactas

  if (fechaEntrega < hoy) return 'red'; // Pasadas
  if (fechaEntrega.getTime() === hoy.getTime()) return 'green'; // Hoy
  return 'blue'; // Futuras
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (nuevaTarea) => {
    const tareaConColor = {
      ...nuevaTarea,
      color: getColor(nuevaTarea.fechaEntrega), // Asignar color basado en la fecha
    };
    setTareas([...tareas, tareaConColor]);
  };

  const editarTarea = (id) => {
    const tareaEditada = tareas.find((tarea) => tarea.id === id);
    if (tareaEditada) {
      navigation.navigate('AddTask', { tarea: tareaEditada, onAdd: actualizarTarea });
    }
  };

  const actualizarTarea = (tareaActualizada) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
      )
    );
  };

  const borrarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id)); // Elimina la tarea por su id
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: item.color }]}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text>{item.materia}</Text>
      <Text>Entrega: {new Date(item.fechaEntrega).toDateString()}</Text>
      <TouchableOpacity
        style={styles.botonEditar}
        onPress={() => editarTarea(item.id)}
      >
        <Text style={styles.botonTexto}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botonBorrar}
        onPress={() => borrarTarea(item.id)}
      >
        <Text style={styles.botonTexto}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {tareas.length === 0 ? (
        <Text style={styles.mensaje}>No hay tareas registradas aún.</Text>
      ) : (
        <FlatList
          data={tareas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.botonFlotante}
        onPress={() => navigation.navigate('AddTask', { onAdd: agregarTarea })}
      >
        <Text style={styles.mas}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  mensaje: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
  },
  item: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  mas: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 32,
  },
  botonEditar: {
    marginTop: 10,
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonBorrar: {
    marginTop: 10,
    backgroundColor: '#e53935',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
  },
});
