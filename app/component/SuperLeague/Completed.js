import React, { Component } from 'react'
import { Image, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Input } from 'react-native-elements';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

class Completed extends Component {
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
                <View style={{ flex: 1 }}>
                    <View key="key" style={{ elevation: 5, backgroundColor: 'white', padding: 10, margin: 10 }}>
                        <Image
                            resizeMode='cover'
                            source={{ uri: 'https://i.imgur.com/t3Hb5zC.jpg' }}
                            style={{ height: 200, marginBottom: 20 }}
                        />
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }} numberOfLines={1}>Title</Text>
                        <Text style={{ paddingTop: 5 }}>Content ContentContentContent ContentContentContent Content ContentContentContentContent ContentContentContent ContentContentContent ContentContentContent ContentContentContentContent ContentContentContent ContentContentContentContent</Text>
                    </View>
                </View>
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
)(Completed);