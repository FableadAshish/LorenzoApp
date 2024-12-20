import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {COLORS, IMAGES} from '../../constants';
import EditModal from '../EditModal';
import InputField from '../InputField';
import Button from '../Button';

const EditProfileComp = ({title, titleText, onChangeText, error, isRequired, defaultValue}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(titleText);

  const handleSave = () => {
    onChangeText(inputValue);
    setModalVisible(false);
  };
  
  useEffect(() => {
    if(defaultValue){
      setInputValue(defaultValue)
    }
  },[]);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.nameTextTitle}>{title}</Text>
          <Text style={styles.nameText}>{titleText}</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}>
          <Image
            source={IMAGES.edit}
            style={styles.editImage}
            tintColor={COLORS.appColor}
          />
        </TouchableOpacity>
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.editContainer}>
              {title === 'Name' && (
                <EditModal
                  title={'Change Name'}
                  closeModal={() => setModalVisible(false)}
                  inputField={
                    <InputField
                      placeholderText={'Enter New Name'}
                      placeholderImage={IMAGES.userPlaceholder}
                      getText={text => setInputValue(text)}
                      // value={defaultValue}
                    />
                  }
                  button={
                    <Button
                      title={'Save'}
                      innerStyle={styles.buttonStyle}
                      performAction={handleSave}
                    />
                  }
                />
              )}
              {title === 'Email' && (
                <EditModal
                  title={'Change Email'}
                  closeModal={() => setModalVisible(false)}
                  inputField={
                    <InputField
                      placeholderText={'Enter New Email'}
                      placeholderImage={IMAGES.Message}
                      getText={text => setInputValue(text)}
                    />
                  }
                  button={
                    <Button
                      title={'Save'}
                      innerStyle={styles.buttonStyle}
                      performAction={handleSave}
                    />
                  }
                />
              )}
              {title === 'Number' && (
                <EditModal
                  title={'Change Phone Number'}
                  closeModal={() => setModalVisible(false)}
                  inputField={
                    <InputField
                      title={'Phone Number'}
                      placeholderText={'Enter New Number'}
                      placeholderImage={IMAGES.shield}
                      getText={text => setInputValue(text)}
                    />
                  }
                  button={
                    <Button
                      title={'Save'}
                      innerStyle={styles.buttonStyle}
                      performAction={handleSave}
                    />
                  }
                />
              )}
              {title === 'Dream Location' && (
                <EditModal
                  title={'Enter Dream Location'}
                  closeModal={() => setModalVisible(false)}
                  inputField={
                    <InputField
                      title={'Location'}
                      placeholderText={'Enter your location'}
                      placeholderImage={IMAGES.shield}
                      getText={text => setInputValue(text)}
                    />
                  }
                  button={
                    <Button
                      title={'Save'}
                      innerStyle={styles.buttonStyle}
                      performAction={handleSave}
                    />
                  }
                />
              )}

              {title === 'Require a Wedding Planner?' && (
                <EditModal
                  title={'Do you need a wedding planner ?'}
                  closeModal={() => setModalVisible(false)}
                  selectValue={true}
                  isSelectedValue={isRequired}
                  button={
                    <Button
                      title={'Save'}
                      innerStyle={styles.buttonStyle}
                      performAction={handleSave}
                    />
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

export default EditProfileComp;

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
    color: COLORS.black,
  },
  nameText: {
    fontSize: 20,
    color: COLORS.appColor,
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
    // height: 55,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
  },
});
