import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Colors from '../../global/colors';
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  registerTextContainer: {
    flex:1,
    marginTop: 30,
    marginBottom: 20
  },
  registerText: {
    color: Colors.appTheme,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 30,
  },
  counterContainer: {
    flex: 1,
    width: deviceWidth,
    marginBottom: 30,
    // backgroundColor:'black',
  },
  inputIconContainer: {
    marginRight: 10
  },
  submitButtom: {
    flexDirection: 'row',
    backgroundColor: Colors.appTheme,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 10,
    marginTop: 10
  },
  submitButtomIconContainer: {
    marginRight: 20,
    justifyContent: 'flex-end',
  },
  submitText: {
    flex: 4,
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 18,
    color: 'black'
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30
  },
  formTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: '500',
    marginBottom: 10,
    // marginLeft:10
  }
});
