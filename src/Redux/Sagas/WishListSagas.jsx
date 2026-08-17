import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_WISHLIST, CREATE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, DELETE_WISHLIST, DELETE_WISHLIST_RED
    , UPDATE_WISHLIST_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("wishlist", action.payload)
    // let response = yield createMultipartRecord("wishlist", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_WISHLIST_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("wishlist")
    yield put({
        type: GET_WISHLIST_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("wishlist", action.payload)
    yield put({
        type: UPDATE_WISHLIST_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("wishlist", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_WISHLIST_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("wishlist", action.payload)
    yield put({
        type: DELETE_WISHLIST_RED,
        payload: action.payload
    })
}


export default function* WISHLISTSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)                                            //Watchers
    yield takeEvery(GET_WISHLIST, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_WISHLIST, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_WISHLIST, deleteSaga)                                            //Watchers
}