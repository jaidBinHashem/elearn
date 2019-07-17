import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Input, Icon } from 'react-native-elements';
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import { getService } from '../../network'

import CounterView from './CounterView';

import colors from '../../global/colors';
import styles from './styles';



const deviceWidth = Dimensions.get("window").width;
const ios_blue = "#007AFF";


class CourseDetails extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            buttonData: [],
            selectedValues: [],
            referralCode: null
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.studyLevel && this.getCourse(nextProps.studyLevel);
    }

    getCourse = async (studyLevel) => {
        const request = {
            endPoint: 'study-levels/' + studyLevel.slug + '/categories',
            showLoader: true
        }
        let courses = await getService(request);
        let buttonData = courses.data.data.map((course) => {
            return ({
                value: course.id,
                displayValue: course.name
            })
        })
        this.setState({ courses: courses.data.data, buttonData });
    }


    _groupButtonOnSelectedValuesChange = (selectedValues) => {
        this.setState({ selectedValues })
    }

    sendCourse = () => {
        this.state.courses.length > 0
            ? this.state.selectedValues.length > 0
                ? this.props.registerUser(this.state.selectedValues, this.state.referralCode)
                : Toast.show('Please select a course')
            : this.props.registerUser([], this.state.referralCode)
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: .2, marginBottom: 30 }}>
                    <CounterView pageNumber={2} />
                </View>
                <ScrollView style={[styles.formContainer, { width: deviceWidth, bottom: 0 }]}>
                    {this.state.buttonData.length > 0 && (<View>
                        <Text style={styles.formTitle}>COURSE SELECTION</Text>
                    </View>)}
                    <View>
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
                    </View>
                    <View >
                        <Input
                            label="REFERRAL CODE (OPTIONAL)"
                            labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10, marginTop:30 }}
                            inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                            placeholder='Enter If You Have Any'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.props.emailError}
                            onChangeText={(referralCode) => this.setState({ referralCode })}
                            value={this.state.referralCode}
                        />
                    </View>
                </ScrollView>
                <View style={{ flex: .2, paddingHorizontal: 30 }}>
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
            </View>
        )
    }
}

export default CourseDetails;
