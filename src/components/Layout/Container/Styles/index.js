import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';
// import { Colors } from '../../../../theme';

const styles = EStyleSheet.create({
  safeViewContainer: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'white',
    '@media android': {
      marginTop: StatusBar.currentHeight
    },
    width:'100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  statusBarMarginTop: {
    marginTop: StatusBar.currentHeight
  }
});

export default styles;
