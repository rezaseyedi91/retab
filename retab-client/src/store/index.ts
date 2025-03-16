import { createStore } from 'vuex'
import RezTabFile from './modules/RezTabFile'
import { Instrumnet, TabType } from './modules/types'
import Note from './modules/Note'
import TabGroup from './modules/TabGroup'
import Measure from './modules/Measure'
import Staff from './modules/Staff'

export default createStore({
  state: {
    utils: {
      keyCoefficient: 1
    },
    isDev: process.env.VUE_APP_ENV == 'development',
    apiUrl: process.env.VUE_APP_API_URL,
    currentDoc: <RezTabFile> new RezTabFile({
      createdAt: new Date(),
      filename: 'file-one.txt',
      instruments: [Instrumnet.LUTE],
      tabType: TabType.ITALIAN
    }).init(),

    ui: {
      contextMenu: {
        isOpen: false,
        location:<number[]> []
      },
      showPreferencesModal: false,//true,
      editingNote: <Note | null> null
    },

  },
  getters: {
    
  },
  mutations: {
  },
  actions: {
    updateComponents() {
      this.state.utils.keyCoefficient = this.state.utils.keyCoefficient * Math.floor(Math.random()*5000)
    }
  },
  modules: {
  }
})
