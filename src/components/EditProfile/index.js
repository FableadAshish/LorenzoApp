import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import {COLORS, COMMOM, IMAGES} from '../../constants';
import EditModal from '../EditModal';
import InputField from '../InputField';
import Button from '../Button';
import {Header} from '../Header';

const EditProfileComp = ({title, titleText, editValue}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const getValue = editValue => {
    setModalVisible(true);
  };

  const forgetPassword = () => {};
  return (
    <>
      {/* <StatusBar backgroundColor={'rgba(0, 0, 0, 0.5)'} /> */}
      <View style={styles.container}>
        <View>
          <Text style={styles.nameTextTitle}>{title}</Text>
          <Text style={styles.nameText}>{titleText}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => getValue(editValue)}>
          <Image
            source={IMAGES.edit}
            style={styles.editImage}
            tintColor={COLORS.mediumTextColor}
          />
        </TouchableOpacity>
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.editContainer}>
              {title === 'Name' ? (
                <EditModal
                  title={'Change Name'}
                  closeModal={() => setModalVisible(!modalVisible)}
                  inputField={
                    <InputField
                      placeholderText={'Enter New Name'}
                      placeholderImage={IMAGES.ProfileIcon}
                    />
                  }
                  button={
                    <Button title={'Save'} innerStyle={styles.buttonStyle} />
                  }
                />
              ) : title === 'Email' ? (
                <EditModal
                  title={'Change Email'}
                  closeModal={() => setModalVisible(!modalVisible)}
                  inputField={
                    <InputField
                      placeholderText={'Enter New Email'}
                      placeholderImage={IMAGES.Message}
                    />
                  }
                  button={
                    <Button title={'Save'} innerStyle={styles.buttonStyle} />
                  }
                />
              ) : title === 'Password' ? (
                <EditModal
                  title={'Change Password'}
                  closeModal={() => setModalVisible(!modalVisible)}
                  inputField={
                    <>
                      <InputField
                        title={'Old Password'}
                        placeholderText={'Enter current password'}
                        placeholderImage={IMAGES.lock}
                        secureTextEntry={true}
                      />
                      <InputField
                        title={'New Password'}
                        placeholderText={'Enter new password'}
                        placeholderImage={IMAGES.lock}
                        secureTextEntry={true}
                      />
                      <InputField
                        title={'Confirm New Password'}
                        placeholderText={'Confirm new password'}
                        placeholderImage={IMAGES.lock}
                        secureTextEntry={true}
                      />
                    </>
                  }
                  button={
                    <Button
                      title={'Save'}
                      innerStyle={styles.buttonStyle}
                      performAction={() => forgetPassword()}
                    />
                  }
                  forgetPassword={'Forgot Password'}
                />
              ) : (
                <EditModal
                  title={'Change Phone Number'}
                  closeModal={() => setModalVisible(!modalVisible)}
                  inputField={
                    <>
                      <InputField
                        title={'Phone Number'}
                        placeholderText={'Enter New Number'}
                        placeholderImage={IMAGES.shield}
                      />
                    </>
                  }
                  button={
                    <Button title={'Save'} innerStyle={styles.buttonStyle} />
                  }
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    // paddingHorizontal: COMMOM.paddingHorizantal,
  },
  editImage: {
    height: 24,
    width: 24,
  },
  nameTextTitle: {
    fontSize: 18,
    color: COLORS.lightTextColor,
  },
  nameText: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editContainer: {
    paddingBottom: 40,
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 50,
    alignItems: 'center',
    height: 55,
  },
});

export default EditProfileComp;
