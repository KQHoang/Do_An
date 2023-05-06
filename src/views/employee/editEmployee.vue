<template>
    <Loading v-if="showLoading"/>
    <ToastMessage :title="titleMessage" :text="textMessage" :typeAlert="typeMessage" :max-width="widthMessage" v-if="showMessage"/>
    <div class="employee test">
        <v-row class="employee-header-info justify-space-between d-flex align-center">
            <v-col >
                <v-row class="employee-name-and-code align-center">
                    <div class="employee-name">
                        {{ formData.FullName }}
                    </div>
                    <div class="employee-code">
                        ({{ formData.EmployeeCode }})
                    </div>
                    <i class="fa fa-check d-flex align-center justify-center" aria-hidden="true"></i>
                </v-row>
                <v-row>
                    <span>{{ positionName }} - {{ departmentName }}</span>
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
                <v-row  class="m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Mã nhân viên <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.EmployeeCode"
                                placeholder="Nhập mã nhân viên"
                                :key="keyInput"
                                :error="errors[0]"
                                error-message="Mã nhân viên trống hoặc đã tồn tại"
                                :force="true"
                                :autofocus="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Họ và tên <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.FullName"
                                placeholder="Nhập họ và tên"
                                :key="keyInput"
                                :error="errors[1]"
                                error-message="Họ và tên không được bỏ trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                </v-row >
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Ngày sinh <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <DateTimePicker
                                v-model:value="formData.DateOfBirth"
                                placeholder="Chọn ngày sinh"
                                :key="keyInput"
                                :error="errors[2]"
                                error-message="Ngày sinh không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500" >Dân tộc <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.EthnicityID"
                                :items="ENUMS.PICK_LIST_ETHNICITY"
                                item-title="name"
                                item-value="value"
                                placeholder="Chọn dân tộc"
                                :key="keyInput"
                                :error="errors[3]"
                                error-message="Dân tộc không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">MST cá nhân <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.TaxCode"
                                placeholder="Nhập mã số thuế"
                                type-input="number"
                                :key="keyInput"
                                :error="errors[4]"
                                error-message="MST trống hoặc đã tồn tại"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Giới tính <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.GenderID"
                                :items="ENUMS.PICK_LIST_GENDER"
                                item-title="GenderName"
                                item-value="GenderID"
                                placeholder="Chọn giới tính"
                                :key="keySelect"
                                :error="errors[5]"
                                error-message="Giới tính không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>    
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Phòng ban <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.DepartmentID"
                                :items="lstDepartment"
                                item-title="DepartmentName"
                                item-value="DepartmentID"
                                placeholder="Chọn phòng ban"
                                :key="keySelect"
                                :error="errors[6]"
                                error-message="Phòng ban không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Vị trí công việc <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.PositionID"
                                :items="lstPosition"
                                item-title="PositionName"
                                item-value="PositionID"
                                placeholder="Chọn vị trí công việc"
                                :key="keySelect"
                                :error="errors[7]"
                                error-message="Vị trí công việc không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>    
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        CMND/Thẻ căn cước
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5" >
                        <v-col cols="5" class="label font-500">Loại giấy tờ <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.IdentifyType"
                                :items="ENUMS.PICK_LIST_IDENTIFY_TYPE"
                                item-title="name"
                                item-value="value"
                                placeholder="Chọn loại giấy tờ"
                                :key="keySelect"
                                @value-change="identifyTypeChange()"
                                :error="errors[8]"
                                error-message="Loại giấy tờ không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Ngày cấp <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <DateTimePicker
                                v-model:value="formData.IdentifyDate"
                                placeholder="Chọn ngày cấp"
                                :key="keyInput"
                                :error="errors[9]"
                                error-message="Ngày cấp không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Số CMND/CCCD <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.IdentifyNumber"
                                placeholder="Nhập số CMND/CCCD"
                                type-input="number"
                                :key="keyInput"
                                :error="errors[10]"
                                error-message="Số CMND/CCCD trống hoặc đã tồn tại"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Nơi cấp <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.IdentifyIssuedPlaceID"
                                :items="listIdentifyPlace"
                                item-title="ProvinceName"
                                item-value="ProvinceID"
                                placeholder="Chọn nơi cấp"
                                :key="keyIdentifyIssuePlace"
                                :error="errors[11]"
                                error-message="Nơi cấp không được để trống"
                                :force="true"
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
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">ĐT di động <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.PhoneNumber"
                                placeholder="Nhập số điện thoại"
                                type-input="number"
                                :key="keyInput"
                                :error="errors[12]"
                                error-message="SĐT không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Email cá nhân</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.Email"
                                placeholder="Nhập địa chỉ Email"
                                :key="keyInput"
                                error-message="Email không đúng định dạng"
                                :error="errorEmail"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                </div>

                <div class="v-row m-t-24">
                    <span class="text-child">
                        Địa chỉ
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Tỉnh/Thành phố</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.ProvinceID"
                                :items="lstProvince"
                                item-title="ProvinceName"
                                item-value="ProvinceID"
                                placeholder="Chọn tỉnh/thành phố"
                                @value-change="provinceChange()"
                                :key="keyProvince"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Phường/Xã</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.WardsID"
                                :items="lstWards"
                                item-title="WardsName"
                                item-value="WardsID"
                                placeholder="Chọn phường/xã"
                                :key="keyWards"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Quận/Huyện</v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.DistrictID"
                                :items="lstDistrict"
                                item-title="DistrictName"
                                item-value="DistrictID"
                                placeholder="Chọn quận huyện"
                                @value-change="districtChange()"
                                :key="keyDistrict"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Số nhà, đường phố</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.StreetAddress"
                                placeholder="Nhập số nhà, đường phố"
                                :key="keyInput"
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
import PickAddress from '@/js/api/pickAddress.js'
import ProfileAPI from '@/js/api/profileAPI.js'
import Convert from '@/js/convert.js'
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
            keyIdentifyIssuePlace: 0,
            keyProvince: 0, 
            keyDistrict: 0, 
            keyWards: 0,
            showLoading: false,
            keyInput: 0,
            keySelect: 0,
            formData:{
                EmployeeCode: null,
                EmployeeID: null,
                FullName: null,
                DateOfBirth: "",
                EthnicityID: null,
                TaxCode: null,
                GenderID: null,
                IdentifyType: null,
                IdentifyDate: "",
                IdentifyNumber: null, 
                IdentifyIssuedPlaceID: null, 
                PhoneNumber: null, 
                Email: null, 
                ProvinceID: null,
                ProvinceName: null,
                DistrictID: null,
                DistrictName: null, 
                WardsID: null,
                WardsName: null,
                StreetAddress: null,
                IdentifyIssuedPlaceName: null,
                PositionID: null,
                DepartmentID: null,
                LeadID: 5,
                CreatedDate: null,
                ModifiedDate: null
            }, 
            listIdentifyPlace: [],
            lstProvince: [],
            lstDistrict: [],
            lstWards: [],
            lstDepartment: [],
            lstPosition: [],
            isCreated: true,
            titleMessage: null,
            textMessage: null,
            widthMessage: null, 
            typeMessage: null,
            showMessage: false,
            errors:[false, false, false, false, false, false, false, false, false, false, false, false, false],
            errorEmployeeCode: "Mã nhân viên không được để trống",
            errorTaxCode: "Mã số thuế không được để trống",
            errorIdentify: "CMND/CCCD không được để trống",
            id: null, 
            positionName: null,
            departmentName: null, 
            errorEmail: false
        }
    },
    async created(){
        this.ENUMS = ENUMS;
        this.showLoading = true;
        if(this.$route.params?.id){
            this.id = this.$route.params?.id;
        }
        await this.getProvince();
        await this.getDeparment();
        await this.getPosition();
        await this.getDataByID();
        this.getDepartmentName();
        this.getPositionName();
        this.showLoading = false;
    }, 
    methods:{
        cancelEdit(){
            this.$router.push({ name: 'ViewEmployee', params: { id: '1' }});
        },
        
        async saveEdit(){
            if(this.validateBeforeSave()){
                return;
            }
            this.formData.DateOfBirth = Convert.formatDateToSave(this.formData.DateOfBirth);
            this.formData.IdentifyDate = Convert.formatDateToSave(this.formData.IdentifyDate);
            // this.formData.Country = "Việt Nam";
            this.prepareDataBeforeSave();

            this.formData.ModifiedDate = new Date();         
            var resUpdate = await ProfileAPI.updateProfile(this.formData);
            if(resUpdate && resUpdate.data.Success){
                this.textMessage = "Chỉnh sửa thành công!";
                this.typeMessage = "success";
                this.widthMessage = 300;
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false;
                    this.$router.push({ name: 'ViewEmployee', params: { id: '1' }});
                }, 2000);
            }
            else if(resUpdate && resUpdate.data.Success == false){
                this.textMessage = "Dữ liệu đã tồn tại!";
                this.typeMessage = "error";
                this.widthMessage = 300;
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false;
                }, 2000);
                if(resUpdate.data.Data.EmployeeCode == true){
                    this.errors[0] = true;
                }
                if(resUpdate.data.Data.TaxCode == true){
                    this.errors[4] = true;
                }
                if(resUpdate.data.Data.TaxCode == true){
                    this.errors[10] = true;
                }
                if(this.formData.DateOfBirth){
                    this.formData.DateOfBirth = Convert.formatDateToEdit(this.formData.DateOfBirth);
                }
                if(this.formData.IdentifyDate){
                    this.formData.IdentifyDate = Convert.formatDateToEdit(this.formData.IdentifyDate);
                }
                this.renderDOM();
            }
            else {
                this.textMessage = "Chỉnh sửa thất bại!";
                this.typeMessage = "error";
                this.widthMessage = 300;
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false;
                }, 2000);
            }
        },
        prepareDataBeforeSave(){
            if(this.formData.IdentifyIssuedPlaceID){
                this.formData.IdentifyIssuedPlaceName = this.listIdentifyPlace.find(x => x.ProvinceID == this.formData.IdentifyIssuedPlaceID)?.ProvinceName;
            }
            if(this.formData.Country){
                this.formData.Country = ENUMS.PICK_LIST_COUNTRY.find(x => x.value == this.formData.Country)?.name;
            }
            if(this.formData.ProvinceID){
                this.formData.ProvinceName = this.lstProvince.find(x => x.ProvinceID == this.formData.ProvinceID)?.ProvinceName;
            }
            if(this.formData.DistrictID){
                this.formData.DistrictName = this.lstDistrict.find(x => x.DistrictID == this.formData.DistrictID)?.DistrictName;
            }
            if(this.formData.WardsID){
                this.formData.WardsName = this.lstWards.find(x => x.WardsID == this.formData.WardsID)?.WardsName;
            }
        },
        async identifyTypeChange(val){
            this.formData.IdentifyIssuedPlaceID = null;
            this.formData = JSON.parse(JSON.stringify(this.formData));
            this.listIdentifyPlace = [];
            if(val == ENUMS.PICK_LIST_IDENTIFY_TYPE[0].value){
                this.listIdentifyPlace = ENUMS.PICK_LIST_CCCD;
            }
            else {
                var res = await PickAddress.getProvince();
                if(res && res.data.Success){
                    this.listIdentifyPlace = res.data.Data;
                    this.keyIdentifyIssuePlace ++;
                }
            }
        },
        async getProvince(){
            // Chọn quốc gia là khác
            var res = await PickAddress.getProvince();
            if(res.data && res.data.Success){
                this.lstProvince = res.data.Data;
                this.keyProvince ++;
            }
        },
        async provinceChange(val){
            if(!this.isCreated){
                this.formData.DistrictID = null;
                this.formData.WardsID = null;
            }
            if(val){
                var res = await PickAddress.getDistrict(val);
                if(res && res.data.Success){
                    this.lstDistrict = res.data.Data;
                    this.keyDistrict ++;
                }
            }
            else{
                this.lstDistrict = [{DistrictID: 0, DistrictName: "Khác"}];
            }
        },
        async districtChange(val){
            if(!this.isCreated){
                this.formData.WardsID = null;
            }
            if(val){
                var res = await PickAddress.getWards(val);
                if(res && res.data.Success){
                    this.lstWards = res.data.Data;
                    this.keyWards ++;
                }
            }
            else{
                this.lstWards = [{WardsID: 0, WardsName: "Khác"}];
            }
        },
        async getDataByID(){
            this.showLoading = true;
            this.id = this.$route.params?.id;
            var res = await ProfileAPI.getProfileByID(this.id);
            if(res && res.data.Success){
                this.formData = res.data.Data;
                await this.prepareDataEdit();
                this.renderDOM();
            }
            setTimeout(() => {
                this.showLoading = false;
            }, 500);
        },
        renderDOM(){
            this.keyInput ++;
            this.keySelect ++;
            this.keyProvince ++;
            this.keyDistrict ++;
            this.keyIdentifyIssuePlace ++;
            this.keyWards ++;
        },
        async prepareDataEdit(){
            if(this.formData.DateOfBirth){
                this.formData.DateOfBirth = Convert.formatDateToEdit(this.formData.DateOfBirth);
            }
            if(this.formData.IdentifyDate){
                this.formData.IdentifyDate = Convert.formatDateToEdit(this.formData.IdentifyDate);
            }
            if(this.formData.IdentifyType == ENUMS.PICK_LIST_IDENTIFY_TYPE[0].value){
                this.listIdentifyPlace = ENUMS.PICK_LIST_CCCD;
            }
            else {
                this.listIdentifyPlace = JSON.parse(JSON.stringify(this.lstProvince));
            }
            // if(this.formData.Country){
            //     if(this.formData.Country == ENUMS.PICK_LIST_COUNTRY[0].name){
            //         this.formData.Country = 1;
            //         await this.countryChange(1);
            //     }
            //     else {
            //         this.formData.Country = 2;
            //         await this.countryChange(0);
            //     }

            // }
            if(this.formData.ProvinceID){
                await this.provinceChange(this.formData.ProvinceID);
            }
            if(this.formData.DistrictID){
                await this.districtChange(this.formData.DistrictID);
            }
        },

        /**
         * Lấy code mới
         */
        async getNewCode(){
            var res = await ProfileAPI.getNewCode();
            if(res && res.data.Success){
                this.formData.EmployeeCode = res.data.Data;
                this.keyInput ++;
            }
        },

        /**
         * Lấy danh sách phòng ban
         */
        async getDeparment(){
            var res = await ProfileAPI.getDepartment();
            if(res && res.data.Success){
                this.lstDepartment = res.data.Data;
            }
        },

        /**
         * Lấy danh sách vị trí công việc
         */
        async getPosition(){
            var res = await ProfileAPI.getPosition();
            if(res && res.data.Success){
                this.lstPosition = res.data.Data;
            }
        },

        /**
         * Validate dữ liệu
         */
        validateBeforeSave(){
            var faild = false;
            var property = ["EmployeeCode", "FullName", "DateOfBirth", "EthnicityID", "TaxCode", "GenderID",
                "DepartmentID", "PositionID", "IdentifyType", "IdentifyDate", "IdentifyNumber", "IdentifyIssuedPlaceID",
                "PhoneNumber" ];
            for(var i = 0; i < property.length; i++){
                if(this.formData[property[i]] == null || this.formData[property[i]] == ""){
                    this.errors[i] = true;
                    faild = true;
                }
                else{
                    this.errors[i] = false;
                }
            }
           
            var validateRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
            if(this.formData.Email){
                if(!this.formData.Email.match(validateRegex)){
                    this.errorEmail = true;
                    faild = true;
                }
                else {
                    this.errorEmail = false;
                }
            }
            this.renderDOM();   
            return faild;
            // if(this.formData.EmployeeCode == null || this.formData.EmployeeCode == ""){
            //     this.errors[0] = true;
            //     faild = true;
            // }
            // if(this.formData.FullName == null || this.formData.FullName == ""){
            //     this.errors[1] = true;
            //     faild = true;
            // }
            // if(this.formData.DateOfBirth == null || this.formData.DateOfBirth == ""){
            //     this.errors[2] = true;
            //     faild = true;
            // }
            // if(this.formData.EthnicityID == null || this.formData.EthnicityID == ""){
            //     this.errors[3] = true;
            //     faild = true;
            // }
            // if(this.formData.TaxCode == null || this.formData.TaxCode == ""){
            //     this.errors[4] = true;
            //     faild = true;
            // }
            // if(this.formData.GenderID == null || this.formData.GenderID == ""){
            //     this.errors[5] = true;
            //     faild = true;
            // }
        },
        valueEmployeeCodeChange(){
            this.errorEmployeeCode = "Mã nhân viên không được bỏ trống";
        },
        valueTaxCodeChange(){
            this.errorTaxCode = "Mã số thuế không được bỏ trống";
        },
        valueIdentifyNumberChange(){
            this.errorIdentify = "Số CMND/CCCD không được bỏ trống";
        },

        /**
         * Lấy tên phòng ban
         */
        getDepartmentName(){
            if(this.lstDepartment){
                this.departmentName = this.lstDepartment.find(x => x.DepartmentID == this.formData.DepartmentID).DepartmentName;
            }
        },
        /**
         * Lấy tên vị trí công việc
         */
        getPositionName(){
            if(this.lstPosition){
                this.positionName = this.lstPosition.find(x => x.PositionID == this.formData.PositionID).PositionName;
            }
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
