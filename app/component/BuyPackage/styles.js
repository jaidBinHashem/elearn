import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 20
  },
  pkgContainer: {
    height: 120,
    borderTopWidth: 2,
    borderTopColor: Colors.appTheme,
    paddingLeft: 5,
    backgroundColor: '#fff',
    marginVertical: 15,
    elevation: 5,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },

});
