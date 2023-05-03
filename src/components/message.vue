<template>
    <div class="alert-message">
        <v-alert
            density="compact"
            :type="typeAlert"
            :title="title"
            :max-width="maxWidth"
            :text="text"
       > </v-alert>
    </div>
</template>

<script>

export default{
    name: "ToastMessage",
    props: {
        title: {
            type: String
        },
        text: {
            type: String
        }, 
        typeAlert:{
            type: String, //success, info, warning, error
        },
        maxWidth:{
            type: Number,
            default: 300
        }
    }
}
</script>

<style lang="scss">
.alert-message{
    position: fixed;
    // width: calc(100% - 200px);
    display: flex;
    top: 20px;
    justify-content: center;
    left: 0;
    width: 100%;
}
</style>
