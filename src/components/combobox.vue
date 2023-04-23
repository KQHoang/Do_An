<template>
  <div class="main-combobox d-flex">
    <div class="label-combobox" v-if="label">
      {{ label }}
      <span v-if="force" style="color: red"> *</span>
    </div>
    <v-col>
      <v-combobox
        v-model="valueSelect"
        class="h-combobox"
        :class="{'combobox-error': isError && force}"
        :items="items"
        :return-object="false"
        :item-title="itemTitle"
        :item-value="itemValue"
        :autofocus="autofocus"
        :clearable="true"
        :placeholder="placeholder"
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
  name: "VComboBox",
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
        placeholder:{
          type: String,
          default: ""
        }
    }, 
    data(){
      return {
        valueSelect: null, 
        isError: false
      }
    },
    created(){
      if(!this.value){
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
        this.$emit('value-change', val);
      }
    },
}
</script>
<style lang="scss">
.main-combobox{
    .label-combobox{
      line-height: 34px;
      margin-right: 12px;
    }
    .h-combobox.combobox-error{
      border-color: red;
    }
    .h-combobox{
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