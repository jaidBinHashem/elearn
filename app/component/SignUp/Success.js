import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, Dimensions, StatusBar, Image } from 'react-native';
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


class Success extends Component {
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
            <View style={{ flex: 1, backgroundColor: '#f6f3fc', paddingVertical: 50, paddingHorizontal: 20 }}>
                <StatusBar backgroundColor="#BC9CFF" barStyle="light-content" translucent={false} />
                <Image
                    resizeMode='cover'
                    source={require('./logo.png')}
                    style={{ height: 200, width: 200, marginBottom: 20, alignSelf: 'center' }}
                />
                <View style={{ alignItems: 'center', marginTop: 80 }}>
                    <Text>Welcome you have successfully registered</Text>
                    <Text style={{ marginBottom: 60 }}>Lets go to dashboard</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Loader')} style={[styles.submitButtom, { marginTop: 200 }]}>
                    <Text>GO TO DASHBOARD</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Success;
