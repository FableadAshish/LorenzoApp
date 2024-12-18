import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, COMMOM, IMAGES} from '../../constants';

export const Header = ({
  iconName,
  openDrawer,
  title,
  rightIcon,
  style,
  iconBackground,
  rightIconBackground,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.leftContainer, iconBackground]}>
        {iconName === 'chevron-small-left' ? (
          <Pressable
            onPress={openDrawer}
            style={styles.leftIconStyles}>
            <Image source={IMAGES.leftArrow} style={styles.leftNavigation} />
          </Pressable>
        ) : (
          <TouchableOpacity>
            <Image source={IMAGES.menu} style={styles.leftNavigation} />
          </TouchableOpacity>
        )}
      </View>
      <View style={title === 'HubbbleVR@Support' ? styles.chat : styles.center}>
        {title === 'HubbbleVR@Support' ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={IMAGES.LorenzoIcon}
              style={{height: 30, width: 30}}
            />
            <Text style={styles.titleChatText}>{title}</Text>
          </View>
        ) : (
          <Text style={styles.titleText}>{title}</Text>
        )}
      </View>

      <View style={[styles.rightContainer, rightIconBackground]}>
        <Icon name={rightIcon} size={30} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.bgColor,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    height: 60,
    // position: 'relative',
    // width: '100%',
    // backgroundColor:'red'
  },
  leftContainer: {
    // flex: 1,
    position: 'absolute',
    // paddingHorizontal: COMMOM.paddingHorizantal
  },
  center: {
    flex: 1,
    alignItems: 'center',
    // marginLeft: 15,
    justifyContent: 'center',
  },
  chat: {
    // flex: 1,
    alignItems: 'center',
    marginLeft: 30,
    justifyContent: 'center',
  },
  rightContainer: {
    // flex:0
    alignItems: 'flex-end',
  },
  centerStyle: {
    // color:'red',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: -10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingLeft:-10
    color: COLORS.appColor,
  },
  leftNavigation: {
    height: 25,
    width: 25,
    tintColor: COLORS.black,
    resizeMode: 'contain',
  },
  titleChatText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
    color: COLORS.black,
  },
  leftIconStyles: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    // backgroundColor: 'red'
  }
});
