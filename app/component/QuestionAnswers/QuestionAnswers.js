import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import moment from 'moment';
import { Avatar } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import { getService } from '../../network';
import colors from '../../global/../global/colors';
import styles from './styles';

class QuestionAnswers extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Questions & Answers',
    });

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentWillMount() {
        this.getQuestions();
    }

    getQuestions = async () => {
        const request = {
            endPoint: 'questions',
            showLoader: true,
            authenticate: true
        }
        let questions = await getService(request);
        this.setState({ questions: questions.data.data });
    }

    componentWillUnmount() {
        loaderHandler.hideLoader();
    }

    render() {
        let { questions } = this.state;
        console.log(questions, "here");
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {
                        questions.map(question =>
                            <TouchableOpacity key={question.created_at} style={styles.questionCardContainer}>
                                <View style={styles.avatarContainer}>
                                    <Avatar
                                        rounded={true}
                                        size="medium"
                                        source={{
                                            uri:
                                                question.user.full_url_avatar,
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
                                    {/* <View style={styles.imageContainer}>
                                        <Image
                                            style={{ width: 100, height: 100, marginTop: 20 }}
                                            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                        />
                                    </View> */}
                                </View>
                                <Text style={styles.responseCount}>{question.global_answers_count} RESPONSES</Text>
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
                    onPress={() => this.props.navigation.navigate('AddQuestion')}
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