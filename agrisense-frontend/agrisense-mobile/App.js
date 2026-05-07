import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  // actual IP from ipconfig
  const API_URL = "http://YOUR_LAPTOP_IP:8000/api/sensors/";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setSensors(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#00ff00" style={styles.center} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AgriSense Mobile</Text>
      <FlatList
        data={sensors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value} {item.unit}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#f5f5f5', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32' },
  card: { backgroundColor: '#fff', padding: 20, marginVertical: 8, width: '90%', borderRadius: 10, elevation: 3 },
  label: { fontSize: 16, color: '#555' },
  value: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  center: { flex: 1, justifyContent: 'center' }
});