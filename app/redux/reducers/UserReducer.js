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
        id: action.payload.id,
        birthDate: action.payload.birth_date,
        avatar: action.payload.image,
        email: action.payload.email,
        gender: action.payload.gender,
        name: action.payload.name,
        phone: action.payload.phone,
        location: action.payload.location,
        studyLevel: action.payload.study_level,
        studyLevelId: action.payload.study_level_id,
        studySlug: action.payload.study_level_slug,
        institution: action.payload.institution,
        institutionId: action.payload.institution_id,
        institutionSlug: action.payload.institution_slug,
        image: action.payload.image,
      }
    default:
      return state;
  }
}