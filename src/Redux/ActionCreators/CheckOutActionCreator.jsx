import { CREATE_CHECKOUT, DELETE_CHECKOUT, GET_CHECKOUT, UPDATE_CHECKOUT } from "../Constant";

export function createCheckOut(data) {
    return {
        type: CREATE_CHECKOUT,
        payload: data
    }
}

export function getCheckOut() {
    return {
        type: GET_CHECKOUT
    }
}

export function updateCheckOut(data) {
    return {
        type: UPDATE_CHECKOUT,
        payload: data
    }
}

export function deleteCheckOut(data) {
    return {
        type: DELETE_CHECKOUT,
        payload: data
    }
}