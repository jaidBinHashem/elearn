import React, { Component } from 'react'
import { Text, View, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";

import { setQuiz } from '../../redux/actions/QuizActions';
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
        this.state = {
            time: '00:00',
            answers : []
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        // this.props.setQuiz();
        this.startTimer(10);
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
        console.log(question, "question");
        console.log(selectedValues, "selected value");
        
        let answers  =  [...this.state.answers];
        // let selectedAnswers = q
        // answers.length < 1 && answers.push()
    }

    componentWillUnmount() {
        clearInterval(this.myTimer);
    }

    render() {
        let questions = this.props.quiz.questions, questionViews = [];
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
                                    marginTop: 0
                                }}
                                buttonViewStyle={{ height: 50, width: deviceWidth - 60 }}
                                highLightStyle={{
                                    height: 50,
                                    borderColor: colors.appTheme,
                                    backgroundColor: "transparent",
                                    textColor: colors.appTheme,
                                    borderTintColor: colors.appTheme,
                                    backgroundTintColor: colors.appTheme,
                                    textTintColor: '#fff'
                                }}
                                multiple={true}
                                onSelectedValuesChange={selectedValues => this._groupButtonOnSelectedValuesChange(selectedValues, question)}
                                group={buttonData}
                            />
                        </View>
                    </View>
                </View>
            )
        })
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={styles.quesationNumberAndTimeContainer}>
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
                                <TouchableOpacity>
                                    <Text style={styles.submitExam}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: deviceHeight - 180 }}>
                            <Swiper style={styles.wrapper}
                                ref={node => (this.scroll = node)}
                                showsButtons={false}
                                showsPagination={false}
                                loop={false}
                                scrollEnabled={true}
                            >
                                {questionViews}
                            </Swiper>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.questionNavigationContainer}>
                    <TouchableOpacity
                        onPress={() => this.scrollTo(-1)}
                        style={styles.nextButton}>
                        <Icon
                            name='arrowleft'
                            size={22}
                            type='antdesign'
                            color={colors.appTheme}
                            containerStyle={styles.nextIconContainer}
                        />
                        <Text style={styles.nextText}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
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
    { setQuiz }
)(Quiz);