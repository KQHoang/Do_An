<template>
    <div class="popup-delete">
        <div class="popup-delete-main">
            <div class="title m-b-24">
                {{ title }}
            </div>
            <div class="content">
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Tên chức vụ <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.PositionName"
                            placeholder="Nhập tên chức vụ"
                            :key="keyInput"
                            :error="errors[0]"
                            error-message="Tên chức vụ không được để trống"
                            :force="true"
                            :autofocus="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Mô tả</v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input 
                            v-model:value="formData.Description"
                            placeholder="Nhập mô tả"
                            :key="keyInput"
                        />
                    </v-col>
                </div>
            </div>
            <div class="action">
                <vue-button 
                    color="#E8EAEF"
                    class="m-r-8"
                    text="Huỷ"
                    @click="actionCancel"
                >
                </vue-button>
                <vue-button 
                    color="#4095F5"
                    class="text-white"
                    text="Lưu"
                    @click="actionDone"
                >
                </vue-button>
            </div>
        </div>
    </div>
</template>
<script>
import buttonVue from '@/components/button.vue'
import inputVue from "@/components/input.vue"
import ENUMS from '@/enum/enums.js'
import PositionAPI from "@/js/api/positionAPI.js"
export default{
    name: "PopUpDelete",
    emits:['action-cancel', 'action-done'],
    components: {
        'vue-button': buttonVue,
        'vue-input': inputVue
    },
    props:{
        mode:{
            type: Number,
            default: 3
        },
        formEdit: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {
            title: "Thêm mới chức vụ",
            formData:{
                PositionID: 0,
                PositionName: null,
                Description: null,
                CreatedDate: null,
                ModifyDate: null
            },
            errors: [false],
            keyInput: 0
        }

    },
    created(){
        this.ENUMS = ENUMS;
        if(this.mode == ENUMS.ACTION_TYPE[0].value){
            this.title = "Chỉnh sửa chức vụ";
            this.formData = JSON.parse(JSON.stringify(this.formEdit));
        }
    },
    methods:{
        actionCancel(){
            this.$emit('action-cancel');
        },
        async actionDone(){
            if(this.validate()){
                return;
            }
            if(this.mode == ENUMS.ACTION_TYPE[0].value){
                // edit
                var resUpdate = await PositionAPI.updatePosition(this.formData);
                if(resUpdate && resUpdate.data.Success){
                    this.$emit("action-done", true);
                }
                else 
                {
                    this.$emit("action-done", false);
                }
            }
            else
            {
                var res = await PositionAPI.insertPosition(this.formData);
                if(res && res.data.Success){
                    this.$emit("action-done", true);
                }
                else 
                {
                    this.$emit("action-done", false);
                }
            }
            // this.$emit('action-done');
        },
        validate(){
            var faild = false;
            if(this.formData.PositionName == null || this.formData.PositionName == ""){
                this.errors[0] = true;
                faild = true;
            }
            this.keyInput ++;
            return faild;
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
        width: 50%;
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