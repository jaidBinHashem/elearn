import React, { Component } from 'react'
import { View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getSubjects } from '../../redux/actions/SubjectActions';

import Colors from '../../global/colors';
import styles from './styles';

class MySubjects extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Subjects',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='entypo' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.props.getSubjects();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    signOut = async () => {
        await AsyncStorage.removeItem('USER_TOKEN');
        this.props.navigation.navigate('Loader');
    }

    render() {
        let subjects = [...this.props.subjects];
        let views = [];
        subjects.map((subject, key) => {
            views.push(
                <View key={key} style={{ flex: 2, flexDirection: 'row' }}><TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: subject, mySubject: true })}
                    style={styles.subject}
                >
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{subject.title}</Text>
                    <Text style={{ fontSize: 18, marginTop: 5 }}>Validity : {subject.duration && subject.duration}</Text>
                </TouchableOpacity>
                </View>)
        })
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {views}
                    {views.length === 0 && (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>You do not have any subjects</Text>
                            <TouchableOpacity style={{ marginTop: 20, width: 300, height: 60, backgroundColor: Colors.appTheme, marginVertical: 3, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('BuyPackage')}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Buy Packages</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        subjects: state.SubjectsReducer.subjects,
        subjectsTitleArr: state.SubjectsReducer.subjectsTitleArr,
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, getSubjects }
)(MySubjects);