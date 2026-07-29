import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED
    , UPDATE_MAINCATEGORY_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("maincategory", action.payload)
    // let response = yield createMultipartRecord("maincategory", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_MAINCATEGORY_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("maincategory")
    yield put({
        type: GET_MAINCATEGORY_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("maincategory", action.payload)
    yield put({
        type: UPDATE_MAINCATEGORY_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("maincategory", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_MAINCATEGORY_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("maincategory", action.payload)
    yield put({
        type: DELETE_MAINCATEGORY_RED,
        payload: action.payload
    })
}


export default function* MaincategorySagas() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)                                            //Watchers
    yield takeEvery(GET_MAINCATEGORY, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)                                            //Watchers
}