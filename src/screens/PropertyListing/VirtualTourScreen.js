import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '../../components/Header';

const VirtualTourScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const url = route.params;
  return (
    <View style={{flex: 1}}>
      <Header
        openDrawer={() => navigation.goBack()}
        iconName={'chevron-small-left'}
        style={styles.header}
      />
      <WebView source={{uri: url.get360View}} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 40
  }
})

export default VirtualTourScreen;
