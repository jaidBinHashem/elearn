import React, { Component } from 'react'
import { ActivityIndicator, View, StatusBar, Text, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import VideoView from 'react-native-webview';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import colors from '../../global/../global/colors'
import styles from './styles';

import { BASE_URL } from '../../network/URL'

class Player extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
    });

    constructor(props) {
        super(props);
        this.state = {
            accessToken: null
        }
    }

    async componentDidMount() {
        let accessToken = await AsyncStorage.getItem("USER_TOKEN");
        this.setState({
            accessToken
        });

        setTimeout(() => {
            // this.props.checkAuth();
        }, 1000)
    }


    componentWillUnmount() {
    }

    render() {
        let yourAlert = "const iframe = document.querySelector('iframe'); const player = new Vimeo.Player(iframe); player.on('ended', function(data) { $.ajax({ type: 'POST', headers: { 'Authorization': 'Bearer " + this.state.accessToken + "', 'X-CSRF-TOKEN': $('meta[name=\"csrf-token\"]').attr('content') }, url: 'http://172.16.228.145:8080/api/lessons/14293/mark-as-complete', data: {}, success: function() { alert('hello'); } }) });";

        return (
            <View style={[styles.container, styles.horizontal]}>
                <View style={{ flex: .4 }} >
                    {this.state.accessToken && (<VideoView
                        onLoadStart={() => loaderHandler.showLoader("Loading")}
                        onLoadEnd={() => loaderHandler.hideLoader()}
                        originWhitelist={['*']}


                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        injectedJavaScript={yourAlert}


                        style={{}}
                        source={{
                            uri: BASE_URL + 'lessons/' + this.props.navigation.state.params.slug + '/video',
                            headers: {
                                Authorization: 'Bearer ' + this.state.accessToken
                            }
                        }}
                    />)}
                </View>
                <View>
                    <Text style={{ margin: 20 }}>{this.props.navigation.state.params.description && this.props.navigation.state.params.description}</Text>
                </View>
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        // auth: state.AuthReducer
    };
}

export default connect(
    mapStateToProps,
    {}
)(Player);