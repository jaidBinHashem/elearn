import React, { Component } from 'react'
import { View, WebView, Text, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import VideoView from 'react-native-android-fullscreen-webview-video';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import colors from '../../global/../global/colors'
import styles from './styles';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: null,
            paymentHTML: null
        }
    }


    componentWillReceiveProps(nextProps) {
        nextProps.paymentHTML && nextProps.paymentHTML != null && this.setState({ paymentHTML: nextProps.paymentHTML });
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentDidMount() {

    }


    componentWillUnmount() {

    }

    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                {
                    this.state.paymentHTML != null &&
                    (<WebView
                        style={{ flex: 1, }}
                        originWhitelist={['*']}
                        source={{ html: this.state.paymentHTML }}
                        onLoadEnd={() => console.log("loaded")}
                        onError={(err) => console.log(err, "here err")}
                    />)
                }
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        paymentHTML: state.PackageReducer.paymentHTML
    };
}

export default connect(
    mapStateToProps,
    { checkAuth }
)(Payment);