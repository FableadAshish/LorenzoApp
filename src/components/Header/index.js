import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, COMMOM} from '../../constants';

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
          <TouchableOpacity>
            <Entypo
              name={iconName}
              size={35}
              color="black"
              onPress={openDrawer}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Icon
              name={iconName}
              size={30}
              color="black"
              onPress={openDrawer}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        <Text style={styles.titleText}>{title}</Text>
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
    backgroundColor: '#fff',
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
  },
});
