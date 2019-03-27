import React, { Component } from 'react'
import { Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';

import { setQuiz } from '../../redux/actions/QuizActions';
import { connect } from "react-redux";

import colors from '../../global/colors'
import styles from './styles';

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    });

    componentWillReceiveProps(nextProps) {
        !nextProps.auth.isLoged
            ? this.props.navigation.navigate('Auth')
            : null
    }

    componentDidMount() {
        this.props.setQuiz();
    }



    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar barStyle="light-content" backgroundColor="#e0d1ff" />
                    <View style={{ flex: 1 }}>
                        <View style={styles.quesationNumberAndTimeContainer}>
                            <View style={styles.quationNumberContainer}>
                                <Icon
                                    name='questioncircleo'
                                    type='antdesign'
                                    color={colors.appTheme}
                                    size={33}
                                    containerStyle={styles.numberIconContainer}
                                />
                                <View>
                                    <Text style={styles.qustionNumber}>10</Text>
                                    <Text>Questions</Text>
                                </View>
                            </View>
                            <View style={styles.timeContainer}>
                                <Icon
                                    name='back-in-time'
                                    type='entypo'
                                    color={colors.appTheme}
                                    size={35}
                                    containerStyle={styles.numberIconContainer}
                                />
                                <View>
                                    <Text style={styles.time}>10</Text>
                                    <Text>Minutes</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.instructionContainer}>
                            <Text style={styles.instructionTitle}>Instructions</Text>
                            <Text style={styles.instruction}>There will be a good amount of instruction. There will be a good amount of instruction. There will be a good amount of instruction. There will be a good amount of instruction.</Text>
                            {/* <Text>Instructions</Text> */}
                            {/* <Text>Instructions</Text> */}
                        </View>
                    </View>
                    <View style={{ flex: .2, paddingHorizontal: 30 }}>
                        <TouchableOpacity style={styles.submitButtom} onPress={() => this.sendCourse()}>
                            <Text style={styles.submitText}>Start Quiz</Text>
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


function mapStateToProps(state) {
    return {
        auth: state.AuthReducer
    };
}

export default connect(
    mapStateToProps,
    {setQuiz}
)(Quiz);