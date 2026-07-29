import  MainCategoryReducer from "./MainCategoryReducer"
import { combineReducers } from "@reduxjs/toolkit"

export default combineReducers({
  MainCategoryStateData: MainCategoryReducer,
})



