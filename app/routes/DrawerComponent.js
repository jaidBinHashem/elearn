import React, { Component } from 'react'
import { View, Text, Share, TouchableOpacity } from 'react-native'
import { Avatar, Icon } from 'react-native-elements';
import { connect } from "react-redux";

import { DrawerItems } from 'react-navigation';

import colors from '../global/../global/colors'
// import styles from './styles';

class DrawerComponent extends Component {

    shareApp = async () => {
        try {
            const result = await Share.share({
                message: 'https://play.google.com/store/apps/details?id=com.aci.idss&hl=en',
                url: 'https://play.google.com/store/apps/details?id=com.aci.idss&hl=en',
                title: 'https://play.google.com/store/apps/details?id=com.aci.idss&hl=en'
            }, {
                    dialogTitle: 'Share Esho Sikhi',
                })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row', margin: 20,
                    // borderWidth: 2, borderColo: 'black' 
                }}>
                    <View style={{ elevation: 10 }}>
                        <Avatar
                            rounded
                            size="large"
                            source={{
                                uri:
                                    this.props.user.avatar
                            }}
                            containerStyle={{ elevation: 30 }}
                        />
                    </View>
                    <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, color: colors.appTheme, maxWidth:200 }}>
                            {this.props.user.name}
                        </Text>
                        <Text style={{ color: 'black' }}>
                            {this.props.user.studyLevel}
                        </Text>
                    </View>
                </View>
                <DrawerItems
                    itemStyle={{ borderBottomColor: 'gray', borderBottomWidth: 0 }} activeLabelStyle={{ color: colors.appTheme }} {...this.props}
                />
                <TouchableOpacity
                    onPress={() => this.shareApp()}
                    style={{ height: 40, flexDirection: 'row', marginHorizontal: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Icon name='share-alt' type='font-awesome' color={colors.appTheme} />
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'rgba(0,0,0,.87)' }}>Share The App</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.UserReducer
    };
}

export default connect(
    mapStateToProps,
    {}
)(DrawerComponent);