import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../../../screens/PropertyListing/Styles/PropertyListingDetailsScreenStyles';
import Button from '../../Button';
import {COLORS, IMAGES} from '../../../constants';

export const InquiryForm = ({visible, closeModal, isLoading, submitForm, value1}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.inquiryContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <Pressable style={styles.headerContainer} onPress={closeModal}>
              <Image source={IMAGES.close} style={{height: 24, width: 24}} />
            </Pressable>
            <Text style={styles.inquiryText}>
              Please fill the form to send an inquiry.
            </Text>
            <View style={{marginTop: 20}}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Subject:</Text>
                <TextInput
                  style={styles.subjectMessage}
                  placeholderTextColor={COLORS.lightTextColor}
                  placeholder="Add Subject"
                  onChangeText={text => handleChange('subject', text)}
                  value={value1}
                />
                {error.subject && (
                  <Text style={styles.errorText}>{error.subject}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mobile number:</Text>
                <TextInput
                  style={styles.subjectMessage}
                  placeholderTextColor={COLORS.lightTextColor}
                  placeholder="Add Number"
                  onChangeText={text => handleChange('phone', text)}
                  value={inquiryDetails.phone}
                  keyboardType="numeric"
                />
                {error.subject && (
                  <Text style={styles.errorText}>{error.subject}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Message:</Text>
                <TextInput
                  style={styles.inputMessage}
                  placeholderTextColor={COLORS.lightTextColor}
                  numberOfLines={4}
                  multiline={true}
                  placeholder="Add Message"
                  onChangeText={text => handleChange('inquiry', text)}
                  value={inquiryDetails.inquiry}
                />
                {error.inquiry && (
                  <Text style={styles.errorText}>{error.inquiry}</Text>
                )}
              </View>
              <Button
                title={
                  isLoading ? (
                    <ActivityIndicator color={COLORS.white} size={22} />
                  ) : (
                    'Submit'
                  )
                }
                style={styles.submitInquiryButton}
                performAction={submitForm}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
