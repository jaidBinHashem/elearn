import React, { Component } from 'react'
import { View, StatusBar, Text, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import Modal from "react-native-modal";
import { Icon, Input } from 'react-native-elements';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { submitPackages } from '../../redux/actions/PackageActions';
import { getCoupons, addCoupon } from '../../redux/actions/CouponActions';

import Colors from '../../global/colors';
import styles from './styles';

class ConfirmBuyPackage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Buy Package',
    });

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            pkgArr: [],
            selectedCoupon: null,
            code: null
        }
    }

    componentWillMount() {
        this.props.getCoupons();
    }

    componentDidMount() {
        let pkgArr = [];
        this.props.selectedPackages.length > 0 && this.props.selectedPackages.map((pkg) => {
            let selectedPkg = {
                "slug": pkg.slug,
                "package": pkg.selectedPkg.id
            }
            pkgArr.push(selectedPkg);
        });
        this.setState({ pkgArr });
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
        nextProps.couponAdded != this.props.couponAdded && nextProps.couponAdded && this.setState({ isModalVisible: false });
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render() {
        let { totalPrice } = this.props;
        this.state.selectedCoupon && (totalPrice = totalPrice - parseInt(this.state.selectedCoupon.remaining))
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
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
                <View style={{ flex: .9 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            this.props.selectedPackages.length > 0 && this.props.selectedPackages.map((mainPackage, index) => {
                                return (
                                    <View key={index} style={styles.pkgCard}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: '700', maxWidth: 200 }}>{mainPackage.title}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18, marginLeft: 20 }}>{mainPackage.selectedPkg.name} ({mainPackage.selectedPkg.duration && mainPackage.selectedPkg.duration.split('.')[0]} {mainPackage.selectedPkg.unit && mainPackage.selectedPkg.unit})</Text>
                                            <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 20 }}>{mainPackage.selectedPkg.price} tk</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: Colors.appTheme, fontSize: 18, marginVertical: 20 }}>Coupons</Text>
                        <TouchableOpacity onPress={this._toggleModal}>
                            <Text style={{ color: Colors.appTheme, fontSize: 18, marginVertical: 20, fontWeight: '500', marginRight: 10 }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {
                            this.props.coupons.length > 0 && this.props.coupons.map((coupon, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.couponCard}
                                        onPress={() => this.state.selectedCoupon && this.state.selectedCoupon.code === coupon.code ? this.setState({ selectedCoupon: null }) : this.setState({ selectedCoupon: coupon })
                                        }
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', maxWidth: 150, color: Colors.appTheme }}>{coupon.code}</Text>
                                            {this.state.selectedCoupon && this.state.selectedCoupon.code === coupon.code && <Icon name="checkcircle" type="antdesign" color={Colors.appTheme} />}
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18 }}>{parseInt(coupon.remaining)} tk remaining</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => {
                    this.props.submitPackages(this.state.pkgArr, this.state.selectedCoupon ? this.state.selectedCoupon.code : null);
                    this.props.navigation.replace('Payment');
                }
                } style={{ flex: .1, backgroundColor: Colors.appTheme, marginVertical: 3, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: 20 }}>Checkout : {totalPrice < 0 ? 0 : totalPrice} tk</Text>
                </TouchableOpacity>
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        selectedPackages: state.PackageReducer.selectedPackages,
        totalPrice: state.PackageReducer.totalPrice,
        coupons: state.CouponReducer.coupons,
        couponAdded: state.CouponReducer.couponAdded
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, submitPackages, getCoupons, addCoupon }
)(ConfirmBuyPackage);