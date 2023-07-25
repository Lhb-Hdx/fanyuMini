const page = {
  state: {
    agentActivityCount: false
  },
  mutations: {
    SET_AGENT_ACTIVITY_COUNT: (state, value) => {
      state.agentActivityCount = value
    }
  },
  getters: {
    GET_AGENT_ACTIVITY_COUNT: state => {
      return state.agentActivityCount
    }
  }
}
export default page
