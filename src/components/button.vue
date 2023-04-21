<template>
     <v-btn
      class="button"
      :color="color"
      variant="flat"
      :width="width"
      :height="height"
    >
        <template v-slot:prepend>
            
            <slot name="prepend"></slot>
        </template>
        
        {{ text }}
    </v-btn>
</template>

<script>
export default{
    name: "VButton",
    props:{
        color:{
            type: String,
            default: ""
        },
        text:{
            type: String,
            default: ""
        }, 
        width:{
            type: String,
            default: ""
        }, 
        height: {
            type: String,
            default: ""
        }

    }
}
</script>

<style lang="scss">
.button{
    .v-btn__content{
        text-transform: none;
    }
}
</style>