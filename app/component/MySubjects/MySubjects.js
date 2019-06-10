import React, { Component } from 'react'
import { ActivityIndicator, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Avatar } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

class MySubjects extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Subjects',
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
        await AsyncStorage.removeItem('USER_TOKEN');
        this.props.navigation.navigate('Loader');
    }

    render() {
        let subjects = [...this.props.subjects];
        let views = [];
        subjects.map((subject, key) => {
            views.push(
                <View key={key} style={{ flex: 2, flexDirection: 'row' }}><TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: subject })}
                    style={styles.subject}
                >
                    <Text style={{ color:'black', fontWeight: 'bold', fontSize: 20 }}>{subject.title}</Text>
                    <Text style={{  fontWeight: 'bold', fontSize: 18, marginTop:5 }}>Validaty : Life Time</Text>
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
                            <Text>You donot have any subjcts</Text>
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
    { checkAuth }
)(MySubjects);