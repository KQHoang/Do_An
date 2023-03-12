<template>
     <v-btn
      :color="color"
      variant="flat"
      :width="width"
      :height="hei"
    >
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