import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native'
import { connect } from "react-redux";

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import moment from 'moment';
import { Avatar, Icon, Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import { getService } from '../../network';
import colors from '../../global/../global/colors';
import styles from './styles';

class QuestionAnswers extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Questions & Answers',
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => navigation.navigate('MyQuestionAnswers', {
        //     'subject_qna': navigation.state.params.subject_qna ? true : false,
        //     'subject_slug': navigation.state.params.subject_qna ? navigation.state.params.subject_slug : false
        // })}><Icon name='account-question' type='material-community' color='#fff' size={32} /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            refreshing: false
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentWillMount() {
        this.props.navigation.state.params.subject_qna ? this.getQuestions(this.props.navigation.state.params.subject_slug) : this.getQuestions();
    }

    getQuestions = async (subject_slug = false) => {
        const request = {
            endPoint: subject_slug ? subject_slug + '/questions' : 'questions',
            showLoader: true,
            authenticate: true
        }
        let questions = await getService(request);
        questions.success && this.setState({ questions: questions.data.data, refreshing: false });
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
                <Button
                    onPress={() => navigation.navigate('MyQuestionAnswers', {
                        'subject_qna': navigation.state.params.subject_qna ? true : false,
                        'subject_slug': navigation.state.params.subject_qna ? navigation.state.params.subject_slug : false
                    })}
                    icon={
                        <Icon
                            name="account-question"
                            type='material-community'
                            color='#fff'
                            size={22}
                            containerStyle={{ marginLeft: 20 }}
                        />
                    }
                    containerStyle={{ margin: 10 }}
                    iconRight
                    title="My Question & Answers"
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.props.navigation.state.params.subject_qna ? this.getQuestions(this.props.navigation.state.params.subject_slug) : this.getQuestions()} />
                    }
                    showsVerticalScrollIndicator={false}>
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
                                <Text style={styles.responseCount}>{question.global_answers_count || question.subject_answers_count || 0} RESPONSES</Text>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
                <ActionButton
                    buttonColor='#1E88E5'
                    shadowStyle={{ elevation: 10 }}
                    fixNativeFeedbackRadius={true}
                    useNativeFeedback={true}
                    // renderIcon={() => <Image style={{ width: 40, height: 44, resizeMode: "contain" }} source={{ uri: 'https://i.imgur.com/a6tMdBA.png' }} />}
                    onPress={() => this.props.navigation.navigate('AddQuestion', {
                        'question_id': false,
                        'subject_qna': this.props.navigation.state.params.subject_qna ? true : false,
                        'subject_slug': this.props.navigation.state.params.subject_qna ? this.props.navigation.state.params.subject_slug : false
                    })}
                />
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