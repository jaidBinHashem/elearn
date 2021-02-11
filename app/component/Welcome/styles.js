import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    mainView: {
        flex: 1,
        justifyContent: 'space-between'
    },
    welcomeTextContainer: {
        marginTop: 30
    },
    welcomeText: {
        color: colors.appTheme,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 30,
    },
    signUpContainer: {
        height: 55,
        backgroundColor: colors.appTheme,
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 20,
    },
    // signUpContainer: {
    //     width: 250,
    //     height: 55,
    //     borderColor: colors.appTheme,
    //     borderWidth: 2,
    //     justifyContent: 'center',
    //     borderRadius: 50
    // },
    signUp: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20
    },
    // signUp: {
    //     textAlign: 'center',
    //     color: colors.appTheme
    // },

    smsIcon: {
        width: 160,
        height: 90,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 90
    },
    smsText: {
        color: colors.appTheme,
        fontSize: 20,
        textAlign: 'center',
        height: 28,
    },
    smsDescription: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 23,
        color: "#9e9e9e",
        paddingVertical: 10,
        marginBottom: 50,
    },
    mobileNumberTitle: {
        color: '#000000',
        fontSize: 16,
        paddingBottom: 8,
    },
    mobileNumberTextInputContainer: {
        borderColor: 'lightgray',
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 3,
    },
    mobileNumberTextInput: {
        fontSize: 15,
        paddingLeft: 15
    },
    submitText: {
        color: 'white',
        fontSize: 20,
        padding:110
    },
    resendSmsText: {
        color: colors.appTheme,
        fontSize: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 30
    },
    submitContainer: {
        flex:1,
        height: 70,
        marginBottom: 16,
        marginTop: 30,
        borderRadius: 2,
        backgroundColor: colors.appTheme,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 5
    },




    
      borderStyleHighLighted: {
        borderColor: colors.appTheme,
      },
    
      underlineStyleBase: {
        width: 50,
        height: 65,
        borderWidth: 3,
        borderColor : 'gray',
      },
    
      underlineStyleHighLighted: {
        borderColor: colors.appTheme
      },

});
