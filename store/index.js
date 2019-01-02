import Vuex from 'vuex'
import AuthToken from './models/authToken'
import User from './models/user'

export const store = new Vuex.Store({
    modules: {
        AuthToken,
        User
    }
})