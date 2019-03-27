import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal :20
  },
});
