// components/TaskCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskCard({ task, onDelete }) {
  const colorMap = {
    red: '#f44336',
    green: '#4caf50',
    blue: '#2196f3',
  };

  return (
    <View style={[styles.card, { borderLeftColor: colorMap[task.color] || 'gray' }]}>
      <View style={styles.info}>
        <Text style={styles.title}>{task.nombre}</Text>
        <Text style={styles.text}>Materia: {task.materia}</Text>
        {task.equipo ? <Text style={styles.text}>Equipo: {task.equipo}</Text> : null}
        <Text style={styles.text}>
          Fecha de entrega: {new Date(task.fecha).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  text: { fontSize: 14, color: '#444' },
});
