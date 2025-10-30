import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const TicketScreen = () => {
  const navigation = useNavigation();

  // 🔹 State untuk kategori & tanggal aktif
  const [selectedCategory, setSelectedCategory] = useState('Aircraft');
  const [selectedDate, setSelectedDate] = useState('M23'); // pake id unik

  // 🔹 Dummy gambar tiket dari assets/image/
  const tickets = [
    require('../../assets/image/ticket1.png'),
    require('../../assets/image/ticket1.png'),
    require('../../assets/image/ticket1.png'),
    require('../../assets/image/ticket1.png'),
  ];

  // 🔹 Data hari & tanggal (dikasih id unik)
  const dates = [
    { id: 'S22', day: 'S', date: '22' },
    { id: 'M23', day: 'M', date: '23' },
    { id: 'T24', day: 'T', date: '24' },
    { id: 'W25', day: 'W', date: '25' },
    { id: 'T26', day: 'T', date: '26' },
    { id: 'F27', day: 'F', date: '27' },
    { id: 'S28', day: 'S', date: '28' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6F2EA" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tickets</Text>
        <Icon name="ellipsis-vertical" size={20} color="#000" />
      </View>

      {/* LOCATION */}
      <Text style={styles.label}>Current locations</Text>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>Netherlands</Text>
        <Icon name="chevron-down" size={18} color="#000" />
      </TouchableOpacity>

      {/* CATEGORY FILTER */}
      <View style={styles.categoryRow}>
        {['Hotel', 'Aircraft', 'Villa', 'Attraction', 'Local Transportation'].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setSelectedCategory(item)}
            style={[
              styles.categoryBtn,
              selectedCategory === item && styles.categoryBtnActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MONTH DROPDOWN */}
      <View style={styles.monthDropdown}>
        <Text style={styles.monthLabel}>June, 2025</Text>
        <Icon name="chevron-down" size={18} color="#000" />
      </View>

      {/* DATE FILTER */}
      <View style={styles.dateRow}>
        {dates.map((item) => {
          const isActive = selectedDate === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedDate(item.id)}
              style={[styles.dateBtn, isActive && styles.dateBtnActive]}
            >
              <Text
                style={[styles.dateText, isActive && styles.dateTextActive]}
              >
                {item.day + '\n' + item.date}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* SECTION TITLE */}
      <Text style={styles.sectionTitle}>4 Tickets Found</Text>

      {/* LIST TIKET */}
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 45 }} // ✅ tambahkan ini 
      >
        {tickets.map((img, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => console.log(`Ticket ${index + 1} clicked`)}
          >
            <Image source={img} style={styles.ticketImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen' as never)}>
          <Icon name="home-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TicketScreen' as never)}>
          <Icon name="ticket" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen' as never)}>
          <Icon name="person-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F2EA', padding: 18 },

  /* HEADER */
  header: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  /* LOCATION */
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 14,
  },
  dropdownText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  /* CATEGORY */
  categoryRow: { flexDirection: 'row', marginBottom: 14 },
  categoryBtn: {
    backgroundColor: '#E9E5DC',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryBtnActive: { backgroundColor: '#FF7A00' },
  categoryText: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  categoryTextActive: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  /* MONTH DROPDOWN */
  monthDropdown: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  monthLabel: {
    fontSize: 17,
    color: '#000',
    marginRight: 6,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  /* DATE FILTER */
  dateRow: {
    flexDirection: 'row',
    marginBottom: 18,
    justifyContent: 'space-between',
  },
  dateBtn: {
    backgroundColor: '#E9E5DC',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: 44,
    alignItems: 'center',
  },
  dateBtnActive: { backgroundColor: '#FF7A00' },
  dateText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  dateTextActive: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  /* SECTION TITLE */
  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  /* IMAGE LIST */
  ticketImage: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    marginBottom: 16,
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