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
            notifications: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentWillMount() {
        const request = {
            endPoint: 'questions',
            showLoader: true,
            authenticate: true
        }
        let notifications = await getService(request);
        this.setState({ notifications: notifications.data });
    }

    componentWillUnmount() {
        loaderHandler.hideLoader();
    }

    render() {
        let { notifications } = this.state;
        console.log(notifications);
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.questionCardContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar
                                rounded
                                size="medium"
                                source={{
                                    uri:
                                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                }}
                            />
                            <View style={styles.nameDateContainer}>
                                <Text style={styles.userName}>User name</Text>
                                <Text>10th July, 2019</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.question}>Long text, long long text, Long text, long long text, Long text, long long text</Text>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={{ width: 100, height: 100, marginTop: 20 }}
                                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                />
                            </View>
                        </View>
                        <Text style={styles.responseCount}>5 RESPONSES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.questionCardContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar
                                rounded
                                size="medium"
                                source={{
                                    uri:
                                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                }}
                            />
                            <View style={styles.nameDateContainer}>
                                <Text style={styles.userName}>User name</Text>
                                <Text>10th July, 2019</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.question}>Long text, long long text, Long text, long long text, Long text, long long text</Text>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={{ width: 100, height: 100, marginTop: 20 }}
                                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate('AddQuestion')}
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