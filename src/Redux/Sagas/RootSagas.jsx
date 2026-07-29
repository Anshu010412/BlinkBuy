import { all } from "redux-saga/effects"
import MaincategorySagas from "./MainCategorySagas"
import SubCategorySagas from "./SubCategorySagas"
import BrandSagas from "./BrandSagas"
import ProductSagas from "./ProductSagas"
import FeaturesSagas from "./FeaturesSagas"
import FaqSagas from "./FaqSagas"
import SettingSagas from "./SettingSagas"

export default function* RootSagas() {
    yield all([
        MaincategorySagas(),
        SubCategorySagas(),
        BrandSagas(),
        ProductSagas(),
        FeaturesSagas(),
        FaqSagas(),
        SettingSagas(),
    ])
}