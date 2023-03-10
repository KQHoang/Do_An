<template>
  <v-app>
    <v-main>
      <Table 
        :dataApiTable="dataApiTable" 
        :totalRecord="2" 
        :headers="headers" 
        :pagingControl="pagingControl"
        @page-change="getDataPaging"
      ></Table>
    </v-main>
  </v-app>
</template>

<script>
import Table from "@/components/table.vue"
export default {
  name: 'App',

  components: {
    Table
  },

  data(){
    return {
      tesst: 2,
      headers:[{name: "Tên", value: "name"},{name: "Tuổi", value: "age"}],
      dataApiTable:[
        {name: "hoàng", age: 13},
        {name: "Ttttt", age: 12},
      ],
      pagingControl:{
        PageIndex: 1,
        PageSize: 25
      },
      lst:[ 
        {a: 1, b: "bbbbbb"},
        {a: 2, b: "aaaaa"},
        {a: 3, b: "nnnnnnn"},
      ]

      
    }
  },
  methods:{
    getDataPaging(val){
      console.log(val);
    }
  }
}
</script>
<style>
@import url('@/css/base.css');
#app{
  font-size: 14px !important;
}
</style>
