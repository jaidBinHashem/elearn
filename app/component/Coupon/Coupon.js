import React, { Component } from 'react'
import { Keyboard, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BusyIndicator from 'react-native-busy-indicator';
import { Icon, Input } from 'react-native-elements';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getCoupons, addCoupon } from '../../redux/actions/CouponActions';

import Colors from '../../global/colors';
import styles from './styles';

class Coupon extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Coupon',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            code: null
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
        nextProps.couponAdded != this.props.couponAdded && nextProps.couponAdded && this._toggleModal();
    }

    async componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.props.getCoupons();
        });
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
                <ScrollView keyboardShouldPersistTaps={"handled"} showsVerticalScrollIndicator={false}>
                    <Modal
                        isVisible={this.state.isModalVisible}
                        animationInTiming={500}
                        animationOutTiming={500}
                        avoidKeyboard={true}
                        onBackButtonPress={this._toggleModal}
                        onBackdropPress={this._toggleModal}
                    >
                        <View style={{ backgroundColor: '#fff', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <Icon name='dollar-bill' type='foundation' color={Colors.appTheme} size={80} />
                            </View>
                            <View>
                                <Text style={{ marginVertical: 20 }}>Enter your cupon code below to get discount !</Text>
                            </View>
                            <View style={{ marginHorizontal: 15 }}>
                                <Input
                                    inputContainerStyle={{ borderColor: 'lightgray', borderWidth: 2, borderRadius: 5, width: '100%' }}
                                    placeholder='Enter your cupon'
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={this.props.nameError}
                                    onChangeText={(code) => this.setState({ code })}
                                />
                            </View>
                            <View style={{ width: '88%' }}>
                                <TouchableOpacity onPress={() => { Keyboard.dismiss(); this.props.addCoupon(this.state.code) }} style={{ padding: 20, backgroundColor: Colors.appTheme, height: 60, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Apply Cupon</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {
                        this.props.coupons.map(coupon => {
                            return (
                                <TouchableOpacity key={coupon.code} style={{ padding: 20, backgroundColor: Colors.appTheme, height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 18, fontWeight: '700' }}>{coupon.code}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '300' }}>{coupon.remaining} tk discount remaining</Text>
                                    </View>
                                    <View>
                                        <Icon name='dollar-bill' type='foundation' color='#fff' />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <TouchableOpacity onPress={this._toggleModal} style={{ padding: 20, backgroundColor: Colors.appTheme, height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Add Cupon</Text>
                    <Icon name='arrowright' type='antdesign' color='black' containerStyle={{ left: 20, marginTop: 5 }} />
                </TouchableOpacity>
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        coupons: state.CouponReducer.coupons,
        couponAdded: state.CouponReducer.couponAdded
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, getCoupons, addCoupon }
)(Coupon);