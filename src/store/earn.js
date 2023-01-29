const earn = {
    namespaced: true, 

    state: () => ({
        total: 0,
        limit: 100,
        additionCoins: {
            value: 5,
            checked: false,
        },
    }),

    mutations: {
        setTotal(state, payload) {
            state.total = payload
        },

        toggleAdditionCoins(state, payload) {
            state.additionCoins.checked = payload
        }
    },

    actions: {
        earnMoney({state, commit}) {
            let {value, checked} = state.additionCoins;

            if (!checked) {value = 1}
            if (state.total + value > state.limit) {value = state.limit - state.total}

            commit('setTotal', state.total + value)
        }
    }
}

export default earn;