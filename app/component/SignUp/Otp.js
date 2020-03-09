import React, { Fragment, Component } from 'react'
import { View, StatusBar, ScrollView, KeyboardAvoidingView, Image, Text, TouchableOpacity, Linking } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import BusyIndicator from 'react-native-busy-indicator'
import Toast from 'react-native-simple-toast';

import { makeLoginRequest } from '../../redux/actions/AuthActions';
import styles from './styles';
import { postService } from '../../network';

import { encode as btoa } from 'base-64';
import md5 from 'js-md5';

class Otp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            resendOTP: false
        }

    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({
                resendOTP: true
            });
        }, 300000);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : this.props.navigation.navigate('Loader');
    }

    resendOtp = async () => {
        let { phone } = this.props.navigation.state.params;
        let otpRequest = {
            endPoint: 'get-otp',
            showLoader: true,
            params: {
                phone: phone[0] == 0 ? phone.substring(1) : phone,
                token: md5(btoa(phone[0] == 0 ? phone.substring(1) : phone))
            }
        }
        let otpResponse = await postService(otpRequest);
        otpResponse.success && (Toast.show("OTP Sent"), this.setState({ resendOTP: false }));
    }

    submitOtp = async () => {
        // api/validate-otp
        let { phone, user } = this.props.navigation.state.params;
        let request = {
            endPoint: 'validate-otp',
            showLoader: true,
            params: {
                phone: phone[0] == 0 ? phone.substring(1) : phone,
                otp: this.state.code,
                token: md5(btoa(phone[0] == 0 ? phone.substring(1) : phone))
            }
        }
        let response = await postService(request);
        if (response.success) {
            if (user) {
                this.props.makeLoginRequest(response.data.data.code, phone[0] == 0 ? phone.substring(1) : phone)
            } else {
                this.props.navigation.replace('SignUp', { phone: phone[0] == 0 ? phone.substring(1) : phone, code: response.data.data.code })
            }
        } else {
            Toast.show("Invalid OTP, Please try again !")
        }
    }

    render() {
        return (
            <Fragment>
                <StatusBar backgroundColor="#BC9CFF" barStyle="light-content" translucent={false} />
                {/* <View style={[styles.container, styles.optContainer]}> */}
                <KeyboardAvoidingView keyboardVerticalOffset={20} behavior='height' style={[styles.container, styles.optContainer]} >
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Image style={styles.smsIcon} source={require('./sms.png')} />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'space-around' }}>
                        <Text style={styles.smsText}>Check your inbox </Text>
                        <Text style={styles.smsDescription}>We've sent a 4 digit OTP code. Please input it below. This code is valid for 5 minutes.</Text>
                        <Text style={[styles.mobileNumberTitle, { marginLeft: 5 }]}>Enter Your OTP</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <OTPInputView
                            style={{ width: '80%', }}
                            pinCount={4}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            onCodeChanged={code => this.setState({ code })}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            this.state.resendOTP && <Text onPress={() => this.resendOtp()} style={styles.resendSmsText}>Didn't receive the OTP, please send again.</Text>
                        }
                    </View>
                    <View style={{ flex: .5 }}>
                        <Text style={[{ flex: 1, textAlign: 'center', fontSize: 15, lineHeight: 23, color: "#9e9e9e", }]}>Didn't Get OTP? <Text onPress={() => Linking.openURL("http://m.me/eshosikhi.bd")} style={{ fontWeight: '500', color: '#BC9CFF' }}>Contact Us</Text></Text>
                    </View>
                    <TouchableOpacity style={styles.submitContainer}
                        onPress={() => this.submitOtp()}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                {/* </View> */}
                <BusyIndicator />
            </Fragment>
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
    { checkAuth, makeLoginRequest }
)(Otp);