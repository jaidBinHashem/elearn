import React from 'react'
import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Colors from '../../global/colors';
import styles from './styles';


const labels = ["Account", "Study Level", "Complete"];
const customStyles = {
    stepIndicatorSize: 45,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.appTheme,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: Colors.appTheme,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.appTheme,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.appTheme,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 16,
    stepIndicatorLabelCurrentColor: Colors.appTheme,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: Colors.appTheme
}



export default CounterView = (props) => {
    return (
        <View style={styles.counterContainer}>
            <StepIndicator
                customStyles={customStyles}
                stepCount={3}
                currentPosition={props.pageNumber}
                labels={labels}
            />
        </View>
    )
}