<template>
  <div class="main-select d-flex">
    <div class="label-select" v-if="label">
      {{ label }}
      <span v-if="force" style="color: red"> *</span>
    </div>
    <v-col>
      <v-combobox
        v-model="valueSelect"
        class="h-select"
        :class="{'combobox-error': isError && force}"
        :items="items"
        :item-title="itemTitle"
        :item-value="itemValue"
        :autofocus="autofocus"
        clear-icon="mdi-close"
        :clearable="clearable"
        :placeholder="placeholder"
        no-data-text="Không có dữ liệu"
        :disabled="disabled"
        @update:modelValue="valueChange"
      ></v-combobox>
      <div v-if="isError && force" class="error-message">
        {{ errorMessage }}
      </div>
    </v-col>
  </div>
</template>

<script>
export default{
  name: "VCombobox",
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
      disabled:{
        type: Boolean, 
        default: false
      }, 
      returnObject:{
        type: Boolean,
        default: false
      }
  }, 
  data(){
      return {
        valueSelect: null, 
        isError: false
      }
  },
  created(){
    if(this.value){
      var item = this.items.find(x => x[this.itemValue] == this.value);
      if(item){
        this.valueSelect = item;
      }
      // this.valueSelect = this.items.find(x => x[this.itemValue] == this.value);
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
      if(!this.returnObject){
        if(val){
          this.$emit("update:value", val[this.itemValue]);
          this.$emit('value-change', val[this.itemValue])
        }
        else {
          this.$emit("update:value", val);
          this.$emit('value-change', val)
        }
      }
      else{
        this.$emit("update:value", val);
        this.$emit('value-change', val)
      }
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
      padding-bottom: 10px;
    }
  }
}
</style>