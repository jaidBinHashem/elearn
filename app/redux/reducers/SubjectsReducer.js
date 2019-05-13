import { GET_SUBJECTS_RETURN, GET_SUBJECT_DETAILS_RETURN } from '../actions/types'
const initialState = {
  subjects: [],
  subjectsTitleArr: [],
  subjectDetails: []
};

getSubjectArr = (subjects) => {
  let titleArr = [];
  subjects.map((subject) => {
    titleArr.push(subject.title);
  })
  return (titleArr);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECTS_RETURN:
      return {
        ...state,
        subjects: action.payload,
        subjectsTitleArr: getSubjectArr(action.payload)
      }
    case GET_SUBJECT_DETAILS_RETURN:
      return {
        ...state,
        subjectDetails: action.payload.sections
      }
    default:
      return state;
  }
}