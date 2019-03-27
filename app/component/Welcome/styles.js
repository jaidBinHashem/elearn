import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    loginContainer: {
        height: 55,
        backgroundColor: colors.appTheme,
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 20
    },
    signUpContainer: {
        height: 55,
        borderColor: colors.appTheme,
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 50
    },
    logIn: {
        textAlign: 'center',
        color: '#fff'
    },
    signUp: {
        textAlign: 'center',
        color: colors.appTheme
    },

});
