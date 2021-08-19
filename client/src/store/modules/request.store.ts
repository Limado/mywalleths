const RequestStore = {
    namespaced: true,
    state: {
        callingApi: false,
        requestError: false,
        requestErrorMessage: ''
    },
    mutations: {
        setCallingApi(state: any, val: boolean) {
            state.callingApi = val;
        }
    },
    actions: {
    },
    getters: {
        requestError: (state: any) => {
            return state.requestError;
        }
    },
    modules: {
    }
}

export default RequestStore;