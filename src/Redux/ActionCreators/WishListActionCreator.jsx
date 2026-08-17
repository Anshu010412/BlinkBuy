import { CREATE_WISHLIST, DELETE_WISHLIST, GET_WISHLIST, UPDATE_WISHLIST } from "../Constant";

export function createWishList(data) {
    return {
        type: CREATE_WISHLIST,
        payload: data
    }
}

export function getWishList() {
    return {
        type: GET_WISHLIST
    }
}

export function updateWishList(data) {
    return {
        type: UPDATE_WISHLIST,
        payload: data
    }
}

export function deleteWishList(data) {
    return {
        type: DELETE_WISHLIST,
        payload: data
    }
}