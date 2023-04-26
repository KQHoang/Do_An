<template>
    <div class="main-select d-flex">
      <div class="label-select" v-if="label">
        {{ label }}
        <span v-if="force" style="color: red"> *</span>
      </div>
      <v-col>
        <v-select
          v-model="valueSelect"
          class="h-select"
          :class="{'combobox-error': isError && force}"
          :items="items"
          :item-title="itemTitle"
          :item-value="itemValue"
          :autofocus="autofocus"
          :clearable="clearable"
          :placeholder="placeholder"
          no-data-text="Không có dữ liệu"
          @update:modelValue="valueChange"
        ></v-select>
        <div v-if="isError && force" class="error-message">
          {{ errorMessage }}
        </div>
      </v-col>
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
        }, 
        force:{
          type: Boolean, 
          default: false
        }, 
        error:{
          type: Boolean, 
          default: false
        }, 
        errorMessage:{
          type: String, 
          default: ""
        }, 
        autofocus:{
          type: Boolean, 
          default: false
        }, 
        clearable:{
          type: Boolean, 
          default: true
        },
        placeholder:{
          type: String,
          default: ""
        },
    }, 
    data(){
        return {
          valueSelect: null, 
          isError: false
        }
    },
    created(){
      if(!this.valule){
        this.valueSelect = this.value;
      }
      if(this.error){
        this.isError = this.error;
      }
    },
    methods:{
      valueChange(val){
        if(val){
          if(this.force){
            this.isError = false;
            this.$emit("update:error", this.isError);
          }
        } else {
          if(this.force){
            this.isError = true;
            this.$emit("update:error", this.isError);
          }
        }
        this.$emit("update:value", val);
        this.$emit('value-change', val)
      }
    },
    watch:{
      items(val){
        if(val){
          this.valueSelect = null;
        }
      }
    }

  }
  </script>
<style lang="scss">
  .main-select{
    .label-select{
      line-height: 34px;
      margin-right: 12px;
    }
    .h-select.select-error{
      border-color: red;
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
        height: 34px !important;
        .v-field__input{
          padding: 6px;
          padding-left: 12px;
        }
      }
      .v-field__clearable{
        align-items: center;
        padding-top: 0;
      }
      .v-field__append-inner{
        padding-top: 6px;
      }
      .v-select__selection-text{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .v-col{
      padding: 0;
      .error-message{
        color: red;
        padding-top: 5px;
      }
    }
  }
</style>