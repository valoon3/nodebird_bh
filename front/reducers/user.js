

const dummyUser = {
    id: 1,
    nickname: '제로초',
    Posts: [],
    Followings: [],
    Followers: [],
};

export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {},
};

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true,
                me: dummyUser,
                loginData: action.data, // 받아온 action.data
            };
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                me: {},

            };
        default:
            return state;
    }
};

export default reducer;