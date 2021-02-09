import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const listURL = "http://127.0.0.1:8000/lists/";
const taskURL = "http://127.0.0.1:8000/tasks/";

export default new Vuex.Store({
  state: {
    lists: [],
    tasks: []
  },
  mutations: {
    SET_LISTS(state, lists) {
      state.lists = lists
    },
    ADD_LIST(state, list) {
      state.lists.push(list)
    },
    DELETE_LIST(state, data) {
      state.lists = state.lists.filter(list => list.id !== data.id)
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    DELETE_TASK(state, data) {
      state.tasks = state.tasks.filter(task => task.id !== data.id);
    },
    DONE_TASK(state, data) {
      let newState = [...state.tasks]
      const elIndex = state.tasks.findIndex(el => el.id == data.id)
      newState[elIndex] = { ...newState[elIndex], done: !newState[elIndex].done }
      state.tasks = newState;
    }
  },
  actions: {
    // Lists actions
    async fetchLists({ commit }) {
      const res = await axios.get(listURL);
      commit('SET_LISTS', res.data)
    },
    async addList({ commit }, data) {
      const res = await axios.post(listURL, data);
      commit('ADD_LIST', res.data)
    },
    async deleteList({ commit }, data) {
      await axios.delete(listURL + data.id + '/');
      commit('DELETE_LIST', data)
    },
    async fetchTasks({ commit }, params) {
      const res = await axios.get(listURL + params.id + '/')
      commit('SET_TASKS', res.data.children)
    },
    // Tasks actions
    async addTask({ commit }, data) {
      const res = await axios.post(taskURL, data);
      commit('ADD_TASK', res.data)
    },
    async deleteTask({ commit }, data) {
      await axios.delete(taskURL + data.id + "/");
      commit('DELETE_TASK', data)
    },
    async doneTask({ commit }, data) {
      await axios.patch(taskURL + data.id + "/", data.payload);
      commit('DONE_TASK', data)
    }
  },
  modules: {
  }
})
