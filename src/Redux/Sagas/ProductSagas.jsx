import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_PRODUCT, CREATE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCT_RED
    , UPDATE_PRODUCT_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("product", action.payload)
    // let response = yield createMultipartRecord("product", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_PRODUCT_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("product")
    yield put({
        type: GET_PRODUCT_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("product", action.payload)
    yield put({
        type: UPDATE_PRODUCT_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("product", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_PRODUCT_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("product", action.payload)
    yield put({
        type: DELETE_PRODUCT_RED,
        payload: action.payload
    })
}


export default function* ProductSagas() {
    yield takeEvery(CREATE_PRODUCT, createSaga)                                            //Watchers
    yield takeEvery(GET_PRODUCT, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_PRODUCT, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_PRODUCT, deleteSaga)                                            //Watchers
}