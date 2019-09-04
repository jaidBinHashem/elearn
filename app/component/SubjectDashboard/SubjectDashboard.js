import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity, ScrollView, Alert, RefreshControl, Image } from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getSubjectDetails } from '../../redux/actions/SubjectActions';
import ActionButton from 'react-native-action-button';

import colors from '../../global/colors'
import styles from './styles';

class SubjectDashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        return ({
            title: navigation.state.params.subjectDetails.title,
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        this.props.navigation.state.params.subjectDetails && (this.props.getSubjectDetails(this.props.navigation.state.params.subjectDetails.slug), loaderHandler.showLoader("Loading"));
    }

    componentWillUnmount() {
        loaderHandler.hideLoader();
    }

    onLessonClick = (lesson) => {
        if (this.props.navigation.state.params.subjectDetails.purchased || lesson.preview || this.props.navigation.state.params.mySubject) {
            if (lesson.lesson_type === 'video') {
                this.props.navigation.navigate('Player', { title: lesson.title, slug: lesson.slug, description: lesson.description })
            } else if (lesson.lesson_type === 'quiz') {
                this.props.navigation.navigate('QuizDashboard', { showExplanation: false, lessonId: lesson.id, description: lesson.description })
            } else {
                this.props.navigation.navigate('ArticleWebView', { lesson: true, title: lesson.title, slug: lesson.slug, category: 'user/lessons' })
            }
        } else {
            Alert.alert(
                '',
                'Please purchase the subject to view it !',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    { text: 'Buy Now', onPress: () => this.props.navigation.navigate('BuyPackage') },
                ],
                { cancelable: true },
            );
        }
    }

    render() {
        let chapters = [...this.props.subject.subjectDetails];
        let chapterLessons = [], chaptersCount = 0, topicsCount = 0;
        chapters.length > 0 && chapterLessons.push(chapters.map((chapter, index) => {
            ++chaptersCount;
            return (
                <View key={index}>
                    <View>
                        <Text style={styles.chapterTitle}>{chapter.title}</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topicContainer}>
                        {
                            chapter.lessons.map((lesson, index) => {
                                ++topicsCount;
                                return (
                                    <TouchableOpacity key={index} onPress={() => this.onLessonClick(lesson)} style={styles.topic}>
                                        {
                                            lesson.lesson_type === 'video' && (<Icon
                                                name='controller-play'
                                                size={75}
                                                type='entypo'
                                                color='black'
                                                containerStyle={styles.scoreIconContainer}
                                            />)
                                        }
                                        {
                                            lesson.lesson_type === 'article' && (<Icon
                                                name='text-document'
                                                size={75}
                                                type='entypo'
                                                color='black'
                                                containerStyle={styles.scoreIconContainer}
                                            />)
                                        }
                                        {
                                            lesson.lesson_type === 'quiz' && (<Icon
                                                name='format-list-checks'
                                                size={75}
                                                type='material-community'
                                                color='black'
                                                containerStyle={styles.scoreIconContainer}
                                            />)
                                        }
                                        <Text numberOfLines={2} style={styles.topicText}>{lesson.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            )
        }));
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View>
                    <View>
                        <Text style={styles.chaptersCount}>{chaptersCount} Chapters | {topicsCount} Topics</Text>
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.props.getSubjectDetails(this.props.navigation.state.params.subjectDetails.slug)} />
                        }
                        style={styles.chapterContainer}>
                        {chapterLessons}
                    </ScrollView>

                </View>
                <ActionButton
                    buttonColor='#1E88E5'
                    shadowStyle={{ elevation: 10 }}
                    fixNativeFeedbackRadius={true}
                    useNativeFeedback={true}
                    renderIcon={() => <Image style={{ width: 40, height: 44, resizeMode: "contain" }} source={{ uri: 'https://i.imgur.com/eZvXxPG.png' }} />}
                    onPress={() => {
                        if (this.props.navigation.state.params.subjectDetails.purchased) {
                            this.props.navigation.navigate('QuestionAnswers', { 'subject_qna': true, 'subject_slug': this.props.navigation.state.params.subjectDetails.slug, 'subject_title': this.props.navigation.state.params.subjectDetails.title });
                        } else {
                            Alert.alert(
                                '',
                                'Please purchase the subject to view it !',
                                [
                                    {
                                        text: 'Cancel',
                                        style: 'cancel',
                                    },
                                    { text: 'Buy Now', onPress: () => this.props.navigation.navigate('BuyPackage') },
                                ],
                                { cancelable: true },
                            );
                        }
                    }}
                />
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        subject: state.SubjectsReducer
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, getSubjectDetails }
)(SubjectDashboard);