/**
 * Created by BS-175 on 19-Jul-17.
 */
const app = {}

app.uat = {
    //UAT
    // BASE_URL: 'https://dev.eshosikhi.com/api/'
    // BASE_URL: 'https://8fefcdc2.ngrok.io/api/'
    BASE_URL: 'https://v2.eshosikhi.com/api/'
};

app.live = {
    //Live
    BASE_URL: 'https://v2.eshosikhi.com/api/'
    // BASE_URL: 'https://11768a06.ngrok.io/api/'
    // BASE_URL: 'https://dev.eshosikhi.com/api/'
};

module.exports = __DEV__ ? app.uat : app.live;
