import React, { Component } from 'react'
import { Text, View, StatusBar, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import { setQuiz, submitQuiz } from '../../redux/actions/QuizActions';
import { connect } from "react-redux";

import colors from '../../global/colors'
import styles from './styles';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    });

    constructor(props) {
        super(props);
        let minutes = parseInt(this.props.quiz.time / 60, 10) < 10 ? "0" + parseInt(this.props.quiz.time / 60, 10) : parseInt(this.props.quiz.time / 60, 10);
        let seconds = parseInt(this.props.quiz.time % 60, 10) < 10 ? "0" + parseInt(this.props.quiz.time % 60, 10) : parseInt(this.props.quiz.time % 60, 10);
        this.state = {
            swiperIndex: 0,
            time: minutes + ":" + seconds,
            answers: [],
            answerdQuestions: [],
            selectedAnswerIdArray: []
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null;
        nextProps.quiz.completedQuiz && this.props.navigation.replace('QuizHighlights');
    }

    componentDidMount() {
        !this.props.navigation.state.params.showExplanation && this.startTimer((this.props.quiz.time - 1));
    }

    startTimer = async (duration) => {
        let timer = duration, minutes, seconds;
        this.myTimer = setInterval(() => {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            this.setState({ time: minutes + ":" + seconds });
            if (--timer < 0) {
                clearInterval(this.myTimer);
            }
        }, 1000);
    }

    scrollTo = i => {
        this.scroll.scrollBy(i);
    };


    _groupButtonOnSelectedValuesChange = (selectedValues, question) => {
        let answers = [...this.state.answers],
            answerdQuestions = [...this.state.answerdQuestions],
            selectedAnswerIdArray = [...this.state.selectedAnswerIdArray],
            selectedAnswersObject = [],
            selectedAnswers = question.answers.filter(answer => selectedValues.includes(answer.id));
        selectedAnswers.map((selectedAnswer) => {
            selectedAnswersObject.push({
                "id": selectedAnswer.id,
                "answer": selectedAnswer.answer,
                "correct": selectedAnswer.correct
            });
        });
        if (answerdQuestions.includes(question.id)) {
            answers[answerdQuestions.indexOf(question.id)] = {
                'question': {
                    'id': question.id,
                    'question': question.question,
                    "selectedAnswers": selectedAnswersObject
                }
            }
        } else {
            answers.push({
                'question': {
                    'id': question.id,
                    'question': question.question,
                    "selectedAnswers": selectedAnswersObject
                }
            });
            answerdQuestions.push(question.id);
        }
        this.setState({ answers, answerdQuestions });
    }

    confirmExamSubmit = () => {
        Alert.alert(
            'Submit Quiz',
            'Are you sure you want to submit the quiz ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Submit',
                    onPress: () => {
                        loaderHandler.showLoader("Loading");
                        setTimeout(() => {
                            this.submitExam();
                        }, 1000);
                    }
                },
            ],
            { cancelable: true },
        );
    }

    submitExam = () => {
        let answers = [...this.state.answers],
            answerdQuestions = [...this.state.answerdQuestions];
        if (this.props.quiz.questions.length != this.state.answerdQuestions.length) {
            this.props.quiz.questions.map((question) => {
                if (!this.state.answerdQuestions.includes(question.id)) {
                    answers.push({
                        'question': {
                            'id': question.id,
                            'question': question.question,
                            "selectedAnswers": []
                        }
                    });
                    answerdQuestions.push(question.id);
                }
            });
            this.setState({ answers, answerdQuestions }, () => {
                let selectedAnswerIdArray = [], rightAnswers = [], wrongAnswers = [];
                this.state.answers.map(answer => {
                    let rightAnswer = true;
                    if (answer.question.selectedAnswers.length > 0) {
                        answer.question.selectedAnswers.map((selectedAnswer) => {
                            selectedAnswer.correct === false && (rightAnswer = false);
                            selectedAnswerIdArray.push(selectedAnswer.id);
                        });
                        rightAnswer === true
                            ? rightAnswers.push(rightAnswer)
                            : wrongAnswers.push(rightAnswer);
                    }
                });
                this.props.submitQuiz(this.state.answers, selectedAnswerIdArray, rightAnswers, wrongAnswers);
            });
        } else if (this.props.quiz.questions.length === this.state.answerdQuestions.length) {
            let selectedAnswerIdArray = [], rightAnswers = [], wrongAnswers = [];
            this.state.answers.map(answer => {
                if (answer.question.selectedAnswers.length > 0) {
                    let rightAnswer = true;
                    answer.question.selectedAnswers.map((selectedAnswer) => {
                        selectedAnswer.correct === false && (rightAnswer = false)
                        selectedAnswerIdArray.push(selectedAnswer.id);
                    });
                    rightAnswer === true
                        ? rightAnswers.push(rightAnswer)
                        : wrongAnswers.push(rightAnswer);
                }
            });
            this.props.submitQuiz(this.state.answers, selectedAnswerIdArray, rightAnswers, wrongAnswers);
        }
    }

    componentWillUnmount() {
        clearInterval(this.myTimer);
    }

    render() {
        let questions = [...this.props.quiz.questions], answers = [...this.props.quiz.answers], selectedAnswersIdArray = [...this.props.quiz.selectedAnswersIdArray], questionViews = [], explanationView = [];
        questions.map((question, index) => {
            let buttonData = question.answers.map((answer) => {
                return ({
                    value: answer.id,
                    displayValue: answer.answer
                })
            });
            questionViews.push(
                <View key={index} style={styles.questionContainer}>
                    <View style={styles.questionCounter}>
                        <Text>{index + 1}</Text>
                    </View>
                    <View style={styles.question}>
                        <View >
                            <Text style={styles.questionTitle}>{question.question.replace(/<[^>]*>/g, '')}</Text>
                        </View>
                        <View style={styles.optionsContainer}>
                            <SelectMultipleGroupButton
                                containerViewStyle={{
                                    justifyContent: 'center',
                                    marginTop: 5
                                }}
                                buttonViewStyle={{
                                    height: 50,
                                    width: deviceWidth - 60,
                                    marginVertical: 10,
                                    elevation: 5
                                }}
                                highLightStyle={{
                                    height: 50,
                                    borderColor: colors.appTheme,
                                    backgroundColor: "#fff",
                                    textColor: colors.appTheme,
                                    borderTintColor: colors.appTheme,
                                    backgroundTintColor: colors.appTheme,
                                    textTintColor: '#fff',
                                    elevation: 5,
                                }}
                                multiple={true}
                                onSelectedValuesChange={selectedValues => this._groupButtonOnSelectedValuesChange(selectedValues, question)}
                                group={buttonData}
                            />
                        </View>
                    </View>
                </View>
            );

            explanationView.push(
                <View key={index} style={styles.questionContainer}>
                    <View style={styles.questionCounter}>
                        <Text>{index + 1}</Text>
                    </View>
                    <View style={styles.question}>
                        <View >
                            <Text style={styles.questionTitle}>{question.question.replace(/<[^>]*>/g, '')}</Text>
                        </View>
                        <View style={styles.optionsContainer}>
                            {
                                question.answers.map((answer) => {
                                    let wrongStyle = null;
                                    if (selectedAnswersIdArray.includes(answer.id)) {
                                        !answer.correct && (wrongStyle = {
                                            borderColor: 'red',
                                            borderWidth: 3
                                        })
                                    }
                                    return (
                                        <TouchableOpacity key={answer.id} style={[styles.option, answer.correct && styles.explanation, wrongStyle]}>
                                            <Text style={styles.optionText}>{answer.answer}</Text>
                                            {
                                                answer.explanation && (<Text style={styles.explanationText}>
                                                    <Text style={{ color: colors.appTheme }}>
                                                        Explanation:
                                                        </Text> {answer.explanation && answer.explanation}</Text>)
                                            }
                                        </TouchableOpacity>
                                    )
                                })
                                // })
                            }
                        </View>
                    </View>
                </View>
            )


        });
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        {!this.props.navigation.state.params.showExplanation && (<View style={styles.quesationNumberAndTimeContainer}>
                            <View style={styles.quationNumberContainer}>
                                <Icon
                                    name='back-in-time'
                                    type='entypo'
                                    color={colors.appTheme}
                                    size={35}
                                    containerStyle={styles.numberIconContainer}
                                />
                                <View>
                                    <Text style={styles.qustionNumber}>{this.state.time}</Text>
                                </View>
                            </View>
                            <View style={styles.timeContainer}>
                                <TouchableOpacity onPress={() => this.confirmExamSubmit()}>
                                    <Text style={styles.submitExam}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)}
                        <View style={{ height: deviceHeight - 180 }}>
                            <Swiper style={styles.wrapper}
                                ref={node => (this.scroll = node)}
                                showsButtons={false}
                                showsPagination={false}
                                loop={false}
                                scrollEnabled={false}
                                index={0}
                                onIndexChanged={(index) => this.setState({ swiperIndex: index })}
                            >
                                {this.props.navigation.state.params.showExplanation ? explanationView : questionViews}
                            </Swiper>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.questionNavigationContainer}>
                    <TouchableOpacity
                        onPress={() => this.scrollTo(-1)}
                        style={styles.nextButton}>
                        {this.state.swiperIndex > 0 && (
                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='arrowleft'
                                    size={22}
                                    type='antdesign'
                                    color={colors.appTheme}
                                    containerStyle={styles.nextIconContainer}
                                />
                                <Text style={styles.nextText}>Previous</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {this.props.quiz.questions.length != (this.state.swiperIndex + 1) && (<TouchableOpacity
                        onPress={() => this.scrollTo(1)}
                        style={styles.nextButton}>
                        <Text style={styles.nextText}>Next</Text>
                        <Icon
                            name='arrowright'
                            size={22}
                            type='antdesign'
                            color={colors.appTheme}
                            containerStyle={styles.nextIconContainer}
                        />
                    </TouchableOpacity>)}
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
    { setQuiz, submitQuiz }
)(Quiz);