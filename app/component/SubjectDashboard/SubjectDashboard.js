import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getSubjectDetails } from '../../redux/actions/SubjectActions';

import colors from '../../global/colors'
import styles from './styles';

class SubjectDashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        return ({
            title: navigation.state.params.subjectDetails.title,
        })
    };

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        this.props.navigation.state.params.subjectDetails && (this.props.getSubjectDetails(this.props.navigation.state.params.subjectDetails.slug), loaderHandler.showLoader("Loading"));
    }

    componentWillUnmount() {

    }

    onLessonClick = (lesson) => {
        if (this.props.navigation.state.params.subjectDetails.purchased || lesson.preview) {
            if (lesson.lesson_type === 'video') {
                this.props.navigation.navigate('Player', { title: lesson.title, slug: lesson.slug, description: lesson.description })
            } else if (lesson.lesson_type === 'quiz') {
                this.props.navigation.navigate('QuizDashboard', { showExplanation: false, lessonId: lesson.id })
            } else {
                this.props.navigation.navigate('ArticleWebView', { lesson: true, title: lesson.title, slug: lesson.slug, category: 'user/lessons' })
            }
        } else {
            console.log("Vai age kinen");
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
                    <ScrollView style={styles.chapterContainer}>
                        {chapterLessons}
                    </ScrollView>

                </View>
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