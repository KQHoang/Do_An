<template>
  <v-app>
    <div class="nav-header justify-space-between">
      <div class="d-flex">
        <div class="nav-header-icon">
          <i class="fa fa-user header-user" aria-hidden="true"></i>
        </div>
        <span>Nhân viên</span>
      </div>
      <div class="d-flex">
        <div class="nav-bell" title="Thông báo">
          <i class="fa fa-bell-o" aria-hidden="true"></i>
        </div>
        <!-- <div class="avatar">
          H
        </div> -->
      </div>
    </div>
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        theme="dark"
        @click="rail = false"
      >
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <!-- Nhân viên, quản trị hệ thống, nv tài chính -->
          <v-list-item title="Hồ sơ cá nhân" value="1">
          </v-list-item>

          <!-- nhân viên phòng nhân sự -->
          <v-list-item title="Quản lý hồ sơ nhân viên" v-if="permission == 2" value="2">
          </v-list-item>

          <v-list-group value="Admin5">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="Chấm công"
              >
              </v-list-item>
            </template>
            <v-list-item v-show="!rail" title="Bảng chấm công" value="5"></v-list-item>
            <v-list-item v-show="!rail" title="Đơn xin nghỉ" value="6"></v-list-item>
            <v-list-item v-show="!rail" title="Đề nghị cập nhật công" value="7"></v-list-item>
          </v-list-group>

          <!-- nhân sự -->
          <v-list-item title="Quản lý chấm công" value="16" v-if="permission == 2">
          </v-list-item>
          
          <v-list-group value="Admin9">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="Tiền lương"
              >
              </v-list-item>
            </template>
            <v-list-item v-show="!rail" title="Phiếu lương" value="8"></v-list-item>
            <v-list-item v-show="!rail" title="Phiếu thưởng" value="9"></v-list-item>
            <v-list-item v-show="!rail" title="Thống kê lương" value="10"></v-list-item>
          </v-list-group>

          <!-- tài chính -->
          <v-list-item title="Quản lý tiền lương" value="16" v-if="permission == 3">
          </v-list-item>

          <!-- nhân viên phòng nhân sự -->
          <v-list-item title="Quản lý phòng ban" value="11" v-if="permission == 2">
          </v-list-item>
          <v-list-item title="Quản lý chức vụ" value="12" v-if="permission == 2">
          </v-list-item>
          <v-list-item title="Quản lý hợp đồng" value="13" v-if="permission == 2">
          </v-list-item>
          <v-list-item title="Quản lý khen thưởng" value="14" v-if="permission == 2">
          </v-list-item>
          <v-list-item title="Quản lý kỷ luật" value="15" v-if="permission == 2">
          </v-list-item>

          <!-- Quản trị hệ thống -->
          <v-list-item title="Quản lý tài khoản" value="3" v-if="permission == 1">
          </v-list-item>
          <v-list-item title="Phân quyền" value="4" v-if="permission == 1">
          </v-list-item>
        </v-list>
        <!-- <template v-slot:append>
          <v-list-item class="button-small-nav" :prepend-icon="iconCloseNav" title="Thu gọn" @click.stop="rail = !rail"></v-list-item>
        </template> -->
      </v-navigation-drawer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data(){
    return {
      // selected: ['John'],
      // x: 15,
      // headers:[{ name: "Tên", value: "name", width: "1000"},{ name: "Tuổi", value: "age"}],
      // dataApiTable:[
      //   { id: 1, name: "hoàng", age: 13},
      //   { id: 2, name: "Ttttt", age: 12},
      // ],
      // pagingControl:{
      //   PageIndex: 1,
      //   PageSize: 25
      // },
      // lst:[ 
      //   {a: 1, b: "bbbbbb"},
      //   {a: 2, b: "aaaaa"},
      //   {a: 3, b: "nnnnnnn"},
      // ],
      // radio:[
      //   {label: "nam", value: 1},
      //   {label: "nữ", value: 0},
      // ],
      // check: 1, 
      permission: 3, // 1 - quản trị, 2 - nhân sự, 3 - tiền lương, 4 nhân viên
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      rail: false,
      iconCloseNav: "mdi-chevron-left"
      
    }
  },
  watch:{
    rail(val){
        this.iconCloseNav = val ? "mdi-chevron-right" : "mdi-chevron-left";
    }
  },
  created(){
  },
  methods:{
    getDataPaging(val){
      console.log(val);
    }, 
    tesssst(){
      console.log(this.selected);
    }, 
    handle(){
      console.log(this.aaaa, this.test);
    }
    
  }
}
</script>
<style lang="scss">
@import url('@/css/base.css');
#app{
  font-size: 14px !important;
  .nav-header{
    display: flex;
    height: 56px;
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
        top: 5px;
        position: relative;
        left: 7px;
        color: #ffffff;
      }
    }
    span{
      font-size: 20px;
      font-weight: 700;
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
}
</style>
