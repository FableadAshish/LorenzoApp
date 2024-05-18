import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import Video from 'react-native-video';
import {IMAGES} from '../../constants';
import WebView from 'react-native-webview';
import {Header} from '../../components/Header';
import {useRoute} from '@react-navigation/native';

const VirtualTourScreen = () => {
  const route = useRoute();
  const url = route.params;

  console.log(url)
  return (
    <View style={{flex: 1}}>
      <WebView source={{uri: url.get360View}} />
    </View>
  );
};

export default VirtualTourScreen;
