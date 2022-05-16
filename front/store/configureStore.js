import {createWrapper} from "next-redux-wrapper";
import {applyMiddleware, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducers from "../reducers";


const configureStore = () => {
    const middlewares = [];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducers, enhancer); // 여기서 만든 store을 component 에서 사용 가능하다.

    return store;
};

const wrapper = createWrapper(
    configureStore,
    {debug: process.env.NODE_ENV === 'development'}
);

export default wrapper;