import { SET_USER } from '../actions/types'

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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        id: action.payload.data.user.id,
        avatar: action.payload.data.user.avatar,
        bio: action.payload.data.user.bio,
        birthDate: action.payload.data.user.birthDate,
        countryPrefix: action.payload.data.user.countryPrefix,
        phone: action.payload.data.user.phone,
        email: action.payload.data.user.email,
        name: action.payload.data.user.name,
        gender: action.payload.data.user.gender,
        location: action.payload.data.user.location,
        token: action.payload.data.token,
        institutionId: action.payload.data.user.institution_id,
        studyLevelId: action.payload.data.user.study_level_id,
      }
    default:
      return state;
  }
}