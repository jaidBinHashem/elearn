import React, { Component } from 'react'
import { View, StatusBar, Text, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import globalStyles from '../../global/styles';
import styles from './styles';

class Loader extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,.1)" />
                <View style={styles.mainView}>
                    <View style={[globalStyles.flexOne, styles.welcomeTextContainer]}>
                        <Text style={[styles.welcomeText]}>Welcome</Text>
                    </View>
                    <View style={[globalStyles.flexOne]}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Login')}
                            style={styles.loginContainer}
                        >
                            <Text style={styles.logIn}>SIGN IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('SignUp')}
                            style={styles.signUpContainer}>
                            <Text style={styles.signUp}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer
    };
}

export default connect(
    mapStateToProps,
    { checkAuth }
)(Loader);