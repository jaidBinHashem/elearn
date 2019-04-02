import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import colors from '../../global/colors'
import styles from './styles';

class SubjectDashboard extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Subject Title',
    });

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.checkAuth();
        }, 1000)
    }

    switchToApp = async () => {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View>
                    <View>
                        <Text>6 Chapters | 66 Topics</Text>
                    </View>
                    <View style={styles.chapterContainer}>
                        <View>
                            <Text>Chapter 1</Text>
                        </View>
                        <View style={styles.topicContainer}>
                            <TouchableOpacity style={styles.topic}>
                                <Icon
                                    name='controller-play'
                                    size={35}
                                    type='entypo'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Video</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.topic}>
                                <Icon
                                    name='text-document'
                                    size={35}
                                    type='entypo'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Doc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizDashboard')} style={styles.topic}>
                                <Icon
                                    name='format-list-checks'
                                    size={35}
                                    type='material-community'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Quiz</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text>Chapter 2</Text>
                        </View>
                        <View style={styles.topicContainer}>
                            <TouchableOpacity style={styles.topic}>
                                <Icon
                                    name='controller-play'
                                    size={35}
                                    type='entypo'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Video</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.topic}>
                                <Icon
                                    name='text-document'
                                    size={35}
                                    type='entypo'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Doc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizDashboard')} style={styles.topic}>
                                <Icon
                                    name='format-list-checks'
                                    size={35}
                                    type='material-community'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Quiz</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text>Chapter 3</Text>
                        </View>
                        <View style={styles.topicContainer}>
                            <TouchableOpacity style={styles.topic}>
                                <Icon
                                    name='controller-play'
                                    size={35}
                                    type='entypo'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Video</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.topic}>
                                <Icon
                                    name='text-document'
                                    size={35}
                                    type='entypo'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Doc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizDashboard')} style={styles.topic}>
                                <Icon
                                    name='format-list-checks'
                                    size={35}
                                    type='material-community'
                                    color='black'
                                    containerStyle={styles.scoreIconContainer}
                                />
                                <Text style={styles.topicText}>Quiz</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
    { checkAuth }
)(SubjectDashboard);