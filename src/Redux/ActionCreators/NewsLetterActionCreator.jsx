import { CREATE_NEWSLETTER, DELETE_NEWSLETTER, GET_NEWSLETTER, UPDATE_NEWSLETTER } from "../Constant";

export function createNewsLetter(data) {
    return {
        type: CREATE_NEWSLETTER,
        payload: data
    }
}

export function getNewsLetter() {
    return {
        type: GET_NEWSLETTER
    }
}

export function updateNewsLetter(data) {
    return {
        type: UPDATE_NEWSLETTER,
        payload: data
    }
}

export function deleteNewsLetter(data) {
    return {
        type: DELETE_NEWSLETTER,
        payload: data
    }
}