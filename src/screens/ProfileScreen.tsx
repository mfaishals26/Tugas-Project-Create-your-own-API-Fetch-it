// src/screens/ProfileScreen.tsx
import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
    const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6F2EA" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity style={styles.menuItem}
          onPress={() => navigation.navigate('SettingsScreen' as never)}
        >
        <Icon name="settings-outline" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {/* PROFILE INFO */}
      <View style={styles.profileBox}>
        <Image
          source={require('../../assets/image/flag.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Muhammad Faishal Setiawan</Text>
        <Text style={styles.email}>mfaishalsetiawan@gmail.com</Text>
      </View>

      {/* MENU LIST */}
      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem}
          onPress={() => navigation.navigate('WishlistScreen' as never)}
        >
          <Icon name="heart-outline" size={22} color="#FF7A00" />
          <Text style={styles.menuText}>My Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentMethodScreen' as never)}>
          <Icon name="card-outline" size={22} color="#FF7A00" />
          <Text style={styles.menuText}>Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HelpSupportScreen' as never)}>
          <Icon name="help-circle-outline" size={22} color="#FF7A00" />
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('StartScreen' as never)}>
          <Icon name="log-out-outline" size={22} color="#FF7A00" />
          <Text style={[styles.menuText, { color: '#D00000' }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen' as never)}>
          <Icon name="home-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TicketScreen' as never)}>
          <Icon name="ticket-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen' as never)}>
          <Icon name="person" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2EA',
    paddingHorizontal: 18,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#121212',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  profileBox: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#121212',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#121212',
    fontWeight: '600',
  },

  /* BOTTOM NAV */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#131E2E',
    paddingVertical: 23,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});