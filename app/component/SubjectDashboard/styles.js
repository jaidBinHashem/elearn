import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  horizontal: {
    // margin: 10,
    // marginRight: 0
    // paddingHorizontal: 20
  },
  chapterContainer: {
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10
  },
  topicContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  topic: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 145,
    height: 138,
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
    textAlign: 'center'
  },
  chaptersCount: {
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10
  },
  chapterTitle: {
    color: 'black',
    marginHorizontal: 5,
    fontWeight: 'bold'
  }
});