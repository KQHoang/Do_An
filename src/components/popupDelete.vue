<template>
    <div class="popup-delete">
        <div class="popup-delete-main">
            <div class="title">
                {{ title }}
            </div>
            <div class="content">
                {{ content }}
            </div>
            <div class="action">
                <vue-button 
                    color="#4095F5"
                    class="text-white m-r-8"
                    text="Không"
                    @click="actionCancel"
                >
                </vue-button>
                <vue-button 
                    color="red"
                    class="text-white"
                    text="Có"
                    @click="actionDone"
                >
                </vue-button>
            </div>
        </div>
    </div>
</template>
<script>
import buttonVue from './button.vue'
export default{
    name: "PopUpDelete",
    emits:['action-cancel', 'action-done'],
    components: {
        'vue-button': buttonVue
    },
    props:{
        title: {
            type: String,
            default: "Thông báo"
        },
        content:{
            type: String,
            default: "Bạn có chắc chắn muốn xoá "
        }
    },
    methods:{
        actionCancel(){
            this.$emit('action-cancel');
        },
        actionDone(){
            this.$emit('action-done');
        }
    }
}
</script>
<style lang="scss" scoped>
.popup-delete{
    background-color:  rgba(97, 98, 99, 0.6);
    z-index: 100000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .popup-delete-main{
        width: 400px;
        background: white;
        display: block;
        padding: 24px;
        border-radius: 4px;
    }
    .action{
        text-align: right;
        margin-top: 10px;
    }
}
</style>