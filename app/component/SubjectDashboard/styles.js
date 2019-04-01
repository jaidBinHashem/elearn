import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  horizontal: {
    padding: 10,
    paddingHorizontal: 20
  },
  chapterContainer: {
    marginTop: 30
  },
  topicContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topic: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    height: 80,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 3,
    marginVertical: 20
  },
  topicText: {
    top: 5
  }
});