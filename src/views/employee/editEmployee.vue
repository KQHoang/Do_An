<template>
    <div class="employee test">
        <v-row class="employee-header-info justify-space-between d-flex align-center">
            <v-col >
                <v-row class="employee-name-and-code align-center">
                    <div class="employee-name">
                        Khuất Quang Hoàng
                    </div>
                    <div class="employee-code">
                        (B-1065)
                    </div>
                    <i class="fa fa-check d-flex align-center justify-center" aria-hidden="true"></i>
                </v-row>
                <v-row>
                    <span>Lập trình viên - Dự án Ivan</span>
                </v-row>
            </v-col>
            <v-col class="text-right">
                <Button
                    text="Huỷ"
                    color="#E8EAEF"
                    class="m-r-8"
                    @click="cancelEdit"
                >
                </Button>
                <Button
                    text="Lưu"
                    color="#4095F5"
                    class="text-white"
                    @click="saveEdit"
                >
                </Button>
            </v-col>
        </v-row>
        <v-row class="row-employee-main-info">
            <div class="employee-main-info">
                <span class="title">
                    Thông tin cơ bản
                </span>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        Thông tin chung
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Mã nhân viên</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                placeholder="Nhập mã nhân viên"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Họ và tên</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                placeholder="Nhập họ và tên"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Ngày sinh</v-col>
                        <v-col cols="7" class="p-0">
                            <DateTimePicker
                                placeholder="Chọn ngày sinh"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Dân tộc</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                :items="ENUMS.PICK_LIST_ETHNICITY"
                                item-title="name"
                                item-value="id"
                                placeholder="Chọn dân tộc"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">MST cá nhân</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                placeholder="Nhập mã số thuế"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Giới tính</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                :items="ENUMS.PICK_LIST_GENDER"
                                item-title="GenderName"
                                item-value="GenderID"
                                placeholder="Chọn giới tính"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        CMND/Thẻ căn cước
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Loại giấy tờ</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                :items="ENUMS.PICK_LIST_IDENTIFY_TYPE"
                                item-title="name"
                                item-value="id"
                                placeholder="Chọn loại giấy tờ"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Ngày cấp (CMND/CCCD)</v-col>
                        <v-col cols="7" class="p-0">
                            <DateTimePicker
                                placeholder="Chọn ngày cấp"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Số CMND/CCCD</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                placeholder="Nhập số CMND/CCCD"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Nơi cấp (CMND/CCCD)</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                :items="ENUMS.PICK_LIST_IDENTIFY_TYPE"
                                item-title="name"
                                item-value="id"
                                placeholder="Chọn nơi cấp"
                            />
                        </v-col>
                    </v-col>
                </div>

                <div class="title m-t-60">
                    Thông tin liên hệ
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        Số điện thoại/Email
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">ĐT di động</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                placeholder="Nhập số điện thoại"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Email cá nhân</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                placeholder="Nhập địa chỉ Email"
                            />
                        </v-col>
                    </v-col>
                </div>

                <div class="v-row m-t-24">
                    <span class="text-child">
                        Địa chỉ
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Quốc gia</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                :items="ENUMS.PICK_LIST_IDENTIFY_TYPE"
                                item-title="name"
                                item-value="id"
                                placeholder="Chọn quốc gia"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Phường/Xã</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                :items="ENUMS.PICK_LIST_IDENTIFY_TYPE"
                                item-title="name"
                                item-value="id"
                                placeholder="Chọn phường/xã"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Tỉnh/Thành phố</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                :items="ENUMS.PICK_LIST_IDENTIFY_TYPE"
                                item-title="name"
                                item-value="id"
                                placeholder="Chọn tỉnh/thành phố"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Số nhà, đường phố</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                placeholder="Nhập số nhà, đường phố"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Quận/Huyện</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                :items="ENUMS.PICK_LIST_IDENTIFY_TYPE"
                                item-title="name"
                                item-value="id"
                                placeholder="Chọn quận huyện"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Địa chỉ</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                :disabled="true"
                            />
                        </v-col>
                    </v-col>
                </div>
            </div> 
        </v-row>    
    </div>
</template>

<script>
import button from '@/components/button.vue';
import input from '@/components/input.vue';
import combobox from '@/components/selectbox.vue';
import ENUMS from "@/enum/enums.js"
import datePicker from '@/components/datePicker.vue';
export default{
    name: "EditEmployee",
    components:{
        Button: button, 
        Input: input,
        Combobox: combobox,
        DateTimePicker: datePicker
    }, 
    data(){
        return{
            a: "úi",
            ethnicitys:[
                {id: 1, name: "Kinh"}
            ],
            headers: [
                {
                    value: "FullName",
                    name: "Họ và tên"
                },
                {
                    value: "Gender",
                    name: "Giới tính"
                }, 
                {
                    value: "DateOfBirth",
                    name: "Ngày sinh"
                }, 
                {
                    value: "Ethnicity",
                    name: "Dân tộc"
                }, 
                {
                    value: "PhoneNumber",
                    name: "Số điện thoại liên hệ"
                }
            ],
            dataApiTable:[
                {
                    id: 1,
                    FullName: "Khuất Quang Hoàng", 
                    Gender: "Nam",
                    DateOfBirth: "24/01/2002",
                    Ethnicity: "Kinh",
                    PhoneNumber: "0984868532"
                }
            ]
        }
    },
    created(){
        this.ENUMS = ENUMS;
    }, 
    methods:{
        cancelEdit(){
            this.$emit("cancelEdit", false);
        },
        saveEdit(){

        }
    }
}
</script>

<style lang="scss" scoped>
.employee{
    height: 100%;
    overflow: hidden;
    .employee-header-info{
        background-color: #ffffff;
        border-radius: 8px;
        height: 75px;
        overflow: hidden;
        .employee-name-and-code{
            .employee-name{
                font-size: 20px;
            }
            .employee-code{
                margin-left: 6px;
                margin-right: 6px;
                font-size: 20px;
            }
            .fa{
                width: 24px;
                height: 24px;
                background-color: #17A562;
                border-radius: 50%;
            }
        }
    }
    .row-employee-main-info{
            width: 100%;
            height: calc(100% - 75px);
            overflow: auto;
            border-radius: 4px;
            margin-top: 12px !important;
        .employee-main-info{
            padding: 24px;
            width: 100%;
            border-radius: 4px;
            background-color: #ffffff;
        }
    }
}
</style>
