<template>
    <div class="main-select d-flex">
      <div class="label-select">
        {{ label }}
      </div>
      <v-select
        v-model="valueSelect"
        class="h-select"
        :items="items"
        :item-title="itemTitle"
        :item-value="itemValue"
        @update:modelValue="valueChange"
      ></v-select>
    </div>
  </template>
  
  <script>
  export default{
    name: "VSelect",
    props:{
        label:{
            type: String,
            default: ""
        },
        items:{
            type: Array,
            default: ()=> {}
        }, 
        itemTitle:{
            type: String,
            default: ""
        }, 
        itemValue:{
            type: String,
            default: ""
        }, 
        value:{
          type: [String, Number]
        }
    }, 
    data(){
        return {
            valueSelect: null
        }
    },
    created(){
      if(!this.valule){
        this.valueSelect = this.value;
      }
    },
    methods:{
        valueChange(val){
          this.$emit('value-change', val)
        }
    }

  }
  </script>
  <style lang="scss">
  .main-select{
    .label-select{
      line-height: 36px;
      margin-right: 12px;
    }
    .h-select{
      border: 1px solid #e0e5e9;
      border-radius: 4px;
      &:hover{
        border-color: #0073e6;
      }
      &:active{
        border-color: #0073e6;
      }
      .v-input__details{
        display: none;
      }
      .v-field__outline{
        display: none;
      }
      .v-field__overlay{
        background-color: white;
      }
      .v-field__field{
        height: 36px !important;
        .v-field__input{
          padding: 6px;
          padding-left: 12px;
        }
      }
      .v-field__append-inner{
        padding-top: 6px;
      }
    }
  }
  </style>