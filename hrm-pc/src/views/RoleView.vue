<template>
  <el-card>
    <el-row class="mb20">
      <el-col :span="4">
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="roleData" border style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="description" label="角色描述" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="editRole(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="editAuth(scope.row)"
            >权限</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="delRole(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="addRoleDialogVisible" title="添加角色" width="40%">
      <el-form :model="addRoleData" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="addRoleData.roleName" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleData.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addRoleDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addRoleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="editRoleDialogVisible"
      title="编辑角色"
      width="30%"
      draggable
    >
      <el-form :model="editRoleData" label-width="60px">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="部门" style="text-align: center">
              <el-input v-model="editRoleData.roleName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="负责人">
              <el-input v-model="editRoleData.description"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editRoleDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editRoleSubmit">提交</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="authDialogVisible" title="角色权限" width="40%">
      <el-tree
        ref="treeRef"
        :data="authData"
        show-checkbox
        node-key="id"
        default-expand-all
        @check="selectAuthFn"
        :expand-on-click-node="false"
      >
        <template #default="{ data }">
          <span class="custom-tree-node">
            <span>{{ data.menu }}</span>
            <template v-if="data.buttons.length > 0">
              <el-checkbox-group
                style="display: inline-block"
                :validate-event="false"
                v-model="data.selectButtons"
                size="small"
              >
                <el-checkbox-button
                  v-for="v in data.buttons"
                  :key="v"
                  :label="v"
                  >{{ buttonsName[v] }}</el-checkbox-button
                >
              </el-checkbox-group>
            </template>
          </span>
        </template>
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="authDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="roleAuthSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, type ComponentInternalInstance } from "vue";
import type { RoleType, AuthType } from "@/types/role";

import { ElMessage, ElMessageBox, ElTree } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const roleData = ref<RoleType[]>([]);

function getData() {
  proxy?.api.role.all().then((res) => {
    if (res.data.code === 200) {
      roleData.value = res.data.data;
    }
  });
}
getData();
// 添加角色逻辑 开始
const addRoleData = ref({
  roleName: "",
  description: "",
});
const addRoleDialogVisible = ref(false);
function addRole() {
  addRoleDialogVisible.value = true;
}
function addRoleSubmit() {
  proxy?.api.role.add(addRoleData.value).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.msg,
      });
      addRoleData.value = {
        roleName: "",
        description: "",
      };
      getData();
      addRoleDialogVisible.value = false;
    }
  });
}
// 添加角色逻辑 结束
// 编辑角色逻辑 开始
const editRoleDialogVisible = ref(false);
const editRoleData = ref({
  id: 0,
  roleName: "",
  description: "",
});
function editRole(data: RoleType) {
  editRoleDialogVisible.value = true;
  editRoleData.value = JSON.parse(JSON.stringify(data));
  console.log(data);
}
function editRoleSubmit() {
  proxy?.api.role
    .edit(editRoleData.value.id, editRoleData.value)
    .then((res) => {
      if (res.data.code === 200) {
        ElMessage.success(res.data.msg);
        getData();
      } else {
        ElMessage.error(res.data.msg);
      }
    });
  editRoleDialogVisible.value = false;
}
// 编辑角色逻辑 结束
// 删除开始
function delRole(data: RoleType) {
  ElMessageBox.confirm("确定要删除该角色吗？", "消息提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    proxy?.api.role.del(data.id as number).then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          type: "success",
          message: res.data.msg,
        });
        getData();
      }
    });
  });
}
// 删除结束
// 角色权限 开始
const buttonsName = {
  add: "添加",
  edit: "编辑",
  del: "删除",
  auth: "权限",
  read: "查看",
};
const authData = ref<AuthType[]>([]);
let copyAuthData: AuthType[] = [];
proxy?.api.auth.all().then((res) => {
  if (res.data.code === 200) {
    copyAuthData = res.data.data;
  }
});
const authDialogVisible = ref(false);
const selectRoleId = ref(0);
const treeRef = ref<InstanceType<typeof ElTree>>();
function getSelectAuth(
  selectedNode: AuthType[], //放选中节点数组
  authData: AuthType[], //所有权限
  authId: number, // 选中权限ID
  buttons: string // 选中权限按钮
) {
  for (let i = 0; i < authData.length; i++) {
    if (authData[i].id === authId) {
      authData[i].selectButtons = buttons.length > 0 ? buttons.split(",") : [];
      selectedNode.push(authData[i]);
    } else if (authData[i].children) {
      getSelectAuth(
        selectedNode,
        authData[i].children as AuthType[],
        authId,
        buttons
      );
    }
  }
}
async function editAuth(data: RoleType) {
  authData.value = JSON.parse(JSON.stringify(copyAuthData));
  authDialogVisible.value = true;
  selectRoleId.value = data.id as number;
  const result = await proxy?.api.auth.one(data.id as number);
  if (result?.data.code === 200) {
    const selectedNode: AuthType[] = [];
    const roleAuth = result?.data.data;
    // authData  id  == authorityId
    for (let i = 0; i < roleAuth.length; i++) {
      getSelectAuth(
        selectedNode,
        authData.value,
        roleAuth[i].authorityId,
        roleAuth[i].buttons
      );
    }
    treeRef.value!.setCheckedNodes(selectedNode as Node[]);
  }
}

let selectedAuthData: AuthType[] = [];
function selectAuthFn(checkedNodes, checkedKeys) {
  selectedAuthData = checkedKeys.checkedNodes;
}

function roleAuthSubmit() {
  // [{role_id,auth_id,buttons},{}]
  const submitData = [];
  for (let i = 0; i < selectedAuthData.length; i++) {
    submitData.push({
      roleId: selectRoleId.value,
      authorityId: selectedAuthData[i].id,
      buttons: selectedAuthData[i].selectButtons
        ? selectedAuthData[i].selectButtons.join(",")
        : "",
    });
  }
  proxy?.api.auth.add(submitData).then((res) => {
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: res.data.msg,
      });
      authDialogVisible.value = false;
    }
  });
}
</script>

<style scoped></style>
