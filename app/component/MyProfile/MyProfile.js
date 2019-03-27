import React, { Component } from 'react'
import { ActivityIndicator, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Avatar } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

class MyProfile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Profile',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

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
        await AsyncStorage.removeItem('USER');
        await AsyncStorage.removeItem('USER_TOKEN');
        this.props.navigation.navigate('Loader');
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <View>
                                <Text style={styles.name}>Rakib</Text>
                            </View>
                            <View>
                                <Picker mode="dialog" selectedValue={0} style={{ height: 40, width: 120, right: 5 }} itemStyle={{ color: '#BC9CFF' }}>
                                    <Picker.Item label="9-10" color='#BC9CFF' value="java" />
                                    <Picker.Item label="11-12" color='#BC9CFF' value="ar" />
                                    <Picker.Item label="University Admission Test" color='#BC9CFF' value="cm" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ elevation: 10, marginRight: 20 }}>
                            <Avatar
                                rounded
                                size="large"
                                source={{
                                    uri:
                                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                }}
                                containerStyle={{ elevation: 10 }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                        <View>
                            <Text style={{ color: 'black', fontSize: 15 }}>Profile Completion</Text>
                        </View>
                        <View style={{ marginTop: 9 }}>
                            <Progress.Bar color={Colors.appTheme} unfilledColor="lightgray" borderWidth={0} progress={0.3} width={150} />
                        </View>
                        <View>
                            <Text style={{ color: 'black', fontSize: 15 }}>30%</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '600', color: 'black', fontSize: 16 }}>Profile Details</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                            <Icon name='edit' type='feather' color={Colors.appTheme} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='user' type='font-awesome' color={Colors.appTheme}  />
                            <Text style={[styles.profileDetails, {marginLeft:56}]}>Rakib</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='phone-call' type='feather' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>01621370573</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='mail' type='feather' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>abdur.rakib@bs-23.net</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='users' type='feather' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>Add your gender</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='location-pin' type='entypo' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>Add your location</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='birthday-cake' type='font-awesome' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>Add your birthday</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.signOut()}>
                        <View style={styles.profileDetailsContainer}>
                                <Icon name='circle-with-cross' type='entypo' color={Colors.appTheme} />
                                <Text style={styles.profileDetails}>Sign Out</Text>
                            </View>
                        </TouchableOpacity>
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
)(MyProfile);