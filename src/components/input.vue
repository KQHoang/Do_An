<template>
    <div class="main-input d-flex">
      <div class="label-input" v-if="label">
        {{ label }}
        <span v-if="force" style="color: red"> *</span>
      </div>
      <v-col>
        <v-text-field 
          class="h-input"
          :class="{'input-error': isError && force}"
          :placeholder="placeholder"
          v-model="valueInput"
          :type="typeInput"
          :clearable="true"
          :autofocus="autofocus"
          :disabled="disabled"
          @update:model-value="valueInputChange"
        >
        </v-text-field>
        <div v-if="isError && force" class="error-message">
          {{ errorMessage }}
        </div>
      </v-col>
    </div>
    
</template>

<script>
export default{
    name: "VInput",
    props:{
      value:{
        type: String, Number, 
        default: null
      }, 
      typeInput: {
        type: String, 
        default: "text"
      }, 
      disabled:{
        type: Boolean, 
        default: false
      }, 
      label: {
        type: String,
        default: ""
      }, 
      placeholder:{
        type: String, 
        default: ""
      }, 
      error:{
        type: Boolean, 
        default: false
      }, 
      errorMessage:{
        type: String, 
        default: ""
      }, 
      force:{
        type: Boolean, 
        default: false
      }, 
      autofocus:{
        type: Boolean, 
        default: false
      }

    }, 
    data(){
      return{
        valueInput: null, 
        isError: false
      }
    }, 
    created(){
      if(this.value){
        this.valueInput = this.value;
      }
      if(this.error){
        this.isError = this.error;
      }
    }, 
    methods:{
      valueInputChange(val){
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
      }
    }
}
</script>

<style lang="scss">
.main-input{
    .label-input{
      line-height: 34px;
      margin-right: 12px;
    }
    .h-input.input-error{
      border-color: red;
    }
    .h-input{
      border: 1px solid #e0e5e9;
      border-radius: 4px;
      &:hover{
        border-color: #0073e6;
      }
      &:active{
        border-color: #0073e6;
      }
      &:focus{
        border-color: #0073e6;
      }
      &:focus-within{
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
      .v-field--variant-filled{
        --v-input-control-height: 34px !important;
      }
    }
    .v-col{
      padding: 0;
      .error-message{
        color: red;
        padding-top: 5px;
      }
    }
    .v-field{
      padding-right: 0;
    }
  }
</style>