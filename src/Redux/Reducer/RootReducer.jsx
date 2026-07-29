import MainCategoryReducer from "./MainCategoryReducer"
import SubCategoryReducer from "./SubCategoryReducer"
import BrandReducer from "./BrandReducer"
import ProductReducer from "./ProductReducer"
import FeaturesReducer from "./FeaturesReducer"
import FaqReducer from "./FaqReducer"
import SettingReducer from "./SettingReducer"
import { combineReducers } from "@reduxjs/toolkit"

export default combineReducers({
  MainCategoryStateData: MainCategoryReducer,
  SubCategoryStateData: SubCategoryReducer,
  BrandStateData: BrandReducer,
  ProductStateData: ProductReducer,
  FeaturesStateData: FeaturesReducer,
  FaqStateData: FaqReducer,
  SettingStateData: SettingReducer,
})



