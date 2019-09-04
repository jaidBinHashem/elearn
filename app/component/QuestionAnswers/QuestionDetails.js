import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, Image, RefreshControl, Modal, TouchableOpacity, Alert } from 'react-native'
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import moment from 'moment';
import { Avatar, Button, Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';

import { getService, deleteService } from '../../network';
import colors from '../../global/../global/colors';
import styles from './styles';

class QuestionDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Questions Reponse',
    });

    constructor(props) {
        super(props);
        this.state = {
            responses: [],
            refreshing: false,
            modalView: false,
            selectedImage: []
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
        let { subject_qna, subject_slug } = this.props.navigation.state.params;
        const request = {
            endPoint: subject_qna ? subject_slug + '/questions/' + this.props.navigation.state.params.question.id + '/answers' : 'questions/' + this.props.navigation.state.params.question.id + '/answers',
            showLoader: true,
            authenticate: true
        }
        let response = await getService(request);
        this.setState({ responses: response.data.data, refreshing: false });
    }

    showModal = (url) => {
        let selectedImage = [];
        let image = {
            'url': url
        }
        selectedImage.push(image);
        this.setState({ selectedImage, modalView: true })
    }

    confirmDeleteResponse = (question_id, answer_id) => {
        Alert.alert(
            'Delete Answer !',
            'Are you sure you want to delete the answer ?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        this.deleteResponse(question_id, answer_id);
                    }
                },
            ],
            { cancelable: true },
        );
    }

    deleteResponse = async (question_id, answer_id) => {
        let url = this.props.navigation.state.params.subject_qna ? this.props.navigation.state.params.subject_slug + '/questions/' + question_id + '/answers/' + answer_id : 'questions/' + question_id + '/answers/' + answer_id;
        const request = {
            endPoint: url,
            showLoader: true,
            authenticate: true
        }
        let response = await deleteService(request);
        response.success
            ? (Toast.show("Question deleted successfull"), this.getResponses())
            : Toast.show("Something went wrong, Please try again !");
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
                <Modal visible={this.state.modalView} transparent={true} onRequestClose={() => this.setState({ modalView: false })}>
                    <ImageViewer
                        imageUrls={this.state.selectedImage}
                        enableSwipeDown={true}
                        onCancel={() => this.setState({ modalView: false })}
                    />
                </Modal>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.getResponses()} />
                    }
                    showsVerticalScrollIndicator={false}>
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
                                <Text>{moment(question.created_at).format('MMMM Do YYYY, h:mm a')}</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.question}>{question.question}</Text>
                            </View>
                            {
                                question.file_one &&
                                <TouchableOpacity
                                    onPress={() => this.showModal(question.file_one)}
                                    style={styles.imageContainer}>
                                    <Image
                                        style={{ width: 200, height: 200 }}
                                        source={{ uri: question.file_one }}
                                    />
                                </TouchableOpacity>
                            }
                            {
                                question.file_two &&
                                <TouchableOpacity
                                    onPress={() => this.showModal(question.file_two)}
                                    style={styles.imageContainer}>
                                    <Image
                                        style={{ width: 200, height: 200 }}
                                        source={{ uri: question.file_two }}
                                    />
                                </TouchableOpacity>
                            }
                            {
                                question.file_three &&
                                <TouchableOpacity
                                    onPress={() => this.showModal(question.file_three)}
                                    style={styles.imageContainer}>
                                    <Image
                                        style={{ width: 200, height: 200 }}
                                        source={{ uri: question.file_three }}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                        <Text style={styles.responseCount}>{question.global_answers_count || question.subject_answers_count || 0} ANSWERS</Text>
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
                                        <Text>{moment(response.created_at).format('MMMM Do YYYY, h:mm a')}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View>
                                        <Text style={styles.question}>{response.reply}</Text>
                                    </View>
                                    {
                                        response.file_one &&
                                        <TouchableOpacity
                                            onPress={() => this.showModal(response.file_one)}
                                            style={styles.imageContainer}>
                                            <Image
                                                style={{ width: 200, height: 200 }}
                                                source={{ uri: response.file_one }}
                                            />
                                        </TouchableOpacity>
                                    }
                                    {
                                        response.file_two &&
                                        <TouchableOpacity
                                            onPress={() => this.showModal(response.file_two)}
                                            style={styles.imageContainer}>
                                            <Image
                                                style={{ width: 200, height: 200 }}
                                                source={{ uri: response.file_two }}
                                            />
                                        </TouchableOpacity>
                                    }
                                    {
                                        response.file_three &&
                                        <TouchableOpacity
                                            onPress={() => this.showModal(response.file_three)}
                                            style={styles.imageContainer}>
                                            <Image
                                                style={{ width: 200, height: 200 }}
                                                source={{ uri: response.file_three }}
                                            />
                                        </TouchableOpacity>
                                    }
                                </View>
                                {
                                    response.user.id === this.props.userId && (
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 15 }}>
                                            <Icon containerStyle={{ marginHorizontal: 10 }} name='edit' type='antdesign' color='gray' size={20} />
                                            <Icon onPress={() => this.confirmDeleteResponse(response.question_id, response.id)} containerStyle={{ marginHorizontal: 10 }} name='delete' type='antdesign' color='gray' size={20} />
                                        </View>
                                    )
                                }
                            </View>
                        )
                    }

                </ScrollView>
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate('AddQuestion', {
                            'question_id': question.id,
                            'subject_qna': this.props.navigation.state.params.subject_qna ? true : false,
                            'subject_slug': this.props.navigation.state.params.subject_qna ? this.props.navigation.state.params.subject_slug : false
                        })}
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
        auth: state.AuthReducer,
        userId: state.UserReducer.id
    };
}

export default connect(
    mapStateToProps,
    {}
)(QuestionDetails);