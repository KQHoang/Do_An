<template>
    <div class="main-loading">
        <v-progress-circular color="primary" indeterminate ></v-progress-circular>
    </div>
</template>

<script>
    export default{
        name: "LoadingComponent"
    }
</script>
<style lang="scss">
.main-loading{
    height: 88%;
    width: 83%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EEEFF1;
    z-index: 100;
    position: fixed;
    .v-progress-circular{
        width: 50px;
        height: 50px;
    }
}
</style>