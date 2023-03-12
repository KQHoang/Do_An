<template>
    <div class="v-check-box d-flex">
        <v-checkbox
          :class="this.class"
          v-model="selected"
          color="secondary"
          hide-details
          :disabled="disabled"
          :indeterminate="indeterminate"
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
    props:{
        label: {
            type: String,
            default: ""
        },
        value:{
            type: [String, Number, Boolean],
            default: false
        }, 
        indeterminate:{
            type: Boolean,
            default: false
        },
        checked:{
            type: Boolean,
            default: false
        },  
        disabled: {
            type: Boolean, 
            default: false
        },
        class:{
            type: String, 
            default: ""
        }
    },
    data(){
        return {
            selected: null,
        }
    },
    created(){
        if(this.checked){
            this.selected = this.checked;
        }
    }, 
    methods:{
        valueChange(){
            this.$emit('value-change', this.selected, this.value);
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