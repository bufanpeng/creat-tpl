function templateVueModel() {
  const str = `import Vue from "vue";
import Vuex from "vuex";
/*
import {
  demo
} from '../api/req'
*/
Vue.use(Vuex);
export default {
  namespaced: true,
  state: {},
  actions: {
    /*
    async demo ({ commit }, params) {
      const res = await demo(params)
      return res
    },
    */
  },
  mutations: {},
};`;
  return str;
}
module.exports = templateVueModel;
