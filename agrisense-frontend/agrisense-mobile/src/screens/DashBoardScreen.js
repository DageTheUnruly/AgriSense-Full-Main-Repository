import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MobileStatusCard from '../components/MobileStatusCard';

// This is the only "data" line. We import the arrays from your data file.
import { INITIAL_SENSORS, INITIAL_NOTIFICATIONS } from '../data/mockData'; 

const DashboardScreen = ({ navigation }) => {
  const [isSystemActive, setIsSystemActive] = useState(true);
  const [sensors, setSensors] = useState(INITIAL_SENSORS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(item => item.id !== id));
  };

  const toggleSensor = (id) => {
    setSensors(sensors.map(s => 
      s.id === id ? { ...s, power: !s.power, status: !s.power ? "Normal" : "OFFLINE" } : s
    ));
  };

  return (
    <View style={styles.container}>
      {/* HEADER SECTION */}
      <View style={styles.headerArea}>
        <Text style={styles.mainTitle}>AgriSense Dashboard</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <View style={styles.gatewaySection}>
          <Text style={styles.gatewayText}>System Gateway: 
            <Text style={{fontWeight: 'bold', color: isSystemActive ? '#4caf50' : '#f44336'}}> {isSystemActive ? "ONLINE" : "OFFLINE"}</Text>
          </Text>
          <TouchableOpacity style={styles.deactivateBtn} onPress={() => setIsSystemActive(!isSystemActive)}>
            <Text style={styles.btnText}>{isSystemActive ? "Deactivate" : "Activate"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SENSORS SECTION */}
      <View style={styles.sensorArea}>
        <View style={styles.sensorRow}>
          {sensors.map(sensor => (
            <View key={sensor.id} style={styles.cardWrapper}>
              <MobileStatusCard 
                {...sensor} 
                value={sensor.power ? sensor.value : "--"}
                onToggle={() => toggleSensor(sensor.id)}
              />
            </View>
          ))}
        </View>
      </View>

      {/* NOTIFICATIONS SECTION */}
      <View style={styles.notificationArea}>
        <Text style={styles.sectionTitle}>System Notifications ({notifications.length})</Text>
        <ScrollView style={styles.notiScroll} showsVerticalScrollIndicator={false}>
          {notifications.map(item => (
            <View key={item.id} style={styles.notiCard}>
              <View style={styles.notiContent}>
                <Text style={styles.notiTime}>{item.time}</Text>
                <Text style={styles.notiMsg}>{item.message}</Text>
              </View>
              <TouchableOpacity style={styles.dismissBtn} onPress={() => dismissNotification(item.id)}>
                <Text style={styles.dismissText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121417', paddingHorizontal: 10, justifyContent: 'space-between' },
  headerArea: { height: '20%', justifyContent: 'center', alignItems: 'center', paddingTop: 10 },
  sensorArea: { height: '35%', justifyContent: 'center' },
  notificationArea: { height: '40%', backgroundColor: '#1a1d21', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 10 },
  mainTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#333', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 4, marginTop: 5 },
  logoutText: { color: '#fff', fontSize: 10 },
  gatewaySection: { marginTop: 5, alignItems: 'center' },
  gatewayText: { color: '#aaa', fontSize: 11 },
  deactivateBtn: { backgroundColor: '#444', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4, marginTop: 5 },
  btnText: { color: '#fff', fontSize: 10 },
  sensorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardWrapper: { width: '32%', height: 185 }, 
  sectionTitle: { color: '#888', textAlign: 'center', fontSize: 12, marginBottom: 8, fontWeight: 'bold' },
  notiScroll: { flex: 1 },
  notiCard: { backgroundColor: '#fff', padding: 8, borderRadius: 6, flexDirection: 'row', marginBottom: 6, alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#d32f2f' },
  notiContent: { flex: 1 },
  notiTime: { fontSize: 8, color: '#999', fontWeight: 'bold' },
  notiMsg: { fontSize: 10, color: '#222' },
  dismissBtn: { backgroundColor: '#777', padding: 5, borderRadius: 4, marginLeft: 10 },
  dismissText: { color: '#fff', fontSize: 9, fontWeight: 'bold' }
});

export default DashboardScreen;