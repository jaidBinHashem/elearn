import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, StatusBar, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import Toast from 'react-native-simple-toast';
import AutoComplete from 'react-native-autocomplete-input';

import { updateStudyLevel } from '../../redux/actions/UserActions';

import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getService } from '../../network';
import { unsubscribeFromTopic } from '../../Firebase';

import Colors from '../../global/colors';

import styles from './styles';

const deviceWidth = Dimensions.get("window").width;

class EditStudyLevel extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Edit Study Level',
    });

    constructor(props) {
        super(props);
        this.state = {
            studyLevels: [],
            institutions: [],
            selectedStudyLevel: null,
            selectedInstitution: null,
            courses: [],
            selectedCourse: null,
            query: this.props.user.institution,
            hideList: true
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props.user != nextProps.user && (
            Toast.show("Study level updated successfull"),
            this.props.navigation.navigate('Loader')
        )
    }

    componentDidMount() {
        this.setState({
            selectedInstitution: {
                'id': this.props.user.institutionId,
                'name': this.props.user.institution
            }
        })
        this.getStudyLevel();
    }

    getStudyLevel = async () => {
        loaderHandler.showLoader("Loading");
        const request = { endPoint: 'study-levels' }
        let studyLevels = await getService(request);
        studyLevels.data.data.map((studyLevel => {
            studyLevel.id === this.props.user.studyLevelId && (this.selectStudyLevel(studyLevel), this.getCourse(studyLevel), this.setState({ studyLevels: studyLevels.data.data, selectedStudyLevel: studyLevel }));
        }));
    }

    selectStudyLevel = async (studyLevel, selectedStudyIndex = null) => {
        loaderHandler.showLoader("Loading");
        let slugObj = studyLevel || this.state.studyLevels[selectedStudyIndex];
        this.getInstitutions('A', slugObj.slug);
        this.state.selectedStudyLevel !== slugObj && (this.getCourse(slugObj), this.setState({ selectedStudyLevel: slugObj }));
        const request = {
            endPoint: 'study-levels/' + slugObj.slug + '/institutions?q=a'
        }
        loaderHandler.hideLoader();
    }

    getInstitutions = async (query, slug = null) => {
        let studySlug = slug === null ? this.state.selectedStudyLevel.slug : slug;
        const request = {
            endPoint: 'study-levels/' + studySlug + '/institutions?q=' + query
        }
        let institutions = await getService(request);
        this.setState({ institutions: institutions.data.data });
    }

    getCourse = async (studyLevel) => {
        const request = {
            endPoint: 'study-levels/' + studyLevel.slug + '/categories'
        }
        let courses = await getService(request);
        courses.data.data.map((course => {
            course.id === this.props.categoryDetails.selectedCategoryID && this.setState({ selectedCourse: course })
        }));
        this.setState({ courses: courses.data.data });
        courses.data.data.length === 0 && this.setState({ selectedCourse: null });
        this.state.selectedCourse === null && this.state.courses.length > 0 && this.setState({ selectedCourse: this.state.courses[0] });
    }


    componentWillUnmount() {
        loaderHandler.hideLoader();
    }


    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ justifyContent: 'center' }}>
                    <View>
                        <Text style={styles.formTitle}>STUDY LEVEL</Text>
                        <View style={{ marginBottom: 20, borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                            {this.state.selectedStudyLevel && (
                                <Picker
                                    selectedValue={this.state.selectedStudyLevel.id}
                                    style={{ height: 50 }}
                                    onValueChange={(studyLevel, selectedStudyIndex) => this.selectStudyLevel(null, selectedStudyIndex)}>
                                    {
                                        this.state.selectedStudyLevel && this.state.studyLevels.map((studyLevel) => {
                                            return (
                                                <Picker.Item key={studyLevel.id} label={studyLevel.name} value={studyLevel.id} />
                                            )
                                        })
                                    }
                                </Picker>)}
                            {
                                this.state.studyLevels.length === 0 && (
                                    <Picker
                                        selectedValue={0}
                                        style={{ height: 50 }}
                                    >
                                        <Picker.Item label="---" value={0} />
                                    </Picker>
                                )
                            }
                        </View>
                    </View>
                    {/* <View>
                        <Text style={styles.formTitle}>INSTITUTION NAME</Text>
                        <View style={{ marginBottom: 20, borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                            {this.state.institutions.length > 0 && (<Picker
                                selectedValue={this.state.selectedInstitution ? this.state.selectedInstitution.id : this.state.institutions[0].id}
                                style={{ height: 50 }}
                                onValueChange={(institution, selectedInstitutionIndex) => this.setState({ selectedInstitution: this.state.institutions[selectedInstitutionIndex] })}
                            >
                                {
                                    this.state.institutions.length > 0 && this.state.institutions.map((institution) => {
                                        return (
                                            <Picker.Item key={institution.id} label={institution.name} value={institution.id} />
                                        )
                                    })
                                }
                            </Picker>)}
                            {
                                this.state.institutions.length === 0 && (
                                    <Picker
                                        selectedValue={0}
                                        style={{ height: 50 }}
                                    >
                                        <Picker.Item label="---" value={0} />
                                    </Picker>
                                )
                            }
                        </View>
                    </View> */}
                    <View style={{ marginTop: 90 }}>
                        <Text style={styles.formTitle}>COURSE</Text>
                        <View style={{ marginBottom: 20, borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                            {this.state.courses.length > 0 && (<Picker
                                selectedValue={this.state.selectedCourse ? this.state.selectedCourse.id : this.state.courses[0].id}
                                style={{ height: 50 }}
                                onValueChange={(course, selectedCourseIndex) => this.setState({ selectedCourse: this.state.courses[selectedCourseIndex] })}
                            >
                                {
                                    this.state.courses.length > 0 && this.state.courses.map((course) => {
                                        return (
                                            <Picker.Item key={course.id} label={course.name} value={course.id} />
                                        )
                                    })
                                }
                            </Picker>)}
                            {
                                this.state.courses.length === 0 && (
                                    <Picker
                                        selectedValue={0}
                                        style={{ height: 50 }}
                                    >
                                        <Picker.Item label="---" value={0} />
                                    </Picker>
                                )
                            }
                        </View>
                    </View>
                    {true && (
                        <View style={{
                            position: 'absolute',
                            top: 100,
                            zIndex: 1
                        }}>
                            <Text>INSTITUTIONS</Text>
                            <AutoComplete
                                data={this.state.institutions}
                                defaultValue={this.state.query}
                                keyExtractor={(item, index) => 'key' + index}
                                onChangeText={query => {
                                    query.length > 2 && this.getInstitutions(query);
                                    this.setState({
                                        query,
                                        hideList: query.length > 2 ? false : true
                                    })
                                }
                                }
                                hideResults={this.state.hideList}
                                inputContainerStyle={{ width: deviceWidth - 40, height: 50, borderRadius: 5 }}
                                listStyle={{ marginTop: 2, maxHeight: 200, width: deviceWidth - 40, right: 10 }}
                                renderItem={({ item, i }) => (
                                    <TouchableOpacity style={{ height: 45, padding: 10 }}
                                        onPress={() => this.setState({ query: item.name, selectedInstitution: item, hideList: true })}>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        unsubscribeFromTopic([this.props.user.institutionSlug, this.props.user.studySlug]);
                        this.props.updateStudyLevel({
                            "study_level_id": this.state.selectedStudyLevel.id,
                            "institution_id": this.state.selectedInstitution ? this.state.selectedInstitution.id : null,
                            "categories": this.state.selectedCourse ? [this.state.selectedCourse.id] : null
                        }
                        )
                    }}
                    style={{ backgroundColor: Colors.appTheme, justifyContent: 'center', height: 60, borderRadius: 5, marginHorizontal: 0, marginVertical: 15 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center' }}>
                        <Icon name='update' type='material-community' color='#fff' containerStyle={{ right: 15 }} />
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Update</Text>
                    </View>
                </TouchableOpacity>
                <BusyIndicator />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        user: state.UserReducer,
        categoryDetails: state.CategoryReducer
    };
}

export default connect(
    mapStateToProps,
    { checkAuth, updateStudyLevel }
)(EditStudyLevel);
