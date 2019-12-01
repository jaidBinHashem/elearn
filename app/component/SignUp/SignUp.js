import React, { Component } from 'react'
import { View, StatusBar, Text, Dimensions, Keyboard, Alert, Picker, TouchableOpacity } from 'react-native'
import { Input, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";
import { signUp, submitStudyDetails, submitCourses, registerUser, resetErrors, resetAuthReducer } from '../../redux/actions/AuthActions';
import RNAccountKit from 'react-native-facebook-account-kit'
import AutoComplete from 'react-native-autocomplete-input';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import Toast from 'react-native-simple-toast';

import BusyIndicator from 'react-native-busy-indicator';

import { getService } from '../../network'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import globalStyles from '../../global/styles';

import styles from './styles';

const CopilotView = walkthroughable(View);

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
            courses: [],
            buttonData: [],
            selectedValues: [],
            referralCode: null,
            index: 0,

            studyLevels: [],
            institutions: [],
            selectedStudyLevel: null,
            selectedInstitution: null,
            query: '',
            hideList: true
        }
    }







    componentDidMount() {
        this.getStudyLevel();
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










    getStudyLevel = async () => {
        const request = { endPoint: 'study-levels' }
        let studyLevels = await getService(request);
        studyLevels.success && this.setState({ studyLevels: studyLevels.data.data });
        this.selectStudyLevel(studyLevels[0], 0);
    }

    selectStudyLevel = async (selectedStudyLevelId, selectedStudyIndex) => {
        loaderHandler.showLoader("Loading");
        this.setState({ query: '', selectedInstitution: null })
        let selectedStudyLevel = [...this.state.studyLevels];
        selectedStudyLevel = selectedStudyLevel[selectedStudyIndex];
        this.setState({ selectedStudyLevel });
        this.getInstitutions('A', this.state.studyLevels[selectedStudyIndex].slug);
        loaderHandler.hideLoader();
    }

    getInstitutions = async (query, slug = null) => {
        let studySlug = slug === null ? this.state.selectedStudyLevel.slug : slug;
        const request = {
            endPoint: 'study-levels/' + studySlug + '/institutions?q=' + query
        }
        let institutions = await getService(request);
        this.setState({ institutions: institutions.data.data });
    }

    selectInstitution = async (selectedInstitutionId, selectedInstitutionIndex) => {
        let selectedInstitution = [...this.state.institutions];
        selectedInstitution = selectedInstitution[selectedInstitutionIndex]
        this.setState({ selectedInstitution });
    }









    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,.1)" />
                <View style={{ flex: .8 }}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='never'>
                        <View style={[globalStyles.flexOne]}>
                            <View style={[styles.registerTextContainer]}>
                                <Text style={[styles.registerText]}>Register</Text>
                            </View>
                            <View style={{ height: deviceHeight - 130 }}>
                                <CopilotStep text="এখানে আপনার পূর্ণ নাম লিখুন।" order={1} name="name">
                                    <CopilotView style={{ marginBottom: 20 }}>
                                        <Input
                                            label="FULL NAME"
                                            labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
                                            inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                                            placeholder='Your Full Name'
                                            errorStyle={{ color: 'red' }}
                                            errorMessage={this.props.nameError}
                                            onChangeText={(name) => this.setState({ name })}
                                            value={this.state.name}
                                            leftIcon={
                                                <Icon
                                                    name='user'
                                                    size={24}
                                                    type='font-awesome'
                                                    name='user'
                                                    color='lightgray'
                                                    containerStyle={styles.inputIconContainer}
                                                />
                                            }
                                        />
                                    </CopilotView>
                                </CopilotStep>


                                <CopilotStep text="এখানে আপনি যে কোর্সের জন্য  পড়াশোনা করতে চান সেই অনুযায়ী  Study level  সিলেক্ট করুন।" order={1} name="studyLevel">
                                    <CopilotView style={{ marginHorizontal: 10 }}>
                                        <Text style={styles.formTitle}>STUDY LEVEL</Text>
                                        <View style={{ marginBottom: 20, borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                                            {this.state.selectedStudyLevel && (<Picker
                                                selectedValue={this.state.selectedStudyLevel.id}
                                                style={{ height: 50 }}
                                                onValueChange={(studyLevel, selectedStudyIndex) => this.selectStudyLevel(studyLevel, selectedStudyIndex)}>
                                                {
                                                    this.state.selectedStudyLevel && this.state.studyLevels.map((studyLevel) => {
                                                        return (
                                                            <Picker.Item key={studyLevel.id} label={studyLevel.name} value={studyLevel.id} />
                                                        )
                                                    })
                                                }
                                            </Picker>)}
                                            {
                                                this.state.studyLevels.length === 0 && (
                                                    <Picker
                                                        selectedValue={0}
                                                        style={{ height: 50 }}
                                                    >
                                                        <Picker.Item label="---" value={0} />
                                                    </Picker>
                                                )
                                            }
                                        </View>
                                    </CopilotView>
                                </CopilotStep>

                                <CopilotStep text={`১। আপনার বর্তমান অথবা  সর্বশেষ শিক্ষা প্রতিষ্ঠানের নাম লিখে সার্চ দিন। তাহলে একটি লিস্ট পাবেন।
২। সেই লিস্ট থেকে আপনার শিক্ষা প্রতিষ্ঠানের নাম সিলেক্ট করুন।
৩। আপনার শিক্ষা প্রতিষ্ঠানের নাম খুজে না পেলে 'Not Found' সার্চ দিয়ে সিলেক্ট করুন।`} order={2} name="institute">
                                    <CopilotView style={{
                                        position: 'absolute',
                                        top: 215,
                                        zIndex: 1,
                                        marginLeft: 10
                                    }}>
                                        <Text style={styles.formTitle}>School / College / University</Text>
                                        <AutoComplete
                                            data={this.state.institutions}
                                            defaultValue={this.state.query}
                                            placeholder="সার্চ দিয়ে সিলেক্ট করুন"
                                            keyExtractor={(item, index) => 'key' + index}
                                            onChangeText={query => {
                                                query.length > 2 && this.getInstitutions(query);
                                                this.setState({
                                                    query,
                                                    hideList: query.length > 2 ? false : true
                                                })
                                            }
                                            }
                                            hideResults={this.state.hideList}
                                            inputContainerStyle={{ width: deviceWidth - 40, height: 50, borderRadius: 5 }}
                                            listStyle={{ marginTop: 2, maxHeight: 200, width: deviceWidth - 40, right: 10 }}
                                            renderItem={({ item, i }) => (
                                                <TouchableOpacity style={{ height: 45, padding: 10 }}
                                                    onPress={() => this.setState({ query: item.name, selectedInstitution: item, hideList: true })}>
                                                    <Text>{item.name}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </CopilotView>
                                </CopilotStep>

                                {this.state.buttonData.length > 0 && (<View>
                                    <Text style={styles.formTitle}>COURSE SELECTION</Text>
                                </View>)}
                                {this.state.buttonData.length > 0 && (
                                    <CopilotStep text="আপনার প্রয়োজনীয় কোর্সটিতে ক্লিক করে সিলেক্ট করুন।" order={1} name="course">
                                        <CopilotView>
                                            <SelectMultipleGroupButton
                                                containerViewStyle={{
                                                    justifyContent: 'center',
                                                    marginTop: 20
                                                }}
                                                buttonViewStyle={{ height: 50 }}
                                                highLightStyle={{
                                                    height: 50,
                                                    borderColor: colors.appTheme,
                                                    backgroundColor: "transparent",
                                                    textColor: colors.appTheme,
                                                    borderTintColor: colors.appTheme,
                                                    backgroundTintColor: colors.appTheme,
                                                    textTintColor: '#fff'
                                                }}
                                                multiple={false}
                                                onSelectedValuesChange={selectedValues => this._groupButtonOnSelectedValuesChange(selectedValues)}
                                                group={this.state.buttonData}
                                            />
                                        </CopilotView>
                                    </CopilotStep>
                                )}
                                <CopilotStep text="খালি রাখুন।" order={2} name="referralCode">
                                    <CopilotView style={{ top: 110 }}>
                                        <Input
                                            label="Referral Code (Optional)"
                                            labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
                                            inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                                            placeholder='না থাকলে ঘরটি খালি রাখুন'
                                            errorStyle={{ color: 'red' }}
                                            errorMessage={this.props.emailError}
                                            onChangeText={(referralCode) => this.setState({ referralCode })}
                                            value={this.state.referralCode}
                                        />
                                    </CopilotView>
                                </CopilotStep>
                                {/* </Swiper> */}
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={{ flex: .2, paddingHorizontal: 20 }}>
                    <TouchableOpacity style={styles.submitButtom} onPress={() => this.sendCourse()}>
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

export default copilot()(connect(
    mapStateToProps,
    { signUp, submitStudyDetails, submitCourses, registerUser, resetErrors, resetAuthReducer }
)(SignUp));