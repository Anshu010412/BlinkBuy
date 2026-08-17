import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_CART, CREATE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, DELETE_CART, DELETE_CART_RED
    , UPDATE_CART_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("cart", action.payload)
    // let response = yield createMultipartRecord("cart", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_CART_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("cart")
    yield put({
        type: GET_CART_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("cart", action.payload)
    yield put({
        type: UPDATE_CART_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("cart", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_CART_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("cart", action.payload)
    yield put({
        type: DELETE_CART_RED,
        payload: action.payload
    })
}


export default function* CARTSagas() {
    yield takeEvery(CREATE_CART, createSaga)                                            //Watchers
    yield takeEvery(GET_CART, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_CART, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_CART, deleteSaga)                                            //Watchers
}