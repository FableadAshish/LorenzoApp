import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';


const SearchContainer = ({placeholderTitle, onChangeText}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchPlaceHolderContrainer}>
        <Icon name={'search'} color={COLORS.black} size={20} />
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
    fontSize: 16
  },
  searchContainer: {
    // marginHorizontal: 20,
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  searchPlaceHolderContrainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightTextColor
  },
});
export default SearchContainer;
