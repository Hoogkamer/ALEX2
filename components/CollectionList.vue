<template lang="pug">
  div
    .breadcrum
      a.home(:href="alexLoc") Home
      span.seperator /
      span Collections
    .collection-title
      h1 Collections
    .help-message
      span Help the community by adding your terms an definitions

    .collection-list
      .search
        v-text-field(v-model='colFilter' outlined dense prepend-inner-icon="mdi-magnify" placeholder='Search a collection')
      .collectionheader 
        .tab PUBLIC
        .sortby
          v-icon.check(v-if='!certOnly' @click='certOnly= !certOnly') mdi-checkbox-blank-outline
          v-icon.check(v-if='certOnly' @click='certOnly= !certOnly') mdi-check-box-outline
          span Certified only
          .hspacer
          div.sp1 Sort by: 
          div.sp2 
            select.sel(v-model='sortOn')
              option(v-for='sort in sorts1') {{sort}}
      .collection(v-for= "collection in colList" @click='gotoCollection(collection)' @mouseover="hover = collection"
    @mouseleave="hover = null")
        .photo
          img.photo1(:src="'https://source.unsplash.com/60x60/?'+ collection.name")
        .details
          .quicklookbutton(v-if="hover === collection" @click.stop='quickLook=collection')
            v-icon.lookicon mdi-eye
            span Quick Look
          .name
            v-icon.certified(v-if="collection.certified" title='Certified') mdi-check-circle
            span {{collection.name}}
          .owner(title="Owner")
             v-icon.ownericon mdi-account
             span.ownername {{collection.owner}}
          .specs
            .spec(title="Created")
              v-icon.specsicon mdi-calendar-star 
              span.spectext {{collection.created}}
            .spec(title="Changed")
              v-icon.specsicon mdi-calendar-edit
              span.spectext {{collection.updated}}
            .spec(title="Terms")
              v-icon.specsicon mdi-alpha-t-box-outline
              span.spectext {{collection.termCount}}
            .spec(title="Relations")
              v-icon.specsicon mdi-ray-start-end
              span.spectext {{collection.relationCount}}
      .addinfo
        div Some extra information
    quick-look(v-if="quickLook")
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import QuickLook from './QuickLook'

export default {
  components: { QuickLook },
  props: {},
  data() {
    return {
      sorts1: ['Name', 'Created', 'Updated'],
      colFilter: '',
      sortOn: 'Name',
      certOnly: false,
      hover: null
    }
  },
  computed: {
    ...mapState('api', ['AlexCollections', 'alexLoc']),
    quickLook: {
      get() {
        return this.$store.state.app.quickLook
      },
      set(value) {
        this.$store.commit('app/setQuickLook', value)
      }
    },

    colList: function() {
      let col = this.AlexCollections
      if (this.certOnly) {
        col = col.filter(c => c.certified)
      }
      if (this.colFilter.length > 2) {
        col = col.filter(c =>
          c.name.toLowerCase().includes(this.colFilter.toLowerCase())
        )
      }
      if (col) {
        col.sort((a, b) =>
          this.sortOn === 'Name'
            ? a[this.sortOn.toLowerCase()]
                .toLowerCase()
                .localeCompare(
                  b[this.sortOn.toLowerCase()].toLowerCase()
                )
            : b[this.sortOn.toLowerCase()]
                .toLowerCase()
                .localeCompare(
                  a[this.sortOn.toLowerCase()].toLowerCase()
                )
        )
      }
      console.log(col)
      return col
    }
  },
  watch: {},
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getAlexCollections: 'api/getAlexCollections',
      loadAlexCollection: 'api/loadAlexCollection'
    }),
    showCollection: function(val) {
      console.log(val)
      //this.setShowDocModelDialog(false)
      //this.loadAlexCollection(val.id)
      this.showList = false
      this.selectedCollection = val
    },
    addCollection: function() {
      this.setShowDocModelDialog(false)
      this.loadAlexCollection(this.selectedCollection.id)
      this.showList = false
      this.selectedCollection = null
    },
    gotoCollection: function(collection) {
      this.quickLook = null
      var url = this.alexLoc + '/collections/'
      window.location = url + collection.id
    }
  },
  mounted() {
    this.getAlexCollections()
  }
}
var certIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="100%" viewBox="0 0 50 30" preserveAspectRatio="xMidYMid meet"><circle cx="15" cy="15" r="10" class="certification"/><text x="14" y="16" id="certification_textelement" class="certificationbannertext"><textPath xlink:href="#curveconvex" id="certification_name">RELIABILITY</textPath><path id="curveconvex" d="M6,16 a1,1 0 0,1 18,0" fill="white"/></text><text x="14" y="21" class="certificationcheckmark">✓</text><text x="19" y="0" class="certificationbannertext"><path id="curveconcave" d="M3,15 a1,1 0 0,0 24,0" fill="white"/><textPath xlink:href="#curveconcave">C E R T I F I E D</textPath></text><style type="text/css">.certification {stroke:#7CC9B5; stroke-width:5px; fill: white;}.certificationcheckmark {font-family:arial; font-size:14px; text-anchor:middle; font-weight:bold; fill: #75B1E3;}.certificationbannertext_onload {font-family:arial; font-size:4px; text-anchor:middle; font-weight:bold; fill:#7CC9B5;}.certificationbannertext {font-family:arial; font-size:4px; text-anchor:middle; font-weight:bold; fill:white;}</style></svg>'
</script>
<style scoped>
.collection-list,
.collection-title,
.help-message {
  margin: auto;
  width: 1140px;
  position: relative;
}
.collection-title {
  margin-bottom: 30px;
}
.quicklookbutton {
  display: inline-block;
  border: 0px solid grey;
  padding: 3px 10px;
  border-radius: 5px;
  position: absolute;
  right: 20px;
  top: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
}
.quicklookbutton:hover {
  background-color: lightgray;
}
.help-message {
  background-color: #c8e4ff;
  color: black;
  font-size: 18px;
  padding: 20px 20px;
  margin-bottom: 30px;
  border-radius: 5px;
}
.collection,
.collectionheader {
  width: 800px;

  border: 1px solid rgb(235, 236, 236);
  border-bottom: 0px;
  padding: 5px;
}
.collection {
  cursor: pointer;
  position: relative;
}
.collection:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.collectionheader {
  padding: 5px;
  position: relative;
}
.sortby {
  position: absolute;
  right: 0px;
  top: 10px;
  font-size: 14px;
  color: grey;
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
.photo1 {
  border-radius: 5px;
  width: 60px;
  height: 60px;
}

.details {
  display: inline-block;
  width: 700px;
  font-size: 12px;
  vertical-align: top;
  margin-top: 5px;
}
.name {
  font-weight: 600;
  font-size: 14px;
}
.owner {
  padding: 8px 0px 4px 0px;
}
.ownername {
  color: rgba(0, 0, 0, 0.5);
}
.ownericon {
  color: #9e9e9e;
  font-size: 16px;
  margin-right: 5px;
}
.lookicon {
  color: black;
  font-size: 16px;
  margin-right: 5px;
}
.specsicon {
  color: #9e9e9e;
  font-size: 16px;
  margin-right: 5px;
}
.certified {
  font-size: 16px;
  color: #61c561;
}
.spec {
  min-width: 100px;
  display: inline-block;
}
.spectext {
  color: rgba(0, 0, 0, 0.5);
}
.tab {
  border-bottom: 2px solid blue;
  display: inline-block;
  padding: 5px;
}
.sp1,
.sp2 {
  display: inline-block;
}
.sel {
  -webkit-appearance: menulist;
  border-style: none;
  font-weight: 600;
  margin: 0px 0px;
  cursor: pointer;
}
.sel:focus {
  outline: 0;
}
.search {
  width: 800px;
}
.breadcrum {
  color: #95a5a6;
  width: 1140px;
  margin: auto;
  padding: 10px 15px;
  margin-bottom: 21px;
  margin-top: 25px;
  list-style: none;
  background-color: #ecf0f1;
  border-radius: 4px;
}
a.home {
  color: #18bc9c;
  text-decoration: none;
}
.seperator {
  padding: 0px 8px;
}
.hspacer {
  display: inline-block;
  width: 20px;
}
.check {
  cursor: pointer;
}
.addinfo {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 300px;
  height: 500px;
  text-align: center;
  border: 1px solid rgb(235, 236, 236);
}
.addinfo div {
  padding-top: 40px;
  color: grey;
  font-size: 20px;
}
.quickLookContainer {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 60px;
  left: 0px;
  background-color: rgba(200, 200, 200, 0.9);
  padding: 40px;
  text-align: center;
}
.quickLook {
  width: 800px;
  height: 600px;
  background-color: white;
  display: inline-block;
}
</style>
