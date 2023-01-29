import {initParts} from './init'

const parts = {
    namespaced: true,

    state: () => ({
        parts: initParts(),
    }),

    actions: {
        toggleDetail({state, commit}, {action, part}) {
            const filtered = state.parts.map(item => {
                if (item.id === part.id) {
                    if (action === 'buy') {
                        item.available += 1;
                        const idx = item.row.findIndex(item => item === 0)
                        item.row[idx] = 1;
                    } else {
                        item.available -= 1;
                        if (item.available < item.row.length) {
                            const idx = item.row.findIndex(item => item === 1)
                            item.row[idx] = 0;
                        }
                    }
                }
                return item
            })
            commit('updateParts', filtered)
        },

        toggleParts({state, commit}, {part, index}) {
            const filtered = state.parts.map(item => {
                if (item.id === part.id) {
                    if (item.row[index] === 1) {
                        item.available -= 1;
                        item.row[index] = 2
                    } else if (item.row[index] === 2) {
                        item.available += 1;
                        item.row[index] = 1
                    }
                }
                return item
            })
            commit('updateParts', filtered)
        },

        resetParts({state, commit}) {
            const filtered = state.parts.map(item => {
                const row = item.row.map((_, i) => {
                    if (i + 1 <= item.available) return 1
                    return 0
                })
                return {...item, row}
            })
            commit('updateParts', filtered)
        }
    },

    mutations: {
        updateParts(state, payload) {
            state.parts = payload
        },
    }
}

export default parts;