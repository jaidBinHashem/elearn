import { StyleSheet } from 'react-native';
import Colors from '../../global/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },  
  horizontal: {
    justifyContent: 'space-around',
    padding: 10,
    paddingHorizontal: 20
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
    // marginVertical: 25,
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
    marginVertical: 20,
  },
  option: {
    backgroundColor: '#fff',
    minHeight: 50,
    paddingHorizontal: 10,
    elevation: 5,
    marginVertical: 10,
  },
  explanation: {
    borderColor: Colors.appTheme,
    borderWidth: 2
  },
  optionText: {
    color: 'black',
    marginVertical: 10
  },
  explanationText: {
    marginVertical: 15,
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
  swiper: {
    flex: 1
  },
  score: {
    fontWeight: '500',
    fontSize: 20,
    marginVertical: 30
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  scoreRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  scoreIconContainer: {
    marginRight: 20
  },
  scoreCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 40,
    borderColor: Colors.appTheme,
    borderWidth: 2,
    height: 67,
    width: 67,
    borderRadius: 67 / 2
  },
  scoreCircleText: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.appTheme,
    width: 37,
    textAlign: 'center'
  },
  attempsHeader: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    marginTop:10
  },
  attempsHeaderText: {
    color: 'black',
    fontWeight: '600'
  },
  katex: {
    height:90
    // flex: 1,
  }
});
