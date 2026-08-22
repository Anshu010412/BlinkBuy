import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_SETTING, CREATE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, DELETE_SETTING, DELETE_SETTING_RED
    , UPDATE_SETTING_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("setting", action.payload)
    // let response = yield createMultipartRecord("setting", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_SETTING_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("setting")
    yield put({
        type: GET_SETTING_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("setting", action.payload)
    yield put({
        type: UPDATE_SETTING_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("setting", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_SETTING_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("setting", action.payload)
    yield put({
        type: DELETE_SETTING_RED,
        payload: action.payload
    })
}


export default function* SettingSagas() {
    yield takeEvery(CREATE_SETTING, createSaga)                                            //Watchers
    yield takeEvery(GET_SETTING, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_SETTING, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_SETTING, deleteSaga)                                            //Watchers
}