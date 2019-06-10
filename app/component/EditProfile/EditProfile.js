import React, { Component } from 'react'
import { Keyboard, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import { Icon, Avatar, Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { connect } from "react-redux";
import { editUser } from '../../redux/actions/UserActions';
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
            name: null,
            nameError: "",
            gender: null,
            location: null,
            birthDate: null,
            imageData: null,
            uploadImage: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user != nextProps.user) {
            Toast.show("Profile update successfull");
            this.props.navigation.goBack();
        }
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    changeImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let imageData = {
                    name: response.fileName,
                    type: response.type,
                    uri: response.uri
                };
                this.setState({ imageData, uploadImage: true })
            }
        });
    }

    editProfile = () => {
        Keyboard.dismiss();
        let profile = new FormData();
        this.state.name && profile.append("name", this.state.name);
        this.state.gender && profile.append("gender", this.state.gender);
        this.state.location && profile.append("location", this.state.location);
        this.state.birthDate && profile.append("birth_date", this.state.birthDate);
        this.state.uploadImage && profile.append("image", this.state.imageData);
        profile._parts.length > 0 && this.props.editUser(profile);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView keyboardShouldPersistTaps={"handled"} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ elevation: 10, marginRight: 20 }}>
                            <Avatar
                                rounded
                                showEditButton={true}
                                // editButton={{ containerStyle: { backgroundColor: Colors.appTheme, borderRadius:4 } }}
                                size="large"
                                source={{
                                    uri: !this.state.imageData ? this.props.user.avatar : this.state.imageData.uri,
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
                                value={this.state.name ? this.state.name : this.props.user.name}
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
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', marginBottom: 10 }}>Gender</Text>
                            </View>
                            <View style={{ padding: 2, marginHorizontal: 10, borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                                <Picker
                                    selectedValue={this.state.gender ? this.state.gender : this.props.user.gender}
                                    style={{ height: 50 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ gender: itemValue })
                                    }>
                                    <Picker.Item label="Select" value={null} />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
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
                                onChangeText={(location) => this.setState({ location })}
                                value={this.state.location ? this.state.location : this.props.user.location}
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
                                    date={this.state.birthDate ? this.state.birthDate : this.props.user.birthDate}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    maxDate={moment(new Date()).format("YYYY-MM-DD")}
                                    customStyles={{
                                        dateInput: {
                                            height: 50,
                                            borderColor: 'lightgray',
                                            borderWidth: 2,
                                            borderRadius: 5
                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => { this.setState({ birthDate: date }) }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.editProfile()} style={{ backgroundColor: Colors.appTheme, justifyContent: 'center', height: 60, borderRadius: 5, marginHorizontal: 10, marginVertical: 15 }}>
                            <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center' }}>
                                <Icon name='update' type='material-community' color='#fff' containerStyle={{ right: 15 }} />
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Update</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BusyIndicator />
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
    { checkAuth, editUser }
)(EditProfile);