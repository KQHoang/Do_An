<template>
    <div class="v-check-box d-flex">

        <v-checkbox
            v-model="aaaaa"
            color="secondary"
            hide-details
            :value="1"
            @change="valueChange"
            ></v-checkbox>
    
            <!-- :value="value" -->
    </div>
</template>
<script>

export default {
    name: "TestMode", 
    data(){
        return{
            aaaaa: null
        }
    },
    props:{
        valueCheckBox:{
            type: [String, Boolean, Number], 
            default: null
        }
    }, 
    created(){
        this.aaaaa = this.valueCheckBox;
        console.log(this.aaaaa);
    },
    methods:{
        valueChange(){
            // console.log("ddax vao", this.value);
            // this.$emit("value-change");
            this.$emit("update:valueCheckBox", this.aaaaa)
        }
    }
}
</script>
