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
        title: 'Leader Board',
    });

    componentWillMount() {
        this.props.getPreviousAttemps(this.props.navigation.state.params.lessonId);
        loaderHandler.showLoader("Loading");
    }

    componentWillReceiveProps(nextProps) {
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
                            <Text style={[styles.attempsHeaderText, { marginRight: 40 }]}>Marks</Text>
                            <Text style={styles.attempsHeaderText}>Date</Text>
                        </View>
                        {
                            attemps.length > 0 && attemps.map((attemp, index) => {
                                return (
                                    <View key={index} style={styles.attempsHeader}>
                                        <Text style={[styles.attempsHeaderText, { marginLeft: 25 }]}>{index + 1}</Text>
                                        <Text style={[styles.attempsHeaderText, { marginLeft: 25 }]}>{attemp.marks}</Text>
                                        <Text style={styles.attempsHeaderText}>{attemp.date}</Text>
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