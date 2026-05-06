import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Task 3: Reusable Mobile Component
 * Adapted from the web StatusCard to reflect the same system logic.
 */
const MobileStatusCard = ({ label, value, unit, status, icon, power, onToggle }) => {
  return (
    // Task 4: Use Flexbox and mobile-appropriate spacing
    <View style={[styles.card, !power && styles.inactiveCard]}>
      <View style={styles.headerRow}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>

      <Text style={styles.value}>
        {power ? `${value}${unit}` : '--'} 
      </Text>
      
      <Text style={[styles.status, status === 'Critical' ? styles.danger : styles.safe]}>
        {power ? status : 'OFFLINE'}
      </Text>

      {/* Mobile interaction: Replacing the web button with TouchableOpacity */}
      <TouchableOpacity 
        style={[styles.button, power ? styles.buttonOff : styles.buttonOn]} 
        onPress={onToggle}
      >
        <Text style={styles.buttonText}>
          {power ? 'Shut Down' : 'Activate'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    // Task 4: Adding "Elevation" for a mobile shadow effect
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  inactiveCard: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: { fontSize: 24, marginRight: 10 },
  label: { fontSize: 18, fontWeight: '600', color: '#333' },
  value: { fontSize: 32, fontWeight: 'bold', marginVertical: 10, color: '#2e7d32' },
  status: { fontSize: 14, fontWeight: 'bold', marginBottom: 15 },
  danger: { color: '#d32f2f' },
  safe: { color: '#388e3c' },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonOn: { backgroundColor: '#2e7d32' },
  buttonOff: { backgroundColor: '#616161' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default MobileStatusCard;