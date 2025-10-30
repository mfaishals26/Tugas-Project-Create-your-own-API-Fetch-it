// src/screens/DetailScreen.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

type NavProp = NativeStackNavigationProp<any>;

const DetailLabuanBajoScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [quantity, setQuantity] = useState<number>(1);

  const pricePerItem = 10000;
  const totalPrice = quantity * pricePerItem;

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : q));

  const handleViewAll = () => Alert.alert('✨ Reviews', 'Menampilkan semua ulasan pengguna...');

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.screen}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* HEADER GAMBAR */}
      <Animated.View
        style={[styles.headerWrap, { transform: [{ translateY: imageTranslate }] }]}
      >
        <ImageBackground
          source={require('../../assets/image/labuanbajo.jpg')}
          style={styles.headerImage}
          imageStyle={styles.headerImageStyle}
        >
          <View style={styles.topControls}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconRound}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.tempBox}>
              <Icon name="sunny-outline" size={16} color="#fff" />
              <Text style={styles.tempText}>24°C</Text>
            </View>
          </View>

          <View style={styles.headerOverlay}>
            <View style={styles.ratingPill}>
              <Icon name="star" size={12} color="#FFD66B" />
              <Text style={styles.ratingText}>5.0</Text>
            </View>

            <Text style={styles.title}>Labuan Bajo</Text>
            <Text style={styles.subtitle}>
              From crystal-clear waters to breathtaking sunsets, Labuan Bajo is calling!
              Explore hidden islands, swim with manta rays, and create memories that last a lifetime.
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* KONTEN */}
      <View style={styles.container}>
        <View style={styles.countryRow}>
          <View style={styles.flagCircle}>
            <Image source={require('../../assets/image/flag.png')} style={styles.flagImage} />
          </View>
          <Text style={styles.countryText}>Indonesia</Text>
        </View>

        <Text style={styles.sectionTitle}>Discover the Beauty of Labuan Bajo</Text>

        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image source={require('../../assets/image/flag.png')} style={styles.avatar} />
            <Text style={styles.reviewer}>By Faishal</Text>
          </View>

          <Text style={styles.reviewBody}>
            best experience in my life.
          </Text>
        </View>

        <TouchableOpacity style={styles.viewAll} activeOpacity={0.8} onPress={handleViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>

        {/* REKOMENDASI */}
        <Text style={styles.sectionTitleSmall}>Recommendation in Bajo</Text>
        <View style={styles.recommendContainerWrap}>
          <ScrollView
            style={styles.recommendScroll}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 225 }} // ✅ tambahkan ini 
          >
            <View style={styles.recommendCard}>
              <Image source={require('../../assets/image/shif.png')} style={styles.recommendImage} />
            </View>
            <View style={styles.recommendCard}>
              <Image source={require('../../assets/image/komodo.png')} style={styles.recommendImage} />
            </View>
            <View style={styles.recommendCard}>
              <Image source={require('../../assets/image/ayana.png')} style={styles.recommendImage} />
            </View>
          </ScrollView>
        </View>
      </View>

      {/* FOOTER DENGAN BLUR */}
      <View style={styles.footerWrapper}>
        <ImageBackground
          source={require('../../assets/image/footer.png')}
          style={styles.footerBackground}
          imageStyle={styles.footerImageStyle}
          resizeMode="cover"
        >
          {/* Efek blur di atas background */}
          <BlurView
            style={styles.footerBlur}
            blurType={Platform.OS === 'ios' ? 'light' : 'dark'}
            blurAmount={9}
            reducedTransparencyFallbackColor="rgba(0,0,0,0.6)"
          />
          <BookingFooter
            quantity={quantity}
            increase={increaseQty}
            decrease={decreaseQty}
            totalPrice={totalPrice}
          />
        </ImageBackground>
      </View>
    </View>
  );
};

/* ================== FOOTER COMPONENT ================== */
type BookingFooterProps = {
  quantity: number;
  increase: () => void;
  decrease: () => void;
  totalPrice: number;
};

const BookingFooter: React.FC<BookingFooterProps> = ({
  quantity,
  increase,
  decrease,
  totalPrice,
}) => {
  return (
    <View style={styles.footerInner}>
      <View style={styles.footerTop}>
        <View style={styles.qtyBox}>
          <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
            <Text style={styles.qtySign}>+</Text>
          </TouchableOpacity>

          <Text style={styles.qtyValue}>{quantity}</Text>

          <TouchableOpacity style={styles.qtyBtnMin} onPress={decrease}>
            <Text style={styles.qtySignMin}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>${totalPrice.toLocaleString('id-ID')}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bookBtn} activeOpacity={0.9}>
        <Text style={styles.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F5F5' },
  headerWrap: { width: SCREEN_WIDTH, height: HEADER_HEIGHT },
  headerImage: { flex: 1, justifyContent: 'flex-end' },
  headerImageStyle: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },

  topControls: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50,
    left: 25,
    right: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconRound: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tempText: { color: '#fff', marginLeft: 6, fontSize: 20, fontWeight: '500' },
  headerOverlay: { padding: 20 },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  ratingText: { color: '#fff', marginLeft: 6, fontWeight: '600' },
  title: { color: '#fff', fontSize: 32, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 18, maxWidth: '92%' },
  container: { paddingHorizontal: 18, paddingVertical: 20 },
  countryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  flagCircle: { width: 14, height: 14, borderRadius: 11, overflow: 'hidden', marginRight: 8 },
  flagImage: { width: '100%', height: '100%' },
  countryText: { fontSize: 13, color: '#555' },
  sectionTitle: { marginTop: 8, fontSize: 20, fontWeight: '700', color: '#222' },
  reviewCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 26, height: 26, borderRadius: 20, marginRight: 10 },
  reviewer: { fontWeight: '700', color: '#222', fontSize: 14 },
  reviewBody: { color: '#555', fontSize: 13, lineHeight: 18 },
  viewAll: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 18,
  },
  viewAllText: { color: '#000', fontWeight: '600' },
  sectionTitleSmall: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },

  // Scroll hanya di bagian rekomendasi
  recommendContainerWrap: {
    height: 350,
    borderRadius: 14,
    overflow: 'hidden',
  },
  recommendScroll: {
    flexGrow: 0,
  },
  recommendContainer: {
    paddingBottom: 20,
    paddingHorizontal: 4,
  },
  recommendCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  recommendImage: { width: '100%', height: 120, resizeMode: 'cover' },

  // FOOTER
  footerWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  footerBackground: { width: '100%', overflow: 'hidden' },
  footerImageStyle: { opacity: 1 },
  footerBlur: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  footerInner: { padding: 14 },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  qtyBox: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  qtyBtnMin: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  qtySign: { color: '#fff', fontWeight: '700', fontSize: 18 },
  qtySignMin: { color: '#000', fontWeight: '700', fontSize: 18 },
  qtyValue: { fontWeight: '900', fontSize: 18, color: '#fff', marginHorizontal: 8 },
  totalBox: { alignItems: 'flex-end' },
  totalLabel: { color: '#fff', fontSize: 14 },
  totalPrice: { fontWeight: '700', fontSize: 28, marginTop: 2, color: '#fff' },
  bookBtn: {
    backgroundColor: '#FF7A00',
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: 'center',
  },
  bookBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default DetailLabuanBajoScreen;