import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, IMAGES} from '../../constants';

const SearchContainer = ({placeholderTitle, onChangeText, style}) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <View style={styles.searchPlaceHolderContrainer}>
        <Image source={IMAGES.search} style={styles.searchIcon} />
        <TextInput
          placeholder={placeholderTitle}
          style={styles.placeholderText}
          onChangeText={onChangeText}
          textAlignVertical="center"
          placeholderTextColor={COLORS.black}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderText: {
    marginLeft: 10,
    color: COLORS.black,
    fontSize: 16,
    width: '100%'
  },
  searchContainer: {
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  searchPlaceHolderContrainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightTextColor,
  },
  searchIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },
});
export default SearchContainer;
