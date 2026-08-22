import MainCategoryReducer from "./MainCategoryReducer"
import SubCategoryReducer from "./SubCategoryReducer"
import BrandReducer from "./BrandReducer"
import ProductReducer from "./ProductReducer"
import FeaturesReducer from "./FeaturesReducer"
import FaqReducer from "./FaqReducer"
import SettingReducer from "./SettingReducer"
import CartReducer from "./CartReducer"
import CheckOutReducer from "./CheckOutReducer"
import WishListReducer from "./WishListReducer"
import TestimonialReducer from "./TestimonialReducer"
import NewsLetterReducer from "./NewsLetterReducer"
import UserReducer from "./UserReducer"
import Contact_UsReducer from "./Contact_UsReducer"

import { combineReducers } from "@reduxjs/toolkit"

export default combineReducers({
  MainCategoryStateData: MainCategoryReducer,
  SubCategoryStateData: SubCategoryReducer,
  BrandStateData: BrandReducer,
  ProductStateData: ProductReducer,
  FeaturesStateData: FeaturesReducer,
  FaqStateData: FaqReducer,
  SettingStateData: SettingReducer,
  CartStateData: CartReducer,
  CheckOutStateData: CheckOutReducer,
  WishListStateData: WishListReducer,
  TestimonialStateData: TestimonialReducer,
  NewsLetterStateData: NewsLetterReducer,
  UserStateData: UserReducer,
  Contact_UsStateData: Contact_UsReducer,
})



