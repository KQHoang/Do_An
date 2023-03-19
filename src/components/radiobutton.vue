<template>
    <v-radio-group 
        v-model="valueRadioButton"
        @update:modelValue="valueRadioChange"
    >
        <div v-for="(item) in items" :key="item.value">
            <v-radio  :label="item.label" color="secondary" :value="item.value"></v-radio>
        </div>
    </v-radio-group>
</template>
<script>

export default{
    name: "RadioButton",
    props:{
        items:{
            type: Array, 
            default: () => {}
        }, 
        value:{
            type: [Number, String], 
            default: null
        }
    },
    data(){
        return{
            valueRadioButton: null, 
        }
    },
    created(){
        if(this.value){
            this.valueRadioButton = this.value;
        }
    },  
    methods:{
        valueRadioChange(value){
            this.$emit('update:value', value);
        }
    }

}
</script>
