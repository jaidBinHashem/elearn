import React, { Component } from 'react'
import { View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from "react-redux";
import { getService } from '../../network'

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import Colors from '../../global/colors';
import styles from './styles';

class ArticleWebView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
    });

    constructor(props) {
        super(props);
        this.state = {
            content: null
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    async componentDidMount() {
        const request = {
            endPoint: this.props.navigation.state.params.category + '/' + this.props.navigation.state.params.slug,
            authenticate: true,
            showLoader: true
        }
        let content = await getService(request);
        this.setState({ content: content.data.data });
    }

    componentWillUnmount() {
        loaderHandler.hideLoader();
    }



    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                {this.state.content && (
                    <WebView
                        originWhitelist={['*']}
                        scalesPageToFit={this.props.navigation.state.params.lesson ? true : false}
                        source={{ html: this.props.navigation.state.params.lesson ? this.state.content.content.description : this.state.content.description }}
                        onLoadStart={() => loaderHandler.showLoader("Loading")}
                        onLoadEnd={() => loaderHandler.hideLoader()}
                    />)}
                <BusyIndicator />
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
    {}
)(ArticleWebView);