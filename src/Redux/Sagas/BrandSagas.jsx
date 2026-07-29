import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_BRAND, CREATE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, DELETE_BRAND, DELETE_BRAND_RED
    , UPDATE_BRAND_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("brand", action.payload)
    // let response = yield createMultipartRecord("brand", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_BRAND_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("brand")
    yield put({
        type: GET_BRAND_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("brand", action.payload)
    yield put({
        type: UPDATE_BRAND_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("brand", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_BRAND_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("brand", action.payload)
    yield put({
        type: DELETE_BRAND_RED,
        payload: action.payload
    })
}


export default function* BrandSagas() {
    yield takeEvery(CREATE_BRAND, createSaga)                                            //Watchers
    yield takeEvery(GET_BRAND, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_BRAND, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_BRAND, deleteSaga)                                            //Watchers
}