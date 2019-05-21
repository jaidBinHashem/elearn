import React, { Component } from 'react'
import { ActivityIndicator, View, StatusBar } from 'react-native'
import Spinner from 'react-native-spinkit';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getScholarships } from '../../redux/actions/ScholarshipsActions';
import { getCategories } from '../../redux/actions/CategoryActions';
import { getBlogs } from '../../redux/actions/BlogActions';
import { getSubjects, getAllSubjects } from '../../redux/actions/SubjectActions';

import colors from '../../global/../global/colors'
import styles from './styles';

class Loader extends Component {
    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : this.switchToApp();
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.checkAuth();
        }, 1000)
    }

    switchToApp = async () => {
        await this.props.getCategories();
        await this.props.getSubjects();
        await this.props.getAllSubjects();
        await this.props.getScholarships();
        await this.props.getBlogs();
        this.props.navigation.navigate('App');
    }

    componentWillUnmount() {
        clearInterval(this.timer);
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