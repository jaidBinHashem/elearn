import { GET_CATEGORIES_RETURN, SET_CATEGORIES_RETURN } from '../actions/types'
const initialState = {
  categories: [],
  selectedCategoryID: null,
};

getSelectedCategory = (categories) => {
  let selectedCategory = categories[0].id;
  categories.map(category => {
    category.selected && (selectedCategory = category.id);
  });
  return selectedCategory;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_RETURN:
      return {
        ...state,
        categories: action.payload,
        selectedCategoryID: getSelectedCategory(action.payload)
      }
    case SET_CATEGORIES_RETURN:
      return {
        ...state,
        selectedCategoryID: action.payload
      }
    default:
      return state;
  }
}