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
    height: calc(100% - 56px);
    width: calc(100% - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  rgba(97, 98, 99, 0.6);
    z-index: 100;
    position: fixed;
    .v-progress-circular{
        width: 50px;
        height: 50px;
    }
}
</style>