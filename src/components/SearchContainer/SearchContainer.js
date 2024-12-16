import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS, IMAGES} from '../../constants';
import {useDispatch} from 'react-redux';
import {getCountiresData} from '../../redux/slice/propertySlice';

const SearchContainer = ({
  placeholderTitle,
  onChangeText,
  style,
  countriesList,
  value,
  stateList,
}) => {
  const dispatch = useDispatch();
  const [selectedCountries, setSelectedCountries] = useState([]);

  const filteredCountries =
    countriesList &&
    Array.from(new Set(countriesList.map(item => item.details.country))).map(
      country => countriesList.find(item => item.details.country === country),
    );

  const filteredState =
    stateList &&
    Array.from(new Set(stateList.map(item => item.details.state))).map(state =>
      stateList.find(item => item.details.state === state),
    );

    const renderCountriesList = ({item}) => {
      const COUNTRY_NAME = item.details.country;
      const getCountriesList = async country => {
        setSelectedCountries(prevCountries => {
          const countries = Array.isArray(prevCountries) ? prevCountries : [];
          if (countries.length === 6) {
            return countries;
          }
          const updatedCountries = countries.includes(country)
            ? countries
            : [...countries, country];
          
          // Use the updated countries list for dispatching
          dispatch(
            getCountiresData({
              country: country,
              type: 'country',
              selectedCountries: updatedCountries,
            }),
          );
          
          return updatedCountries;
        });
      
        onChangeText('');
      };
    return (
      <TouchableOpacity
        style={styles.searchResultItem}
        onPress={() => getCountriesList(COUNTRY_NAME)}>
        <Image source={IMAGES.Location} style={styles.locationIcon} />
        <Text style={styles.searchResultText}>{COUNTRY_NAME}</Text>
      </TouchableOpacity>
    );
  };

  const renderStateList = ({item}) => {
    const STATE_NAME = item.details.state;

    const getStatesList = async state => {
      dispatch(getCountiresData({state: state, type: 'state'}));
      onChangeText('');
    };
    return (
      <TouchableOpacity
        style={styles.searchResultItem}
        onPress={() => getStatesList(STATE_NAME)}>
        <Image source={IMAGES.Location} style={styles.locationIcon} />
        <Text style={styles.searchResultText}>{STATE_NAME}</Text>
      </TouchableOpacity>
    );
  };

  const removeCountry = countries => {
    setSelectedCountries(selectedCountries.filter(item => item !== countries));
  };

  return (
    <View style={[styles.searchContainer, style]}>
      <View style={styles.searchPlaceHolderContrainer}>
        <Image source={IMAGES.search} style={styles.searchIcon} />
        <View style={styles.selectedCountriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectedCountriesScrollView}>
            {selectedCountries.map((country, index) => {
              return (
                <View key={index} style={styles.selectedCountryTag}>
                  <Text style={styles.selectedCountryText}>{country}</Text>
                  <TouchableOpacity
                    onPress={() => removeCountry(country)}
                    style={styles.removeCountryButton}>
                    <Text style={styles.removeCountryText}>×</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            <TextInput
              placeholder={selectedCountries.length > 0 ? '' : placeholderTitle}
              style={styles.placeholderText}
              onChangeText={text => {
                onChangeText(text);
                if (text.trim() === '') {
                  onChangeText('');
                }
              }}
              value={value}
              textAlignVertical="center"
              placeholderTextColor={COLORS.black}
            />
          </ScrollView>
        </View>
      </View>
      {filteredState
        ? filteredState &&
          filteredState.length > 0 &&
          value.trim() !== '' && (
            <View style={styles.searchResultsContainer}>
              <FlatList
                data={filteredState}
                renderItem={renderStateList}
                keyExtractor={item => item.id.toString()}
                style={styles.searchResultsList}
              />
            </View>
          )
        : filteredCountries &&
          filteredCountries.length > 0 &&
          value.trim() !== '' && (
            <View style={styles.searchResultsContainer}>
              <FlatList
                data={filteredCountries}
                renderItem={renderCountriesList}
                keyExtractor={item => item.id.toString()}
                style={styles.searchResultsList}
              />
            </View>
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 20,
    borderRadius: 10,
    position: 'relative',
    zIndex: 1,
  },
  searchPlaceHolderContrainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightTextColor,
    zIndex: 2,
  },
  placeholderText: {
    marginLeft: 10,
    color: COLORS.black,
    fontSize: 16,
    width: '100%',
  },
  searchIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },
  searchResultsContainer: {
    position: 'absolute',
    top: 52, // Height of the search input
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  searchResultsList: {
    maxHeight: 200, // Limit the height of results
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightTextColor,
  },
  searchResultText: {
    marginLeft: 10,
    color: COLORS.black,
    fontSize: 16,
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
  selectedCountriesContainer: {
    // flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  selectedCountryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 2,
  },
  selectedCountryText: {
    marginRight: 5,
    color: COLORS.w,
  },
  removeCountryButton: {
    marginLeft: 5,
  },
  removeCountryText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedCountriesScrollView: {
    // flexGrow: 1,
    maxHeight: 50, // Adjust as needed
    alignItems: 'center',
  },
  searchResultsContainer: {
    maxHeight: 200, // Limit height of results
  },
});

export default SearchContainer;
