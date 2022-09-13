<template>
  <el-card class="mt20">
    <el-row>
      <el-col :span="4">
        <el-button
          v-if="(route.meta.buttons as string[]).indexOf('add') !== -1"
          type="primary"
          class="mb20"
          @click="CreateNewOrg"
          >新建组织</el-button
        >
      </el-col>
      <el-col :span="14"> </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :props="{ children: 'children' }"
      default-expand-all
    >
      <el-table-column prop="department" label="部门" />
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button
            v-if="(route.meta.buttons as string[]).indexOf('edit') !== -1"
            link
            type="primary"
            size="small"
            @click="EditTable(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="(route.meta.buttons as string[]).indexOf('del') !== -1"
            link
            type="primary"
            size="small"
            @click="DelTable(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog v-model="dialogAddVisible" title="新建组织" width="30%" draggable>
    <el-form :model="CreateForm" label-width="60px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="部门" style="text-align: center">
            <el-input v-model="CreateForm.department" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级">
            <el-cascader
              :options="copytableData"
              clearable
              :props="{
                emitPath: false,
                checkStrictly: true,
                value: 'id',
                label: 'department',
              }"
              v-model="CreateForm.pid"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-input v-model="CreateForm.charge">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <calendar @click="SelectChargeVisible = true" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click="CreateD">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogEditVisible" title="编辑组织" width="30%" draggable>
    <el-form :model="EditForm" label-width="60px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="部门" style="text-align: center">
            <el-input v-model="EditForm.department" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级">
            <el-cascader
              :options="copytableData"
              clearable
              :props="{
                emitPath: false,
                checkStrictly: true,
                value: 'id',
                label: 'department',
              }"
              v-model="EditForm.pid"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-input v-model="EditForm.charge">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <calendar @click="SelectEditChargeVisible = true" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="EditFormPush">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="SelectChargeVisible"
    title="负责人"
    width="60%"
    :modal="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <theStaffCom
      v-model:staff="CreateForm.charge"
      v-model:staffId="CreateForm.charge_id"
      v-model:Svisible="SelectChargeVisible"
    ></theStaffCom>
  </el-dialog>
  <el-dialog
    v-model="SelectEditChargeVisible"
    title="负责人"
    width="60%"
    :modal="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <theStaffCom
      v-model:staff="EditForm.charge"
      v-model:staffId="EditForm.charge_id"
      v-model:Svisible="SelectEditChargeVisible"
    ></theStaffCom>
  </el-dialog>
</template>
<script lang="ts" setup>
import { getCurrentInstance, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import type { departmentType } from "@/types/department";
import theStaffCom from "@/components/selectStaff.vue";
import { Calendar } from "@element-plus/icons-vue";
import type { ComponentInternalInstance } from "vue";
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// console.log(instance?.appContext.app.config.globalProperties.api);
console.log(proxy?.api);
const dialogAddVisible = ref(false);
const dialogEditVisible = ref(false);
const SelectChargeVisible = ref(false);
const SelectEditChargeVisible = ref(false);
const tableData = ref<departmentType[]>([]);
const copytableData = ref<departmentType[]>([]);
proxy?.api.department.all().then((res) => {
  if (res?.data.code === 200) {
    tableData.value = res.data.data;
    copytableData.value = JSON.parse(JSON.stringify(tableData.value));
    copytableData.value.unshift({
      id: 0,
      pid: 0,
      department: "顶层",
      charge: 0,
      charge_id: 0,
    });
  }
});

function CreateNewOrg() {
  dialogAddVisible.value = true;
}
function CreateD() {
  proxy?.api.department
    .add({
      pid: CreateForm.value.pid,
      department: CreateForm.value.department,
      charge: CreateForm.value.charge_id,
    })
    .then((res) => {
      if (res.data.code === 200) {
        ElMessage.success(res.data.msg);
        dialogAddVisible.value = false;

        proxy?.api.department.all().then((res) => {
          if (res?.data.code === 200) {
            tableData.value = res.data.data;
            copytableData.value = JSON.parse(JSON.stringify(tableData.value));
            copytableData.value.unshift({
              id: 0,
              pid: 0,
              department: "顶层",
              charge: 0,
              charge_id: 0,
            });
          }
        });
      }
    });
}
const CreateForm = ref({
  department: "",
  pid: 0,
  charge: "",
  charge_id: 0,
});
const EditForm = ref({
  id: 0,
  department: "",
  pid: 0,
  charge: "",
  charge_id: 0,
});
//用人部门数据
function EditTable(row: any) {
  dialogEditVisible.value = true;
  EditForm.value = JSON.parse(JSON.stringify(row));
}
function EditFormPush() {
  console.log(EditForm.value, 1);

  proxy?.api.department
    .edit(EditForm.value.id, {
      pid: EditForm.value.pid,
      department: EditForm.value.department,
      charge: EditForm.value.charge_id,
    })
    .then((res) => {
      if (res?.data.code === 200) {
        ElMessage.success(res.data.msg);
        proxy?.api.department.all().then((res) => {
          if (res?.data.code === 200) {
            tableData.value = res.data.data;
            copytableData.value = JSON.parse(JSON.stringify(tableData.value));
            copytableData.value.unshift({
              id: 0,
              pid: 0,
              department: "顶层",
              charge: 0,
              charge_id: 0,
            });
          }
        });
      } else {
        console.log(EditForm.value);

        ElMessage.error(res.data.msg);
      }
    });
  dialogEditVisible.value = false;
}
async function DelTable(id: number) {
  const res = await proxy?.api.department.del(id);
  if (res?.data.code === 200) {
    ElMessage.success(res.data.msg);
    proxy?.api.department.all().then((res) => {
      if (res?.data.code === 200) {
        tableData.value = res.data.data;
        copytableData.value = JSON.parse(JSON.stringify(tableData.value));
        copytableData.value.unshift({
          id: 0,
          pid: 0,
          department: "顶层",
          charge: 0,
          charge_id: 0,
        });
      }
    });
  } else {
    ElMessage.error(res?.data.msg);
  }
}
</script>

<style scoped>
.mt20 {
  margin-top: 20px;
}

.mb20 {
  margin-bottom: 20px;
}

.ml-4 .ml20 {
  margin-left: 20px;
}
</style>
