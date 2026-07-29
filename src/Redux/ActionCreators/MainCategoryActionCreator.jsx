import { CREATE_MAINCATEGORY, DELETE_MAINCATEGORY, GET_MAINCATEGORY, UPDATE_MAINCATEGORY } from "../Constant";

export function createMainCategory(data) {
    return {
        type: CREATE_MAINCATEGORY,
        payload: data
    }
}

export function getMainCategory() {
    return {
        type: GET_MAINCATEGORY
    }
}

export function updateMainCategory(data) {
    return {
        type: UPDATE_MAINCATEGORY,
        payload: data
    }
}

export function deleteMainCategory(data) {
    return {
        type: DELETE_MAINCATEGORY,
        payload: data
    }
}