import Vuex from 'vuex'
import apiModule from './api/fetchapi'
import appModule from './app/appapi'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      api: apiModule,
      app: appModule
    }
  })
}

export default createStore
