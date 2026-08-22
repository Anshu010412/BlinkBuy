import { all } from "redux-saga/effects"
import MaincategorySagas from "./MainCategorySagas"
import SubCategorySagas from "./SubCategorySagas"
import BrandSagas from "./BrandSagas"
import ProductSagas from "./ProductSagas"
import FeaturesSagas from "./FeaturesSagas"
import FaqSagas from "./FaqSagas"
import SettingSagas from "./SettingSagas"
import CartSagas from "./CartSagas"
import CheckOutSagas from "./CheckOutSagas"
import WishListSagas from "./WishListSagas"
import UserSagas from "./UserSagas"
import NewsLetterSagas from "./NewsLetterSagas"
import TestimonialSagas from "./TestimonialSagas"
import Contact_UsSagas from "./Contact_UsSagas"

export default function* RootSagas() {
    yield all([
        MaincategorySagas(),
        SubCategorySagas(),
        BrandSagas(),
        ProductSagas(),
        FeaturesSagas(),
        FaqSagas(),
        SettingSagas(),
        CartSagas(),
        CheckOutSagas(),
        WishListSagas(),
        UserSagas(),
        NewsLetterSagas(),
        TestimonialSagas(),
        Contact_UsSagas()
    ])
}