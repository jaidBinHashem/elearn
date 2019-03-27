import React, { Component } from 'react'
import { ActivityIndicator, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Input } from 'react-native-elements';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

class Upcoming extends Component {
    static navigationOptions = ({ navigation }) => ({
        // title: 'Super League',
        // headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentWillMount() {
        // console.log(this.props.navigation);
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('USER_TOKEN')
        // console.log(token, "token in dash")
    }

    signOut = async () => {
        await AsyncStorage.removeItem('USER_TOKEN');
        this.props.navigation.navigate('Loader');
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ borderRadius: 5, borderTopWidth: 2, borderTopColor: Colors.appTheme, backgroundColor: '#fff', marginVertical: 15, elevation: 5, borderRadius: 3 }}>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: 'lightgray', padding: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '400', color: 'black' }}>Math Olympiad</Text>
                            <Text style={{ fontSize: 18, fontWeight: '300', marginVertical: 5 }}>It’s based on math </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='clipboard-text' type='material-community' color={Colors.appTheme} />
                                    <Text>30 Nov 2019</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='clock-fast' type='material-community' color={Colors.appTheme} />
                                    <Text>30 Nov 2019</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginVertical: 20, alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 150, backgroundColor: Colors.appTheme, padding: 10, borderRadius: 5 }}>
                                <Text style={{ color: '#fff', textAlign: 'center', color: 'black' }}>Get Reminder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    { checkAuth }
)(Upcoming);