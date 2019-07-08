import React, { Component } from 'react'
import { ActivityIndicator, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Input } from 'react-native-elements';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

class Scolarships extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Scolarships',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
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
                <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>Coming Soon</Text>
                </View>
            </View>

        )
        // return (
        //     <View style={[styles.container]}>
        //         <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
        //         <ScrollView showsVerticalScrollIndicator={false}>
        //             <View style={{ borderRadius: 5, borderTopWidth: 2, borderTopColor: Colors.appTheme, backgroundColor: '#fff', marginVertical: 15, elevation: 5, borderRadius: 3 }}>
        //                 <View style={{ borderBottomWidth: 2, borderBottomColor: 'lightgray', padding: 20 }}>
        //                     <Text style={{ fontSize: 18, fontWeight: '400', color: 'black' }}>Pran Scholarship 2019</Text>
        //                     <Text style={{ fontSize: 18, fontWeight: '300' }}>Lorem Ipsum is simply dummy text of the printing and typese</Text>
        //                     <Text style={{ fontSize: 18, fontWeight: '400', color: 'black', marginTop: 15 }}>End Data</Text>
        //                     <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        //                         <Icon name='menu' type='feather' color={Colors.appTheme} />
        //                         <Text>30 Nov 2019</Text>
        //                     </View>
        //                 </View>
        //                 <View style={{ marginVertical: 20, alignItems: 'center' }}>
        //                     <TouchableOpacity style={{ width: 100, backgroundColor: Colors.appTheme, padding: 10, borderRadius: 5 }}>
        //                         <Text style={{ color: '#fff', textAlign: 'center', color: 'black' }}>Apply Now</Text>
        //                     </TouchableOpacity>
        //                 </View>
        //             </View>
        //         </ScrollView>
        //     </View>
        // )
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
)(Scolarships);