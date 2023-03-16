<template>
  <v-app>
    <v-main>
      <comboboxVue
        :items="lst"
        itemTitle="b"
        itemValue="a"
        label="fdsafsdaf"
        :error="true"
        errorMessage="fdsafsafsaf"
        :force="true"
      >
      </comboboxVue>
    </v-main>
  </v-app>
</template>

<script>
import comboboxVue from './components/combobox.vue';
export default {
  name: 'App',

  components: {
    comboboxVue
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
      check: 1, 
    test: true, 
    aaaa:"fafasf"

      
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
    show(){
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
