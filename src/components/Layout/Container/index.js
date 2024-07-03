import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import styles from './Styles';

const Container = ({
  children,
  transparentStatusBar,
  statusBarColor,
  lightContent,
  safeAreaView,
  safeAreaViewHeader,
  containerStyle,
  theme
}) => {

  const style = {
    flex: 0,
    alignItems: 'center',
    backgroundColor: !transparentStatusBar
      ? statusBarColor || 'white'
      : 'transparent',
  };

  return (
    <>
      <StatusBar
        backgroundColor={
          lightContent ? 'darkGrey' : statusBarColor || ('lightGrey')
        }
        barStyle={lightContent ? 'light-content' : 'dark-content'}
      />
      {safeAreaView !== false && <SafeAreaView style={style} />}
      {safeAreaView !== false && safeAreaViewHeader !== false && (
        <SafeAreaView style={!theme ? [styles.safeViewContainer, containerStyle] : [styles.safeViewContainer, containerStyle,{backgroundColor: 'black'}]}>
          {children}
        </SafeAreaView>
      )}
      {(safeAreaView === false || safeAreaViewHeader === false) && (
        <View
          style={!theme ? [
            styles.container,
            safeAreaViewHeader === false && styles.statusBarMarginTop,
          ]: [styles.container,
          safeAreaViewHeader === false && styles.statusBarMarginTop, {backgroundColor: 'black'}]}>
          {children}
        </View>
      )}
    </>
  );
};

export default Container;