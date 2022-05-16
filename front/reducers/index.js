import user from './user';
import post from './post';
import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";


// action creater
const changeNickname = (data) => {
    return {
        type: 'CHANGE_NICKNAME',
        data,
    }
};


// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({ // user, post의 initialState를 자동으로 합쳐서 넣어줌
    index: (state = {}, action) => { // 서버 사이드 렌더링을 위한 index
        switch (action.type) { // dispatch로부터 객체를 받아온다.
            case HYDRATE: // 서버사이드 렌더링을 위함
                console.log('HYDRATE', action);
                return {
                    ...state, ...action.payload
                };
            default:
                return state;
        }
    },
    user,
    post,
});

export default rootReducer;