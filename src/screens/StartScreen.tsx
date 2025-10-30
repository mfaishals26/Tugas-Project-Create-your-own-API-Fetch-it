import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * START SCREEN
 * Halaman pembuka (landing page) aplikasi.
 * Menampilkan background gambar, teks motivasi,
 * dan tombol untuk melanjutkan ke halaman utama (Main).
 */

const StartScreen = () => {
  // Hook dari React Navigation untuk navigasi antar screen
  const navigation = useNavigation();

  return (
    // Komponen background gambar
    <ImageBackground
      source={require('../../assets/image/bg.jpg')} // Gambar latar belakang dari folder assets/image
      style={styles.background}
    >
      {/* StatusBar transparan agar gambar full screen */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Overlay berisi teks dan tombol */}
      <View style={styles.overlay}>
        {/* Judul besar (teks utama) */}
        <Text style={styles.title}>
          Your Next Adventure{'\n'}Starts Here
        </Text>

        {/* Subjudul atau deskripsi singkat */}
        <Text style={styles.subtitle}>
          Life’s too short to stay in one place. Find your next favorite city,
          beach, or mountain and let’s get moving!
        </Text>

        {/* Tombol navigasi ke halaman utama */}
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen' as never)} // Arahkan ke screen bernama 'Main'
          style={styles.button}
          activeOpacity={0.8} // Efek transparansi saat ditekan
        >
          <Text style={styles.buttonText}>Start Exploring</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

/**
 * STYLESHEET (Tampilan & Warna)
 * Mengatur desain visual setiap elemen.
 */
const styles = StyleSheet.create({
  // Background gambar
  background: {
    flex: 1, // Mengisi seluruh layar
    resizeMode: 'cover', // Agar gambar menutupi area
    justifyContent: 'flex-end', // Teks muncul di bagian bawah layar
  },

  // Layer transparan di atas gambar untuk menampung teks
  overlay: {
    backgroundColor: 'transparent', // Tidak menutupi gambar (salah ketik sebelumnya 'transparant')
    padding: 24,
  },

  // Teks utama (judul besar)
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans-Bold', // Menggunakan font custom tebal
    lineHeight: 28, // Jarak antar baris agar proporsional
  },

  // Teks deskripsi / subtitle
  subtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)', // Warna putih transparan agar lembut
    marginBottom: 20,
    lineHeight: 15,
    fontFamily: 'PlusJakartaSans-Regular', // Font reguler
  },

  // Tombol hijau “Start Exploring”
  button: {
    backgroundColor: '#00B8B0', // Warna hijau toska
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20, // Membuat tombol rounded
    alignSelf: 'flex-start', // Posisikan di kiri layar
    marginBottom: 0,

    // Efek bayangan tombol
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 6, // Untuk bayangan di Android
  },

  // Gaya teks dalam tombol
  buttonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold', // Font tebal
  },
});

export default StartScreen;