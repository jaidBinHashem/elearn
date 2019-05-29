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
        let subj = [...this.props.subjectsTitleArr];
        let colors = ['#BC9CFF', '#F6D365', '#F093FB', '#0BA360', '#74DBC9', '#677DCB', '#501A57', '#F07B52'];
        let colorsArr = [...colors];
        let views = [], length = Math.ceil(subj.length / 4);
        for (let i = 0; i < length; i++) {
            let subjectArr = [];
            if (subjects.length > 4) {
                for (let i = 0; i < 4; i++) {
                    subjectArr.push(subjects.shift());
                }
            } else {
                for (let i = 0; i <= subjects.length; i++) {
                    subjectArr.push(subjects.shift());
                }
            }
            view = (
                <View key={i} style={{ flex: 4 }}>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: subjectArr[0] })} style={styles.subject}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginVertical:5, color:'black' }}>{subj.shift()}</Text>
                                <Text style={{ textAlign: 'center' }}>Validity : Lifetime</Text>
                            </TouchableOpacity>
                        )}
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: subjectArr[1] })} style={styles.subject}>
                                <Text>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: subjectArr[2] })} style={styles.subject}>
                                <Text>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: subjectArr[3] })} style={styles.subject}>
                                <Text>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )
            colorsArr = colorsArr.concat(colors);
            views.push(view);
        }
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {views}
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