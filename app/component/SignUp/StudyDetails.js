import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker } from 'react-native';
import { Input, Icon } from 'react-native-elements';

import CounterView from './CounterView';
import { getService } from '../../network'

import styles from './styles';

class StudyDetails extends Component {
    static navigationOptions = {
        header: null
    }

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
            <View style={{ flex: 1 }}>
                <View style={{ flex: .2, marginBottom: 30 }}>
                    <CounterView pageNumber={1} />
                </View>
                <View style={[styles.formContainer, { bottom: 0 }]}>
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
                <View style={{ flex: .2, paddingHorizontal: 30 }}>
                    <TouchableOpacity style={styles.submitButtom} onPress={() => this.props.submitStudyDetails(this.state.selectedStudyLevel, this.state.selectedInstitution)}>
                        <Text style={styles.submitText}>Next Step</Text>
                        <Icon
                            name='arrowright'
                            size={22}
                            type='antdesign'
                            color='black'
                            containerStyle={styles.submitButtomIconContainer}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default StudyDetails;
