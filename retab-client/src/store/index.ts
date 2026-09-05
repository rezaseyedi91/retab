import { createStore } from 'vuex'
import RezTabFile from './modules/RezTabFile'
import { Instrumnet, TabType } from './modules/types'
import Note from './modules/Note'
import TabGroup from './modules/TabGroup'
import Measure from './modules/Measure'
import Staff from './modules/Staff'
import axios from 'axios'

export type State = {
  utils: {
    keyCoefficient: number
  },
  isDev: boolean,
  apiUrl: string,
  baseUrl: string,
  currentDoc: RezTabFile,
  currentUser?: any,
  login: {
    username?: string,
    password?: string,
    email?: string,
    name?: string,
    repeatPassword?: string,
    isPasswordVisible?: boolean
    isRepeatPasswordVisible?: boolean
  },
  ui: {
    contextMenu: {
      isOpen: boolean,
      location: number[]
  },
showPreferencesModal: false,//true,
  editingNote: Note | null
};
}


export default createStore<State>({
  state: {
    utils: {
      keyCoefficient: 1
    },
    isDev: process.env.VUE_APP_ENV == 'development',
    apiUrl: process.env.VUE_APP_API_URL,
    baseUrl: process.env.BASE_URL,
    currentDoc: <RezTabFile>new RezTabFile({
      createdAt: new Date(),
      filename: 'file-one.txt',
      instruments: [Instrumnet.LUTE],
      tabType: `tab.lute.${TabType.ITALIAN}`
    }).init(),
    login: {
    },
    ui: {
      contextMenu: {
        isOpen: false,
        location: <number[]>[]
      },
      showPreferencesModal: false,//true,
      editingNote: <Note | null>null
    },

  },
  getters: {

  },
  mutations: {
  },
  actions: {
    updateComponents() {
      this.state.utils.keyCoefficient = this.state.utils.keyCoefficient * Math.floor(Math.random() * 5000)
    },
    async logout() {
      const result = await axios.get(process.env.VUE_APP_API_URL + "/retab/user/logout/")
      return result
    }
  },
  modules: {
  }
})
