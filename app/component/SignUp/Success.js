import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, Dimensions } from 'react-native';
import Toast from 'react-native-simple-toast';
import { NavigationActions, StackActions } from 'react-navigation'
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
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: .2, marginBottom: 30 }}>
                    <CounterView pageNumber={3} />
                </View>
                <View style={[styles.formContainer, { width: deviceWidth, bottom: 0, justifyContent: 'center' }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Welcome you have successfully registered</Text>
                        <Text style={{ marginBottom: 120 }}>Lets go to dashboard</Text>
                    </View>
                </View>
                <View>
                    
                </View>
                <View style={{ flex: .2, paddingHorizontal: 30 }}>
                    <TouchableOpacity style={styles.submitButtom} onPress={() => this.props.navigation.navigate('Loader')}>
                        <Text style={[styles.submitText, { marginLeft: 40 }]}>GO TO DASHBOARD</Text>
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
