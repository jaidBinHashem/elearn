import React, { Component } from 'react'
import { View, StatusBar, Text, Dimensions, Keyboard, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";
import { signUp, submitStudyDetails, submitCourses, registerUser, resetErrors, resetAuthReducer } from '../../redux/actions/AuthActions';
import RNAccountKit from 'react-native-facebook-account-kit'
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';

import BusyIndicator from 'react-native-busy-indicator';

import PersonalDetails from './PersonalDetails';
import StudyDetails from './StudyDetails';
import CourseDetails from './CourseDetails';
import Success from './Success';

import globalStyles from '../../global/styles';

import styles from './styles';


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NUMBER = /^(01)[3456789][0-9]{8}$/;

class SignUp extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            nameError: "",
            emailError: "",
            numberError: "",
            studyLevels: [],
            institutions: [],
            selectedStudyLevel: null,
            regSuccess: false,
            index: 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        nextProps.auth.error && (
            Alert.alert(
                '',
                nextProps.auth.errorMessage,
                [
                    {},
                    {
                        text: 'Okay',
                        // onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {},
                ],
                { cancelable: false },
            )
        );
        nextProps.auth.registrationFailed && nextProps.auth.registrationFailedMessage && (
            // Toast.show(nextProps.auth.errorMessage)
            Alert.alert(
                '',
                nextProps.auth.registrationFailedMessage,
                [
                    {},
                    {
                        text: 'Okay',
                        // onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {},
                ],
                { cancelable: false },
            )
        );
        this.state.index === 0 && this.props.auth.numberVerified != nextProps.auth.numberVerified && nextProps.auth.numberVerified && this.scrollToNext(1);
        this.state.index === 1 && nextProps.auth.studyLevel && nextProps.auth.institution && (this.scrollToNext(2));
        nextProps.auth.studyLevel === null || nextProps.auth.institution === null && Toast.show("Please select your study details");
        this.state.index === 2 && nextProps.auth.registrationSuccess && nextProps.auth.registrationSuccessMessage && (this.scrollToNext(3), Toast.show(nextProps.auth.registrationSuccessMessage), this.setState({ regSuccess: true }));
    }

    componentWillUnmount() {
        !this.state.regSuccess && this.props.resetAuthReducer();
    }


    submitAccount = (name, email, number) => {
        Keyboard.dismiss();
        let nameError = "", emailError = "", numberError = "", err = false;
        (name.length < 1 || name.length > 191) && (nameError = "Please insert name", err = true);
        !EMAIL.test(String(email).toLowerCase()) && (emailError = "Please insert a valid Email", err = true);
        !NUMBER.test(String(number)) && (numberError = "Please intert a valid phone number", err = true);

        err && this.setState({
            nameError,
            emailError,
            numberError
        });
        !err && (this.createSignUpRequest(name, email, number), this.setState({ nameError, emailError, numberError }));
    }

    createSignUpRequest = (name, email, number) => {
        RNAccountKit.configure({
            responseType: 'code', // 'token' by default,
            titleType: 'login',
            initialPhoneCountryPrefix: '+880', // autodetected if none is provided
            initialPhoneNumber: number[0] == 0 ? number.substring(1) : number,
            // initialPhoneNumber: '1316100093',
            readPhoneStateEnabled: true, // true by default,
            receiveSMS: true, // true by default,
            defaultCountry: 'BD',
            getACallEnabled: true
        })
        RNAccountKit.loginWithPhone()
            .then((response) => {
                response.code && this.props.signUp(response.code, email, name)
            })
            .catch(err => console.log(err));
    }

    submitStudyDetails = (studyLevel, institution) => {
        Keyboard.dismiss();
        this.props.submitStudyDetails(studyLevel, institution);
    }

    scrollToNext = i => {
        this.scroll.scrollBy(1);
    };

    registerUser = (courses, referralCode) => {
        Keyboard.dismiss();
        this.props.registerUser(this.props.auth, courses, referralCode);
        this.props.submitCourses(courses);
    }


    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,.1)" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                    <View style={[globalStyles.flexOne]}>
                        <View style={[styles.registerTextContainer]}>
                            <Text style={[styles.registerText]}>Register</Text>
                        </View>
                        <View style={{ height: deviceHeight - 130 }}>
                            <Swiper style={styles.wrapper}
                                ref={node => (this.scroll = node)}
                                showsButtons={false}
                                showsPagination={false}
                                loop={false}
                                scrollEnabled={false}
                                loadMinimal={true}
                                loadMinimalSize={0}
                                onIndexChanged={(index) => this.setState({ index })}
                            >
                                <PersonalDetails
                                    nameError={this.state.nameError}
                                    emailError={this.state.emailError}
                                    numberError={this.state.numberError}
                                    submitAccount={this.submitAccount.bind(this)}
                                    phone={this.props.navigation.state.params && this.props.navigation.state.params.phone ? this.props.navigation.state.params.phone : null}
                                />
                                <StudyDetails
                                    submitStudyDetails={this.submitStudyDetails.bind(this)} />
                                <CourseDetails
                                    registerUser={this.registerUser.bind(this)}
                                    studyLevel={this.props.auth.studyLevel} />
                                <Success
                                    navigation={this.props.navigation}
                                />
                            </Swiper>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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
    { signUp, submitStudyDetails, submitCourses, registerUser, resetErrors, resetAuthReducer }
)(SignUp);