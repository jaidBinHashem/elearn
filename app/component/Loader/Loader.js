import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getScholarships } from '../../redux/actions/ScholarshipsActions';
import { getCategories } from '../../redux/actions/CategoryActions';
import { getBlogs } from '../../redux/actions/BlogActions';
import { getSubjects, getAllSubjects } from '../../redux/actions/SubjectActions';

import colors from '../../global/../global/colors';
import styles from './styles';

class Loader extends Component {
    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : this.switchToApp();
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('USER_TOKEN');
        if (token != null) {
            this.props.getCategories();
            this.props.getSubjects();
            this.props.getAllSubjects();
            this.props.getScholarships();
            this.props.getBlogs();
        }
        setTimeout(() => {
            this.props.checkAuth();
        }, 4000)
    }

    switchToApp = async () => {
        this.props.navigation.navigate('App');
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <Spinner
                    isVisible={true}
                    size={100}
                    type='CircleFlip'
                    color={colors.appTheme}
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
    { checkAuth, getScholarships, getBlogs, getSubjects, getAllSubjects, getCategories }
)(Loader);