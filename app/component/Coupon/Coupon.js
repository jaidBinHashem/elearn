import React, { Component } from 'react'
import { ActivityIndicator, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Input } from 'react-native-elements';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

class Coupon extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Coupon',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
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

    signOut = async () => {
        await AsyncStorage.removeItem('USER_TOKEN');
        this.props.navigation.navigate('Loader');
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>Comming Soon</Text>
                </View>
            </View>

        )
        // return (
        //     <View style={[styles.container]}>
        //         <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
        //         <ScrollView showsVerticalScrollIndicator={false}>
        //             <Modal
        //                 isVisible={this.state.isModalVisible}
        //                 animationInTiming={500}
        //                 animationOutTiming={500}
        //                 avoidKeyboard={true}
        //                 onBackButtonPress={this._toggleModal}
        //                 onBackdropPress={this._toggleModal}
        //             >
        //                 <View style={{ backgroundColor: '#fff', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
        //                     <View>
        //                         <Icon name='dollar-bill' type='foundation' color={Colors.appTheme} size={80} />
        //                     </View>
        //                     <View>
        //                         <Text style={{ marginVertical: 20 }}>Enter your cupon code below to extend subsciption!</Text>
        //                     </View>
        //                     <View style={{ marginHorizontal: 15 }}>
        //                         <Input
        //                             // label="FULL NAME"
        //                             // labelStyle={{ color: 'black', fontWeight: '500', marginBottom: 10 }}
        //                             inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5, width: '100%' }}
        //                             placeholder='Enter your cupon'
        //                             errorStyle={{ color: 'red' }}
        //                             errorMessage={this.props.nameError}
        //                             onChangeText={(name) => this.setState({ name })}
        //                         />
        //                     </View>
        //                     <View style={{ width: '88%' }}>
        //                         <TouchableOpacity onPress={this._toggleModal} style={{ padding: 20, backgroundColor: Colors.appTheme, height: 60, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
        //                             <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Apply Cupon</Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //             </Modal>
        //             <TouchableOpacity style={{ padding: 20, backgroundColor: Colors.appTheme, height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        //                 <View>
        //                     <Text style={{ fontSize: 18, fontWeight: '700' }}>Some sponsorship</Text>
        //                     <Text style={{ fontSize: 18, fontWeight: '300' }}>100 tk discount remaining</Text>
        //                 </View>
        //                 <View>
        //                     <Icon name='dollar-bill' type='foundation' color='#fff' />
        //                 </View>
        //             </TouchableOpacity>
        //             <TouchableOpacity style={{ padding: 20, backgroundColor: Colors.appTheme, height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        //                 <View>
        //                     <Text style={{ fontSize: 18, fontWeight: '700' }}>Some sponsorship</Text>
        //                     <Text style={{ fontSize: 18, fontWeight: '300' }}>100 tk discount remaining</Text>
        //                 </View>
        //                 <View>
        //                     <Icon name='dollar-bill' type='foundation' color='#fff' />
        //                 </View>
        //             </TouchableOpacity>
        //         </ScrollView>
        //         <TouchableOpacity onPress={this._toggleModal} style={{ padding: 20, backgroundColor: Colors.appTheme, height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
        //             <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Add Cupon</Text>
        //             <Icon name='arrowright' type='antdesign' color='black' containerStyle={{ left: 20, marginTop: 5 }} />
        //         </TouchableOpacity>
        //     </View>
        // )
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
)(Coupon);