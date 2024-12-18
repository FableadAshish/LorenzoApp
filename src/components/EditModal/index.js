import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, Pressable} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../constants/routes';
import images from '../../constants/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import {isPlannerRequired} from '../../redux/slice/propertySlice';
import {useDispatch} from 'react-redux';

const EditModal = ({
  title,
  closeModal,
  inputField,
  button,
  forgetPassword,
  selectValue,
  isSelectedValue,
  getText,
}) => {
  const navigation = useNavigation();
  const forgetPasswords = () => {
    navigation.navigate(ROUTES.FORGOT_PASSWORD);
    closeModal();
  };
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(isSelectedValue);

  const toggleSelection = value => {
    dispatch(isPlannerRequired(value));
    setSelectedValue(value);
  };
  return (
    <View /*style={{paddingHorizontal: 20}}*/>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Image
              source={IMAGES.close}
              style={styles.closeImage}
              tintColor={COLORS.mediumTextColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.placeholderContainer}>{inputField}</View>
        {forgetPassword && (
          <TouchableOpacity onPress={() => forgetPasswords()}>
            <Text style={styles.forgetPassword}>{forgetPassword}</Text>
          </TouchableOpacity>
        )}
        {selectValue && (
          <View style={styles.isSelectValue}>
            {/* Option Yes */}
            <Pressable
              onPress={() => toggleSelection(1)}
              style={styles.selectOption}>
              <Image
                source={
                  selectedValue === 1
                    ? images.CHECKED // Checked image
                    : images.UNCHECKED // Unchecked image
                }
                style={styles.uncheckedImage}
              />
              <Text style={styles.isRequiredText}>Yes</Text>
            </Pressable>

            {/* Option No */}
            <Pressable
              onPress={() => toggleSelection(0)}
              style={[styles.selectOption, {gap: 12}]}>
              <Image
                source={
                  selectedValue === 0
                    ? images.CHECKED // Checked image
                    : images.UNCHECKED // Unchecked image
                }
                style={styles.uncheckedImage}
              />
              <Text style={styles.isRequiredText}>No</Text>
            </Pressable>
          </View>
        )}
        <View style={styles.buttonContainer}>{button}</View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '40rem',
  },
  titleText: {
    fontSize: '18rem',
    color: COLORS.appColor,
    fontFamily: FONTS.poppinsRegular,
  },
  closeImage: {
    height: '30rem',
    width: '30rem',
  },
  forgetPassword: {
    textAlign: 'right',
    // marginTop: 10,
    textDecorationLine: 'underline',
    // padding: 5,
  },
  placeholderContainer: {marginTop: 0},
  buttonContainer: {marginTop: '10rem'},
  uncheckedImage: {
    height: '24rem',
    width: '24rem',
  },
  selectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  isSelectValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
    marginTop: '20rem',
  },
  isRequiredText: {
    fontSize: '16rem',
    color: COLORS.appColor
  },
});

export default EditModal;
