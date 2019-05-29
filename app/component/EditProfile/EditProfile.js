import React, { Component } from 'react'
import { ActivityIndicator, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Avatar, Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


class EditProfile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Edit Profile',
        // headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            nameError: "",
            email: this.props.user.email,
            emailError: "",
            location: null,
            avatarSource: null
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentDidMount() {
        // let token = await AsyncStorage.getItem('USER_TOKEN')
        // console.log(token, "token in dash")
    }

    changeImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ elevation: 10, marginRight: 20 }}>
                            <Avatar
                                rounded
                                showEditButton={true}
                                // editButton={{ containerStyle: { backgroundColor: Colors.appTheme, borderRadius:4 } }}
                                size="large"
                                source={{
                                    uri: !this.state.avatarSource ? 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' : this.state.avatarSource.uri,
                                }}
                                containerStyle={{ elevation: 10 }}
                                onEditPress={() => this.changeImage()}
                            />
                        </View>
                    </View>

                    <View style={{ marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '600', color: 'black', fontSize: 16 }}>Profile Details</Text>
                    </View>
                    <View>
                        <View style={{ marginBottom: 20, }}>
                            <Input
                                label="FULL NAME"
                                labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
                                inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                                placeholder='Your Full Name'
                                errorStyle={{ color: 'red' }}
                                errorMessage={this.props.nameError}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                leftIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        type='font-awesome'
                                        name='user'
                                        color={Colors.appTheme}
                                        containerStyle={{ marginRight: 10 }}
                                    />
                                }
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Input
                                label="EMAIL"
                                labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
                                inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                                placeholder='Your Email'
                                errorStyle={{ color: 'red' }}
                                errorMessage={this.props.emailError}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                keyboardType={'email-address'}
                                leftIcon={
                                    <Icon
                                        name='email'
                                        size={24}
                                        type='entypo'
                                        color={Colors.appTheme}
                                        containerStyle={{ marginRight: 10 }}
                                    />
                                }
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', marginBottom: 10 }}>Gender</Text>
                            </View>
                            <View style={{ padding: 2, marginHorizontal: 10, borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={{ height: 50 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ language: itemValue })
                                    }>
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Input
                                label="LOCATION"
                                labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
                                inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}
                                placeholder='Your Location'
                                errorStyle={{ color: 'red' }}
                                errorMessage={this.props.emailError}
                                onChangeText={(email) => this.setState({ location })}
                                value={this.state.location}
                                keyboardType={'email-address'}
                                leftIcon={
                                    <Icon
                                        name='location-pin'
                                        size={24}
                                        type='entypo'
                                        color={Colors.appTheme}
                                        containerStyle={{ marginRight: 10 }}
                                    />
                                }
                            />
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', marginBottom: 10 }}>BIRTHDAY</Text>
                            </View>
                            <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                                <DatePicker
                                    style={{ width: '100%', height: 50 }}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={{
                                        // dateIcon: {
                                        //     position: 'absolute',
                                        //     left: 10,
                                        //     right:100,
                                        //     top: 4,
                                        //     marginLeft: 0
                                        // },
                                        dateInput: {
                                            height: 50,
                                            borderColor: 'lightgray',
                                            borderWidth: 2,
                                            borderRadius: 5
                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: Colors.appTheme, justifyContent: 'center', height: 60, borderRadius: 5, marginHorizontal: 10, marginVertical: 15 }}>
                            <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center' }}>
                                <Icon name='update' type='material-community' color='#fff' containerStyle={{ right: 15 }} />
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Update</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        user: state.UserReducer
    };
}

export default connect(
    mapStateToProps,
    { checkAuth }
)(EditProfile);