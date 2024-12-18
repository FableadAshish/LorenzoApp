import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';
import { COLORS } from '../../../../constants';
// import { Colors } from '../../../../theme';

const styles = EStyleSheet.create({
  safeViewContainer: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: COLORS.bgColor,
    '@media android': {
      marginTop: StatusBar.currentHeight
    },
    width:'100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
  },
  statusBarMarginTop: {
    marginTop: StatusBar.currentHeight
  }
});

export default styles;
