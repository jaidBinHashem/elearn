import React, { Component } from 'react'
import { Text, View, StatusBar, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { Icon } from 'react-native-elements';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import { showExplanation } from '../../redux/actions/QuizActions';
import { connect } from "react-redux";

import colors from '../../global/colors'
import styles from './styles';

class QuizHighlights extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Highlights',
    });

    componentDidMount() {
        loaderHandler.hideLoader();
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null;
        !nextProps.quiz.completedQuiz && this.props.navigation.navigate('QuizSolutions', { showExplanation: true });
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ flex: 1 }}>
                    <View>
                        <Text>Learn the topics in key focus areas and attempt again. we know you can do a lot better!</Text>
                    </View>
                    <View>
                        <Text style={styles.score}>Score</Text>
                    </View>
                    <View style={styles.scoreContainer}>
                        <View>
                            <View style={styles.scoreRowContainer} >
                                <Icon
                                    name='checkcircle'
                                    size={20}
                                    type='antdesign'
                                    color={colors.appTheme}
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text>{this.props.quiz.rightAnswers.length} Correct</Text>
                            </View>
                            <View style={[styles.scoreRowContainer, { right: 3 }]} >
                                <Icon
                                    name='circle-with-cross'
                                    size={24}
                                    type='entypo'
                                    color='#D75A4A'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={{ right: 2 }}>{this.props.quiz.wrongAnswers.length} Incorrect</Text>
                            </View>
                            <View style={styles.scoreRowContainer} >
                                <Icon
                                    name='leftcircle'
                                    size={22}
                                    type='antdesign'
                                    color='#2D465C'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text>{this.props.quiz.questions.length - (this.props.quiz.rightAnswers.length + this.props.quiz.wrongAnswers.length)} Unanswered</Text>
                            </View>
                        </View>
                        <View style={styles.scoreCircleContainer}>
                            <Text style={styles.scoreCircleText}>{this.props.quiz.rightAnswers.length}</Text>
                            <Text>{this.props.quiz.questions.length}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: .4, paddingHorizontal: 30 }}>
                    <TouchableOpacity style={[styles.submitButtom, { marginBottom: 30 }]}
                        onPress={() => this.props.showExplanation()}
                    >
                        <Text style={styles.submitText}>VIEW SOLUTIONS</Text>
                        <Icon
                            name='arrowright'
                            size={22}
                            type='antdesign'
                            color='black'
                            containerStyle={styles.submitButtomIconContainer}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButtom}
                        onPress={() => this.props.navigation.navigate('PreviousAttemps', {})}
                    >
                        <Text style={styles.submitText}>PREVIOUS ATTEMPTS</Text>
                        <Icon
                            name='arrowright'
                            size={22}
                            type='antdesign'
                            color='black'
                            containerStyle={styles.submitButtomIconContainer}
                        />
                    </TouchableOpacity>
                </View>
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
    { showExplanation }
)(QuizHighlights);