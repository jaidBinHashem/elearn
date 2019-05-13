import React, { Component } from 'react'
import { ActivityIndicator, View, StatusBar, Text } from 'react-native';
import VideoView from 'react-native-android-fullscreen-webview-video';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import colors from '../../global/../global/colors'
import styles from './styles';

class Player extends Component {
    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.checkAuth();
        }, 1000)
    }


    componentWillUnmount() {
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <VideoView
                    originWhitelist={['*']}
                    style={{ height: 300 }}
                    source={{ uri: 'http://172.16.228.145:8080/api/lesso' }}
                />
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
    { checkAuth }
)(Player);