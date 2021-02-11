import React, { Component } from 'react'
import { Image, View, StatusBar, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getService } from '../../network';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import styles from './styles';

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            offers: []
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    async UNSAFE_componentWillMount() {
        const request = {
            endPoint: 'offer-list',
            showLoader: true,
            authenticate: true
        }
        let offers = await getService(request);
        this.setState({ offers: offers.data.data });
    }

    render() {
        let offers = [...this.state.offers];
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <ScrollView style={{ flex: 1 }}>
                    {
                        offers.length > 0 && offers.map(offer =>
                            (<View key={offer.id} style={{ elevation: 5, backgroundColor: 'white', padding: 10, margin: 10 }}>
                                <Image
                                    resizeMode='cover'
                                    source={{ uri: offer.file }}
                                    style={{ height: 200, marginBottom: 20 }}
                                />
                                <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }} numberOfLines={1}>{offer.title}</Text>
                                <Text style={{ paddingTop: 5 }}>{offer.content}</Text>
                            </View>)
                        )
                    }
                </ScrollView>
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
)(Offers);