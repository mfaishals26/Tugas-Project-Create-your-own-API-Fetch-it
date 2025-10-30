import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HelpSupportScreen = () => {
  const navigation = useNavigation();

  const handleContact = (type: 'email' | 'phone') => {
    if (type === 'email') {
      Linking.openURL('mailto:support@travelapp.com');
    } else {
      Linking.openURL('tel:+628123456789');
    }
  };

  const handleSendMessage = () => {
    Alert.alert('Thank you!', 'Your message has been sent to our support team.');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6F2EA" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 26 }} /> 
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* INTRO */}
        <Text style={styles.introText}>
          Need help? We're here to assist you. Check our FAQs or contact our support team below.
        </Text>

        {/* FAQ SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          <View style={styles.faqBox}>
            <Text style={styles.faqQ}>1. How do I book a ticket?</Text>
            <Text style={styles.faqA}>
              You can go to the Ticket section, choose your desired date, and confirm your booking.
            </Text>
          </View>

          <View style={styles.faqBox}>
            <Text style={styles.faqQ}>2. Can I cancel my booking?</Text>
            <Text style={styles.faqA}>
              Yes, cancellations can be done within 24 hours of booking confirmation.
            </Text>
          </View>

          <View style={styles.faqBox}>
            <Text style={styles.faqQ}>3. How do I reset my password?</Text>
            <Text style={styles.faqA}>
              Go to your Profile page, tap on “Settings”, and choose “Reset Password”.
            </Text>
          </View>
        </View>

        {/* CONTACT SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContact('email')}
          >
            <Icon name="mail-outline" size={22} color="#FF7A00" />
            <Text style={styles.contactText}>support@travelapp.com</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContact('phone')}
          >
            <Icon name="call-outline" size={22} color="#FF7A00" />
            <Text style={styles.contactText}>+62 812 3456 789</Text>
          </TouchableOpacity>
        </View>

        {/* SEND MESSAGE */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="chatbubbles-outline" size={20} color="#fff" />
          <Text style={styles.sendText}>Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HelpSupportScreen;

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
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#121212',
  },

  introText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 18,
    lineHeight: 20,
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#121212',
    marginBottom: 10,
  },

  faqBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  faqQ: {
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  faqA: {
    color: '#555',
    fontSize: 13,
  },

  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  contactText: {
    marginLeft: 10,
    color: '#121212',
    fontSize: 14,
    fontWeight: '600',
  },

  sendButton: {
    backgroundColor: '#FF7A00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  sendText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
});