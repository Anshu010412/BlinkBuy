import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import RootReducer from "./Reducer/RootReducer";
import RootSagas from "./Sagas/RootSagas";

const Saga = createSagaMiddleware()

const Store = configureStore({
    reducer: RootReducer,
    middleware: () => [Saga]
})

Saga.run(RootSagas)

export default Store
