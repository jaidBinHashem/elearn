import React, { Component } from 'react';
import { View, StatusBar, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import { encode as btoa } from 'base-64';
import md5 from 'js-md5';

import { connect } from "react-redux";
import { makeLoginRequest } from '../../redux/actions/AuthActions';

import { postService, getService } from '../../network';

import globalStyles from '../../global/styles';
import styles from './styles';

const NUMBER = /^(01)[3456789][0-9]{8}/;

class Login extends Component {

    static navigationOptions = {
        header: null,
        drawerLockMode: 'locked-closed'
    }

    constructor(props) {
        super(props);
        this.state = {
            number: "",
            numberError: "",
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // nextProps.auth.loginFailed && (loaderHandler.hideLoader(), Toast.show(nextProps.auth.loginFailedMessage));
        // !nextProps.auth.loginFailed && (loaderHandler.hideLoader(), this.props.navigation.navigate('Loader', { 'SuccessLogin': true }))
    }

    logIn = (number) => {
        Keyboard.dismiss();
        loaderHandler.showLoader("Loading");
        let numberError = "", err = false;
        !NUMBER.test(String(number)) && (numberError = "Please intert a valid mobile number", err = true);
        err && (loaderHandler.hideLoader(), this.setState({
            numberError
        }));
        !err && (this.createSignIn(number), this.setState({ numberError }));
    }

    createSignIn = async (number) => {
        let request = {
            endPoint: 'login/validate',
            showLoader: true,
            params: {
                phone: number[0] == 0 ? number.substring(1) : number,
                token: md5(btoa(number[0] == 0 ? number.substring(1) : number))
            }
        }
        let response = await postService(request);
        let otpRequest = {
            endPoint: 'get-otp',
            showLoader: true,
            params: {
                phone: number[0] == 0 ? number.substring(1) : number,
                token: md5(btoa(number[0] == 0 ? number.substring(1) : number))
            }
        }
        let otpResponse = await postService(otpRequest);
        console.log(response, otpResponse);
        if (response.success) {
            if (otpResponse.success) {
                this.props.navigation.navigate('OTP', { 'user': true, 'phone': this.state.number });
            } else {
                Toast.show('OTP sent error, please try again later !');
            }
        } else {
            this.props.navigation.navigate('OTP', { 'user': false, 'phone': this.state.number });
        }
    }



    render() {
        return (
            <View style={[styles.container, { backgroundColor: '#f6f3fc' }]}>
                <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,.1)" />
                <View style={[styles.registerTextContainer]}>
                    <Text style={[styles.registerText]}>ESHO SHIKHI</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={{ marginBottom: 50 }}>
                        <Input
                            label="PHONE NUMBER"
                            labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
                            inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                            placeholder='Your Mobile Number'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.props.numberError}
                            onChangeText={(number) => this.setState({ number })}
                            onSubmitEditing={Keyboard.dismiss}
                            value={this.state.number}
                            keyboardType={'phone-pad'}
                            leftIcon={
                                <Icon
                                    name='mobile'
                                    size={24}
                                    type='entypo'
                                    color='lightgray'
                                    containerStyle={styles.inputIconContainer}
                                />
                            }
                        />
                    </View>
                </View>
                <View style={{ flex: .2, paddingHorizontal: 30 }}>
                    <TouchableOpacity style={styles.submitButtom} onPress={() => this.logIn(this.state.number)}>
                        {/* <TouchableOpacity style={styles.submitButtom} onPress={() => this.props.navigation.navigate('Loader', { 'SuccessLogin': true })}> */}
                        <Text style={styles.submitText}>Next Step</Text>
                        <Icon
                            name='arrowright'
                            size={22}
                            type='antdesign'
                            color='black'
                            containerStyle={styles.submitButtomIconContainer}
                        />
                    </TouchableOpacity>
                </View>
                <BusyIndicator />
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
    { makeLoginRequest }
)(Login);