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
    // height: calc(100% - 56px);
    // width: calc(100% - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  rgba(97, 98, 99, 0.6);
    z-index: 100000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .v-progress-circular{
        width: 50px;
        height: 50px;
    }
}
</style>