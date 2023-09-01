<template>
    <div class="popup-delete">
        <div class="popup-delete-main">
            <div class="title m-b-24">
                {{ title }}
            </div>
            <div class="content">
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Số ngày công <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.NumberDate"
                            placeholder="Nhập số ngày"
                            type-input="number"
                            :key="keyInput"
                            :error="errors[0]"
                            error-message="Số ngày công không được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Tiền phạt đi muộn <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.MoneyDeducted"
                            placeholder="Nhập số ngày"
                            type-input="number"
                            :key="keyInput"
                            :error="errors[1]"
                            error-message="Số tiền không được để trống"
                            :force="true"
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
                    @click="save"
                >
                </vue-button>
            </div>
        </div>
    </div>
</template>
<script>
import buttonVue from '@/components/button.vue'
import ENUMS from '@/enum/enums.js'
import ConfigSalaryAPI from "@/js/api/salaryAPI.js"
import inputVue from "@/components/input.vue"
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
            title: "Chỉnh sửa quy chế trả lương",
            formData:{
                ConfigSalaryID: 0,
                NumberDate: null,
                MoneyDeducted: null,
                CreatedDate: null
            },
            errors: [false, false],
            keyInput: 0, 
            keySelect: 0, 
            lstEmployee: [],
            timeToEnter: null, 
            timeOut: null,
            showMessage: false,
            textMessage: "",
            typeMessage: ""
        }

    },
    async created(){
        this.ENUMS = ENUMS;
        await this.getConfigSalary();
        this.keyInput ++;
    },
    methods:{
        async getConfigSalary(){
            var res = await ConfigSalaryAPI.getConfigSalary();
            if(res && res.data.Success){
                this.formData = res.data.Data;
            }
        },
        actionCancel(){
            this.$emit('action-cancel');
        },
        async save(){
            if(this.validate()){
                return;
            }
            this.formData.CreatedDate = new Date();
            var res = await ConfigSalaryAPI.updateConfigSalary(this.formData);
            if(res && res.data.Success){
                this.$emit('action-done', true);
            }
            else {
                this.$emit('action-done', false);
            }
        },
        validate(){
            var faild = false;
            var property = ["NumberDate", "MoneyDeducted"];
            for(var i = 0; i < property.length; i++){
                if(this.formData[property[i]] == null || this.formData[property[i]] == ""){
                    this.errors[i] = true;
                    faild = true;
                }
            }
        
            this.keyInput ++;
            this.keySelect ++;
            return faild;
        },

    }
}
</script>
<style lang="scss" scoped>
.popup-delete{
    background-color:  rgba(97, 98, 99, 0.6);
    z-index: 1005;
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