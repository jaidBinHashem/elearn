import React, { Fragment, Component } from 'react'
import { View, StatusBar, ScrollView, KeyboardAvoidingView, Image, Text, TouchableOpacity } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import BusyIndicator from 'react-native-busy-indicator'

import { makeLoginRequest } from '../../redux/actions/AuthActions';
import colors from '../../global/../global/colors';
import styles from './styles';
import { postService, getService } from '../../network';

import { encode as btoa } from 'base-64';
import md5 from 'js-md5';

class Otp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
        }

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : this.switchToApp();
    }

    submitOtp = async () => {
        // api/validate-otp
        console.log(this.props.navigation)
        let { phone } = this.props.navigation.state.params;
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
        console.log(response, "here is response");
        response.success && this.props.makeLoginRequest(response.data.code, phone[0] == 0 ? phone.substring(1) : phone)
    }

    render() {
        return (
            <Fragment>
                <StatusBar backgroundColor="#BC9CFF" barStyle="light-content" translucent={false} />
                <View style={{ flex: 1, backgroundColor: '#f6f3fc' }}>
                    <ScrollView>
                        <KeyboardAvoidingView enabled style={styles.container} >
                            <Image style={styles.smsIcon} source={require('./sms.png')} />
                            <Text style={styles.smsText}>আপনার মোবাইল এ এসএমএস দেখুন</Text>
                            <Text style={styles.smsDescription}>আপনার মোবাইলে চার সংখ্যার একটি পাসওয়ার্ড পাঠানো  হয়েছে। পাসওয়ার্ডটি নিচের ফাঁকা ঘরে লিখুন।</Text>
                            <Text style={[styles.mobileNumberTitle, { marginLeft: 5 }]}>ওয়ান টাইম পাসওয়ার্ড (ও.টি.পি.) দিন</Text>
                            <OTPInputView
                                style={{ width: '80%', height: 150 }}
                                pinCount={4}
                                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                onCodeChanged={code => this.setState({ code })}
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            />
                            <Text style={styles.resendSmsText}>এসএমএস পাইনি, আবার পাঠান।</Text>
                            <TouchableOpacity style={styles.submitContainer}
                                onPress={() => this.submitOtp()}>
                                <Text style={styles.submitText}>সাবমিট করুন</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
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