import axios from 'axios'

//const alexloc = 'http://alex.alex-p.aws.nl.eu.abnamro.com'
const alexloc = 'http://meet-alex.org'

const api = {
  namespaced: true,
  state: { AlexCollections: null, alexLoc: alexloc },
  actions: {
    async getAlexCollections({ commit }) {
      var getLoc = alexloc + '/api/collections'
      const response = await this.$axios.$get(getLoc)

      commit('setAlexCollections', response)
    },
    async loadAlexCollection({ commit, dispatch }, colId) {
      var getLoc = alexloc + '/api/visualise?getCollection=' + colId
      const response = await this.$axios.$get(getLoc)
      dispatch('alexCollectionToGraph', response)
    }
  },
  mutations: {
    setAlexCollections(state, apiResponse) {
      // tidy up alex api content
      var collections = []
      Object.values(apiResponse).forEach(c => {
        collections.push({
          id: c.id,
          name: c.collection_name.trim(),
          owner: c.owner_name,
          description: c.collection_description,
          shortDescription: 'A short description of this collection',
          termCount: c.term_count,
          relationCount: c.ontologies_count,
          created: c.created_at.split(' ')[0],
          updated: c.updated_at.split(' ')[0],
          certified: c.certified,
          discussions: 0,
          tags: ['none'],
          views: 0
        })
      })
      state.AlexCollections = collections
    },

    setLoading(state, val) {
      state.isLoading = val
    },
    setError(state, val) {
      state.errorMessage = val
    }
  }
}
export default api
