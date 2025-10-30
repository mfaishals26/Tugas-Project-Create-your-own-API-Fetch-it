// src/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleNotifications = () => setNotifications(!notifications);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.navigate('StartScreen' as never) },
    ]);
  };

  const handleHelp = () => {
    navigation.navigate('HelpSupportScreen' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6F2EA" barStyle="dark-content" />
      <Text style={styles.header}>Settings</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ACCOUNT SETTINGS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.item}>
            <View style={styles.itemLeft}>
              <Icon name="person-outline" size={22} color="#000" />
              <Text style={styles.itemText}>Edit Profile</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.itemLeft}>
              <Icon name="key-outline" size={22} color="#000" />
              <Text style={styles.itemText}>Change Password</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* APP SETTINGS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Icon name="moon-outline" size={22} color="#000" />
              <Text style={styles.itemText}>Dark Mode</Text>
            </View>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Icon name="notifications-outline" size={22} color="#000" />
              <Text style={styles.itemText}>Push Notifications</Text>
            </View>
            <Switch value={notifications} onValueChange={toggleNotifications} />
          </View>
        </View>

        {/* HELP SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.item} onPress={handleHelp}>
            <View style={styles.itemLeft}>
              <Icon name="help-circle-outline" size={22} color="#000" />
              <Text style={styles.itemText}>Help & Support</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.itemLeft}>
              <Icon name="information-circle-outline" size={22} color="#000" />
              <Text style={styles.itemText}>About App</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Icon name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2EA',
    paddingHorizontal: 18,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 18,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF7A00',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
    color: '#000',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});