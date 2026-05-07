import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, SafeAreaView, 
  ActivityIndicator, TextInput, TouchableOpacity, Alert, StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'http://192.168.1.92:8000/api/';

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sensors, setSensors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = await AsyncStorage.getItem('userToken');
      if (savedToken) setToken(savedToken);
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (token) fetchSensors();
  }, [token]);

  const fetchSensors = async () => {
    try {
      const response = await fetch(`${API_BASE}sensors/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // DEBUG: Uncomment the line below to see your DB structure in the terminal
        // console.log("DB DATA:", data); 
        setSensors(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // --- TASK: TOGGLE POWER VIA API ---
  const handleToggle = async (id, currentPower) => {
    try {
      const response = await fetch(`${API_BASE}sensors/${id}/`, {
        method: 'PATCH', // Update only the power field
        headers: { 
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ power: !currentPower })
      });

      if (response.ok) {
        // Update UI locally so it feels fast
        setSensors(prev => prev.map(s => s.id === id ? { ...s, power: !currentPower } : s));
      }
    } catch (err) {
      Alert.alert("Sync Error", "Could not update sensor state");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE}api-token-auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        setToken(data.token);
      } else {
        Alert.alert("Login Failed", "Check your credentials");
      }
    } catch (err) {
      Alert.alert("Error", "Server unreachable");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setToken(null);
  };

  // --- SUB-COMPONENT: FULLY FUNCTIONAL STATUS CARD ---
  const StatusCard = ({ sensor }) => {
    const isActive = sensor.power;
    const getIcon = (label) => {
      if (label.toLowerCase().includes('temp')) return '🌡️';
      if (label.toLowerCase().includes('humid')) return '💧';
      return '🌱';
    };

    return (
      <View style={[styles.card, !isActive && styles.cardInactive]}>
        <View style={styles.cardTop}>
          <View style={[styles.iconBox, { backgroundColor: isActive ? '#e8f5e9' : '#f5f5f5' }]}>
            <Text style={{fontSize: 24}}>{getIcon(sensor.label)}</Text>
          </View>
          <View style={styles.badge(isActive)}>
            <Text style={styles.badgeText(isActive)}>{isActive ? "ACTIVE" : "OFFLINE"}</Text>
          </View>
        </View>
        
        <View style={{marginTop: 12}}>
          <Text style={styles.cardLabel}>{sensor.label}</Text>
          {/* Ensure field names match your Serializer! */}
          <Text style={styles.cardValue}>
            {isActive ? `${sensor.value || '0'}${sensor.unit || ''}` : '--'}
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.toggleBtn, { backgroundColor: isActive ? '#ffebee' : '#e8f5e9' }]}
          onPress={() => handleToggle(sensor.id, sensor.power)}
        >
          <Text style={[styles.toggleBtnText, { color: isActive ? '#c62828' : '#2e7d32' }]}>
            {isActive ? "SHUTDOWN" : "ACTIVATE"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!token) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginLogo}>AgriSense</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}><Text style={styles.logoutTxt}>LOGOUT</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {sensors.length === 0 ? (
            <Text style={{color: 'white'}}>No sensors found in database...</Text>
          ) : (
            sensors.map(s => <StatusCard key={s.id} sensor={s} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#16171D' },
  loginContainer: { flex: 1, backgroundColor: '#43c454', justifyContent: 'center', padding: 30 },
  loginLogo: { fontSize: 36, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 15 },
  loginBtn: { backgroundColor: '#1b5e20', padding: 18, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  header: { padding: 25, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  logoutTxt: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  scrollContent: { padding: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: 'white', width: '48%', borderRadius: 20, padding: 15, marginBottom: 15, elevation: 4 },
  cardInactive: { opacity: 0.8 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardLabel: { fontSize: 11, color: '#888', fontWeight: '600' },
  cardValue: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  toggleBtn: { marginTop: 15, padding: 8, borderRadius: 10, alignItems: 'center' },
  toggleBtnText: { fontSize: 10, fontWeight: 'bold' },
  badge: (isActive) => ({ paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, backgroundColor: isActive ? '#e8f5e9' : '#f5f5f5' }),
  badgeText: (isActive) => ({ fontSize: 8, fontWeight: 'bold', color: isActive ? '#2e7d32' : '#999' })
});