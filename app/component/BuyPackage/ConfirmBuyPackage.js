import React, { Component } from 'react'
import { View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import Colors from '../../global/colors';
import styles from './styles';

class ConfirmBuyPackage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Buy Package',
    });

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ flex: .9 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            this.props.selectedPackages.length > 0 && this.props.selectedPackages.map((mainPackage, index) => {
                                return (
                                    <View key={index} style={{ flex: 1, borderTopWidth: 2, borderTopColor: Colors.appTheme, padding: 20, backgroundColor: '#fff', height: 80, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: '700' }}>{mainPackage.title}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 20 }}>{mainPackage.selectedPkg.duration}</Text>
                                            <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 20 }}>{mainPackage.selectedPkg.price} tk</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <TouchableOpacity style={{ flex: .1, backgroundColor: Colors.appTheme, marginVertical: 3, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: 20 }}>Checkout : {this.props.totalPrice} tk</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        selectedPackages: state.PackageReducer.selectedPackages,
        totalPrice: state.PackageReducer.totalPrice
    };
}

export default connect(
    mapStateToProps,
    { checkAuth }
)(ConfirmBuyPackage);