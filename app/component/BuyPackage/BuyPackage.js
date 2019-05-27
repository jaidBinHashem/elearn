import React, { Component } from 'react'
import { Picker, View, StatusBar, Text, TouchableOpacity, ScrollView } from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import { Icon, Input, CheckBox } from 'react-native-elements';
import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getPackages, proceedPackages } from '../../redux/actions/PackageActions';

import Colors from '../../global/colors';
import styles from './styles';

class BuyPackage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Buy Package',
        headerLeft: <TouchableOpacity style={{ height: 50, justifyContent: 'center', width: 50 }} onPress={() => navigation.openDrawer()}><Icon name='menu' type='feather' color='#fff' /></TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            selectedPackages: [],
            selectedSubjects: [],
            totalPrice: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null

        if (nextProps.packages.length > 0 && !this.state.loaded) {
            let selectedPackages = [];
            nextProps.packages.map((pkg) => {
                pkg.packages.data.length > 0 && (initialSelectedPkg = {
                    slug: pkg.slug,
                    title: pkg.title,
                    selectedPkg: {
                        name: pkg.packages.data[0].name,
                        id: pkg.packages.data[0].id,
                        price: pkg.packages.data[0].price
                    }
                });
                pkg.packages.data.length > 0 && selectedPackages.push(initialSelectedPkg);
            });
            this.setState({ selectedPackages, loaded: true })
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.setState({
                selectedSubjects: [],
                totalPrice: 0
            })
            this.props.getPackages();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    selectedPackage = (index, itemIndex) => {
        let selectedPackage = [...this.state.selectedPackages];
        selectedPackage[index].selectedPkg = this.props.packages[index].packages.data[itemIndex];
        this.setState({ selectedPackage }, () => this.calculatePrice());
    }

    selectSubject = (subjectSlug) => {
        let selectedSubjects = [...this.state.selectedSubjects];
        if (!selectedSubjects.includes(subjectSlug)) {
            selectedSubjects.push(subjectSlug);
            this.setState({ selectedSubjects }, () => this.calculatePrice());
        } else {
            selectedSubjects.splice(selectedSubjects.indexOf(subjectSlug), 1);
            this.setState({ selectedSubjects }, () => this.calculatePrice());
        }
    }

    calculatePrice = () => {
        let selectedPackage = [...this.state.selectedPackages];
        let totalPrice = 0;
        selectedPackage.map((pkg) => this.state.selectedSubjects.includes(pkg.slug) && (totalPrice = totalPrice + parseInt(pkg.selectedPkg.price)));
        this.setState({ totalPrice });
    }

    proceedToCheckout = () => {
        let selectedPackage = [...this.state.selectedPackages];
        let pkgArr = [];
        selectedPackage.map((pkg) => this.state.selectedSubjects.includes(pkg.slug) && (pkgArr.push(pkg)));
        pkgArr.length > 0 && (this.props.proceedPackages(pkgArr, this.state.totalPrice), this.props.navigation.navigate('ConfirmBuyPackage'));
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ flex: .9 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            this.state.selectedPackages.length > 0 && this.props.packages.map((mainPackage, index) => {
                                if (mainPackage.packages.data.length > 0) {
                                    return (
                                        <View key={index} style={{ flex: 1, borderTopWidth: 2, borderTopColor: Colors.appTheme, padding: 20, backgroundColor: '#fff', height: 120, marginVertical: 15, elevation: 5, borderRadius: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ fontSize: 18, fontWeight: '700', maxWidth: 120, textAlign: 'center' }}>{mainPackage.title}</Text>
                                                <Text style={{ fontSize: 18, fontWeight: '300', textAlign: 'center' }}>Duration</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 20 }}>{this.state.selectedPackages[index].selectedPkg.price}tk</Text>
                                                <Picker
                                                    selectedValue={this.state.selectedPackages[index].selectedPkg.id}
                                                    style={{ height: 25, width: 130 }}
                                                    onValueChange={(itemValue, itemIndex) => this.selectedPackage(index, itemIndex)}
                                                >
                                                    {
                                                        mainPackage.packages.data.length > 0 && mainPackage.packages.data.map((pkg, keyIndex) => {
                                                            return (
                                                                <Picker.Item key={keyIndex} label={pkg.name} value={pkg.id} />
                                                            )
                                                        })
                                                    }
                                                </Picker>
                                            </View>
                                            <View>
                                                <CheckBox
                                                    checked={this.state.selectedSubjects.includes(mainPackage.slug) ? true : false}
                                                    onPress={() => this.selectSubject(mainPackage.slug)}
                                                />
                                            </View>
                                        </View>
                                    )
                                }
                            })
                        }
                    </ScrollView>
                </View>
                <TouchableOpacity style={{ flex: .1, backgroundColor: Colors.appTheme, marginVertical: 3, justifyContent: 'center' }} onPress={() => this.proceedToCheckout()}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: 20 }}>Proceed : {this.state.totalPrice} tk</Text>
                </TouchableOpacity>
                <BusyIndicator />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        packages: state.PackageReducer.packages
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, getPackages, proceedPackages }
)(BuyPackage);