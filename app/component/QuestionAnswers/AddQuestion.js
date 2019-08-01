import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'
import { connect } from "react-redux";

import ImagePicker from 'react-native-image-picker';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import Toast from 'react-native-simple-toast';
import { Input, Button, Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import { postService } from '../../network';
import colors from '../../global/../global/colors';
import styles from './styles';

const options = {
    title: 'Add Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class AddQuestion extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.question_id ? 'Add Response' : 'Ask Question',
    });

    constructor(props) {
        super(props);
        this.state = {
            question: null,
            uploadImage: false,
            images: []
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentWillMount() {

        console.log(this.props.navigation.state.params)

    }

    componentWillUnmount() {
        loaderHandler.hideLoader();
    }

    uploadImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let images = [...this.state.images];
                let imageData = {
                    name: response.fileName,
                    type: response.type,
                    uri: response.uri
                };
                images.push(imageData);
                this.setState({ images, uploadImage: true });
            }
        });
    }

    submitQuestion = async () => {
        Keyboard.dismiss();
        let { question_id, subject_qna, subject_slug } = this.props.navigation.state.params;
        let question = new FormData();
        !question_id && this.state.question && question.append("question", this.state.question);
        question_id && this.state.question && question.append("reply", this.state.question);
        this.state.uploadImage && this.state.images.length > 0 && question.append("file_one", this.state.images[0]);
        this.state.uploadImage && this.state.images.length > 1 && question.append("file_two", this.state.images[1]);
        this.state.uploadImage && this.state.images.length > 2 && question.append("file_three", this.state.images[2]);
        if (question._parts.length > 0) {
            let url = null;
            if (subject_qna) {
                url = question_id ? subject_slug + '/questions/' + question_id + '/answers' : subject_slug + '/questions';
            } else {
                url = question_id ? 'questions/' + question_id + '/answers' : 'questions';
            }
            let request = {
                endPoint: url,
                authenticate: true,
                showLoader: true,
                contentType: "multipart/form-data",
                params: question,
            }
            console.log(url, "/url");
            let response = await postService(request);
            console.log(response, "/response");
            if (question_id) {
                response.success
                    ? (Toast.show("Your response has been submited successfully"), this.props.navigation.goBack())
                    : (Toast.show("Something went wrong, Please try again"))
            } else {
                response.success
                    ? (Toast.show("Your question has been submited successfully"), this.props.navigation.goBack())
                    : (Toast.show("Something went wrong, Please try again"))
            }
        }
    }

    render() {
        let { images } = this.state;
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView keyboardShouldPersistTaps={"handled"} showsVerticalScrollIndicator={false}>
                    <Input
                        label='Enter your question'
                        onChangeText={(question) => this.setState({ question })}
                        multiline={true}
                        shake={true} />

                    <View style={{ alignItems: 'center' }}>
                        {
                            images.length > 0 && images.map((image, index) => {
                                return (
                                    <Image
                                        key={index}
                                        source={{ uri: image.uri }}
                                        style={{ margin: 10, width: 300, height: 300 }}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                )
                            })
                        }
                    </View>
                    <View style={{ marginTop: 30, marginHorizontal: 10 }}>
                        <Button
                            onPress={() => this.state.images.length < 3 && this.uploadImage()}
                            icon={
                                <Icon
                                    name="camera"
                                    type="entypo"
                                    size={20}
                                    color="white"
                                    containerStyle={{ marginLeft: 15 }}
                                />
                            }
                            iconRight
                            title="Add Image"
                        />
                        <Button
                            onPress={() => this.submitQuestion()}
                            buttonStyle={{ backgroundColor: colors.appTheme }}
                            containerStyle={{ marginTop: 20 }}
                            // icon={
                            //     <Icon
                            //         name="camera"
                            //         type="entypo"
                            //         size={20}
                            //         color="white"
                            //         containerStyle={{ marginLeft: 15 }}
                            //     />
                            // }
                            // iconRight
                            title={this.props.navigation.state.params.question_id ? 'Submit Response' : 'Submit Question'}
                        />
                    </View>
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
)(AddQuestion);