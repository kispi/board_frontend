import BaseModel from 'base'

const User = {
    email: null,
    nickname: null,
    phone: null,
    name: null,
    point: null,
    lastActivity: null,
}
User.prototype = BaseModel

const state = () => {
    user: User
}

const getters = {
    user(state) {
        return state.user
    }
}

const mutations = {
    setUser(state, payload) {
        if (!payload) {
            state.user = new User()
            return
        }
        Object.keys(payload).forEach(key => {
            if (payload[key]) {
                state.user[key] = payload[key]
            }
        })
    },
}

export default {
    state,
    getters,
    mutations
}