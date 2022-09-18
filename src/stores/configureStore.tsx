import { combineReducers, createStore } from "redux";
import detectionReducer from "./reducers/detection.reducer";

const rootReducer = combineReducers({
    detection: detectionReducer
})

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore; 