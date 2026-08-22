import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_FEATURES, CREATE_FEATURES_RED, GET_FEATURES, GET_FEATURES_RED, UPDATE_FEATURES, DELETE_FEATURES, DELETE_FEATURES_RED
    , UPDATE_FEATURES_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("features", action.payload)
    // let response = yield createMultipartRecord("features", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_FEATURES_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("features")
    yield put({
        type: GET_FEATURES_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("features", action.payload)
    yield put({
        type: UPDATE_FEATURES_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("features", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_FEATURES_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("features", action.payload)
    yield put({
        type: DELETE_FEATURES_RED,
        payload: action.payload
    })
}


export default function* FeaturesSagas() {
    yield takeEvery(CREATE_FEATURES, createSaga)                                            //Watchers
    yield takeEvery(GET_FEATURES, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_FEATURES, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_FEATURES, deleteSaga)                                            //Watchers
}