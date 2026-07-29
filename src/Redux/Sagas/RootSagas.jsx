import { all } from "redux-saga/effects"
import MaincategorySagas from "./MainCategorySagas"

export default function* RootSagas() {
    yield all([
        MaincategorySagas(),
    ])
}