import authReducer from "./authReducer";
import userReducer from "./userReducer";
import tourReducer from "./tourReducer";
import orderReducer from "./orderReducer";
import feedbackReducer from "./feebackReducer";
import placeReducer from "./placeReducer";
import staffReducer from "./staffReducer";
import requestReducer from "./requestReducer";
import reportReducer from "./reportReducer";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}
const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token', 'refresh_token', 'role']
}
const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    tour: tourReducer,
    order: orderReducer,
    feedback: feedbackReducer,
    place: placeReducer,
    staff: staffReducer,
    request: requestReducer,
    report: reportReducer
})
export default rootReducer