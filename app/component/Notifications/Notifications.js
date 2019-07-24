import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView } from 'react-native'
import { connect } from "react-redux";

import BusyIndicator from 'react-native-busy-indicator';
import moment from 'moment';
import { getService } from '../../network';

import colors from '../../global/../global/colors';
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

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentWillMount() {
        const request = {
            endPoint: 'push-notification-list',
            showLoader: true,
            authenticate: true
        }
        let notifications = await getService(request);
        this.setState({ notifications: notifications.data });
    }

    render() {
        let { notifications } = this.state;
        console.log(notifications);
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView>
                    {
                        notifications.length > 0 && notifications.map(notification => {
                            return (
                                <View key={notification.id} style={{ flex: 1,  elevation: 5, backgroundColor: 'white', padding: 10, margin: 10 }}>
                                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }} numberOfLines={1}>{notification.title}</Text>
                                    <Text style={{ fontSize: 12 }} numberOfLines={1}>{moment(notifications.updated_at).format("Do MMM")}</Text>
                                    <Text style={{ paddingTop: 5 }}>{notification.content}</Text>
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