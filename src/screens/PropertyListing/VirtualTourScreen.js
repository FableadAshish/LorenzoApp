import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import Video from 'react-native-video';
import {IMAGES} from '../../constants';
import WebView from 'react-native-webview';
import {Header} from '../../components/Header';

const VirtualTourScreen = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: 'https://my.matterport.com/show/?m=dt3js7xS8V4&play=1'}}
      />
    </View>
  );
};

export default VirtualTourScreen;
