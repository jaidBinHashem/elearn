import { SET_USER, SET_USER_MYPROFILE } from '../actions/types'

const initialState = {
  id: null,
  avatar: null,
  bio: null,
  birthDate: null,
  countryPrefix: null,
  phone: null,
  email: null,
  name: null,
  gender: null,
  location: null,
  token: null,
  institutionId: null,
  studyLevelId: null,
  studyLevel: null,
  institution: null,
  image: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_MYPROFILE:
      return {
        ...state,
        birthDate: action.payload.birth_date,
        avatar: action.payload.image,
        email: action.payload.email,
        gender: action.payload.gender,
        name: action.payload.name,
        phone: action.payload.phone,
        location: action.payload.location,
        institution: action.payload.institution,
        studyLevel: action.payload.study_level,
        institutionId: action.payload.institution_id,
        studyLevelId: action.payload.study_level_id,
        image: action.payload.image
      }
    default:
      return state;
  }
}