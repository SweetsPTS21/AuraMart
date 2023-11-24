import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
