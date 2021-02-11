import React, { Component } from 'react'
import { View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Avatar } from 'react-native-elements';
import BusyIndicator from 'react-native-busy-indicator';
import * as Progress from 'react-native-progress';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getUser } from '../../redux/actions/UserActions';

import Colors from '../../global/colors';
import styles from './styles';

class MyProfile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Profile',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='entypo' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            studyLevels: [],
            institutions: [],
            selectedStudyLevel: null,
            selectedInstitution: null
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    signOut = async () => {
        await AsyncStorage.removeItem('USER');
        await AsyncStorage.removeItem('USER_TOKEN');
        this.props.navigation.navigate('Loader');
    }

    calculateProfileCompletation = () => {
        let complete = 0;
        this.props.user.name && ++complete;
        this.props.user.phone && ++complete;
        this.props.user.email && ++complete;
        this.props.user.gender && ++complete;
        this.props.user.location && ++complete;
        this.props.user.birthDate && ++complete;
        return Number((complete / 6).toString().substring(0, 4));
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center', maxWidth: 250 }}>
                            <Text style={styles.name} numberOfLines={2}>{this.props.user.name}</Text>
                        </View>
                        <View style={{ elevation: 10, marginRight: 20 }}>
                            <Avatar
                                rounded
                                size="large"
                                source={{
                                    uri:
                                        this.props.user.avatar
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
                            <Progress.Bar color={Colors.appTheme} unfilledColor="lightgray" borderWidth={0} progress={this.calculateProfileCompletation()} width={150} />
                        </View>
                        <View>
                            <Text style={{ color: 'black', fontSize: 15 }}>{this.calculateProfileCompletation() * 100}%</Text>
                        </View>
                    </View>




                    <View style={{ marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '600', color: 'black', fontSize: 16 }}>Study Levels</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditStudyLevel')}>
                            <Icon name='edit' type='antdesign' color={Colors.appTheme} />
                        </TouchableOpacity>
                    </View>



                    <View style={[styles.formContainer, { bottom: 0 }]}>
                        <View>
                            <View style={styles.profileDetailsContainer}>
                                <Icon name='book' type='antdesign' color={Colors.appTheme} />
                                <Text style={[styles.profileDetails, { marginLeft: 56 }]}>{this.props.user.studyLevel}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.profileDetailsContainer}>
                                <Icon name='university' type='font-awesome' color={Colors.appTheme} />
                                <Text style={[styles.profileDetails, { marginLeft: 50, }]}>{this.props.user.institution}</Text>
                            </View>
                        </View>
                    </View>



                    <View style={{ marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '600', color: 'black', fontSize: 16 }}>Profile Details</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                            <Icon name='edit' type='antdesign' color={Colors.appTheme} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='user' type='font-awesome' color={Colors.appTheme} />
                            <Text style={[styles.profileDetails, { marginLeft: 56 }]}>{this.props.user.name}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='phone' type='antdesign' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>0{this.props.user.phone}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='mail' type='antdesign' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>{this.props.user.email}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='user' type='antdesign' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>{this.props.user.gender ? this.props.user.gender : 'Add your gender'}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='location-pin' type='entypo' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>{this.props.user.location ? this.props.user.location : 'Add your location'}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='birthday-cake' type='font-awesome' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>{this.props.user.birthDate ? this.props.user.birthDate : 'Add your birthday'}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.signOut()}>
                            <View style={styles.profileDetailsContainer}>
                                <Icon name='circle-with-cross' type='entypo' color={Colors.appTheme} />
                                <Text style={styles.profileDetails}>Sign Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        user: state.UserReducer
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, getUser }
)(MyProfile);