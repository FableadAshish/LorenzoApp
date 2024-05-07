import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
// import {styles} from './Styles/HeaderStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import commons from '../../constants/commons';

export const Header = ({iconName, openDrawer, title, rightIcon}) => {
  console.log("rightIcon", rightIcon)
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
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
        <Text>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        {
          rightIcon === headerRightImage ?
          <Image style={{height: 50, width: 50, borderRadius:50}} />
          :
          <Icon name={rightIcon} size={30} color="black" />

        }
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

  },
  center: {
    flex: 1,
    alignItems: 'center',
    // marginLeft: 15,
    justifyContent:'center',
  },
  rightContainer: {
    // flex:0
    alignItems: 'flex-end',

  },
  centerStyle:{
    // color:'red',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft:-10
  }
})