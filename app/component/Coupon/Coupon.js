import React, { Component } from 'react'
import { Keyboard, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
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
        nextProps.couponAdded != this.props.couponAdded && nextProps.couponAdded && this.setState({ isModalVisible: false });
    }

    async componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.props.getCoupons();
        });
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                {/* <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>Coming Soon</Text>
                </View> */}
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
                                <View key={coupon.code} style={{ flex: 1, padding: 20, backgroundColor: Colors.appTheme, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 4, }}>
                                        <Text style={{ fontSize: 18, fontWeight: '700' }}>{coupon.name}</Text>
                                        <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: '300' }}>{coupon.remaining} tk discount remaining</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#fff', flex: 2, padding: 5 }}>
                                        <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 18, fontWeight: '700' }}>{coupon.code}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        this.props.coupons.length === 0 && (
                            <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 5 }}>
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>If you have any coupon please add here.</Text>
                            </View>
                        )
                    }
                </ScrollView>
                <TouchableOpacity onPress={this._toggleModal} style={{ padding: 20, backgroundColor: Colors.appTheme, height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: '600', color: 'black' }}>Add Coupon</Text>
                    <Icon size={30} name='arrowright' type='antdesign' color='black' containerStyle={{ left: 20, marginTop: 5 }} />
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