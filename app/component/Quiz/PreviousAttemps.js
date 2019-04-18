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
        title: 'Previous Attemps',
    });

    componentWillMount() {
        loaderHandler.showLoader("Loading");
        this.props.getPreviousAttemps();
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null;
        !nextProps.quiz.previousAttemps.length > 0 && loaderHandler.hideLoader();
    }

    render() {
        console.log(this.props.quiz.previousAttemps);
        let attemps = this.props.quiz.previousAttemps;
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ flex: 1 }}>
                    <View style={styles.attempsHeader}>
                        <Text style={styles.attempsHeaderText}>Data</Text>
                        <Text style={styles.attempsHeaderText}>Marks</Text>
                        <Text style={styles.attempsHeaderText}>Percent</Text>
                    </View>
                    {
                        attemps.length > 0 && attemps.map((attemp, index) => {
                            return (
                                <View key={index} style={styles.attempsHeader}>
                                    <Text style={styles.attempsHeaderText}>{attemp.date}</Text>
                                    <Text style={styles.attempsHeaderText}>{attemp.marks}</Text>
                                    <Text style={styles.attempsHeaderText}>{attemp.percent}%</Text>
                                </View>
                            )
                        })
                    }
                </View>
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