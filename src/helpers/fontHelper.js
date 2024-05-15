/**
 * Helper class for font
 */
import _ from 'lodash';

// use post script names for font families
const Montserrat = {
  200: {fontFamily: 'Montserrat-Thin'},
  '200italic': {fontFamily: 'Montserrat-ThinItalic'},
  300: {fontFamily: 'Montserrat-Light'},
  '300italic': {fontFamily: 'Montserrat-LightItalic'},
  400: {fontFamily: 'Montserrat-Regular'},
  500: {fontFamily: 'Montserrat-Medium'},
  '500italic': {fontFamily: 'Montserrat-MediumItalic'},
  600: {fontFamily: 'Montserrat-SemiBold'},
  650: {fontFamily: 'Montserrat-SemiBold'},
  '600italic': {fontFamily: 'Montserrat-SemiBoldItalic'},
  700: {fontFamily: 'Montserrat-Black'},
  750: {fontFamily: 'Montserrat-Black'},
  '700italic': {fontFamily: 'Montserrat-BlackItalic'},
  800: {fontFamily: 'Montserrat-Bold'},
  850: {fontFamily: 'Montserrat-Bold'},
  '800italic': {fontFamily: 'Montserrat-BoldItalic'},
  900: {fontFamily: 'Montserrat-ExtraBold'},
  '900italic': {fontFamily: 'Montserrat-ExtraBoldItalic'},
  1000: {fontFamily: 'Montserrat-ExtraBold'},
};

const FONTS = {
  Montserrat,
};

/**
 * Helper class for cross-platform font styles
 */
class FontHelper {
  static font(fontParams) {
    const fontFamily = fontParams.fontFamily || 'Montserrat';
    const fontWeight = fontParams.fontWeight || '400';
    const fontStyle = fontParams.fontStyle || '';

    return {
      ..._.omit(fontParams, [fontFamily, fontFamily, fontStyle]),
      ...FONTS[fontFamily][fontWeight + fontStyle],
    };
  }
}
export default FontHelper;
