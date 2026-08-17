import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_FEATURES, CREATE_NEWSLETTER, GET_FEATURES, GET_NEWSLETTER, UPDATE_FEATURES, DELETE_FEATURES, DELETE_NEWSLETTER
    , UPDATE_NEWSLETTER
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("newsletter", action.payload)
    // let response = yield createMultipartRecord("newsletter", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_NEWSLETTER,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("newsletter")
    yield put({
        type: GET_NEWSLETTER,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("newsletter", action.payload)
    yield put({
        type: UPDATE_NEWSLETTER,
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
        type: DELETE_NEWSLETTER,
        payload: action.payload
    })
}


export default function* FeaturesSagas() {
    yield takeEvery(CREATE_FEATURES, createSaga)                                            //Watchers
    yield takeEvery(GET_FEATURES, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_FEATURES, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_FEATURES, deleteSaga)                                            //Watchers
}