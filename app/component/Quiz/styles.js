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
});
