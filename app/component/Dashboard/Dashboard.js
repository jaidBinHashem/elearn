import React, { Component } from 'react'
import { ImageBackground, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getScholarships } from '../../redux/actions/ScholarshipsActions';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import styles from './styles';

class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Dashboard',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    componentWillReceiveProps(nextProps) {
        loaderHandler.hideLoader();
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        loaderHandler.showLoader("Loading");
    }

    _onRefresh = () => {
        this.props.navigation.navigate('Loader')
    }

    render() {
        let subj = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
        let colors = ['#BC9CFF', '#F6D365', '#F093FB', '#0BA360', '#74DBC9', '#677DCB', '#501A57', '#F07B52'];
        let colorsArr = [...colors];
        let views = [], length = Math.ceil(subj.length / 4);
        for (let i = 0; i < length; i++) {
            view = (
                <View key={i} style={{ flex: 4, marginHorizontal: 10 }}>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizDashboard')} style={[styles.subject, styles.subjectMarginRight, { backgroundColor: colorsArr.shift() }]}>
                                <Text>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                        {subj.length > 0 && (
                            <TouchableOpacity style={[styles.subject, styles.subjectMarginLeft, { backgroundColor: colorsArr.shift() }]}>
                                <Text>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {subj.length > 0 && (
                            <TouchableOpacity style={[styles.subject, styles.subjectMarginRight, { backgroundColor: colorsArr.shift() }]}>
                                <Text>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                        {subj.length > 0 && (
                            <TouchableOpacity style={[styles.subject, styles.subjectMarginLeft, { backgroundColor: colorsArr.shift() }]}>
                                <Text>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )
            colorsArr = colorsArr.concat(colors);
            views.push(view);
        }

        let scholarships = [...this.props.scholarships.scholarships], scholarshipsView = [];
        scholarships.length > 0 && scholarships.map((scholarship) => {
            scholarshipsView.push(
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ArticleWebView', { scholarship: true, scholarshipTitle: scholarship.title, scholarshipSlug: scholarship.slug })} T
                    key={scholarship.id} style={styles.cards}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%', borderRadius: 20 }}
                        imageStyle={{ borderRadius: 5 }}
                        source={{ uri: scholarship.image }}
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 5, justifyContent: 'flex-end' }}>
                            <View style={{}}>
                                <Text numberOfLines={2} style={{ color: 'white', margin: 10, fontWeight: '600' }}>{scholarship.title}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )
        });


        let tipsAndTricks = [...this.props.tipsAndTricks], tipsAndTricksView = [];
        tipsAndTricks.length > 0 && tipsAndTricks.map((tipsAndTrick) => {
            tipsAndTricksView.push(
                <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('ArticleWebView', { tipsAndTricks: true, tipsAndTricks: tipsAndTricks.title, tipsAndTricks: tipsAndTricks.slug })} T
                    key={tipsAndTrick.id} style={styles.cards}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%', borderRadius: 20 }}
                        imageStyle={{ borderRadius: 5 }}
                        source={{ uri: tipsAndTrick.image }}
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 5, justifyContent: 'flex-end' }}>
                            <View style={{}}>
                                <Text numberOfLines={2} style={{ color: 'white', margin: 10, fontWeight: '600' }}>{tipsAndTrick.title}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )
        });


        let newsAndUpdates = [...this.props.newsAndUpdates], newsAndUpdatesView = [];
        newsAndUpdates.length > 0 && newsAndUpdates.map((newsAndUpdate) => {
            newsAndUpdatesView.push(
                <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('ArticleWebView', { tipsAndTricks: true, tipsAndTricks: tipsAndTricks.title, tipsAndTricks: tipsAndTricks.slug })} T
                    key={newsAndUpdate.id} style={styles.cards}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%', borderRadius: 20 }}
                        imageStyle={{ borderRadius: 5 }}
                        source={{ uri: newsAndUpdate.image }}
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 5, justifyContent: 'flex-end' }}>
                            <View style={{}}>
                                <Text numberOfLines={2} style={{ color: 'white', margin: 10, fontWeight: '600' }}>{newsAndUpdate.title}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )
        });


        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.name}>Rakib</Text>
                    </View>
                    <View>
                        <Text style={styles.grettings}>Good Morning</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, left: 2 }}>
                            <Picker selectedValue={0} style={{ height: 40, width: 120 }} itemStyle={{ color: '#BC9CFF' }}>
                                <Picker.Item label="Science" color='#BC9CFF' value="java" />
                                <Picker.Item label="Arts" color='#BC9CFF' value="ar" />
                                <Picker.Item label="Comerce" color='#BC9CFF' value="cm" />
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row', flex: .2, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.scroll.scrollBy(-1)}>
                                <Icon name='chevron-left' type='feather' color='gray' size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.scroll.scrollBy(1)}>
                                <Icon name='chevron-right' type='feather' color='gray' size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.swiperContainer}>
                        <Swiper
                            height={250}
                            ref={node => (this.scroll = node)}
                            showsButtons={false}
                            showsPagination={false}
                            loop={true}
                            scrollEnabled={true}
                        >
                            {views}
                        </Swiper>
                    </View>
                    {scholarshipsView.length > 0 && (<View>
                        <View>
                            <Text style={styles.newsAndUpdatesTitle}>Scholarships</Text>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {scholarshipsView}
                        </ScrollView>
                    </View>)}
                    {newsAndUpdatesView.length > 0 && (<View>
                        <View>
                            <Text style={styles.newsAndUpdatesTitle}>News & Updates</Text>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {newsAndUpdatesView}
                        </ScrollView>
                    </View>)}
                    {tipsAndTricksView.length > 0 && (<View>
                        <View>
                            <Text style={styles.newsAndUpdatesTitle}>Tips & Tricks</Text>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {tipsAndTricksView}
                        </ScrollView>
                    </View>)}
                </ScrollView>
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        scholarships: state.ScholarshipsReducer,
        newsAndUpdates: state.BlogReducer.newsAndUpdates,
        tipsAndTricks: state.BlogReducer.tipsAndTricks,
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, getScholarships }
)(Dashboard);