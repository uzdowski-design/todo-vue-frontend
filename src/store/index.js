import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const listURL = "http://127.0.0.1:8000/lists/";
const taskURL = "http://127.0.0.1:8000/tasks/";

export default new Vuex.Store({
  state: {
    search: null,
    lists: [],
    tasks: [],
    snackbar: {
      show: false,
      text: ''
    }
  },
  mutations: {
    SET_SEARCH(state, value) {
      state.search = value;
    },
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
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    DONE_TASK(state, data) {
      let newState = [...state.tasks]
      const elIndex = state.tasks.findIndex(el => el.id == data.id)
      newState[elIndex] = { ...newState[elIndex], done: !newState[elIndex].done }
      state.tasks = newState;
    },
    EDIT_TASK(state, data) {
      let newState = [...state.tasks]
      const elIndex = state.tasks.findIndex(el => el.id == data.id)
      newState[elIndex] = { ...newState[elIndex], name: data.payload.name }
      state.tasks = newState;
    },
    EDIT_DATE(state, data) {
      let newState = [...state.tasks]
      const elIndex = state.tasks.findIndex(el => el.id == data.id)
      newState[elIndex] = { ...newState[elIndex], due_date: data.payload.due_date }
      state.tasks = newState;
    },
    SHOW_SNACKBAR(state, text) {
      let timeout = 0; // make one disappear before next is shown
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout)
    },
    CLOSE_SNACKBAR(state) {
      state.snackbar.show = false;
      state.snackbar.text = ''
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
      commit('ADD_LIST', res.data);
      commit('SHOW_SNACKBAR', 'List Created');
    },
    async deleteList({ commit }, data) {
      await axios.delete(listURL + data.id + '/');
      commit('DELETE_LIST', data)
      commit('SHOW_SNACKBAR', 'List Deleted');
    },
    async fetchTasks({ commit }, params) {
      const res = await axios.get(listURL + params.id + '/')
      commit('SET_TASKS', res.data.children)
    },
    // Tasks actions
    async addTask({ commit }, data) {
      const res = await axios.post(taskURL, data);
      commit('ADD_TASK', res.data);
      commit('SHOW_SNACKBAR', 'Task Added')
    },
    async deleteTask({ commit }, id) {
      await axios.delete(taskURL + id + "/");
      commit('DELETE_TASK', id);
      commit('SHOW_SNACKBAR', 'Task Deleted')
    },
    async doneTask({ commit }, data) {
      await axios.patch(taskURL + data.id + "/", data.payload);
      commit('DONE_TASK', data)
    },
    async editTask({ commit }, data) {
      await axios.patch(taskURL + data.id + "/", data.payload);
      commit('EDIT_TASK', data);
      commit('SHOW_SNACKBAR', 'Task Updated')
    },
    async editDate({ commit }, data) {
      await axios.patch(taskURL + data.id + "/", data.payload);
      commit('EDIT_DATE', data);
      commit('SHOW_SNACKBAR', 'Due Date Updated')
    }
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) return state.tasks;
      return state.tasks.filter(task => task.name.toLowerCase().includes(state.search.toLowerCase()))
    }
  },
  modules: {
  }
})
