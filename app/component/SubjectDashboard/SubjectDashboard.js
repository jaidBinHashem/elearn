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

    render() {
        let chapters = [...this.props.subject.subjectDetails];
        let chapterLessons = [], chaptersCount = 0, topicsCount = 0;
        chapters.length > 0 && chapterLessons.push(chapters.map((chapter, index) => {
            ++chaptersCount;
            return (
                <View key={index}>
                    <View>
                        <Text>{chapter.title}</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topicContainer}>
                        {
                            chapter.lessons.map((lesson, index) => {
                                ++topicsCount;
                                return (
                                    <TouchableOpacity key={index} onPress={() => {
                                        if (lesson.lesson_type === 'video') {
                                            this.props.navigation.navigate('Player')
                                        } else if (lesson.lesson_type === 'quiz') {
                                            this.props.navigation.navigate('QuizDashboard', { lessonId: lesson.id })
                                        }
                                    }} style={styles.topic}>
                                        {
                                            lesson.lesson_type === 'video' && (<Icon
                                                name='controller-play'
                                                size={35}
                                                type='entypo'
                                                color='black'
                                                containerStyle={styles.scoreIconContainer}
                                            />)
                                        }
                                        {
                                            lesson.lesson_type === 'article' && (<Icon
                                                name='text-document'
                                                size={35}
                                                type='entypo'
                                                color='black'
                                                containerStyle={styles.scoreIconContainer}
                                            />)
                                        }
                                        {
                                            lesson.lesson_type === 'quiz' && (<Icon
                                                name='format-list-checks'
                                                size={35}
                                                type='material-community'
                                                color='black'
                                                containerStyle={styles.scoreIconContainer}
                                            />)
                                        }
                                        <Text numberOfLines={1} style={styles.topicText}>{lesson.title}</Text>
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
                    <View style={styles.chapterContainer}>
                        {chapterLessons}
                    </View>

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