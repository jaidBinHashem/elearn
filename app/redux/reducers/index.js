import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ScholarshipsReducer from "./ScholarshipsReducer";
import BlogReducer from "./BlogReducer";
import QuizReducer from "./QuizReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
    AuthReducer,
    ScholarshipsReducer,
    UserReducer,
    BlogReducer,
    QuizReducer
});

