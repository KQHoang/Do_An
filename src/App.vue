<template>
  <v-app style="height: 100%;">
    <div class="nav-header justify-space-between">
      <div class="d-flex align-center">
        <div class="nav-header-icon">
          <i class="fa fa-user header-user" aria-hidden="true"></i>
        </div>
        <span>Nhân viên</span>
      </div>
      <div class="d-flex">
        <!-- <div class="nav-bell m-r-8" title="Thông báo">
          <i class="fa fa-bell-o" aria-hidden="true"></i>
        </div> -->
        <div class="nav-bell account-user-nav" title="Thông báo" @click="handleClickAccount">
          <i class="fa fa-user-circle" aria-hidden="true"></i>
          <div class="nav-account" v-if="isShowPopUpAccount">
            <div class="nav-account-name">
              {{ dataAccountNav.FullName }}
            </div>
            <div class="nav-account-email">
              {{ dataAccountNav.Email }}
            </div>
            <div class="change-password" @click="handleClickChangePassword">
              <i class="fa fa-key" aria-hidden="true"></i>
              Đổi mật khẩu
            </div>
            <div class="logout-account" @click="handleClickLogout">
              <i class="fa fa-sign-out" aria-hidden="true"></i>
              Đăng xuất
            </div>
          </div>
        </div>

      </div>
    </div>
    <v-navigation-drawer
        :model-value="drawer"
        :rail="rail"
        permanent
        theme="dark"
        @click="rail = false"
      >
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <!-- Nhân viên, quản trị hệ thống, nv tài chính -->
          <v-list-item title="Hồ sơ cá nhân" :active="navActive == 1" value="1" @click="handleClickNav">
          </v-list-item>

          <!-- nhân viên phòng nhân sự -->
          <v-list-item title="Quản lý hồ sơ nhân viên" :active="navActive == 2" v-show="permission == 2" value="2" @click="redirecManageProfile">
          </v-list-item>

          <v-list-item title="Chấm công" :active="navActive == 3"  value="3" @click="redirectPersonalTimeSheets">
          </v-list-item>

          <!-- nhân sự -->
          <v-list-item title="Quản lý chấm công" :active="navActive == 4" value="4" v-show="permission == 2" @click="redirectManageTimeSheets">
          </v-list-item>

          <v-list-item title="Tiền lương" :active="navActive == 5" value="5" @click="redirectSalaryEmployee">
          </v-list-item>
          
          <!-- tài chính -->
          <v-list-item title="Quản lý tiền lương" :active="navActive == 6" value="6" v-show="permission == 3" @click="redirectManageSalary">
          </v-list-item>

          <!-- nhân viên phòng nhân sự -->
          <v-list-item title="Quản lý phòng ban" :active="navActive == 7" value="7" v-show="permission == 2" @click="redirectManageDepartment">
          </v-list-item>
          <v-list-item title="Quản lý chức vụ" :active="navActive == 8" value="8" v-show="permission == 2" @click="redirectManagePosition">
          </v-list-item>
          <v-list-item title="Quản lý hợp đồng" :active="navActive == 9" value="9" v-show="permission == 2" @click="redirectManageContract">
          </v-list-item>

          <!-- Quản trị hệ thống -->
          <v-list-item title="Quản lý tài khoản" :active="navActive == 10" value="10" v-show="permission == 1" @click="redirectManageAccount">
          </v-list-item>
          <v-list-item title="Phân quyền" :active="navActive == 11" value="11" v-show="permission == 1" @click="redirectManagePermission">
          </v-list-item>
        </v-list>
        <!-- <template v-slot:append>
          <v-list-item class="button-small-nav" :prepend-icon="iconCloseNav" title="Thu gọn" @click.stop="rail = !rail"></v-list-item>
        </template> -->
    </v-navigation-drawer>
    <div class="layout-main">
      <router-view></router-view>
    </div>
  </v-app>
  <vue-login @action-done="handleLogin" v-if="!isLogin" @getting-started="handleStarted">
  </vue-login>
  <vue-change-password v-if="showChangePassword" @action-cancel="handleCancelChange" @action-done="handleChageSuccess"/>
  <ToastMessage title="" text="Bạn không có quyền thực hiện chức năng này!" typeAlert="warning" :max-width="500" v-if="showMessage"/>
</template>

<script>
import AccountAPI from '@/js/api/accountAPI';
import login from './views/login/login.vue';
import changePassword from "@/views/change-password/changePassword.vue"
export default {
  name: 'App',

  components: {
    "vue-login": login,
    'vue-change-password': changePassword
  },

  data(){
    return {
      permission: 1, // 1 - quản trị, 2 - nhân sự, 3 - tiền lương, 4 nhân viên
      drawer: 1,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      rail: false,
      iconCloseNav: "mdi-chevron-left",
      isLogin: true,
      isShowPopUpAccount: false,
      dataAccountNav: {},
      showChangePassword: false,
      showMessage: false, 
      navActive: 1
    }
  },

  watch:{
    rail(val){
        this.iconCloseNav = val ? "mdi-chevron-right" : "mdi-chevron-left";
    },
    // "window.localStorage.Permission":{
    //   handler(value) {
    //     console.log("úi úi",value);
    //     // this will be run immediately on component creation.
    //   },
    //   // force eager callback execution
    //   immediate: true,
    //   deep: true
    // }
  },
  created(){
    var login = localStorage.getItem("IsLogin");
    if(login == true){
      this.isLogin = login;
      this.permission = localStorage.getItem("Permission");
    }
    if(this.isLogin == true){
      var id = localStorage.getItem("GlobalEmployeeID");
      this.$router.push({ name: 'ViewEmployee', params: { id: id }});
    }
    else{
      this.$router.push({ name: 'Login'});
    }
  },
  methods:{
    /**
     * Xử lý đăng nhập thành công
     */
    handleLogin(value){
      this.permission = value;
      this.isLogin = true;
      localStorage.setItem('IsLogin', true);
      localStorage.setItem('Permission', value);
      var id = localStorage.getItem("GlobalEmployeeID");
      this.$router.push({ name: 'ViewEmployee', params: { id: id }});
    },

    /**
     * Xử lý khi form Đăng nhập được mở lên
     */
    handleStarted(){
      this.isLogin = false;
      localStorage.setItem('IsLogin', false);
    },

    /**
     * Xử lý khi đổi mật khẩu thành công
     */
    handleChageSuccess(){
      this.showChangePassword = false;
      localStorage.setItem('IsLogin', false);
      this.isLogin = false;
    },

    handleClickNav(){
      this.navActive = 1;
      var id = localStorage.getItem("GlobalEmployeeID");
      this.$router.push({ name: 'ViewEmployee', params: { id: id }});
    },
    async redirecManageProfile(){
      this.navActive = 2;
      var id = localStorage.getItem('GlobalAccountID');
      var res = await AccountAPI.checkPermission(id, 'ManageProfile');
      if(res && res.data.Success){
        this.$router.push({ name: 'ManageProfile'});
      }
      else {
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    },
    async redirectManageDepartment(){ 
      this.navActive = 7;
      var id = localStorage.getItem('GlobalAccountID');
      var res = await AccountAPI.checkPermission(id, 'ManageDepartment');
      if(res && res.data.Success){
        this.$router.push({ name: 'ManageDepartment'});
      }
      else {
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    },
    async redirectManagePosition(){ 
      this.navActive = 8;
      var id = localStorage.getItem('GlobalAccountID');
      var res = await AccountAPI.checkPermission(id, 'ManagePosition');
      if(res && res.data.Success){
        this.$router.push({ name: 'ManagePosition'});
      }
      else {
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    },
    async redirectManageContract(){ 
      this.navActive = 9;
      var id = localStorage.getItem('GlobalAccountID');
      var res = await AccountAPI.checkPermission(id, 'ManageContract');
      if(res && res.data.Success){
        this.$router.push({ name: 'ManageContract'});
      }
      else {
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    },
    async redirectManageTimeSheets(){ 
      this.navActive = 4;
      var id = localStorage.getItem('GlobalAccountID');
      var res = await AccountAPI.checkPermission(id, 'ManageTimeSheets');
      if(res && res.data.Success){
        this.$router.push({ name: 'ManageTimeSheets'});
      }
      else {
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    },
    redirectPersonalTimeSheets(){
      this.navActive = 3;
      var id = localStorage.getItem("GlobalEmployeeID");
      this.$router.push({ name: 'PersonalTimeSheets',  params: { id: id }});
    },
    async redirectManageSalary(){
      this.navActive = 6;
      var id = localStorage.getItem('GlobalAccountID');
      var res = await AccountAPI.checkPermission(id, 'ManageSalary');
      if(res && res.data.Success){
        this.$router.push({ name: 'ManageSalary'});
      }
      else {
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    },
    redirectSalaryEmployee(){
      this.navActive = 5;
      var id = localStorage.getItem("GlobalEmployeeID");
      this.$router.push({ name: 'SalaryEmployee',  params: { id: id }});
    },
    redirectManageAccount(){
      this.navActive = 10;
      this.$router.push({ name: 'ManageAccount'});
    },
    redirectManagePermission(){
      this.navActive = 11;
      this.$router.push({ name: 'ManagePermission'});
    },
    getPermission(){
      if(localStorage.getItem("Login"))
        return localStorage.getItem("Permission");
      return 0;
    },
    /**
     * Xử lý nhấn hiện popup đăng xuất
     */
    async handleClickAccount(){
      this.isShowPopUpAccount = !this.isShowPopUpAccount;
      if(this.isShowPopUpAccount == true){
        var id = localStorage.getItem("GlobalAccountID");
        var res = await AccountAPI.getByAccountID(id);
        if(res && res.data.Success){
          this.dataAccountNav = res.data.Data;
        }
      }
    },
    /**
     * Nhấn đăng xuất
     */
    handleClickLogout(){
      this.isLogin = false;
      localStorage.setItem('IsLogin', false);
      this.$router.push({name: "Login"});
    }, 

    /**
     * Xử lý nhấn đổi mk
     */
    handleClickChangePassword(){
      // this.$router.push({name: "ChangePassword"});
      this.showChangePassword = true;
    }, 

    /**
     * Huỷ đổi mật khẩu
     */
    handleCancelChange(){
      this.showChangePassword = false;
    }
  }
}
</script>
<style lang="scss">
@import url('@/css/base.css');
@import url('@/css/distance.css');
#app{
  font-size: 14px !important;
  height: 100vh;
  .nav-header{
    display: flex;
    height: 56px !important;
    line-height: 56px;
    width: 100%;
    padding: 0 24px;
    align-items: center;
    .nav-header-icon{
      width: 32px;
      height: 32px;
      background-color: #503fea;
      margin-right: 12px;
      border-radius: 4px;
      .header-user{
        font-size: 24px;
        top: -6px;
        position: relative;
        left: 7px;
        color: #ffffff;
      }
    }
    span{
      font-size: 20px;
      font-weight: 700;
    }
    .account-user-nav{
      position: relative;
    }
    .nav-bell{
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      .fa{
        font-size: 18px;
      }
      .nav-account{
        // padding: 24px;
        min-width: 300px;
        padding-top: 24px;
        padding-bottom: 0;
        right: 5px;
        position: absolute;
        top: 30px;
        background-color: white;
        z-index: 103;
        -webkit-box-shadow: 0 3px 16px rgba(0,0,0,.16);
        .nav-account-name{
          line-height: 30px;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
        }
        .nav-account-email{
          line-height: 30px;
          text-align: center;
          padding: 0 24px;
        }
        .change-password{
          line-height: 40px;
          padding-left: 8px;
          margin-right: 24px;
          margin-left: 16px;
        }
        .change-password:hover{
          background-color: #f2f2f2;
        }
        .logout-account{
          line-height: 40px;
          padding: 0 24px;
          // position: relative;
        }
        .logout-account::before{
          content: "";
          border: 1px solid #e0e0e0;
          position: absolute;
          // top: 0;
          right: 0;
          width: 100%;
        }
        .logout-account:hover{
          background-color: #f2f2f2;
        }
      }
    }
    .nav-bell:hover{
      background-color: #eff1f6;
    }
  }
  .v-navigation-drawer{
    background-color: #080625;
    height: calc(100% - 56px) !important;
    top: 56px !important;
    padding-bottom: 12px;
    width: 200px !important;
    .v-list-item--active{
      background-color: #503fea;
      color: white !important;
    }
    .button-small-nav{
      width: 90%;
      display: flex;
      margin: auto;
      border-radius: 4px;
      background-color: #503fea;
    }
    .fa{
      font-size: 22px;
    }
  }
  .layout-main{
    // width: calc(100% - 200px);
    // padding: 12px;
    // margin-left: 200px;
    background-color: #EEEFF1;
    height: calc(100% - 56px);

    padding-left: 212px;
    padding-right: 12px;
    padding-bottom: 12px;
    width: 100%;
    padding-top: 12px;

  }
}
</style>
