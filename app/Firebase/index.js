import firebase from 'react-native-firebase';
import { postService } from '../network';

export const setToken = async () => {
    firebase.messaging().getToken()
        .then(async (fcmToken) => {
            if (fcmToken) {
                let request = {
                    endPoint: 'save-device-token',
                    authenticate: true,
                    params: {
                        'device_token': fcmToken,
                    }
                }
                await postService(request);
            }
        });
}


export const subscribeToToic = async ([...topics]) => {
    topics.map((topic) => firebase.messaging().subscribeToTopic(topic));
}

export const unsubscribeFromTopic = async ([...topics]) => {
    topics.map((topic) => firebase.messaging().unsubscribeFromTopic(topic));
}