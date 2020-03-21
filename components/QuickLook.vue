<template lang="pug">
 
    .quickLookContainer
      .quickLook
        .close
          v-icon(@click='quickLook=null') mdi-close
        .header1
          .photo
            img.photo1(:src="'https://source.unsplash.com/60x60/?'+ quickLook.name")
          .name
            .name1 {{quickLook.name}}
            .shortdesc {{quickLook.shortDescription}}
        .left
          .subtitle Metadata
          table.metadata
            tr
              td 
                v-icon.thisicon mdi-calendar-star
                span Created
              td {{quickLook.created}}
            tr
              td 
                v-icon.thisicon mdi-calendar-edit
                span Updated
              td {{quickLook.updated}}
            tr 
              td 
                v-icon.thisicon mdi-tag
                span Tags
              td 
                .tag(v-for="tag in quickLook.tags") 
                  .tag1 {{tag}}
            tr
              td 
                v-icon.thisicon mdi-eye
                span Views
              td {{quickLook.views}}
            tr
              td 
                v-icon.thisicon mdi-chat-outline
                span Discussions
              td {{quickLook.discussions}}
        .mid
        .right
          .subtitle Collection
          table.metadata
            tr
              td 
                v-icon.thisicon mdi-account
                span Owner
              td {{quickLook.owner}}
            tr
              td 
                v-icon.thisicon mdi-account-group
                span Contributors
              td 
            tr 
              td 
                v-icon.thisicon mdi-alpha-t-box-outline
                span Nr of terms
              td {{quickLook.termCount}}
            tr
              td 
                v-icon.thisicon mdi-ray-start-end
                span Nr of relations
              td {{quickLook.relationCount}}
        .title1 Description
        .description(v-html="quickLook.description")
        .gotocollection(@click="gotoCollection(quickLook)") Go to Collection

</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('api', ['AlexCollections', 'alexLoc']),
    colList: function() {
      return null
    },
    quickLook: {
      get() {
        return this.$store.state.app.quickLook
      },
      set(value) {
        this.$store.commit('app/setQuickLook', value)
      }
    }
  },
  watch: {},
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getAlexCollections: 'api/getAlexCollections',
      loadAlexCollection: 'api/loadAlexCollection'
    }),
    gotoCollection: function(collection) {
      var url = this.alexLoc + '/collections/'
      window.location = url + collection.id
    }
  },
  mounted() {}
}
</script>
<style scoped>
.quickLookContainer {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 30px;
  left: 0px;
  background-color: rgba(200, 200, 200, 0.9);
  padding: 40px;
  text-align: center;
}
.quickLook {
  width: 800px;
  max-height: min(calc(100vh - 100px), 800px);
  min-height: 500px;

  padding: 20px;
  background-color: white;
  display: inline-block;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14),
    0 9px 46px 8px rgba(0, 0, 0, 0.12);

  overflow: auto;
}
.close,
.close button {
  font-size: 16px;
  background-color: grey;
  color: white;
  border-radius: 3px;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.close button:hover {
  background-color: lightgray;
  color: black;
}
.left,
.right {
  display: inline-block;
  width: 350px;

  border: 0px solid grey;
  text-align: left;
  padding: 0px;
}
.mid {
  width: 50px;
  display: inline-block;
}

table.metadata {
  padding: 5px 0px;
  width: 100%;
  color: grey;
}
table.metadata tr :nth-child(2) {
  text-align: right;
}
table.metadata tr td {
  padding: 3px 0px;
}
.photo {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: lightblue;
  margin: 5px;
  margin-right: 10px;
  vertical-align: top;
}
.name {
  display: inline-block;
  width: 500px;
  height: 60px;
  margin: 5px;
}
.name1 {
  font-size: 18px;
  font-weight: 800;
}
.shortdesc {
  color: grey;
  max-height: 40px;
}
.photo1 {
  border-radius: 5px;
  width: 60px;
  height: 60px;
}
.header1 {
  text-align: left;
  margin-bottom: 20px;
}
.tag1 {
  background-color: #d3eeff;
  display: inline-block;
  padding: 0px 5px;
  border-radius: 3px;
}
.subtitle,
.title1 {
  font-size: 20px;
  font-weight: 600;
  text-align: left;
}
.title1 {
  margin-bottom: 10px;
  margin-top: 30px;
}
.description {
  text-align: left;
}
.gotocollection {
  color: blue;
  position: absolute;
  right: 20px;
  bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
.gotocollection:hover {
  color: #8282ff;
}
.thisicon {
  font-size: 18px;
  margin-right: 10px;
}
</style>
