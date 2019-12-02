import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Colors from '../../global/colors';
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  optContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  mainView: {
    flex: 1,
  },
  registerTextContainer: {
    flex: 1,
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
    borderRadius: 5,
    // marginHorizontal: 10,
    marginTop: 30
  },
  submitButtomIconContainer: {
    marginRight: 20,
    justifyContent: 'flex-end',
  },
  submitText: {
    // flex: 4,
    // textAlign: 'center',
    // marginLeft: 10,
    // fontSize: 18,
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
    marginTop: 20
    // marginLeft:10
  },










  smsIcon: {
    width: 160,
    height: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 90
  },
  smsText: {
    color: Colors.appTheme,
    fontSize: 20,
    textAlign: 'center',
    height: 28,
  },
  smsDescription: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 23,
    color: "#9e9e9e",
    paddingVertical: 10,
    marginBottom: 50,
  },
  mobileNumberTitle: {
    color: '#000000',
    fontSize: 16,
    paddingBottom: 8,
  },
  mobileNumberTextInputContainer: {
    borderColor: 'lightgray',
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 3,
  },
  mobileNumberTextInput: {
    fontSize: 15,
    paddingLeft: 15
  },
  submitText: {
    color: 'white',
    fontSize: 20,
    padding: 110
  },
  resendSmsText: {
    color: Colors.appTheme,
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  submitContainer: {
    flex: 1,
    height: 70,
    marginBottom: 16,
    marginTop: 30,
    borderRadius: 2,
    backgroundColor: Colors.appTheme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },






  borderStyleHighLighted: {
    borderColor: Colors.appTheme,
  },

  underlineStyleBase: {
    width: 50,
    height: 65,
    borderWidth: 3,
    borderColor: 'gray',
  },

  underlineStyleHighLighted: {
    borderColor: Colors.appTheme
  },
});
