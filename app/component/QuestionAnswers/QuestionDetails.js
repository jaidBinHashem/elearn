import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import moment from 'moment';
import { Avatar, Button, Icon } from 'react-native-elements';

import { getService } from '../../network';
import colors from '../../global/../global/colors';
import styles from './styles';

class QuestionDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Questions & Answers',
    });

    constructor(props) {
        super(props);
        this.state = {
            responses: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.getResponses();
        });
    }

    getResponses = async () => {
        const request = {
            endPoint: 'questions/' + this.props.navigation.state.params.question.id + '/answers',
            showLoader: true,
            authenticate: true
        }
        let response = await getService(request);
        this.setState({ responses: response.data.data });
    }

    componentWillUnmount() {
        this.focusListener.remove();
        loaderHandler.hideLoader();
    }

    render() {
        let { question } = this.props.navigation.state.params;
        let responses = [...this.state.responses];
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        key={question.created_at}
                        style={styles.questionCardContainer}>
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
                        <Text style={styles.responseCount}>{question.global_answers_count} RESPONSES</Text>
                    </View>

                    {
                        responses.map(response =>
                            <View
                                key={response.created_at}
                                style={[styles.questionCardContainer, { borderTopColor: '#fff' }]}>
                                <View style={styles.avatarContainer}>
                                    <Avatar
                                        rounded={true}
                                        size="medium"
                                        source={{
                                            uri:
                                                response.user.full_url_avatar,
                                        }}
                                    />
                                    <View style={styles.nameDateContainer}>
                                        <Text style={styles.userName}>{response.user.full_name}</Text>
                                        <Text>{moment(response.created_at).format("Do MMM")}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View>
                                        <Text style={styles.question}>{response.reply}</Text>
                                    </View>
                                    {
                                        response.file_one &&
                                        <View style={styles.imageContainer}>
                                            <Image
                                                style={{ width: 100, height: 100, marginTop: 20 }}
                                                source={{ uri: response.file_one }}
                                            />
                                        </View>
                                    }
                                    {
                                        response.file_two &&
                                        <View style={styles.imageContainer}>
                                            <Image
                                                style={{ width: 100, height: 100, marginTop: 20 }}
                                                source={{ uri: response.file_two }}
                                            />
                                        </View>
                                    }
                                    {
                                        response.file_three &&
                                        <View style={styles.imageContainer}>
                                            <Image
                                                style={{ width: 100, height: 100, marginTop: 20 }}
                                                source={{ uri: response.file_three }}
                                            />
                                        </View>
                                    }
                                </View>
                            </View>
                        )
                    }

                </ScrollView>
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate('AddQuestion', { 'question_id': question.id })}
                        buttonStyle={{ backgroundColor: colors.appTheme, height: 50 }}
                        title="Add Answer"
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
)(QuestionDetails);