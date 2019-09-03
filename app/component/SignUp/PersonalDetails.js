import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

import CounterView from './CounterView';
import styles from './styles';

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);

class PersonalDetails extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameError: "",
            email: "",
            emailError: "",
            number: this.props.phone ? this.props.phone : "",
            numberError: "",
            studyLevels: [],
            institutions: [],
            selectedStudyLevel: null
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: .2, marginBottom: 30 }}>
                    <CounterView pageNumber={0} />
                </View>
                <View style={styles.formContainer}>
                    <CopilotStep text="Hey! This is the first step of the tour!" order={1} name="openApp">
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
                    <View style={{ marginBottom: 20 }}>
                        <Input
                            label="EMAIL"
                            labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
                            inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                            placeholder='Your Email'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.props.emailError}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                            keyboardType={'email-address'}
                            leftIcon={
                                <Icon
                                    name='email'
                                    size={24}
                                    type='entypo'
                                    color='lightgray'
                                    containerStyle={styles.inputIconContainer}
                                />
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Input
                            label="PHONE NUMBER"
                            labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
                            inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                            placeholder='01XXXXXXXXX'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.props.numberError}
                            onChangeText={(number) => this.setState({ number })}
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
                <TouchableOpacity onPress={() => this.props.start()}>
                    <Text>Press</Text>
                </TouchableOpacity>
                <View style={{ flex: .2, paddingHorizontal: 30 }}>
                    <TouchableOpacity style={styles.submitButtom} onPress={() => this.props.submitAccount(this.state.name, this.state.email.toLowerCase(), this.state.number)}>
                        <CopilotStep text="This is a hello world example!" order={2} name="next_step">
                            <CopilotText style={styles.submitText}>Next Step</CopilotText>
                        </CopilotStep>
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

export default copilot({
    verticalOffset: 30,
    overlay: 'svg', // or 'view'
    animated: true, // or false
})(PersonalDetails);