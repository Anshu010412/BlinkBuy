import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_FAQ, CREATE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, DELETE_FAQ, DELETE_FAQ_RED
    , UPDATE_FAQ_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("faq", action.payload)
    // let response = yield createMultipartRecord("faq", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_FAQ_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("faq")
    yield put({
        type: GET_FAQ_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("faq", action.payload)
    yield put({
        type: UPDATE_FAQ_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("faq", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_FAQ_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("faq", action.payload)
    yield put({
        type: DELETE_FAQ_RED,
        payload: action.payload
    })
}


export default function* FaqSagas() {
    yield takeEvery(CREATE_FAQ, createSaga)                                            //Watchers
    yield takeEvery(GET_FAQ, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_FAQ, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_FAQ, deleteSaga)                                            //Watchers
}