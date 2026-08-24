import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_NEWSLETTER,
    CREATE_NEWSLETTER_RED,
    GET_NEWSLETTER,
    GET_NEWSLETTER_RED,
    UPDATE_NEWSLETTER,
    UPDATE_NEWSLETTER_RED,
    DELETE_NEWSLETTER,
    DELETE_NEWSLETTER_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("newsletter", action.payload)
    // let response = yield createMultipartRecord("newsletter", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_NEWSLETTER_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("newsletter")
    yield put({
        type: GET_NEWSLETTER_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("newsletter", action.payload)
    yield put({
        type: UPDATE_NEWSLETTER_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("newsletter", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_NEWSLETTER,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("newsletter", action.payload)
    yield put({
        type: DELETE_NEWSLETTER_RED,
        payload: action.payload
    })
}


export default function* NewsLetterSagas() {
    yield takeEvery(CREATE_NEWSLETTER, createSaga)                                            //Watchers
    yield takeEvery(GET_NEWSLETTER, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_NEWSLETTER, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)                                            //Watchers
}