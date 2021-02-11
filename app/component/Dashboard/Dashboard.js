import React, { Component } from 'react'
import { ImageBackground, Picker, View, StatusBar, Text, TouchableOpacity, ScrollView, RefreshControl, Image, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { Icon, Badge } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { setCategories } from '../../redux/actions/CategoryActions';
import ActionButton from 'react-native-action-button';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import RNExitApp from 'react-native-exit-app';
import { setToken, subscribeToToic } from '../../Firebase';
import firebase, { Notification, NotificationOpen } from 'react-native-firebase';

import { getService, postService } from '../../network';

import styles from './styles';

const APP_VERSION = '1.4.0';
class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Dashboard',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='entypo' color='#fff' /></TouchableOpacity>,
        headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => navigation.navigate('Notifications')}>
            <View style={{ flexDirection: 'row', right: 10 }}>
                <Icon name='bell' type='simple-line-icon' color='#fff' size={28} containerStyle={{ left: 20 }} />
                <Badge value={navigation.state.params ? navigation.state.params.notificationCount : 0} status="primary" containerStyle={{ position: 'absolute', right: 4 }} />
            </View>
        </TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.props.selectedCategoryID != null && nextProps.selectedCategoryID != this.props.selectedCategoryID && this._onRefresh();
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        const { navigation } = this.props;
        loaderHandler.showLoader("Loading");
        this.setUpFirebase();

        setTimeout(() => {
            loaderHandler.hideLoader();
        }, 1500);
        this.getAppVersion();

        this.focusListener = navigation.addListener("didFocus", () => {
            this.setGetNotificationCount();
        });
    }

    setGetNotificationCount = async () => {
        let notificationDate = await AsyncStorage.getItem("NOTIFICATION_DATE");
        if (!notificationDate) {
            await AsyncStorage.setItem('NOTIFICATION_DATE', moment().format('YYYY-MM-DD HH:mm:ss'));
        } else {
            const request = {
                endPoint: 'push-notification-count',
                authenticate: true,
                params: {
                    date: notificationDate
                },
            }
            let notificationCountObject = await postService(request);
            notificationCountObject.success && this.props.navigation.setParams({
                notificationCount: notificationCountObject.data,
            });
        }
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    setUpFirebase = () => {
        setToken();
        this.props.user.institutionSlug && this.props.user.studySlug && subscribeToToic(['all', this.props.user.institutionSlug, this.props.user.studySlug]);

        this.createNotificationChannel();
        this.checkPermission();

        // fires when the app is fully closed
        firebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                if (notificationOpen) {
                    const notification: Notification = notificationOpen.notification;
                    notification._data.notificationType === 'notificationCenter' && this.props.navigation.navigate('Notifications');
                    notification._data.notificationType === 'globalQandA' && this.props.navigation.navigate('QuestionAnswers', { 'subject_qna': false });
                    notification._data.notificationType === 'subjectQandA' && this.props.navigation.navigate('QuestionAnswers', { 'subject_qna': true, 'subject_slug': notification._data.subjectSlug, 'subject_title': notification._data.subjectTitle ? notification._data.subjectTitle : notification._data.subjectSlug });
                }
            });



        // fires when the app is in background
        this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            const notification: Notification = notificationOpen.notification;
            notification._data.notificationType === 'notificationCenter' && this.props.navigation.navigate('Notifications');
            notification._data.notificationType === 'globalQandA' && this.props.navigation.navigate('QuestionAnswers', { 'subject_qna': false });
            notification._data.notificationType === 'subjectQandA' && this.props.navigation.navigate('QuestionAnswers', { 'subject_qna': true, 'subject_slug': notification._data.subjectSlug, 'subject_title': notification._data.subjectTitle ? notification._data.subjectTitle : notification._data.subjectSlug });
        });
    }


    createNotificationChannel = () => {
        const channel = new firebase.notifications.Android.Channel(
            "esho_shikhi",
            "eshoshikhi",
            firebase.notifications.Android.Importance.High
        ).setDescription("Used for getting reminder notification");
        firebase.notifications().android.createChannel(channel);
    };



    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.notificationListener = firebase
                .notifications()
                .onNotification(async notification => {
                    const channelId = new firebase.notifications.Android.Channel("Default", "Default", firebase.notifications.Android.Importance.High);
                    firebase.notifications().android.createChannel(channelId);
                    const newNotification = new firebase.notifications.Notification()
                        .android.setChannelId('Default')
                        .setNotificationId(notification._notificationId)
                        .setTitle(notification._title)
                        .setBody(notification._body)
                        .setSound("default")
                        .android.setAutoCancel(true)
                        .android.setPriority(firebase.notifications.Android.Priority.High);

                    await firebase.notifications().displayNotification(newNotification);
                });
        } else {
            try {
                await firebase.messaging().requestPermission();
            } catch (error) {
                Alert.alert("Unable to access the Notification permission. Please enable the Notification Permission from the settings");
            }
        }
    };

    _onRefresh = () => {
        this.props.navigation.navigate('Loader');
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
        let allSubjects = [...this.props.allSubjects];
        let allSubjectsTitleArr = [...this.props.allSubjectsTitleArr];
        let colors = [
            '#56CCF2', '#2F80ED',
            '#D66D75', '#E29587',
            '#4568DC', '#B06AB3',
            '#f4c4f3', '#fc67fa',
            '#808080', '#3fada8'
        ];
        let allSubjectColorsArr = [...colors];
        let allSubjectViews = [], allSubjectLength = Math.ceil(allSubjects.length / 4);

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
                            <LinearGradient colors={[allSubjectColorsArr.shift(), allSubjectColorsArr.shift()]} style={[styles.subject, styles.subjectMarginRight]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: allSubjectArr[0] })} style={[styles.subject, styles.subjectMarginRight]} >
                                    <Text numberOfLines={1} style={styles.subjectTitle}>{allSubjectsTitleArr.shift()}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        )}
                        {allSubjectsTitleArr.length > 0 && (
                            <LinearGradient colors={[allSubjectColorsArr.shift(), allSubjectColorsArr.shift()]} style={[styles.subject, styles.subjectMarginRight]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: allSubjectArr[1] })} style={[styles.subject, styles.subjectMarginLeft]}>
                                    <Text numberOfLines={1} style={styles.subjectTitle}>{allSubjectsTitleArr.shift()}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        )}
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        {allSubjectsTitleArr.length > 0 && (
                            <LinearGradient colors={[allSubjectColorsArr.shift(), allSubjectColorsArr.shift()]} style={[styles.subject, styles.subjectMarginRight]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: allSubjectArr[2] })} style={[styles.subject, styles.subjectMarginRight]}>
                                    <Text numberOfLines={1} style={styles.subjectTitle}>{allSubjectsTitleArr.shift()}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        )}
                        {allSubjectsTitleArr.length > 0 && (
                            <LinearGradient colors={[allSubjectColorsArr.shift(), allSubjectColorsArr.shift()]} style={[styles.subject, styles.subjectMarginRight]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SubjectDashboard', { subjectDetails: allSubjectArr[3] })} style={[styles.subject, styles.subjectMarginLeft]}>
                                    <Text numberOfLines={1} style={styles.subjectTitle}>{allSubjectsTitleArr.shift()}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        )}
                    </View>
                </View >
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


        let newsAndUpdates = [...this.props.newsAndUpdates], newsAndUpdatesView = [];
        newsAndUpdates.length > 0 && newsAndUpdates.map((newsAndUpdate) => {
            newsAndUpdatesView.push(
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ArticleWebView', { newsAndUpdate: true, title: newsAndUpdate.title, slug: newsAndUpdate.slug, category: 'news-and-infos', deepLinkQuizId: newsAndUpdate.quiz_id })} T
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
                    </View>


                    {allSubjectViews.length > 0 &&
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, left: 2 }}>
                                </View>
                                <View style={{ flexDirection: 'row', flex: .2, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.allSubjectScroll.scrollBy(-1)}>
                                        <Icon name='left' type='antdesign' color='gray' size={30} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.allSubjectScroll.scrollBy(1)}>
                                        <Icon name='right' type='antdesign' color='gray' size={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.swiperContainer]}>
                                {
                                    allSubjectViews.length === allSubjectLength && (
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
                </ScrollView>
                <ActionButton
                    buttonColor='#1E88E5'
                    shadowStyle={{ elevation: 10 }}
                    fixNativeFeedbackRadius={true}
                    useNativeFeedback={true}
                    renderIcon={() => <Image style={{ width: 40, height: 44, resizeMode: "contain" }} source={{ uri: 'https://i.imgur.com/eZvXxPG.png' }} />}
                    onPress={() => this.props.navigation.navigate('QuestionAnswers', { 'subject_qna': false })}
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