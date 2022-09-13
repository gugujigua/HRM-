<template>
  <el-row :guttter="20">
    <el-col :span="6">
      <div class="department-box">
        <el-tree
          :data="departmentData"
          :props="{ label: 'departmentName', value: 'id' }"
          @node-click="selsctDepartment"
        /></div
    ></el-col>
    <el-col :span="18">
      <el-table :data="staffData" stripe style="width: 100%" height="30vh">
        <el-table-column label="选择">
          <template #default="scope">
            <el-button size="small" @click="selectStaffFn(scope.row)"
              >选择</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="department" label="所有部门" width="180" />
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  staffId: { type: Number, required: true },
  staff: { type: String, required: true },
});
const emit = defineEmits(["update:staffId", "update:staff", "update:visible"]);
interface StaffType {
  id: number;
  name: string;
  depart_id: number;
  department: string;
}
interface DepartmentType {
  id: number;
  departmentName: string;
  children?: DepartmentType[];
}
const staffData = ref<StaffType[]>([]);
const departmentData = ref<DepartmentType[]>([]);
departmentData.value = [
  {
    id: 1,
    departmentName: "综合部",
    children: [
      { id: 2, departmentName: "人事部" },
      { id: 3, departmentName: "财务部" },
    ],
  },
  {
    id: 10,
    departmentName: "研发部部",
    children: [
      { id: 12, departmentName: "人事部" },
      { id: 13, departmentName: "财务部" },
    ],
  },
  {
    id: 20,
    departmentName: "市场部",
    children: [
      { id: 2, departmentName: "人事部" },
      { id: 3, departmentName: "财务部" },
    ],
  },
];
function selsctDepartment() {
  staffData.value = [
    { id: 1, name: "张三1", depart_id: 1, department: "综合部" },
    { id: 1, name: "张三2", depart_id: 1, department: "综合部" },
    { id: 1, name: "张三3", depart_id: 1, department: "综合部" },
    { id: 1, name: "张三4", depart_id: 1, department: "综合部" },
    { id: 1, name: "张三5", depart_id: 1, department: "综合部" },
  ];
}
function selectStaffFn(data: { id: number; name: string; false: false }) {
  emit("update:staffId", data.id);
  emit("update:staff", data.name);
  emit("update:visible", data.false);
}
</script>

<style scoped>
.department-box {
  border: 1px solid #ebeef5;
  height: 30vh;
  overflow-y: auto;
}
</style>
