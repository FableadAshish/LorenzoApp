import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLORS, COMMOM, FONTS} from '../../../constants';
import {Header} from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import {ROUTES} from '../../../constants/routes';

const OTPScreen = () => {
  const navigation = useNavigation();
  const [focusNext, setFocusNext] = useState(false);

  const textField1Ref = useRef(null);
  const textField2Ref = useRef(null);
  const textField3Ref = useRef(null);
  const textField4Ref = useRef(null);

  useEffect(() => {
    const textFields = [
      textField1Ref,
      textField2Ref,
      textField3Ref,
      textField4Ref,
    ];
    textFields.forEach(ref => {
      if (ref.current) {
        ref.current.focus = ref.current.focus.bind(ref.current);
      }
    });
  }, []);

  const handleTextFieldSubmitEditing = index => {
    if (index < 3) {
      const textFields = [
        textField1Ref,
        textField2Ref,
        textField3Ref,
        textField4Ref,
      ];
      if (textFields[index + 1].current) {
        textFields[index + 1].current.focus();
      }
    }
  };

  const OTPAdded = () => {
    navigation.navigate(ROUTES.CREATE_NEW_PASSWORD);
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          iconName={'chevron-small-left'}
          openDrawer={() => navigation.goBack()}
        />
        <Text style={styles.verificationText}>Verification</Text>
        <Text style={styles.detailsText}>
          We have sent OTP to your Mobile Number at ******5044. Please enter the
          4 digits code you recieved
        </Text>
        <View>
          <View style={styles.textFieldContainer}>
            <TextInput
              style={styles.textField}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              onSubmitEditing={() => handleTextFieldSubmitEditing(0)}
              blurOnSubmit={focusNext}
              returnKeyType="next"
              onChangeText={text => {
                if (text !== '') {
                  setFocusNext(true);
                } else {
                  setFocusNext(false);
                }
              }}
              ref={textField1Ref}
            />
            <TextInput
              style={styles.textField}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              onSubmitEditing={() => handleTextFieldSubmitEditing(1)}
              blurOnSubmit={focusNext}
              returnKeyType="next"
              onChangeText={text => {
                if (text !== '') {
                  setFocusNext(true);
                } else {
                  setFocusNext(false);
                }
              }}
              ref={textField2Ref}
            />
            <TextInput
              style={styles.textField}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              onSubmitEditing={() => handleTextFieldSubmitEditing(2)}
              blurOnSubmit={focusNext}
              returnKeyType="next"
              onChangeText={text => {
                if (text !== '') {
                  setFocusNext(true);
                } else {
                  setFocusNext(false);
                }
              }}
              ref={textField3Ref}
            />
            <TextInput
              style={styles.textField}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              onSubmitEditing={() => handleTextFieldSubmitEditing(3)}
              blurOnSubmit={focusNext}
              returnKeyType="done"
              onChangeText={text => {
                if (text !== '') {
                  setFocusNext(true);
                } else {
                  setFocusNext(false);
                }
              }}
              ref={textField4Ref}
            />
          </View>
        </View>
        <View style={{backgroundColor: COLORS.white}}>
          <Text style={styles.notRecieved}>Didn't receive code?</Text>
          <Text style={styles.resendTextTime}>Resend in 32 sec</Text>
          <TouchableOpacity>
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: 'white'}}>
        <Button
          title={'Continue'}
          innerStyle={styles.buttnStyle}
          style={styles.buttonContainer}
          performAction={() => OTPAdded()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  verificationText: {
    fontSize: 30,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.mediumTextColor,
    marginTop: 20,
    fontWeight: Platform.OS === 'ios' ? '400' : '600',
  },
  detailsText: {
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.lightTextColor,
    marginTop: 5,
    fontWeight: Platform.OS === 'ios' ? '400' : '600',
  },
  textField: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.placeholderBackgroundColor,
    fontSize: 30,
  },
  textFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 80,
  },
  notRecieved: {
    textAlign: 'center',
    marginTop: 30,
    fontFamily: FONTS.poppinsRegular,
    fontSize: 16,
    color: COLORS.lightTextColor,
    fontWeight: Platform.OS === 'ios' ? '400' : '600',
  },
  resendTextTime: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: FONTS.poppinsRegular,
    fontSize: 16,
    color: COLORS.mediumTextColor,
    fontWeight: Platform.OS === 'ios' ? '400' : '600',
  },
  resendText: {
    textAlign: 'center',
    color: COLORS.lightPrimaryColor,
  },
  buttnStyle: {
    borderRadius: 50,
  },
  buttonContainer: {
    paddingHorizontal: COMMOM.paddingHorizantal,
    paddingBottom: COMMOM.paddingHorizantal,
    backgroundColor: COLORS.white,
  },
});

export default OTPScreen;
