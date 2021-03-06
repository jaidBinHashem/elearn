import React from 'react';
import { Animated, Easing } from 'react-native'
import { Icon } from 'react-native-elements';
import { TabBarTop, createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Loader from '../component/Loader';
import Welcome from '../component/Welcome';
import OTP from '../component/SignUp/Otp';
import SignUp from '../component/SignUp';
import Login from '../component/Login';
import Success from '../component/SignUp/Success';
import Dashboard from '../component/Dashboard';
import ArticleWebView from '../component/ArticleWebView'
import MyProfile from '../component/MyProfile';
import EditProfile from '../component/EditProfile';
import EditStudyLevel from '../component/EditProfile/EditStudyLevel';
import MySubjects from '../component/MySubjects';
import Coupon from '../component/Coupon';
import BuyPackage from '../component/BuyPackage';
import ConfirmBuyPackage from '../component/BuyPackage/ConfirmBuyPackage';
import PurchaseHistory from '../component/PurchaseHistory';
import Payment from '../component/BuyPackage/Payment';
import Scolarships from '../component/Scolarships';
import Upcoming from '../component/Offers/Upcoming';
import Offers from '../component/Offers/Offers';
import SubjectDashboard from '../component/SubjectDashboard'

import QuizDashboard from '../component/Quiz';
import QuizHighlights from '../component/Quiz/QuizHighlights';
import PreviousAttemps from '../component/Quiz/PreviousAttemps';
import Quiz from '../component/Quiz/Quiz';

import Player from '../component/Player';

import Notifications from '../component/Notifications';

import QuestionAnswers from '../component/QuestionAnswers';
import MyQuestionAnswers from '../component/QuestionAnswers/MyQuestionAnswers';
import AddQuestion from '../component/QuestionAnswers/AddQuestion';
import EditResponse from '../component/QuestionAnswers/EditResponse';
import QuestionDetails from '../component/QuestionAnswers/QuestionDetails';

import DrawerComponent from './DrawerComponent';

import colors from '../global/colors'



const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 500,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps
            const toIndex = index
            const thisSceneIndex = scene.index
            const height = layout.initHeight
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
            })

            // Since we want the card to take the same amount of time
            // to animate downwards no matter if it's 3rd on the stack
            // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
            const translateY = position.interpolate({
                inputRange: [0, thisSceneIndex],
                outputRange: [height, 0]
            })

            const slideFromRight = { transform: [{ translateX }] }
            const slideFromBottom = { transform: [{ translateY }] }

            const lastSceneIndex = scenes[scenes.length - 1].index

            // Test whether we're skipping back more than one screen
            if (lastSceneIndex - toIndex > 1) {
                // Do not transoform the screen being navigated to
                if (scene.index === toIndex) return
                // Hide all screens in between
                if (scene.index !== lastSceneIndex) return { opacity: 0 }
                // Slide top screen down
                return slideFromBottom
            }

            return slideFromRight
        },
    }
}



const AuthStack = createStackNavigator(
    {
        Welcome: Welcome,
        OTP : OTP,
        Login: Login,
        SignUp: SignUp,
        ContactUs: Upcoming,
        Success : Success
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none',
        transitionConfig
    }
);


const ProfileStack = createStackNavigator(
    {
        MyProfile: MyProfile,
        EditProfile: EditProfile,
        EditStudyLevel: EditStudyLevel
    },
    {
        initialRouteName: 'MyProfile',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.appTheme,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                // fontWeight: 'bold',
            },
        },
        transitionConfig
    }
);

const SubjectsStack = createStackNavigator(
    {
        MySubjects: MySubjects,
    },
    {
        initialRouteName: 'MySubjects',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.appTheme,
            },
            headerTintColor: '#fff',
        },
        transitionConfig
    }
);

const CouponStack = createStackNavigator(
    {
        Coupon: Coupon,
    },
    {
        initialRouteName: 'Coupon',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.appTheme,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                // fontWeight: 'bold',
            },
        },
        transitionConfig
    }
);

const BuyPackageStack = createStackNavigator(
    {
        BuyPackage: BuyPackage,
        ConfirmBuyPackage: ConfirmBuyPackage,
        Payment: Payment
    },
    {
        initialRouteName: 'BuyPackage',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.appTheme,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                // fontWeight: 'bold',
            },
        },
        transitionConfig
    }
);

const ScolarshipsStack = createStackNavigator(
    {
        Scholarships: Scolarships,
        ArticleWebView: ArticleWebView
    },
    {
        initialRouteName: 'Scholarships',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.appTheme,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                // fontWeight: 'bold',
            },
        },
        transitionConfig
    }
);

const ContactUsStack = createStackNavigator(
    {
        ContactUsStack: Upcoming,
    },
    {
        initialRouteName: 'ContactUsStack',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.appTheme,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                // fontWeight: 'bold',
            },
        },
        transitionConfig
    }
);

const PurchaseHistoryStack = createStackNavigator(
    {
        PurchaseStack: PurchaseHistory,
    },
    {
        initialRouteName: 'PurchaseStack',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.appTheme,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                // fontWeight: 'bold',
            },
        },
        transitionConfig
    }
);


const OffersStack = createStackNavigator(
    {
        Offers: Offers,
    },
    {
        initialRouteName: 'Offers',
        headerMode: 'none',
        transitionConfig
    }
);


const NotificationTab = createMaterialTopTabNavigator(
    {
        Notifications: Notifications,
        Offers: OffersStack,
    },
    {
        tabBarComponent: TabBarTop,
        // order: [Upcoming, Completed],
        tabBarOptions: {
            labelStyle: {
                fontSize: 15,
            },
            tabStyle: {
                height: 55
            },
            indicatorStyle: {
                backgroundColor: 'white',
                height: 3
            },
            style: {
                backgroundColor: '#a98fe0',
            },
        }
    }
);


const AppStack = createStackNavigator(
    {
        Dashboard: Dashboard,
        SubjectDashboard: SubjectDashboard,
        ArticleWebView: ArticleWebView,
        QuizDashboard: QuizDashboard,
        Quiz: {
            screen: Quiz,
            navigationOptions: { drawerLockMode: 'locked-closed' }
        },
        QuizSolutions: Quiz,
        QuizHighlights: QuizHighlights,
        PreviousAttemps: PreviousAttemps,
        Player: Player,
        Notifications: {
            screen: NotificationTab,
            navigationOptions: {
                header: null
            }
        },
        QuestionAnswers: QuestionAnswers,
        MyQuestionAnswers: MyQuestionAnswers,
        AddQuestion: AddQuestion,
        EditResponse: EditResponse,
        QuestionDetails: QuestionDetails
    },
    {
        initialRouteName: 'Dashboard',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.appTheme,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                // fontWeight: 'bold',
            },
        },
        drawerLockMode: 'locked-closed',
        transitionConfig
    }
);



const AppDrawer = createDrawerNavigator(
    {
        Dashboard: {
            screen: AppStack,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => <Icon name='view-dashboard-outline' type='material-community' color={colors.appTheme} />,
            }
        },
        MyProfile: {
            screen: ProfileStack,
            navigationOptions: {
                drawerLabel: 'My Profile',
                drawerIcon: ({ tintColor }) => <Icon name='user' type='font-awesome' color={colors.appTheme} />,
            }
        },
        MySubjects: {
            screen: SubjectsStack,
            navigationOptions: {
                drawerLabel: 'My Subjects',
                drawerIcon: ({ tintColor }) => <Icon name='book-outline' type='material-community' color={colors.appTheme} />,
            }
        },
        Coupon: {
            screen: CouponStack,
            navigationOptions: {
                drawerLabel: 'Coupon',
                drawerIcon: ({ tintColor }) => <Icon name='tag-outline' type='material-community' color={colors.appTheme} />,
            }
        },
        BuyPackage: {
            screen: BuyPackageStack,
            navigationOptions: {
                drawerLabel: 'Buy Package',
                drawerIcon: ({ tintColor }) => <Icon name='shop' type='material' color={colors.appTheme} />,
            }
        },
        PurchaseHistory: {
            screen: PurchaseHistoryStack,
            navigationOptions: {
                drawerLabel: 'Purchase History',
                drawerIcon: ({ tintColor }) => <Icon name='shop' type='material' color={colors.appTheme} />,
            }
        },
        Scolarships: {
            screen: ScolarshipsStack,
            navigationOptions: {
                drawerLabel: 'Scholarships',
                drawerIcon: ({ tintColor }) => <Icon name='price-ribbon' type='entypo' color={colors.appTheme} />,
            }
        },
        ContactUs: {
            screen: ContactUsStack,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({ tintColor }) => <Icon name='fountain-pen-tip' type='material-community' color={colors.appTheme} />,
            }
        },
        // Terms: {
        //     screen: AppStack,
        //     navigationOptions: {
        //         drawerLabel: 'Terms & Conditions',
        //         drawerIcon: ({ tintColor }) => <Icon name='exclamationcircle' type='antdesign' color={colors.appTheme} />,
        //     }
        // },
    },
    {
        initialRouteName: 'Dashboard',
        contentComponent: props => (<DrawerComponent {...props} />),
        drawerWidth: 350,
        drawerLockMode: 'locked-closed'
    }
);

const App = createAppContainer(createAnimatedSwitchNavigator(
    {
        Loader: Loader,
        Auth: AuthStack,
        App: AppDrawer,
    },
    {
        initialRouteName: 'Loader',
        mode: 'modal'
    }
));

export default App