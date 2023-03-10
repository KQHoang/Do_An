<template>
  <div class="main-combobox d-flex">
    <div class="label-combobox">
      {{ label }}
    </div>
    <v-combobox
      class="h-combobox"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    ></v-combobox>
  </div>
</template>

<script>
export default{
    name: "VCombobox",
    props:{
      label:{
        type: String,
        default: ""
      }
    }
}
</script>
<style lang="scss">
.main-combobox{
  .label-combobox{
    line-height: 36px;
    margin-right: 12px;
  }
  .h-combobox{
    .v-input__details{
      display: none;
    }
    .v-field__outline{
      display: none;
    }
    .v-field__overlay{
      border-radius: 4px;
    }
    .v-field__field{
      height: 36px !important;
      .v-field__input{
        padding: 6px;
      }
    }
    .v-field__append-inner{
      padding-top: 6px;
    }
  }
}
</style>