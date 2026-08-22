import { CREATE_SUBCATEGORY, DELETE_SUBCATEGORY, GET_SUBCATEGORY, UPDATE_SUBCATEGORY } from "../Constant";

export function createSubCategory(data) {
    return {
        type: CREATE_SUBCATEGORY,
        payload: data
    }
}

export function getSubCategory() {
    return {
        type: GET_SUBCATEGORY
    }
}

export function updateSubCategory(data) {
    return {
        type: UPDATE_SUBCATEGORY,
        payload: data
    }
}

export function deleteSubCategory(data) {
    return {
        type: DELETE_SUBCATEGORY,
        payload: data
    }
}