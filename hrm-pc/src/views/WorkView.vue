<template>
  <div class="mtitle"><i>HRM</i>工作台</div>
  <el-row :gutter="12">
    <el-col :span="16">
      <el-card shadow="always">
        <div
          class="man"
          style="width: 100%; border-top: 2px solid blue; margin-bottom: 10px"
        >
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
              title="人事概况 （2022.07.01-2022.07.31）"
              :name="1"
            >
              <el-table :data="tableData1" style="width: 100%">
                <el-table-column prop="date" label="在职" width="100" />
                <el-table-column prop="state" label="入职" width="100" />
                <el-table-column prop="city" label="待入职" width="100" />
                <el-table-column prop="address" label="离职" flex="1" />
                <el-table-column prop="zip" label="待离职" width="100" />
                <el-table-column prop="zip" label="转正" width="100" />
                <el-table-column prop="zip" label="调岗" width="100" />
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="zhaopin" style="width: 100%; border-top: 2px solid blue">
          <el-collapse v-model="activeName1" @change="handleChange">
            <el-collapse-item
              title="招聘动态 （2022.01.18-2022.07.18）"
              :name="1"
            >
              <el-table :data="tableData1" style="width: 100%">
                <el-table-column prop="date" label="正在招聘岗位" width="180" />
                <el-table-column prop="state" label="评选中" width="180" />
                <el-table-column prop="city" label="待入职" width="180" />
                <el-table-column prop="address" label="已入职" flex="1" />
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="salary" style="width: 100%; border-top: 2px solid blue">
          <el-collapse v-model="activeName" @change="handleChange">
            <el-collapse-item title="上月薪资概况" :name="1">
              <el-table :data="tableData1" style="width: 100%">
                <el-table-column prop="date" label="计薪人员" width="220" />
                <el-table-column prop="state" label="实发工资" width="220" />
                <el-table-column prop="city" label="暂无数据" flex="1" />
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <div class="dated" style="width: 100%; border-top: 2px solid blue">
          <el-collapse v-model="act" @change="handleChange">
            <el-collapse-item title="日历" :name="1">
              <el-calendar v-model="value" />
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const activeNames = ref(1);
const activeName = ref(1);
const activeName1 = ref(1);
const active = ref(1);
const act = ref(1);
const value = ref(new Date());
</script>
<style scoped></style>
