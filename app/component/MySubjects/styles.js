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
    borderTopWidth: 2, 
    borderTopColor: Colors.appTheme, 
    padding: 20, 
    backgroundColor: '#fff', 
    height: 120, 
    marginVertical: 15, 
    elevation: 5, 
    borderRadius: 3, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  subjectMarginRight: {
    marginRight: 10
  },
  subjectMarginLeft: {
    marginLeft: 10
  },
  newsAndUpdatesTitle: {
    fontSize: 16,
    marginTop: 20,
    color: 'black',
    fontWeight: '500'
  },
  cards: {
    // flex: 1,
    backgroundColor: '#fff',
    height: 160,
    width: 160,
    elevation: 10,
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 5
  }
});
