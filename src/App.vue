<template>
  <v-app>
    <v-main>
      <Table :headers="headers" :dataApiTable="dataApiTable" :pagingControl="pagingControl" :totalRecord="dataApiTable.length"/>
    </v-main>
  </v-app>
</template>

<script>
import Table from './components/table.vue';
export default {
  name: 'App',

  components: {
    Table
  },

  data(){
    return {
      selected: ['John'],
      x: 15,
      headers:[{ name: "Tên", value: "name", width: "100"},{ name: "Tuổi", value: "age"}],
      dataApiTable:[
        { id: 1, name: "hoàng", age: 13},
        { id: 2, name: "Ttttt", age: 12},
      ],
      pagingControl:{
        PageIndex: 1,
        PageSize: 25
      },
      lst:[ 
        {a: 1, b: "bbbbbb"},
        {a: 2, b: "aaaaa"},
        {a: 3, b: "nnnnnnn"},
      ],
      radio:[
        {label: "nam", value: 1},
        {label: "nữ", value: 0},
      ],
      check: 1, 
    test: true, 
    aaaa:"03/18/2023"

      
    }
  },
  created(){
  },
  methods:{
    getDataPaging(val){
      console.log(val);
    }, 
    tesssst(){
      console.log(this.selected);
    }, 
    handle(){
      console.log(this.aaaa, this.test);
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
