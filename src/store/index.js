import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: {states: false}
  },
  mutations: {
    showLoad(state, payload){
      state.loading.states = true;
    },
    hideLoad(state){
      state.loading.states = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
