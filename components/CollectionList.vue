<template lang="pug">
    .collection-list collection list
      .collectionheader 
        .tab PUBLIC
        .sortby
          div.sp1 Sort by: 
          div.sp2 
            select.sel
              option(v-for='sort in sorts1') {{sort}}
      .collection(v-for= "collection in colList")
        .photo
          img.photo1(:src="'https://dummyimage.com/60x60/4e599c/fff&text='+ collection.name[0]")
        .details
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
            .spec(title="Term count")
              span.specsicon T
              span.spectext {{collection.termCount}}
            .spec(title="Changed")
              span.specsicon R
              span.spectext {{collection.relationCount}}
   


</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {},
  props: {},
  data() {
    return {
      sorts1: ['Name', 'Hottest', 'Created', 'Updated'],
      colFilter: ''
    }
  },
  computed: {
    ...mapState('api', ['AlexCollections']),
    colList: function() {
      if (this.colFilter.length < 3) return this.AlexCollections
      var col = this.AlexCollections.filter(c =>
        c.name.toLowerCase().includes(this.colFilter.toLowerCase())
      )
      col.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
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
.collection-list {
  margin: auto;
  width: 810px;
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
  width: 150px;
  font-size: 14px;
  color: grey;
}
.photo {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: lightblue;
  margin: 5px;
  vertical-align: top;
}
.photo1 {
  border-radius: 5px;
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
.ownername {
  color: rgba(0, 0, 0, 0.4);
}
.ownericon {
  color: #9e9e9e;
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
  color: rgba(0, 0, 0, 0.4);
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
</style>
