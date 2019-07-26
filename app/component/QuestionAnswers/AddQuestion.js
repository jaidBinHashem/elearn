import React, { Component } from 'react'
import { View, StatusBar, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from "react-redux";

import ImagePicker from 'react-native-image-picker';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import moment from 'moment';
import { Input, Button, Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import { getService } from '../../network';
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
        title: 'Questions & Answers',
    });

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            images: []
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
                this.setState({ images });
            }
        });
    }

    render() {
        let { images } = this.state;
        console.log(images);
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        label='Enter your question'
                        // inputContainerStyle={{height:300}}
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
                            onPress={() => this.uploadImage()}
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
                            onPress={() => this.uploadImage()}
                            buttonStyle={{backgroundColor: colors.appTheme}}
                            containerStyle={{ marginTop: 20 }}
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
                            title="Submit Question"
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