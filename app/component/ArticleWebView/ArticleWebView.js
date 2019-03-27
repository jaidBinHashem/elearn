import React, { Component } from 'react'
import { View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from "react-redux";
import { getService } from '../../network'

import Colors from '../../global/colors';
import styles from './styles';

class ArticleWebView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.scholarshipTitle,
        // headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            scolarship: null
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    async componentDidMount() {
        const request = {
            endPoint: 'scholarships/' + this.props.navigation.state.params.scholarshipSlug,
            authenticate: true
        }
        let scolarship = await getService(request);
        console.log(scolarship, "here");
        this.setState({ scolarship: scolarship.data.data })
    }



    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                {this.state.scolarship && (
                    <WebView
                        originWhitelist={['*']}
                        scalesPageToFit={false}
                        source={{ html: this.state.scolarship.description }}
                    />)}
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