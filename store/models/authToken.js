import BaseModel from 'base'

const AuthToken = {
    user: null,
    authToken: null,
    lastLogin: null,
    expireAt: null,
}
AuthToken.prototype = BaseModel

const state = () => {
    authToken: AuthToken
}

const getters = {
    authToken(state) {
        return state.authToken
    }
}

const mutations = {
    setAuthToken(state, payload) {
        if (!payload) {
            state.authToken = new AuthToken()
            return
        }
        Object.keys(payload).forEach(key => {
            if (payload[key]) {
                state.authToken[key] = payload[key]
            }
        })
    },
}

export default {
    state,
    getters,
    mutations
}