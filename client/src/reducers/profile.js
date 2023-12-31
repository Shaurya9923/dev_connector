const initalState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state=initalState, action){
    const {type, payload} = action;
    switch(type){
        case 'GET_PROFILE':
        case 'UPDATE_PROFILE':
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case 'GET_PROFILES':
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case 'PROFILE_ERROR':
            return {
                ...state,
                profile: null,
                error: payload,
                loading: false
            }
        case 'CLEAR_PROFILE':
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case 'GET_REPOS':
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case 'REPO_NULL':
            return {
                ...state,
                repos: [],
                loading: false
            }
        default:
            return state;
    }
}