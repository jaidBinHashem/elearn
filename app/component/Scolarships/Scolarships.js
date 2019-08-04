import React, { Component } from 'react'
import { ActivityIndicator, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Input } from 'react-native-elements';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import colors from '../../global/colors';
import moment from 'moment';

import Colors from '../../global/colors';
import styles from './styles';

class Scolarships extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Scholarships',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async componentDidMount() {

        // console.log(token, "token in dash")
    }

    signOut = async () => {
        await AsyncStorage.removeItem('USER_TOKEN');
        this.props.navigation.navigate('Loader');
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render() {
        let { scholarships } = this.props;
        let scholarshipCards = [];
        scholarships.length > 0 && scholarships.map(scholarship => {
            scholarshipCards.push(
                <View key={scholarship.id} style={{ borderRadius: 5, borderTopWidth: 2, borderTopColor: Colors.appTheme, backgroundColor: '#fff', marginVertical: 15, elevation: 5, borderRadius: 3 }}>
                    <View style={{ borderBottomWidth: 2, borderBottomColor: 'lightgray', padding: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }} numberOfLines={1}>{scholarship.title}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '300' }}>{scholarship.short_description}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, fontWeight: '400', color: 'black' }}>End Date</Text>
                            <View style={{ flexDirection: 'row', marginTop: 2 }}>
                                <Icon
                                    name='calendar'
                                    type='entypo'
                                    color={colors.appTheme}
                                    size={26}
                                    containerStyle={styles.numberIconContainer}
                                />
                                <Text style={{ marginLeft: 15, marginTop: 2 }}>{scholarship.end_date && moment(scholarship.end_date.date).format("DD-MMM-YYYY")}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 10, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ArticleWebView', { scholarship: true, title: scholarship.title, slug: scholarship.slug, category: 'scholarships' })}
                            style={{ width: 100, backgroundColor: Colors.appTheme, padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', color: 'black' }}>Apply Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        });
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {scholarshipCards}
                </ScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        scholarships: state.ScholarshipsReducer.scholarships,
    };
}

export default connect(
    mapStateToProps,
    { checkAuth }
)(Scolarships);