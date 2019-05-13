import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ScholarshipsReducer from "./ScholarshipsReducer";
import BlogReducer from "./BlogReducer";
import QuizReducer from "./QuizReducer";
import UserReducer from "./UserReducer";
import SubjectsReducer from "./SubjectsReducer";

export default combineReducers({
    AuthReducer,
    ScholarshipsReducer,
    UserReducer,
    BlogReducer,
    QuizReducer,
    SubjectsReducer
});

