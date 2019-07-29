import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, Dimensions } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import AutoComplete from 'react-native-autocomplete-input';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import CounterView from './CounterView';
import { getService } from '../../network'
const deviceWidth = Dimensions.get("window").width;

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
            selectedInstitution: null,
            query: '',
            hideList: true
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
        loaderHandler.showLoader("Loading");
        this.setState({ query: '', selectedInstitution: null })
        let selectedStudyLevel = [...this.state.studyLevels];
        selectedStudyLevel = selectedStudyLevel[selectedStudyIndex];
        this.setState({ selectedStudyLevel });
        this.getInstitutions('A', this.state.studyLevels[selectedStudyIndex].slug);
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
                    {true && (
                        <View style={{
                            position: 'absolute',
                            top: 100,
                            zIndex: 1,
                            marginLeft: 30
                        }}>
                            <Text style={styles.formTitle}>School / College / University</Text>
                            <AutoComplete
                                data={this.state.institutions}
                                defaultValue={this.state.query}
                                placeholder="সার্চ দিয়ে সিলেক্ট করুন"
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
                                inputContainerStyle={{ width: deviceWidth - 60, height: 50, borderRadius: 5 }}
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
                    {/* <View>
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
                    </View> */}
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
