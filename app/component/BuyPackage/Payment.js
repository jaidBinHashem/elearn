import React, { Component } from 'react'
import { View, WebView, Text, } from 'react-native';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import { resetSelectedPackages } from '../../redux/actions/PackageActions';
import { getSubjects } from '../../redux/actions/SubjectActions';

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
                        onLoadStart={() => loaderHandler.showLoader("Loading")}
                        onLoadEnd={() => loaderHandler.hideLoader()}
                        onError={(err) => console.log(err, "here err")}
                        onNavigationStateChange={(state) => {
                            state.title === "Payment Success" && (this.props.resetSelectedPackages(), this.props.getSubjects(), setTimeout(() => { this.props.navigation.goBack(); this.props.navigation.navigate('MySubjects') }, 2000));
                            state.title === "Payment Failed" && (this.props.resetSelectedPackages(), this.props.navigation.goBack());
                            state.title === "Payment Cancelled" && (this.props.resetSelectedPackages(), this.props.navigation.navigate('Loader'));
                        }}
                    />)
                }
                <BusyIndicator />
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
    { checkAuth, resetSelectedPackages, getSubjects }
)(Payment);