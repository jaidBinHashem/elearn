import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ScholarshipsReducer from "./ScholarshipsReducer";
import CategoryReducer from "./CategoryReducer";
import BlogReducer from "./BlogReducer";
import QuizReducer from "./QuizReducer";
import UserReducer from "./UserReducer";
import SubjectsReducer from "./SubjectsReducer";
import PackageReducer from "./PackageReducer";
import CouponReducer from "./CouponReducer";

export default combineReducers({
    AuthReducer,
    ScholarshipsReducer,
    UserReducer,
    BlogReducer,
    QuizReducer,
    SubjectsReducer,
    PackageReducer,
    CategoryReducer,
    CouponReducer
});

