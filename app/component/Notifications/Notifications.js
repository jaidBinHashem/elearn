import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import Hyperlink from 'react-native-hyperlink';

import BusyIndicator from 'react-native-busy-indicator';
import moment from 'moment';
import { getService } from '../../network';
import styles from './styles';

class Notifications extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Notifications',
    });

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async UNSAFE_componentWillMount() {
        const request = {
            endPoint: 'push-notification-list',
            showLoader: true,
            authenticate: true
        }
        let notifications = await getService(request);
        this.setState({ notifications: notifications.data });
    }

    async componentDidMount() {
        await AsyncStorage.setItem('NOTIFICATION_DATE', moment().format('YYYY-MM-DD HH:mm:ss'));
    }

    render() {
        let { notifications } = this.state;
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView>
                    {
                        notifications.length > 0 && notifications.map(notification => {
                            return (
                                <View key={notification.id} style={{ flex: 1, elevation: 5, backgroundColor: 'white', padding: 10, margin: 10 }}>
                                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }} numberOfLines={1}>{notification.title}</Text>
                                    <Text style={{ fontSize: 12 }} numberOfLines={1}>{moment(notification.updated_at, 'YYYY-MM-DD').format("Do MMM, YYYY")}</Text>
                                    <Hyperlink linkDefault={true}>
                                        <Text selectable={true} style={{ paddingTop: 5, marginVertical: 15, lineHeight: 18 }}>{notification.content}</Text>
                                    </Hyperlink>
                                </View>)
                        })
                    }
                </ScrollView>
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
    {}
)(Notifications);