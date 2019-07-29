import React, { Component } from 'react'
import { ImageBackground, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView, RefreshControl, Image, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { setCategories } from '../../redux/actions/CategoryActions';
import ActionButton from 'react-native-action-button';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import RNExitApp from 'react-native-exit-app';
import { setToken, subscribeToToic } from '../../Firebase';
import firebase from 'react-native-firebase';

import { getService } from '../../network';

import styles from './styles';

const APP_VERSION = '0.7.2';
class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Dashboard',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => navigation.navigate('Notifications')}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props.selectedCategoryID != null && nextProps.selectedCategoryID != this.props.selectedCategoryID && this._onRefresh();
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        loaderHandler.showLoader("Loading");
        this.messageListener = firebase.notifications().onNotification(async notification => {
            notification.android.setChannelId("Esho_Sikhi");
            await firebase.notifications().displayNotification(notification);
        });


        setTimeout(() => {
            setToken();
            this.props.user.institutionSlug && this.props.user.studySlug && subscribeToToic(['all', this.props.user.institutionSlug, this.props.user.studySlug]);
            loaderHandler.hideLoader();
        }, 1500);
        this.getAppVersion();
    }

    _onRefresh = () => {
        this.props.navigation.navigate('Loader')
    }

    getAppVersion = async () => {
        const request = {
            endPoint: 'app-version',
            authenticate: true
        }
        let appVersion = await getService(request);
        if (appVersion.success && APP_VERSION != appVersion.data.data.android.version) {
            if (appVersion.data.data.android.forced) {
                Alert.alert(
                    '',
                    'An update version is available, Please update !',
                    [
                        {
                            text: 'Exit App',
                            style: 'cancel',
                            onPress: () => RNExitApp.exitApp()
                        },
                        {
                            text: 'Update',
                            onPress: () => { Linking.openURL('https://play.google.com/store/apps/details?id=com.eshosikhi&hl=en_US'); RNExitApp.exitApp() }
                        },
                    ],
                    { cancelable: false },
                );
            } else {
                let date = await AsyncStorage.getItem('Date');
                let todayDate = new Date().getDate();
                if (date === null || date != todayDate) {
                    Alert.alert(
                        '',
                        'An update version is available, Please update !',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Update',
                                onPress: () => { Linking.openURL('https://play.google.com/store/apps/details?id=com.eshosikhi&hl=en_US') }
                            },
                        ],
                        { cancelable: true },
                    );
                    await AsyncStorage.setItem('Date', todayDate.toString());
                }
            }
        }
    }

    getGreetingTime = (currentTime) => {
        if (!currentTime || !currentTime.isValid()) { return 'Hello'; }

        const splitAfternoon = 12; // 24hr time to split the afternoon
        const splitEvening = 17; // 24hr time to split the evening
        const currentHour = parseFloat(currentTime.format('HH'));

        if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
            // Between 12 PM and 5PM
            return 'Good afternoon';
        } else if (currentHour >= splitEvening) {
            // Between 5PM and Midnight
            return 'Good evening';
        }
        // Between dawn and noon
        return 'Good morning';
    }

    render() {
        let subjects = [...this.props.subjects];
        let subj = [...this.props.subjectsTitleArr];
        let allSubjects = [...this.props.allSubjects];
        let allSubjectsTitleArr = [...this.props.allSubjectsTitleArr];
        let colors = ['#BC9CFF', '#F6D365', '#F093FB', '#0BA360', '#74DBC9', '#677DCB', '#501A57', '#F07B52'];
        let colorsArr = [...colors];
        let allSubjectColorsArr = [...colors];
        let views = [], length = Math.ceil(subj.length / 4);
        let allSubjectViews = [], allSubjectLength = Math.ceil(allSubjects.length / 4);
        for (let i = 0; i < length; i++) {
            let subjectArr = [];
            if (subjects.length > 4) {
                for (let i = 0; i < 4; i++) {
                    subjectArr.push(subjects.shift());
                }
            } else {
                for (let i = 0; i <= subj.length; i++) {
                    subjectArr.push(subjects.shift());
                }
            }
            view = (
                <View key={i} style={{ flex: 4, marginHorizontal: 10 }}>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { showExplanation: false, subjectDetails: subjectArr[0] })} style={[styles.subject, styles.subjectMarginRight, { backgroundColor: colorsArr.shift() }]} >
                                <Text numberOfLines={1} style={styles.subjectTitle}>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { showExplanation: false, subjectDetails: subjectArr[1] })} style={[styles.subject, styles.subjectMarginLeft, { backgroundColor: colorsArr.shift() }]}>
                                <Text numberOfLines={1} style={styles.subjectTitle}>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { showExplanation: false, subjectDetails: subjectArr[2] })} style={[styles.subject, styles.subjectMarginRight, { backgroundColor: colorsArr.shift() }]}>
                                <Text numberOfLines={1} style={styles.subjectTitle}>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                        {subj.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { showExplanation: false, subjectDetails: subjectArr[3] })} style={[styles.subject, styles.subjectMarginLeft, { backgroundColor: colorsArr.shift() }]}>
                                <Text numberOfLines={1} style={styles.subjectTitle}>{subj.shift()}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )
            colorsArr = colorsArr.concat(colors);
            views.push(view);
        }

        for (let i = 0; i < allSubjectLength; i++) {
            let allSubjectArr = [];
            if (allSubjects.length > 4) {
                for (let i = 0; i < 4; i++) {
                    allSubjectArr.push(allSubjects.shift());
                }
            } else {
                for (let j = 0; j < allSubjectsTitleArr.length; j++) {
                    allSubjectArr.push(allSubjects.shift());
                }
            }

            view = (
                <View key={i} style={{ flex: 4, marginHorizontal: 10 }}>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {allSubjectsTitleArr.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: allSubjectArr[0] })} style={[styles.subject, styles.subjectMarginRight, { backgroundColor: colorsArr.shift() }]} >
                                <Text numberOfLines={1} style={styles.subjectTitle}>{allSubjectsTitleArr.shift()}</Text>
                            </TouchableOpacity>
                        )}
                        {allSubjectsTitleArr.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: allSubjectArr[1] })} style={[styles.subject, styles.subjectMarginLeft, { backgroundColor: colorsArr.shift() }]}>
                                <Text numberOfLines={1} style={styles.subjectTitle}>{allSubjectsTitleArr.shift()}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {allSubjectsTitleArr.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: allSubjectArr[2] })} style={[styles.subject, styles.subjectMarginRight, { backgroundColor: colorsArr.shift() }]}>
                                <Text numberOfLines={1} style={styles.subjectTitle}>{allSubjectsTitleArr.shift()}</Text>
                            </TouchableOpacity>
                        )}
                        {allSubjectsTitleArr.length > 0 && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: allSubjectArr[3] })} style={[styles.subject, styles.subjectMarginLeft, { backgroundColor: colorsArr.shift() }]}>
                                <Text numberOfLines={1} style={styles.subjectTitle}>{allSubjectsTitleArr.shift()}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )
            allSubjectColorsArr = allSubjectColorsArr.concat(colors);
            allSubjectViews.push(view);
        }

        let scholarships = [...this.props.scholarships.scholarships], scholarshipsView = [];
        scholarships.length > 0 && scholarships.map((scholarship) => {
            scholarshipsView.push(
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ArticleWebView', { scholarship: true, title: scholarship.title, slug: scholarship.slug, category: 'scholarships' })}
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


        // let tipsAndTricks = [...this.props.tipsAndTricks], tipsAndTricksView = [];
        // tipsAndTricks.length > 0 && tipsAndTricks.map((tipsAndTrick) => {
        //     tipsAndTricksView.push(
        //         <TouchableOpacity
        //             onPress={() => this.props.navigation.navigate('ArticleWebView', { tipsAndTrick: true, title: tipsAndTrick.title, slug: tipsAndTrick.slug, category: 'articles' })} T
        //             key={tipsAndTrick.id} style={styles.cards}>
        //             <ImageBackground
        //                 style={{ width: '100%', height: '100%', borderRadius: 20 }}
        //                 imageStyle={{ borderRadius: 5 }}
        //                 source={{ uri: tipsAndTrick.image }}
        //             >
        //                 <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 5, justifyContent: 'flex-end' }}>
        //                     <View style={{}}>
        //                         <Text numberOfLines={2} style={{ color: 'white', margin: 10, fontWeight: '600' }}>{tipsAndTrick.title}</Text>
        //                     </View>
        //                 </View>
        //             </ImageBackground>
        //         </TouchableOpacity>
        //     )
        // });


        let newsAndUpdates = [...this.props.newsAndUpdates], newsAndUpdatesView = [];
        newsAndUpdates.length > 0 && newsAndUpdates.map((newsAndUpdate) => {
            newsAndUpdatesView.push(
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ArticleWebView', { newsAndUpdate: true, title: newsAndUpdate.title, slug: newsAndUpdate.slug, category: 'news-and-infos' })} T
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
                        <Text style={styles.name}>{this.props.user.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.grettings}>{this.getGreetingTime(moment())}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, left: 2 }}>
                            {this.props.categories.length > 0 && <Picker
                                selectedValue={this.props.selectedCategoryID}
                                style={{ height: 40, width: 250 }}
                                itemStyle={{ color: '#BC9CFF' }}
                                onValueChange={(itemValue) => this.props.setCategories(itemValue)}
                            >
                                {
                                    this.props.categories.length > 0 && this.props.categories.map((category, keyIndex) => {
                                        return (
                                            <Picker.Item key={keyIndex} label={category.name} value={category.id} />
                                        )
                                    })
                                }
                            </Picker>}
                        </View>
                        {/* {views.length > 0 && <View style={{ flexDirection: 'row', flex: .2, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.scroll.scrollBy(-1)}>
                                <Icon name='chevron-left' type='feather' color='gray' size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.scroll.scrollBy(1)}>
                                <Icon name='chevron-right' type='feather' color='gray' size={30} />
                            </TouchableOpacity>
                        </View>} */}
                    </View>

                    {/* {views.length > 0 && <View style={styles.swiperContainer}>
                        {
                            views.length === length && (
                                <Swiper
                                    height={250}
                                    index={0}
                                    ref={node => (this.scroll = node)}
                                    showsButtons={false}
                                    showsPagination={false}
                                    loop={false}
                                    scrollEnabled={true}
                                >
                                    {views}
                                </Swiper>
                            )
                        }
                    </View>} */}

                    {allSubjectViews.length > 0 && <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, left: 2 }}>
                                {/* <Text style={styles.newsAndUpdatesTitle}>All Subjects</Text> */}
                            </View>
                            <View style={{ flexDirection: 'row', flex: .2, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.allSubjectScroll.scrollBy(-1)}>
                                    <Icon name='chevron-left' type='feather' color='gray' size={30} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.allSubjectScroll.scrollBy(1)}>
                                    <Icon name='chevron-right' type='feather' color='gray' size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.swiperContainer]}>
                            {
                                views.length === length && (
                                    <Swiper
                                        height={250}
                                        index={0}
                                        ref={node => (this.allSubjectScroll = node)}
                                        showsButtons={false}
                                        showsPagination={false}
                                        loop={false}
                                        scrollEnabled={true}
                                    >
                                        {allSubjectViews}
                                    </Swiper>
                                )
                            }
                        </View>
                    </View>}
                    {newsAndUpdatesView.length > 0 && (<View>
                        <View>
                            <Text style={styles.newsAndUpdatesTitle}>News & Info</Text>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {newsAndUpdatesView}
                        </ScrollView>
                    </View>)}
                    {scholarshipsView.length > 0 && (<View>
                        <View>
                            <Text style={styles.newsAndUpdatesTitle}>Scholarships</Text>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {scholarshipsView}
                        </ScrollView>
                    </View>)}
                    {/* {tipsAndTricksView.length > 0 && (<View>
                        <View>
                            <Text style={styles.newsAndUpdatesTitle}>Tips & Tricks</Text>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {tipsAndTricksView}
                        </ScrollView>
                    </View>)} */}
                </ScrollView>
                <ActionButton
                    buttonColor='#1E88E5'
                    shadowStyle={{ elevation: 10 }}
                    fixNativeFeedbackRadius={true}
                    useNativeFeedback={true}
                    renderIcon={() => <Image style={{ width: 40, height: 44, resizeMode: "contain" }} source={{ uri: 'https://i.imgur.com/a6tMdBA.png' }} />}
                    onPress={() => Linking.openURL("http://m.me/eshosikhi.bd")}
                />
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        user: state.UserReducer,
        scholarships: state.ScholarshipsReducer,
        newsAndUpdates: state.BlogReducer.newsAndUpdates,
        // tipsAndTricks: state.BlogReducer.tipsAndTricks,
        subjects: state.SubjectsReducer.subjects,
        subjectsTitleArr: state.SubjectsReducer.subjectsTitleArr,
        allSubjects: state.SubjectsReducer.allSubjects,
        allSubjectsTitleArr: state.SubjectsReducer.allSubjectsTitleArr,
        categories: state.CategoryReducer.categories,
        selectedCategoryID: state.CategoryReducer.selectedCategoryID
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, setCategories }
)(Dashboard);