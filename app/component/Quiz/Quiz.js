import React, { Component } from 'react'
import { Text, View, StatusBar, ScrollView, TouchableOpacity, Dimensions, Alert, BackHandler, AppState, ActivityIndicator, Image, Modal } from 'react-native'
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import ImageViewer from 'react-native-image-zoom-viewer';
import { NavigationActions } from 'react-navigation';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import Katex from './src/';

import { setQuiz, submitQuiz } from '../../redux/actions/QuizActions';
import { connect } from "react-redux";

import colors from '../../global/colors'
import styles from './styles';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


const inlineStyle = `
html, body {
  
  background-color: white;
  position:fixed;
  width: 100%;
height: 100%;
    top:0;
    bottom:0;
    left:0;
    right:0;
}
.katex {
  font-size: 2em;
  margin: 0;
  
}
`;


class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        drawerLockMode: 'locked-closed',
        title: 'Quiz',
        headerTitleStyle: {
            textAlign: "center",
            flex: 1
        },
        headerLeft: null
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
            selectedAnswerIdArray: [],
            modalView: false,
            selectedImage: [],
            appState: AppState.currentState,
            dotView: true
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null;
        nextProps.quiz.completedQuiz && this.props.navigation.replace('QuizHighlights', { lessonId: this.props.navigation.state.params.lessonId });
    }

    componentDidMount() {
        console.log(AppState.currentState, "here did state")
        AppState.addEventListener('change', this._handleAppStateChange);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        !this.props.navigation.state.params.showExplanation && this.startTimer((this.props.quiz.time - 1));
    }

    onBackPress = () => {
        this.handleBack();
        return true;
    }

    handleBack = () => {
        if (!this.props.navigation.state.params.showExplanation) {
            this.confirmExamSubmit();
        } else {
            this.props.navigation.dispatch(NavigationActions.back());
        }
    }

    _handleAppStateChange = (nextAppState) => {
        console.log(nextAppState, "here is app state");
        if (!(this.state.appState.match(/inactive|background/) && nextAppState === 'active')) {
            this.submitExam();
        }
        this.setState({ appState: nextAppState });
    };

    startTimer = async (duration) => {
        console.log(duration, "here is duration");
        let timer = duration, minutes, seconds;
        this.myTimer = setInterval(() => {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            this.setState({ time: minutes + ":" + seconds });
            if (--timer < 1) {
                clearInterval(this.myTimer);
                loaderHandler.showLoader("Loading");
                setTimeout(() => {
                    this.submitExam();
                }, 1000);
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
            selectedAnswersObject = null,
            selectedAnswers = question.answers.filter(answer => selectedValues.includes(answer.id));

        selectedAnswers.map((selectedAnswer) => {
            selectedAnswersObject = {
                "id": selectedAnswer.id,
                "answer": selectedAnswer.answer,
                "correct": selectedAnswer.correct
            };
        });

        if (answerdQuestions.includes(question.id)) {
            let index = answerdQuestions.indexOf(question.id);
            selectedAnswerIdArray[index] = selectedValues[0];
            answers[index] = {
                'question': {
                    'id': question.id,
                    'question': question.question,
                    'mark': question.mark,
                    'negetive_mark': question.negetive_mark,
                    "selectedAnswer": selectedAnswersObject
                }
            }
        } else {
            selectedAnswerIdArray.push(selectedValues[0]);
            answers.push({
                'question': {
                    'id': question.id,
                    'question': question.question,
                    'mark': question.mark,
                    'negetive_mark': question.negetive_mark,
                    "selectedAnswer": selectedAnswersObject
                }
            });
            answerdQuestions.push(question.id);
        }
        this.setState({ answers, answerdQuestions, selectedAnswerIdArray });
    }

    confirmExamSubmit = () => {
        if (this.state.answers.length === 0) {
            Alert.alert(
                'Please answer at least a question !',
                '', // <- this part is optional, you can pass an empty string
                [
                    {
                        text: 'OK',
                        // onPress: () => console.log('OK Pressed') 
                    },
                ],
                { cancelable: false },
            );
            return
        }
        Alert.alert(
            'Submit Quiz',
            'Are you sure you want to submit the quiz ?',
            [
                {
                    text: 'Cancel',
                    // onPress: () => console.log('Cancel Pressed'),
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

    showModal = (url) => {
        let selectedImage = [];
        let image = {
            'url': url
        }
        selectedImage.push(image);
        this.setState({ selectedImage, modalView: true })
    }

    submitExam = () => {
        let answers = [...this.state.answers];
        let selectedAnswerIdArray = [], rightAnswers = [], wrongAnswers = [];
        answers.map(answer => {
            let rightAnswer = true;
            answer.question.selectedAnswer.correct === false && (rightAnswer = false);
            selectedAnswerIdArray.push(answer.question.selectedAnswer.id);
            rightAnswer === true
                ? rightAnswers.push(rightAnswer)
                : wrongAnswers.push(rightAnswer);
        });
        this.props.submitQuiz(this.state.answers, selectedAnswerIdArray, rightAnswers, wrongAnswers, this.props.navigation.state.params.lessonId);
    }

    strippedContent = (text) => {
        return text.split(/<latex>(.*?)<latex>/gi);
    }

    handleScroll = ({ nativeEvent }) => {
        let { y } = nativeEvent.contentOffset;
        y < 5 ? this.setState({ dotView: true }) : this.setState({ dotView: false })
    }


    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        clearInterval(this.myTimer);
    }

    render() {
        let questions = [...this.props.quiz.questions], answers = [...this.props.quiz.answers], selectedAnswersIdArray = [...this.props.quiz.selectedAnswersIdArray], questionViews = [], explanationView = [];
        questions.map((question, index) => {
            let questionContent = question.question && question.question.split(/<latex>(.*?)<latex>/gi);
            let buttonData = question.answers.map((answer) => {
                return ({
                    value: answer.id,
                    displayValue: answer.answer
                })
            });
            questionViews.push(
                <ScrollView onScroll={this.handleScroll} showsVerticalScrollIndicator={false} key={index} style={styles.questionContainer}>
                    <View style={styles.questionCounter}>
                        <Text>{index + 1}</Text>
                    </View>
                    <View style={styles.question}>
                        <View style={{ marginTop: 10 }}>
                            {questionContent && questionContent.map((value, index) => {
                                if (index % 2 === 0) {
                                    if (value.length > 0) {
                                        return (<View key={index} style={{ marginVertical: 15 }}><Text style={{ fontSize: 22 }}>{value}</Text></View>)
                                    }
                                } else {
                                    return (
                                        <ScrollView showsVerticalScrollIndicator={false} key={index} style={{ padding: 5 }}>
                                            <Katex
                                                style={{ height: 110 }}
                                                expression={value}
                                                scrollEnabled={false}
                                                displayMode={false}
                                                throwOnError={false}
                                                errorColor="#f00"
                                                macros={{}}
                                                colorIsTextColor={false}
                                                onError={() => console.error('Error')}
                                            />
                                        </ScrollView>
                                    )
                                }
                            })}
                            {
                                question.question_image &&
                                <TouchableOpacity
                                    onPress={() => this.showModal(question.question_image)}
                                    style={styles.imageContainer}
                                >
                                    <Image
                                        style={{ width: 300, height: 400, alignSelf: 'center' }}
                                        source={{ uri: question.question_image }}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.optionsContainer}>
                            {/* <SelectMultipleGroupButton
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
                                multiple={false}
                                onSelectedValuesChange={selectedValues => this._groupButtonOnSelectedValuesChange(selectedValues, question)}
                                group={buttonData}
                            /> */}
                            {
                                buttonData.map((data, key) => {
                                    let optionContent = data.displayValue.split(/<latex>(.*?)<latex>/gi);
                                    if (optionContent.length === 1) {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => this._groupButtonOnSelectedValuesChange([data.value], question)}
                                                key={key}
                                                style={{
                                                    justifyContent: 'center',
                                                    backgroundColor: this.state.selectedAnswerIdArray.includes(data.value) ? colors.appTheme : 'white',
                                                    height: 55,
                                                    width: deviceWidth - 60,
                                                    marginVertical: 10,
                                                    elevation: 5,
                                                    borderColor: colors.appTheme,
                                                    borderWidth: 3,
                                                }}
                                            >
                                                <Text style={{ fontSize: 20, textAlign: 'center' }}>{optionContent[0]}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    if (optionContent.length > 1) {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => this._groupButtonOnSelectedValuesChange([data.value], question)}
                                                key={key}
                                                style={{
                                                    justifyContent: 'center',
                                                }}
                                                style={{
                                                    borderColor: colors.appTheme, borderWidth: 3, marginVertical: 10,
                                                    backgroundColor: this.state.selectedAnswerIdArray.includes(data.value) ? colors.appTheme : 'white',
                                                    elevation: 5,
                                                }}>
                                                {
                                                    optionContent.map((value, index) => {
                                                        if (index % 2 === 0) {
                                                            if (value.length > 0) {
                                                                return (
                                                                    <View key={index} style={{ marginVertical: 10 }}>
                                                                        <Text key={index} style={{ fontSize: 20, textAlign: 'center' }}>{value}</Text>
                                                                    </View>
                                                                )
                                                            }
                                                        } else {
                                                            return (
                                                                <ScrollView key={index}>
                                                                    <Katex
                                                                        style={{ height: 120, backgroundColor: this.state.selectedAnswerIdArray.includes(data.value) ? colors.appTheme : 'white', }}
                                                                        scalesPageToFit={false}
                                                                        expression={value}
                                                                        scrollEnabled={false}
                                                                        displayMode={false}
                                                                        throwOnError={false}
                                                                        errorColor="#f00"
                                                                        macros={{}}
                                                                        colorIsTextColor={false}
                                                                        onError={() => console.error('Error')}
                                                                    />
                                                                </ScrollView>
                                                            )
                                                        }
                                                    })
                                                }
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            );

            explanationView.push(
                <ScrollView showsVerticalScrollIndicator={false} onScroll={this.handleScroll} key={index} style={styles.questionContainer}>
                    <View style={styles.questionCounter}>
                        <Text>{index + 1}</Text>
                    </View>
                    <View style={styles.question}>
                        <View style={{ marginTop: 10 }}>
                            {questionContent && questionContent.map((value, index) => {
                                if (index % 2 === 0) {
                                    if (value.length > 0) {
                                        return (<View key={index} ><Text style={{ fontSize: 26 }}>{value}</Text></View>)
                                    }
                                } else {
                                    return (
                                        <ScrollView key={index} showsVerticalScrollIndicator={false} style={{ padding: 5 }}>
                                            <Katex
                                                style={{ height: 110 }}
                                                scalesPageToFit={false}
                                                expression={value}
                                                scrollEnabled={false}
                                                displayMode={false}
                                                throwOnError={false}
                                                errorColor="#f00"
                                                macros={{}}
                                                colorIsTextColor={false}
                                                onError={() => console.error('Error')}
                                            />
                                        </ScrollView>
                                    )
                                }
                            })}
                            {
                                question.question_image &&
                                <TouchableOpacity
                                    onPress={() => this.showModal(question.question_image)}
                                    style={styles.imageContainer}
                                >
                                    <Image
                                        style={{ width: 300, height: 400, alignSelf: 'center' }}
                                        source={{ uri: question.question_image }}
                                    />
                                </TouchableOpacity>
                            }
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
                                    let answerContent = answer.answer.split(/<latex>(.*?)<latex>/gi);
                                    let answerExplanationContent = answer.explanation.split(/<latex>(.*?)<latex>/gi);
                                    if (answerContent.length === 1) {
                                        return (
                                            <TouchableOpacity
                                                key={answer.id}
                                                style={[styles.option, answer.correct && styles.explanation, wrongStyle]}>
                                                <Text style={styles.optionText}>{answer.answer}</Text>
                                                {
                                                    answer.correct && answer.explanation != null && (
                                                        <View>
                                                            <Text style={styles.explanationText}>
                                                                Explanation:
                                                            </Text>
                                                            {
                                                                answerExplanationContent[0] != "" && answerExplanationContent.length === 1 ? <Text>{answer.explanation}</Text> : (
                                                                    answerExplanationContent.map((value, index) => {
                                                                        if (index % 2 === 0) {
                                                                            if (value.length > 0) {
                                                                                return (
                                                                                    <View key={index} style={{ marginVertical: 10 }}>
                                                                                        <Text key={index} style={{ fontSize: 20, textAlign: 'center' }}>{value}</Text>
                                                                                    </View>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <ScrollView showsVerticalScrollIndicator={false} key={index}>
                                                                                    <Katex
                                                                                        style={{ height: 120 }}
                                                                                        scalesPageToFit={false}
                                                                                        expression={value}
                                                                                        scrollEnabled={false}
                                                                                        displayMode={false}
                                                                                        throwOnError={false}
                                                                                        errorColor="#f00"
                                                                                        macros={{}}
                                                                                        colorIsTextColor={false}
                                                                                        onError={() => console.error('Error')}
                                                                                    />
                                                                                </ScrollView>
                                                                            )
                                                                        }
                                                                    })
                                                                )
                                                            }

                                                            {
                                                                answer.explanation_image &&
                                                                <TouchableOpacity
                                                                    onPress={() => this.showModal(answer.explanation_image)}
                                                                    style={styles.imageContainer}
                                                                >
                                                                    <Image
                                                                        style={{ width: 300, height: 400, alignSelf: 'center' }}
                                                                        source={{ uri: answer.explanation_image }}
                                                                    />
                                                                </TouchableOpacity>
                                                            }

                                                        </View>
                                                    )
                                                }
                                            </TouchableOpacity>
                                        )
                                    }

                                    if (answerContent.length > 1) {
                                        return (
                                            <TouchableOpacity
                                                key={answer.id}
                                                style={[styles.option, answer.correct && styles.explanation, wrongStyle]}>
                                                {
                                                    answerContent.map((value, index) => {
                                                        if (index % 2 === 0) {
                                                            if (value.length > 0) {
                                                                return (
                                                                    <View key={index} style={{ marginVertical: 10 }}>
                                                                        <Text key={index} style={{ fontSize: 20, textAlign: 'center' }}>{value}</Text>
                                                                    </View>
                                                                )
                                                            }
                                                        } else {
                                                            return (
                                                                <ScrollView showsVerticalScrollIndicator={false} key={index}>
                                                                    <Katex
                                                                        style={{ height: 120 }}
                                                                        scalesPageToFit={false}
                                                                        expression={value}
                                                                        scrollEnabled={false}
                                                                        displayMode={false}
                                                                        throwOnError={false}
                                                                        errorColor="#f00"
                                                                        macros={{}}
                                                                        colorIsTextColor={false}
                                                                        onError={() => console.error('Error')}
                                                                    />
                                                                </ScrollView>
                                                            )
                                                        }
                                                    })
                                                }
                                                {
                                                    answer.correct && answer.explanation != null && (
                                                        <View>
                                                            <Text style={styles.explanationText}>
                                                                Explanation:
                                                            </Text>
                                                            {
                                                                answerExplanationContent[0] != "" && answerExplanationContent.length === 1 ? <Text>{answer.explanation}</Text> : (
                                                                    answerExplanationContent.map((value, index) => {
                                                                        if (index % 2 === 0) {
                                                                            if (value.length > 0) {
                                                                                return (
                                                                                    <View key={index} style={{ marginVertical: 10 }}>
                                                                                        <Text key={index} style={{ fontSize: 20, textAlign: 'center' }}>{value}</Text>
                                                                                    </View>
                                                                                )
                                                                            }
                                                                        } else {
                                                                            return (
                                                                                <ScrollView showsVerticalScrollIndicator={false} key={index}>
                                                                                    <Katex
                                                                                        style={{ height: 120 }}
                                                                                        scalesPageToFit={false}
                                                                                        expression={value}
                                                                                        scrollEnabled={false}
                                                                                        displayMode={false}
                                                                                        throwOnError={false}
                                                                                        errorColor="#f00"
                                                                                        macros={{}}
                                                                                        colorIsTextColor={false}
                                                                                        onError={() => console.error('Error')}
                                                                                    />
                                                                                </ScrollView>
                                                                            )
                                                                        }
                                                                    })
                                                                )
                                                            }
                                                            {
                                                                answer.explanation_image &&
                                                                <TouchableOpacity
                                                                    onPress={() => this.showModal(answer.explanation_image)}
                                                                    style={styles.imageContainer}
                                                                >
                                                                    <Image
                                                                        style={{ width: 300, height: 400, alignSelf: 'center' }}
                                                                        source={{ uri: answer.explanation_image }}
                                                                    />
                                                                </TouchableOpacity>
                                                            }
                                                        </View>
                                                    )
                                                }
                                            </TouchableOpacity>
                                        )
                                    }

                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            )
        });
        return (
            <View style={[styles.container, styles.horizontal]}>
                <Modal visible={this.state.modalView} transparent={true} onRequestClose={() => this.setState({ modalView: false })}>
                    <ImageViewer
                        imageUrls={this.state.selectedImage}
                        enableSwipeDown={true}
                        onCancel={() => this.setState({ modalView: false })}
                    />
                </Modal>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: .9 }}>
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
                                <TouchableOpacity style={{ backgroundColor: colors.appTheme, borderRadius: 5, justifyContent: 'center' }} onPress={() => this.confirmExamSubmit()}>
                                    <Text style={styles.submitExam}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)}
                        <View style={{ height: deviceHeight - 170, zIndex: 1 }}>
                            <View style={{ paddingVertical: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        questions.map((q, index) => (
                                            <TouchableOpacity key={index} onPress={() => this.scroll.scrollTo(index)}>
                                                <Text style={[{ marginHorizontal: 10, fontSize: 20, textAlign: 'center' }, this.state.swiperIndex === index && ({ color: colors.appTheme, fontWeight:'bold' })]}>{index + 1}</Text>
                                            </TouchableOpacity>
                                        )
                                        )
                                    }
                                </ScrollView>
                            </View>
                            <Swiper style={styles.wrapper}
                                ref={node => (this.scroll = node)}
                                showsButtons={false}
                                showsPagination={false}
                                // activeDotColor={colors.appTheme}
                                // paginationStyle={{ top: -350 }}
                                loop={false}
                                scrollEnabled={true}
                                index={0}
                                automaticallyAdjustContentInsets={true}
                                onIndexChanged={(index) => this.setState({ swiperIndex: index })}
                                loadMinimal={true}
                                loadMinimalSize={2}
                                loadMinimalLoader={<ActivityIndicator size="large" color="#0000ff" />}
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