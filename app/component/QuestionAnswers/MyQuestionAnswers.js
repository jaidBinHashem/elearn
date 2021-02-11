import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from "react-redux";

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import moment from 'moment';
import { Avatar, Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';

import { getService, deleteService } from '../../network';
import styles from './styles';

class MyQuestionAnswers extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Questions & Answers',
    });

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async UNSAFE_componentWillMount() {
        this.props.navigation.state.params.subject_qna ? this.getQuestions(this.props.navigation.state.params.subject_slug) : this.getQuestions();
    }

    getQuestions = async (subject_slug = false) => {
        const request = {
            endPoint: subject_slug ? subject_slug + '/my-questions' : 'my-questions',
            showLoader: true,
            authenticate: true
        }
        let questions = await getService(request);
        questions.success && this.setState({ questions: questions.data.data });
    }

    confirmDeleteQuestion = (question_id) => {
        Alert.alert(
            'Delete Question !',
            'Are you sure you want to delete the question ?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        this.deleteQuestion(question_id);
                    }
                },
            ],
            { cancelable: true },
        );
    }

    deleteQuestion = async (question_id) => {
        let url = this.props.navigation.state.params.subject_qna ? this.props.navigation.state.params.subject_slug + '/questions/' + question_id : 'questions/' + question_id;
        const request = {
            endPoint: url,
            showLoader: true,
            authenticate: true
        }
        let response = await deleteService(request);
        response.success
            ? (Toast.show("Question deleted successfull"), this.props.navigation.state.params.subject_qna ? this.getQuestions(this.props.navigation.state.params.subject_slug) : this.getQuestions())
            : Toast.show("Something went wrong, Please try again !");
    }

    componentWillUnmount() {
        loaderHandler.hideLoader();
    }

    render() {
        let { questions } = this.state;
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {
                        questions.map(question =>
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
                                        <Text>{moment(question.created_at).format("Do MMM")}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View>
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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.responseCount}>{question.global_answers_count || question.subject_answers_count || 0} ANSWERS</Text>
                                    <Icon onPress={() => this.confirmDeleteQuestion(question.id)} containerStyle={{ marginTop: 30 }} name='delete' type='antdesign' color='gray' size={20} />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
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
)(MyQuestionAnswers);