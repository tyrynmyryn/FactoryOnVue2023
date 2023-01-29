import { initSettings, initSelected } from './init'

const production = {
    namespaced: true,

    state: () => ({
        settings: initSettings(),
        selected: initSelected(),
        robot: {status: 0},
        createCost: 10,
    }),

    getters: {
        robot(state) {
            return state.robot;
        },
    },

    actions: {
        updateRobot({state, commit}, payload) {
            const keys = Object.keys(state.selected);
            const str = keys.map(key => state.selected[key]).join('-');

            commit('setRobot', {
                url: str,
                status: payload || payload === 0 ? payload : state.robot.status 
            })
        }
    },

    mutations: {
        setRobot(state, payload) {
            state.robot = payload
        }
    }
}

export default production;