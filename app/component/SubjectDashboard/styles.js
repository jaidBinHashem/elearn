import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  horizontal: {
    margin: 10,
    marginRight: 0
    // paddingHorizontal: 20
  },
  chapterContainer: {
    marginTop: 30
  },
  topicContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  topic: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 108,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 3,
    marginVertical: 20,
    marginRight: 15,
    marginLeft: 3
  },
  topicText: {
    top: 5,
    marginHorizontal: 8,
  },
  chaptersCount: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  chapterTitle: {
    color:'black',
    marginHorizontal:5,
    fontWeight: 'bold'
  }
});