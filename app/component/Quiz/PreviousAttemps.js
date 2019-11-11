import React, { Component } from 'react'
import { Text, View, StatusBar, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { Icon } from 'react-native-elements';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import { getPreviousAttemps } from '../../redux/actions/QuizActions';
import { connect } from "react-redux";

import colors from '../../global/colors'
import styles from './styles';

class PreviousAttemps extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Leaderboard',
    });

    UNSAFE_componentWillMount() {
        this.props.getPreviousAttemps(this.props.navigation.state.params.lessonId);
        loaderHandler.showLoader("Loading");
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null;
        loaderHandler.hideLoader();
    }

    componentWillUnmount() {
        loaderHandler.hideLoader();
    }

    render() {
        let attemps = this.props.quiz.previousAttemps;
        let { userRanking } = this.props.quiz;
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={styles.attempsHeader}>
                            <Text style={styles.attempsHeaderText}>Position</Text>
                            <Text style={[styles.attempsHeaderText, {}]}>Name</Text>
                            <Text style={[styles.attempsHeaderText, {}]}>Marks</Text>
                        </View>
                        {
                            attemps.length > 0 && attemps.map((attemp, index) => {
                                return (
                                    <View key={index} style={styles.attempsHeader}>
                                        <Text style={[styles.attempsHeaderText, { fontWeight: '300', fontSize: 16, marginLeft: 20 }]}>{index + 1}</Text>
                                        <View style={{ marginLeft: 50 }}>
                                            <Text style={[styles.attempsHeaderText, { fontWeight: '300', fontSize: 16, maxWidth: 110, textAlign: 'center' }]}>{attemp.user_name}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: '300' }}>{attemp.date}</Text>
                                        </View>
                                        <Text style={[styles.attempsHeaderText, { fontWeight: '300', fontSize: 16 }]}>{attemp.total_marks_gained}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity style={[styles.submitButtom, { borderRadius: 0, flexDirection: 'column', height: 80, paddingTop: 5 }]}>
                    <Text style={styles.submitText}>Your position : {userRanking && userRanking.user_rank}</Text>
                    <Text style={styles.submitText}>Your Mark : {userRanking && userRanking.total_marks_gained}</Text>
                </TouchableOpacity>
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        quiz: state.QuizReducer
    };
}

export default connect(
    mapStateToProps,
    { getPreviousAttemps }
)(PreviousAttemps);