import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getfavorite, deleteFavorite, favorite } from '../api/data';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState<favorite[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil wishlist dari API saat pertama kali load
  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const data = await getfavorite();
        setFavorite(data);
      } catch (error) {
        console.error('Failed to fetch favorite:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorite();
  }, []);

  // 🔹 Hapus item dari wishlist
  const handleRemove = async (id: string) => {
    try {
      await deleteFavorite(id);
      setFavorite((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete favorite:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text style={{ marginTop: 10, color: '#333' }}>Loading your favorite...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6F2EA" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favorite</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* JIKA Favorite KOSONG */}
      {favorite.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="heart-outline" size={70} color="#ccc" />
          <Text style={styles.emptyText}>Your Favorite is empty!</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
        >
          {favorite.map((item) => (
            <View key={item.id} style={styles.cardContainer}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
              </View>

              {/* DELETE BUTTON */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemove(item.id)}
              >
                <Icon name="trash-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* BOTTOM NAV */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen' as never)}>
          <Icon name="home-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TicketScreen' as never)}>
          <Icon name="ticket-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen' as never)}>
          <Icon name="person-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2EA',
    paddingHorizontal: 18,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#121212' },

  /* CARD */
  cardContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardImage: { width: '100%', height: 180 },
  cardInfo: { padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#000' },

  /* DELETE BUTTON */
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF7A00',
    padding: 8,
    borderRadius: 20,
  },

  /* EMPTY STATE */
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#666', fontSize: 16, marginTop: 10 },

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