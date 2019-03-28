import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  horizontal: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  quesationNumberAndTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  quationNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  qustionNumber: {
    fontWeight: '500',
  },
  numberIconContainer: {
    marginHorizontal: 15
  },
  time: {
    fontWeight: '500',
    marginRight: 15
  },
  instructionContainer: {
    marginVertical: 20,
    marginHorizontal: 15
  },
  instructionTitle: {
    fontWeight: '500',
    fontSize: 20
  },
  instruction: {
    marginVertical: 5
  },
  submitButtom: {
    flexDirection: 'row',
    backgroundColor: Colors.appTheme,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 10,
    marginTop: 10
  },
  submitText: {
    flex: 4,
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 18,
    color: 'black'
  },
  submitButtomIconContainer: {
    marginRight: 20,
    justifyContent: 'flex-end',
  },
  submitExam: {
    fontWeight: '500',
    marginRight: 15,
    color: Colors.appTheme
  },
  questionContainer: {
    marginVertical: 25,
    flex: 1
  },
  questionCounter: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    borderWidth: 2,
    borderColor: Colors.appTheme
  },
  question: {
    marginTop: 20,
    marginHorizontal: 20
  },
  questionTitle: {
    color: 'black',
    fontSize: 20
  },
  optionsContainer: {
    marginVertical: 20
  },
  option: {
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    elevation: 5,
    marginVertical: 10
    // borderColor: Colors.appTheme,
    // borderWidth:2
  },
  optionText: {
    color: 'black'
  },
  questionNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  nextText: {
    color: Colors.appTheme,
    marginHorizontal: 10,
    fontSize: 18
  },
  nextIconContainer: {
    // backgroundColor: 'black',
    justifyContent: 'center'
  },
  swiper : {
    flex: 1
  }
});
