import React, { Component } from 'react'
import { Text, View, StatusBar, Alert, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';

import BusyIndicator from 'react-native-busy-indicator';

import { setQuiz } from '../../redux/actions/QuizActions';
import { connect } from "react-redux";

import colors from '../../global/colors'
import styles from './styles';

class QuizDashboard extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    });

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        this.props.setQuiz(this.props.navigation.state.params.lessonId);
    }



    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let minutes = parseInt(this.props.quiz.time / 60, 10) < 10 ? "0" + parseInt(this.props.quiz.time / 60, 10) : parseInt(this.props.quiz.time / 60, 10);
        let seconds = parseInt(this.props.quiz.time % 60, 10) < 10 ? "0" + parseInt(this.props.quiz.time % 60, 10) : parseInt(this.props.quiz.time % 60, 10);
        let time = String(minutes) + ":" + String(seconds);
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ flex: 1 }}>
                    <View style={styles.quesationNumberAndTimeContainer}>
                        <View style={styles.quationNumberContainer}>
                            <Icon
                                name='questioncircleo'
                                type='antdesign'
                                color={colors.appTheme}
                                size={33}
                                containerStyle={styles.numberIconContainer}
                            />
                            <View>
                                <Text style={styles.qustionNumber}>{this.props.quiz.questions && this.props.quiz.questions.length}</Text>
                                <Text>Questions</Text>
                            </View>
                        </View>
                        <View style={styles.timeContainer}>
                            <Icon
                                name='back-in-time'
                                type='entypo'
                                color={colors.appTheme}
                                size={35}
                                containerStyle={styles.numberIconContainer}
                            />
                            <View>
                                <Text style={styles.time}>{time}</Text>
                                <Text>Minutes</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.instructionContainer}>
                        <Text style={styles.instructionTitle}>Instructions</Text>
                        <Text style={styles.instruction}>{this.props.navigation.state.params.description && this.props.navigation.state.params.description}</Text>
                    </View>
                </View>
                <View style={{ flex: .2, paddingHorizontal: 30 }}>
                    <TouchableOpacity style={styles.submitButtom} onPress={() => {
                        this.props.quiz.questions
                            && this.props.quiz.questions.length > 0
                            ? this.props.navigation.navigate('Quiz', { showExplanation: this.props.navigation.state.params && this.props.navigation.state.params.showExplanation, lessonId: this.props.navigation.state.params.lessonId })
                            : Alert.alert(
                                '',
                                'This quiz is not ready yet, Please try again later !',
                                [
                                    {
                                        text: 'Okay',
                                        style: 'Okay',
                                    },
                                    // { text: 'Buy Now', onPress: () => this.props.navigation.navigate('BuyPackage') },
                                ],
                                { cancelable: true },
                            );
                    }
                    }>
                        <Text style={styles.submitText}>Start Quiz</Text>
                        <Icon
                            name='arrowright'
                            size={22}
                            type='antdesign'
                            color='black'
                            containerStyle={styles.submitButtomIconContainer}
                        />
                    </TouchableOpacity>
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
    { setQuiz }
)(QuizDashboard);