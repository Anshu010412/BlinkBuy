import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_USER, CREATE_USER_RED, GET_USER, GET_USER_RED, UPDATE_USER, DELETE_USER, DELETE_USER_RED
    , UPDATE_USER_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("user", action.payload)
    // let response = yield createMultipartRecord("user", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_USER_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("user")
    yield put({
        type: GET_USER_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("user", action.payload)
    yield put({
        type: UPDATE_USER_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("user", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_USER_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("user", action.payload)
    yield put({
        type: DELETE_USER_RED,
        payload: action.payload
    })
}


export default function* USERSagas() {
    yield takeEvery(CREATE_USER, createSaga)                                            //Watchers
    yield takeEvery(GET_USER, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_USER, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_USER, deleteSaga)                                            //Watchers
}