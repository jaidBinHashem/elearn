import { StyleSheet } from 'react-native';
import colors from '../../global/../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  questionCardContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    elevation: 10,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderTopWidth: 1
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameDateContainer: {
    marginLeft: 10
  },
  userName: {
    fontSize: 18,
    fontWeight: '500'
  },
  question: {
    fontSize: 18,
    marginTop: 10
  },
  imageContainer: {
    alignItems: 'center',
  },
  responseCount: {
    color: colors.appTheme,
    fontWeight: '500',
    marginTop: 30
  }
});
