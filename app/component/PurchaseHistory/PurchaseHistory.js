import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";

import BusyIndicator from 'react-native-busy-indicator';
import moment from 'moment';
import { getService } from '../../network';
import styles from './styles';

class PurchaseHistory extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Purchase History',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            history: [],
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.getPurchaseHistory();
        });
    }


    getPurchaseHistory = async () => {
        const request = {
            endPoint: 'payment-history',
            showLoader: true,
            authenticate: true
        }
        let history = await getService(request);
        this.setState({ history: history.data.data });
    }

    render() {
        let { history } = this.state;
        console.log(history)
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView>
                    {
                        history.length > 0 && history.map(purchase => {
                            return (
                                <View key={purchase.id} style={{ flex: 1, flexDirection: 'row', elevation: 5, backgroundColor: 'white', padding: 10, margin: 10, justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }} numberOfLines={1}>{purchase.packages.data[0].subject}</Text>
                                        <Text style={{ fontSize: 12 }} numberOfLines={1}>{moment(purchase.created_at.date).format("Do MMM")}</Text>
                                    </View>
                                    <Text style={{ paddingTop: 5,fontSize: 16 }}>{purchase.packages.data[0].name}</Text>
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
)(PurchaseHistory);