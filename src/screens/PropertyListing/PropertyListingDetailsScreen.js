import React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, COMMOM} from '../../constants';
import {Header} from '../../components/Header';

const PropertyListingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {propertyDetails} = route.params;

  console.log('propertyDetails', propertyDetails);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={propertyDetails.locationImage}
        resizeMode="stretch"
        style={{
          height: 320,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <Header
          iconName={'chevron-small-left'}
          style={styles.headerBackground}
          iconBackground={styles.headerIconBackground}
          rightIcon={'heart'}
          rightIconBackground={styles.rightHeaderIconBackground}
          openDrawer={() => navigation.goBack()}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  headerBackground: {
    backgroundColor: COLORS.transparent,
    marginTop: 10,
  },
  headerIconBackground: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 40,
    width: 40,
    marginLeft: COMMOM.paddingHorizantal,
  },
  rightHeaderIconBackground: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 40,
    width: 40,
    marginRight: COMMOM.paddingHorizantal,
  },
});

export default PropertyListingDetailsScreen;
