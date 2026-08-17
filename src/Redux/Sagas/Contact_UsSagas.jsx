import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_CONTACT_US, CREATE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, DELETE_CONTACT_US, DELETE_CONTACT_US_RED
    , UPDATE_CONTACT_US_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("contact_us", action.payload)
    // let response = yield createMultipartRecord("contact_us", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_CONTACT_US_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("contact_us")
    yield put({
        type: GET_CONTACT_US_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("contact_us", action.payload)
    yield put({
        type: UPDATE_CONTACT_US_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("contact_us", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_CONTACT_US_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("contact_us", action.payload)
    yield put({
        type: DELETE_CONTACT_US_RED,
        payload: action.payload
    })
}


export default function* CONTACT_USSagas() {
    yield takeEvery(CREATE_CONTACT_US, createSaga)                                            //Watchers
    yield takeEvery(GET_CONTACT_US, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_CONTACT_US, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_CONTACT_US, deleteSaga)                                            //Watchers
}