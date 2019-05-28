import React, { Component } from 'react'
import { Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Avatar } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import { getService } from '../../network';

import Colors from '../../global/colors';
import styles from './styles';

class MyProfile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Profile',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
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

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentDidMount() {
        this.getStudyLevel();
    }

    signOut = async () => {
        await AsyncStorage.removeItem('USER');
        await AsyncStorage.removeItem('USER_TOKEN');
        this.props.navigation.navigate('Loader');
    }

    getStudyLevel = async () => {
        const request = { endPoint: 'study-levels' }
        let studyLevels = await getService(request);
        studyLevels.success && this.setState({ studyLevels: studyLevels.data.data });
        this.selectStudyLevel(studyLevels[0], 0);
    }

    selectStudyLevel = async (selectedStudyLevelId, selectedStudyIndex) => {
        let selectedStudyLevel = [...this.state.studyLevels];
        selectedStudyLevel = selectedStudyLevel[selectedStudyIndex];
        this.setState({ selectedStudyLevel });
        const request = {
            endPoint: 'study-levels/' + this.state.studyLevels[selectedStudyIndex].slug + '/institutions'
        }
        let institutions = await getService(request);
        institutions.success && this.setState({ institutions: institutions.data.data, selectedInstitution: institutions.data.data[0] });
    }

    selectInstitution = async (selectedInstitutionId, selectedInstitutionIndex) => {
        let selectedInstitution = [...this.state.institutions];
        selectedInstitution = selectedInstitution[selectedInstitutionIndex]
        this.setState({ selectedInstitution });
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'center' }}>
                            <View>
                                <Text style={styles.name}>{this.props.user.name}</Text>
                            </View>
                            {/* <View>
                                {this.state.selectedStudyLevel && (
                                    <Picker
                                        mode="dialog"
                                        selectedValue={this.state.selectedStudyLevel.id}
                                        style={{ height: 40, width: 120, right: 5 }}
                                        itemStyle={{ color: '#BC9CFF' }}
                                        onValueChange={(studyLevel, selectedStudyIndex) => this.selectStudyLevel(studyLevel, selectedStudyIndex)}>
                                        {
                                            this.state.selectedStudyLevel && this.state.studyLevels.map((studyLevel) => {
                                                return (
                                                    <Picker.Item key={studyLevel.id} label={studyLevel.name} value={studyLevel.id} />
                                                )
                                            })
                                        }
                                    </Picker>
                                )}
                            </View> */}
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
                        <Text style={{ fontWeight: '600', color: 'black', fontSize: 16 }}>Study Levels</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditStudyLevel')}>
                            <Icon name='edit' type='feather' color={Colors.appTheme} />
                        </TouchableOpacity>
                    </View>



                    <View style={[styles.formContainer, { bottom: 0 }]}>
                        <View>
                            <View style={styles.profileDetailsContainer}>
                                <Icon name='book' type='antdesign' color={Colors.appTheme} />
                                <Text style={[styles.profileDetails, { marginLeft: 56 }]}>{this.state.selectedStudyLevel && this.state.selectedStudyLevel.name}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.profileDetailsContainer}>
                                <Icon name='university' type='font-awesome' color={Colors.appTheme} />
                                <Text style={[styles.profileDetails, { marginLeft: 56 }]}>{this.state.selectedInstitution && this.state.selectedInstitution.name}</Text>
                            </View>
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
                            <Icon name='user' type='font-awesome' color={Colors.appTheme} />
                            <Text style={[styles.profileDetails, { marginLeft: 56 }]}>{this.props.user.name}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='phone-call' type='feather' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>0{this.props.user.phone}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='mail' type='feather' color={Colors.appTheme} />
                            <Text style={styles.profileDetails}>{this.props.user.email}</Text>
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Icon name='users' type='feather' color={Colors.appTheme} />
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
    { checkAuth }
)(MyProfile);