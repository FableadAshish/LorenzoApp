import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
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
