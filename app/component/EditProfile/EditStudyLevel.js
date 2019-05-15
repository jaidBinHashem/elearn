import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';

import { connect } from "react-redux";
import { checkAuth } from '../../redux/actions/AuthActions';
import { getService } from '../../network'

import Colors from '../../global/colors';

import styles from './styles';

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
            selectedInstitution: null
        }
    }

    componentDidMount() {
        this.getStudyLevel();
    }

    getStudyLevel = async () => {
        const request = { endPoint: 'study-levels' }
        let studyLevels = await getService(request);
        studyLevels.success && this.setState({ studyLevels: studyLevels.data.data });
        this.selectStudyLevel(studyLevels[0], 0);
    }

    selectStudyLevel = async (selectedStudyLevelId, selectedStudyIndex) => {
        let selectedStudyLevel = [...this.state.studyLevels];
        selectedStudyLevel = selectedStudyLevel[selectedStudyIndex];
        this.setState({ selectedStudyLevel });
        const request = {
            endPoint: 'study-levels/' + this.state.studyLevels[selectedStudyIndex].slug + '/institutions'
        }
        let institutions = await getService(request);
        institutions.success && this.setState({ institutions: institutions.data.data, selectedInstitution: institutions.data.data[0] });
    }

    selectInstitution = async (selectedInstitutionId, selectedInstitutionIndex) => {
        let selectedInstitution = [...this.state.institutions];
        selectedInstitution = selectedInstitution[selectedInstitutionIndex]
        this.setState({ selectedInstitution });
    }


    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                <View style={{ justifyContent: 'center' }}>
                    <View>
                        <Text style={styles.formTitle}>STUDY LEVEL</Text>
                        <View style={{ marginBottom: 20, borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                            {this.state.selectedStudyLevel && (<Picker
                                selectedValue={this.state.selectedStudyLevel.id}
                                style={{ height: 50 }}
                                onValueChange={(studyLevel, selectedStudyIndex) => this.selectStudyLevel(studyLevel, selectedStudyIndex)}>
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
                    <View>
                        <Text style={styles.formTitle}>INSTITUTION NAME</Text>
                        <View style={{ marginBottom: 20, borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>
                            {this.state.institutions.length > 0 && (<Picker
                                selectedValue={this.state.selectedInstitution.id}
                                style={{ height: 50 }}
                                onValueChange={(institution, selectedInstitutionIndex) => this.selectInstitution(institution, selectedInstitutionIndex)}>
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
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: Colors.appTheme, justifyContent: 'center', height: 60, borderRadius: 5, marginHorizontal: 0, marginVertical: 15 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center' }}>
                        <Icon name='update' type='material-community' color='#fff' containerStyle={{ right: 15 }} />
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>Update</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.AuthReducer,
        user: state.UserReducer
    };
}

export default connect(
    mapStateToProps,
    { checkAuth }
)(EditStudyLevel);
