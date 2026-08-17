import { CREATE_CONTACT_US, DELETE_CONTACT_US, GET_CONTACT_US, UPDATE_CONTACT_US } from "../Constant";

export function createContact_Us(data) {
    return {
        type: CREATE_CONTACT_US,
        payload: data
    }
}

export function getContact_Us() {
    return {
        type: GET_CONTACT_US
    }
}

export function updateContact_Us(data) {
    return {
        type: UPDATE_CONTACT_US,
        payload: data
    }
}

export function deleteContact_Us(data) {
    return {
        type: DELETE_CONTACT_US,
        payload: data
    }
}