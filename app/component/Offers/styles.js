import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  name: {
    color: Colors.appTheme,
    fontSize: 30,
    fontWeight: '500',
  },
  grettings: {
    color: 'black',
    fontSize: 12
  },
  swiperContainer: {
    flex: 1,
    marginTop: 20,
  },
  subject: {
    flex: 1,
    backgroundColor: Colors.appTheme,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    borderRadius: 5,
    marginVertical:20
  },
  subjectMarginRight: {
    marginRight: 10
  },
  subjectMarginLeft: {
    marginLeft: 10
  },
  newsAndUpdatesTitle: {
    fontSize:16,
    marginTop: 20,
    color: 'black',
    fontWeight: '500'
  },
  cards: {
    // flex: 1,
    backgroundColor:'#fff',
    height: 160,
    width: 160,
    elevation: 10,
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 5
  }
});
