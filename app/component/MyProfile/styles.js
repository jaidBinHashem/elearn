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
  name: {
    color: Colors.appTheme,
    fontSize: 30,
    fontWeight: '500',
  },
  profileDetailsContainer : {
    flexDirection: 'row', 
    marginVertical: 10,
    padding:1
  },
  profileDetails: {
    fontSize: 18,
    fontWeight: '300',
    marginLeft: 50
  }
});
