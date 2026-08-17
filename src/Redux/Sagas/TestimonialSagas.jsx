import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED
    , UPDATE_TESTIMONIAL_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("testimonial", action.payload)
    // let response = yield createMultipartRecord("testimonial", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_TESTIMONIAL_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("testimonial")
    yield put({
        type: GET_TESTIMONIAL_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("testimonial", action.payload)
    yield put({
        type: UPDATE_TESTIMONIAL_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("testimonial", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_TESTIMONIAL_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("testimonial", action.payload)
    yield put({
        type: DELETE_TESTIMONIAL_RED,
        payload: action.payload
    })
}


export default function* TESTIMONIALSagas() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)                                            //Watchers
    yield takeEvery(GET_TESTIMONIAL, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)                                            //Watchers
}