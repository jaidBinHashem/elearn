import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, Image, TouchableOpacity, RefreshControl, FlatList } from 'react-native'
import { connect } from "react-redux";

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import moment from 'moment';
import { Avatar, Icon, Button } from 'react-native-elements';

import { getService } from '../../network';
import styles from './styles';

class QuestionAnswers extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Questions & Answers',
    });

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            refreshing: false,
            currentPage: 0,
            lastPage: 0,
            nextPageUrl: null
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentDidMount() {
        this.props.navigation.state.params.subject_qna ? this.getQuestions(this.props.navigation.state.params.subject_slug) : this.getQuestions();
    }

    getQuestions = async (subject_slug = false) => {
        if (this.state.currentPage === 0) {
            const request = {
                endPoint: subject_slug ? subject_slug + '/questions' : 'questions',
                showLoader: true,
                authenticate: true
            }
            let questions = await getService(request);
            questions.success && this.setState({
                questions: questions.data.data,
                currentPage: questions.data.current_page,
                lastPage: questions.data.last_page,
                nextPageUrl: questions.data.next_page_url,
                refreshing: false
            });
        } else if (this.state.currentPage > 0 && this.state.currentPage !== this.state.lastPage) {
            const request = {
                baseUrl: this.state.nextPageUrl,
                showLoader: true,
                authenticate: true
            }
            let questions = await getService(request);
            if (questions.success) {
                let questionsArr = [...this.state.questions];
                Array.prototype.push.apply(questionsArr, questions.data.data);
                this.state.currentPage !== questions.data.current_page && this.setState({
                    questions: questionsArr,
                    currentPage: questions.data.current_page,
                    lastPage: questions.data.last_page,
                    nextPageUrl: questions.data.next_page_url,
                    refreshing: false
                });
            }
        }
    }

    renderItem = (question) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('QuestionDetails', {
                    'question': question,
                    'subject_qna': this.props.navigation.state.params.subject_qna ? true : false,
                    'subject_slug': this.props.navigation.state.params.subject_qna ? this.props.navigation.state.params.subject_slug : false
                })}
                key={question.created_at}
                style={styles.questionCardContainer}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        size="medium"
                        source={{
                            uri: question.user.full_url_avatar,
                        }}
                    />
                    <View style={styles.nameDateContainer}>
                        <Text style={styles.userName}>{question.user.full_name}</Text>
                        <Text>{moment(question.created_at).format('MMMM Do YYYY, h:mm a')}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ margin: 10 }}>
                        <Text style={styles.question}>{question.question}</Text>
                    </View>
                    {
                        question.file_one &&
                        <View style={styles.imageContainer}>
                            <Image
                                style={{ width: 100, height: 100, marginTop: 20 }}
                                source={{ uri: question.file_one }}
                            />
                        </View>
                    }
                    {
                        question.file_two &&
                        <View style={styles.imageContainer}>
                            <Image
                                style={{ width: 100, height: 100, marginTop: 20 }}
                                source={{ uri: question.file_two }}
                            />
                        </View>
                    }
                    {
                        question.file_three &&
                        <View style={styles.imageContainer}>
                            <Image
                                style={{ width: 100, height: 100, marginTop: 20 }}
                                source={{ uri: question.file_three }}
                            />
                        </View>
                    }
                </View>
                <Text style={styles.responseCount}>{question.global_answers_count || question.subject_answers_count || 0} ANSWERS</Text>
            </TouchableOpacity>
        )
    }

    componentWillUnmount() {
        loaderHandler.hideLoader();
    }

    render() {
        let { questions } = this.state;
        let { navigation } = this.props;
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ flex: .1, flexDirection: 'row' }}>
                    <Button
                        onPress={() => navigation.navigate('MyQuestionAnswers', {
                            'subject_qna': navigation.state.params.subject_qna ? true : false,
                            'subject_slug': navigation.state.params.subject_qna ? navigation.state.params.subject_slug : false
                        })}
                        containerStyle={{ flex: 1, margin: 10 }}
                        iconRight
                        title="My Questions"
                    />
                    <Button
                        onPress={() => this.props.navigation.navigate('AddQuestion', {
                            'question_id': false,
                            'subject_qna': this.props.navigation.state.params.subject_qna ? true : false,
                            'subject_slug': this.props.navigation.state.params.subject_qna ? this.props.navigation.state.params.subject_slug : false,
                            'subject_title': this.props.navigation.state.params.subject_qna ? this.props.navigation.state.params.subject_title : false,
                        })}
                        containerStyle={{ flex: 1, margin: 10 }}
                        iconRight
                        title="Ask Question"
                    />
                </View>
                <View style={{ flex: .9 }}>
                    <FlatList
                        data={questions}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={question => String(question.id)}
                        showsVerticalScrollIndicator={false}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.props.navigation.state.params.subject_qna ? this.getQuestions(this.props.navigation.state.params.subject_slug) : this.getQuestions()}
                        onEndReached={() => this.props.navigation.state.params.subject_qna ? this.getQuestions(this.props.navigation.state.params.subject_slug) : this.getQuestions()}
                    />
                </View>
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer
    };
}

export default connect(
    mapStateToProps,
    {}
)(QuestionAnswers);