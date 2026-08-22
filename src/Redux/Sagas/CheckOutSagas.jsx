import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_CHECKOUT, CREATE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, DELETE_CHECKOUT, DELETE_CHECKOUT_RED
    , UPDATE_CHECKOUT_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("checkout", action.payload)
    // let response = yield createMultipartRecord("checkout", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_CHECKOUT_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("checkout")
    yield put({
        type: GET_CHECKOUT_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("checkout", action.payload)
    yield put({
        type: UPDATE_CHECKOUT_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("checkout", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_CHECKOUT_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("checkout", action.payload)
    yield put({
        type: DELETE_CHECKOUT_RED,
        payload: action.payload
    })
}


export default function* CHECKOUTSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)                                            //Watchers
    yield takeEvery(GET_CHECKOUT, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)                                            //Watchers
}