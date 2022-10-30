import { combineReducers, createStore } from "redux";
import detectionReducer from "./reducers/detection.reducer";
import faceRegisterReducer from "./reducers/face.register.action";

const rootReducer = combineReducers({
    detection: detectionReducer,
    registerFace: faceRegisterReducer
})

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore; 