// src/screens/PaymentMethodScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: '1',
      name: 'Credit Card',
      icon: require('../../assets/image/Credit Card.jpg'),
    },
    {
      id: '2',
      name: 'PayPal',
      icon: require('../../assets/image/Paypal.png'),
    },
    {
      id: '3',
      name: 'Google Pay',
      icon: require('../../assets/image/Google Pay.png'),
    },
    {
      id: '4',
      name: 'Bank Transfer',
      icon: require('../../assets/image/Bank Transfer Keren.png'),
    },
  ];

  const handleConfirm = () => {
    if (!selectedMethod) {
      Alert.alert('Oops!', 'Please select a payment method first.');
      return;
    }
    Alert.alert('✅ Success', `You chose ${selectedMethod} as your payment method.`);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6F2EA" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {paymentMethods.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.methodCard,
              selectedMethod === item.name && styles.methodCardActive,
            ]}
            onPress={() => setSelectedMethod(item.name)}
            activeOpacity={0.8}
          >
            <View style={styles.methodLeft}>
              <Image source={item.icon} style={styles.iconImage} />
              <Text
                style={[
                  styles.methodName,
                  selectedMethod === item.name && styles.methodNameActive,
                ]}
              >
                {item.name}
              </Text>
            </View>
            {selectedMethod === item.name && (
              <Icon name="checkmark-circle" size={22} color="#FF7A00" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Payment Method</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2EA',
    paddingHorizontal: 18,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  methodCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },
  methodCardActive: {
    borderColor: '#FF7A00',
    borderWidth: 2,
    elevation: 3,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: 34,
    height: 34,
    marginRight: 14,
    resizeMode: 'contain',
  },
  methodName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  methodNameActive: {
    color: '#FF7A00',
  },
  confirmBtn: {
    backgroundColor: '#FF7A00',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});