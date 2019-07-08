import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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

  pkgCard: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: Colors.appTheme,
    padding: 20,
    backgroundColor: '#fff',
    height: 80,
    elevation: 5,
    borderRadius: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },

  couponCard: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: Colors.appTheme,
    backgroundColor:'#f1ebff',
    padding: 10,
    height: 85,
    elevation: 5,
    borderRadius: 3,
    justifyContent: 'space-between',
    marginRight: 20,
    width: 250
  }

});
