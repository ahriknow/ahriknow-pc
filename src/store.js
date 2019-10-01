import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function compileStr(code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
}

function uncompileStr(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

const state = {
  user: localStorage.getItem("auth") ? JSON.parse(uncompileStr(localStorage.getItem("auth"))) : null,
  loading: true
}

const mutations = {
  SAVE_USER(state, user) {
    localStorage.setItem("auth", compileStr(user))
    state.user = JSON.parse(user)
  },
  SAVE_LOADING(state, loading) {
    state.loading = loading
  }
}

export default new Vuex.Store({
  state,
  mutations
})
