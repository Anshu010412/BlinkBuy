import { put, takeEvery } from "redux-saga/effects";
import { createRecord, deleteRecord, getRecord, updateRecord } from "./APICallingService/Index";
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./APICallingService/Index";
import {
    CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED
    , UPDATE_SUBCATEGORY_RED
} from "../Constant";

function* createSaga(action) {                                                                //worker Sagas
    let response = yield createRecord("subcategory", action.payload)
    // let response = yield createMultipartRecord("subcategory", action.payload)             //if form data contain any files data
    yield put({
        type: CREATE_SUBCATEGORY_RED,
        payload: response
    })
}

function* getSaga(action) {                                                                    //worker Sagas
    let response = yield getRecord("subcategory")
    yield put({
        type: GET_SUBCATEGORY_RED,
        payload: response
    })
}

function* updateSaga(action) {                                                                 //worker Sagas
    yield updateRecord("subcategory", action.payload)
    yield put({
        type: UPDATE_SUBCATEGORY_RED,
        payload: action.payload
    })
    // let response = yield updateMultipartRecord("subcategory", action.payload)               //if form data contain any files data
    // yield put({
    //     type: UPDATE_SUBCATEGORY_RED,
    //     payload: response
    // })
}

function* deleteSaga(action) {                                                                  //worker Sagas
    yield deleteRecord("subcategory", action.payload)
    yield put({
        type: DELETE_SUBCATEGORY_RED,
        payload: action.payload
    })
}


export default function* SubCategorySagas() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)                                            //Watchers
    yield takeEvery(GET_SUBCATEGORY, getSaga)                                                  //Watchers
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)                                            //Watchers
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)                                            //Watchers
}