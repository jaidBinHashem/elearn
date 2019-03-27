import React, { Component } from 'react'
import { ActivityIndicator, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Input } from 'react-native-elements';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

class BuyPackage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Buy Package',
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={{ flex: 1, borderTopWidth: 2, borderTopColor: Colors.appTheme, padding: 20, backgroundColor: '#fff', height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>Math</Text>
                            <Text style={{ fontSize: 18, fontWeight: '300' }}>Duration</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '700', marginLeft:20 }}>100tk</Text>
                            <Picker
                            itemStyle={{color:'blue'}}
                                selectedValue={this.state.language}
                                style={{ height: 25, width: 140 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ language: itemValue })
                                }>
                                <Picker.Item style={{color:'blue'}} label="1 month" value="java" />
                                <Picker.Item label="2 months" value="js1" />
                                <Picker.Item label="3 months" value="js2" />
                            </Picker>
                        </View>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: Colors.appTheme, padding: 5, borderRadius: 5 }}>
                                <Text style={{ color: '#fff' }}>Buy Now</Text></TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, borderTopWidth: 2, borderTopColor: Colors.appTheme, padding: 20, backgroundColor: '#fff', height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>Physics</Text>
                            <Text style={{ fontSize: 18, fontWeight: '300' }}>Duration</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '700', marginLeft:20 }}>100tk</Text>
                            <Picker
                            itemStyle={{color:'blue'}}
                                selectedValue={this.state.language}
                                style={{ height: 25, width: 140 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ language: itemValue })
                                }>
                                <Picker.Item style={{color:'blue'}} label="1 month" value="java" />
                                <Picker.Item label="2 months" value="js1" />
                                <Picker.Item label="3 months" value="js2" />
                            </Picker>
                        </View>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: Colors.appTheme, padding: 5, borderRadius: 5 }}>
                                <Text style={{ color: '#fff' }}>Buy Now</Text></TouchableOpacity>
                        </View>
                    </TouchableOpacity>
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
)(BuyPackage);