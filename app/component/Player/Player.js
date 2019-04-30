import React, { Component } from 'react'
import { ActivityIndicator, View, StatusBar, Text, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import VideoView from 'react-native-android-fullscreen-webview-video';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';

import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import colors from '../../global/../global/colors'
import styles from './styles';

class Player extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: null
        }
    }


    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentDidMount() {
        let accessToken = await AsyncStorage.getItem("USER_TOKEN");
        this.setState({
            accessToken
        });

        setTimeout(() => {
            this.props.checkAuth();
        }, 1000)
    }


    componentWillUnmount() {
    }

    render() {

        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFlNTU2ZGJkMjJjMDM2N2QyMDFkNGFkNmM4OTk4OGNmNmI4OTU4YWQ5MjU2MGQxMTM1NzZjMjcyYmVkM2I2YWM0MGVlNWYzMzg0MmVlMGFjIn0.eyJhdWQiOiIzIiwianRpIjoiYWU1NTZkYmQyMmMwMzY3ZDIwMWQ0YWQ2Yzg5OTg4Y2Y2Yjg5NThhZDkyNTYwZDExMzU3NmMyNzJiZWQzYjZhYzQwZWU1ZjMzODQyZWUwYWMiLCJpYXQiOjE1NTQ3MzA1ODMsIm5iZiI6MTU1NDczMDU4MywiZXhwIjoxNTg2MzUyOTgzLCJzdWIiOiIyMCIsInNjb3BlcyI6W119.hq5jkPzJB1liKMSlx_LB73edWmDIq4rZfEHU5DqWoDqwHbvUQzpofTe-KSDKmy3amMnhylbg8V7ONIh8ELh7uCnoEW8JtsLWtUGAA1nSx3t_4HYSvaFE9LhHfeTQa98Cs6ysUbgOqd7TaYRHuzgbiKl-vzGSsMkdliWzMDduCBb7eQh-scTX8Dj2GQ8y-ozu0wELo3JB4XOi4KOGfjPqKTtxjqgoRazkSvbRodTPpedURPlTxQIGIKfxfvrm8dFjYIL9eIkM6h_EnRA9QWUyZE-jE1NABaAvAYOy2poKkQxG7-vSk33Ei7gKaiqM5ZMJWGb06081tB7X6lp29YAod0yyDjgmWvvcV36JKkkWSwd1cwV3-qxsHClpkX3nPF6-76S5OLRpb9ce4cjQbgKQTp7zEAiFyc_LjY1RqveVNbhgVeUXVdT-KVomToOLJ7ZRB1jVpeWp2jZThDfTtIuYO7BW8BMr1Z64fqUxXr4iE9KF6cuV4wFEOf9Quk3Z05JofKZYe3GNa6Mkb-MhxsH7IvjnKFeBRjCP2kyC_BafhTrcElgPkIgdHYfXCg9NQpACWa8wr1wz3HJltla0MigAl4CBJjZkqP29pJvtOOQsSabyw-4Oz_oQOrTZ-Cqz93yyLZ9GupEHeAIYLUCxFr2Bijmz2K6zUNyQUpm8XW-tXEA',


        // let yourAlert = "$.ajax({ type: 'GET', url: 'http://172.16.228.145:8080/api/study-levels', data: {}, success: function () { alert('hello') } })";
        // let yourAlert = "const iframe = document.querySelector('iframe'); const player = new Vimeo.Player(iframe); player.on('ended', function (data) { $.ajax({ type: 'GET', url: 'http://172.16.228.145:8080/api/study-levels', data: {}, success: function () { alert('hello') } }) });";
        let yourAlert = "const iframe = document.querySelector('iframe'); const player = new Vimeo.Player(iframe); player.on('ended', function(data) { $.ajax({ type: 'POST', headers: { 'Authorization': 'Bearer " + this.state.accessToken + "', 'X-CSRF-TOKEN': $('meta[name=\"csrf-token\"]').attr('content') }, url: 'http://172.16.228.145:8080/api/lessons/14293/mark-as-complete', data: {}, success: function() { alert('hello'); } }) });";

        // let yourAlert = "const iframe = document.querySelector('iframe'); const player = new Vimeo.Player(iframe); player.on('ended', function(data) { $.ajax({ type: 'POST', headers: { 'X-CSRF-TOKEN': $('meta[name=\"csrf-token\"]').attr('content') }, url: 'http://172.16.228.145:8080/lessons/14293/mark-as-complete', data: {}, success: function() { alert('hello'); } }) });";


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


                        style={{ top: -30 }}
                        source={{
                            uri: 'http://172.16.228.145:8080/api/lessons/14293/video',
                            headers: {
                                Authorization: 'Bearer ' + this.state.accessToken
                            }
                        }}
                    />)}
                </View>
                <View>
                    <Text>Here is the test</Text>
                </View>
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
    { checkAuth }
)(Player);