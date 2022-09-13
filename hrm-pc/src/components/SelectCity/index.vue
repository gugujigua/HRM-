<template>
  <div class="select-area">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-select
          placeholder="请选择省份"
          v-model="province"
          @change="getCitydata"
        >
          <el-option
            v-for="p in cityData"
            :key="p.code"
            :label="p.name"
            :value="p.code"
        /></el-select>
      </el-col>
      <el-col :span="8">
        <el-select placeholder="请选择市" v-model="city" @change="getareadata">
          <el-option
            v-for="c in Citylistdata"
            :key="c.code"
            :label="c.name"
            :value="c.code"
            :disabled="!province"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select placeholder="请选择区" v-model="area">
          <el-option
            v-for="a in Arealistdata"
            :key="a.code"
            :label="a.name"
            :value="a.code"
            :disabled="!province"
            @change="selectarea"
        /></el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import type { addressType, cityListType } from "../../types/common";
import { ref, toRef } from "vue";
import cityData from "./cityData.json";

const province = ref("");
const city = ref("");
const area = ref("");
const Citylistdata = ref<cityListType[]>([]);
function getCitydata(val: string) {
  (city.value = ""), (area.value = "");
  Arealistdata.value = [];
  for (let i = 0; i < cityData.length; i++) {
    if (cityData[i].code === val) {
      Citylistdata.value = cityData[i].children;
    }
  }
}
const Arealistdata = ref<cityListType[]>();
function getareadata(val: string) {
  for (let i = 0; i < Citylistdata.value.length; i++) {
    if (Citylistdata.value[i].code === val) {
      Arealistdata.value = Citylistdata.value[i].children;
    }
  }
}
interface Props {
  data: addressType;
}
const prop = defineProps<Props>();
const data = toRef(prop, "data");

const emit = defineEmits(["update:data"]);
function selectarea() {
  emit("update:data", {
    province: province.value,
    city: city.value,
    area: area.value,
  });
}
province.value = data.value.province;
if (data.value.city) {
  getCitydata(data.value.province);
  city.value = data.value.city;
}
if (data.value.area) {
  getareadata(data.value.city);
  area.value = data.value.area;
}
</script>
<style scoped>
.select-area {
  width: 100%;
}
</style>
