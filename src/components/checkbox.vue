<template>
    <div class="v-check-box d-flex">
        <v-checkbox
          v-model="isChecked"
          color="secondary"
          hide-details
          :disabled="disabled"
          :value="value"
          @change="valueChange"
        ></v-checkbox>
        <div class="label-checkbox">
            {{ label }}
        </div>
    </div>
</template>
<script>
export default{
    name: "VCheckBox",
    model: {
      prop: 'value',
      event: 'value-change'
    }, 
    props:{
        label: {
            type: String,
            default: ""
        },
        value:{
            type: [String, Number, Boolean],
            default: true
        }, 
        indeterminate:{
            type: Boolean,
            default: false
        },
        valueCheckBox:{
            type: [String, Boolean, Number],
            default: null
        },  
        disabled: {
            type: Boolean, 
            default: false
        },
    },
    data(){
        return {
            isChecked: null
        }
    },
    created(){
        this.isChecked = this.valueCheckBox;
    }, 
    methods:{
        valueChange(){
            this.$emit("value-change", this.isChecked);
            this.$emit('update:valueCheckBox', this.isChecked);
        }
    },
    
}
</script>

<style lang="scss">
.v-check-box{
    .v-checkbox .v-selection-control{
        min-height: 40px;
    }
    .v-input{
        flex: none;
    }
    .label-checkbox{
        line-height: 40px;
    }
}
</style>