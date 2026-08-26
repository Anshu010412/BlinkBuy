//if form data does not contain any files  fields
export async function createRecord(collection, payload) {
    try {
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        )

        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//if form data contain any files  fields i.e multipart data
export async function createMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "POST",
            headers: {
            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getRecord(collection) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: "GET",
            headers: {
                "Content-type": "application.json"
            }
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//if form data does not contain any files  fields
export async function updateRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//if form data contain any files  fields i.e multipart data
export async function updateMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.get("id")}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

//if form data does not contain any files  fields
export async function deleteRecord(collection, payload) {
    try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
        response = await response.json()
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}
