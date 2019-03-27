import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent:'center',
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
  registerTextContainer: {
    flex:.2,
    marginTop: 30,
    marginBottom: 20
  },
  registerText: {
    color: Colors.appTheme,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 30,
  },
});
