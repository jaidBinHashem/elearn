import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    paddingRight: 0
  },
  name: {
    color: Colors.appTheme,
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 10
  },
  grettings: {
    color: 'black',
    fontSize: 12,
    marginHorizontal: 10
  },
  swiperContainer: {
    flex: 1,
    marginTop: 20
  },
  subject: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 8,
    borderRadius: 5,
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
    fontWeight: '500',
    marginHorizontal: 10
  },
  cards: {
    // flex: 1,
    backgroundColor: '#fff',
    height: 120,
    width: 160,
    elevation: 10,
    marginVertical: 20,
    borderRadius: 5,
    marginHorizontal: 10
  },
  subjectTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    marginHorizontal: 10
  }
});
