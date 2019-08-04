import React, { Component } from 'react'
import { Linking, Image, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { Icon } from 'react-native-elements';

import Colors from '../../global/colors';
import styles from './styles';

class Upcoming extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Contact Us',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
        // headerRight: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 60 }} onPress={() => console.log("here")}><Icon name='bell' type='feather' color='#fff' /></TouchableOpacity>,
    });

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 70 }}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={{ uri: 'https://i.imgur.com/Wr15rcA.png' }}
                    />
                    <Text style={{ fontSize: 22 }}>Esho Shikhi</Text>
                    <Text>Website : <Text onPress={() => Linking.openURL('http://www.eshosikhi.com')}>www.eshosikhi.com</Text></Text>
                    <Text>Email : <Text onPress={() => Linking.openURL('mailto:eshosikhi@gmail.com')}>eshosikhi@gmail.com</Text></Text>
                    <Text>Facebook : <Text onPress={() => Linking.openURL('https://www.fb.com/eshosikhi.bd')}>www.fb.com/eshosikhi.bd</Text></Text>
                    <Text>Mobile : <Text onPress={() => Linking.openURL('tel:+8801575023458')}>+8801575023458</Text></Text>
                    <Text style={{ maxWidth: 350, textAlign: 'center' }}>Address : 324, 3rd floor, R H Home Tower, Green Road, Farmgate, Dhaka</Text>
                </View>
                {
                    this.props.navigation.state.routeName === "ContactUs" &&
                    <ActionButton
                        buttonColor='#1E88E5'
                        shadowStyle={{ elevation: 10 }}
                        fixNativeFeedbackRadius={true}
                        useNativeFeedback={true}
                        renderIcon={() => <Image style={{ width: 40, height: 44, resizeMode: "contain" }} source={{ uri: 'https://i.imgur.com/a6tMdBA.png' }} />}
                        onPress={() => {
                            Linking.openURL("http://m.me/eshosikhi.bd")
                        }}
                    />
                }
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
)(Upcoming);