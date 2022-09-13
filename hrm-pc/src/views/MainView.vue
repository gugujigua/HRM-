<script setup lang="ts">
import { getCurrentInstance, ref, onUpdated } from "vue";
import type { RouteRecordName } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import type { ComponentInternalInstance } from "vue";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);
const breadcrumb = ref(route.matched);
onUpdated(() => {
  breadcrumb.value = route.matched;
});
// 修改密码
const changePass = ref<FormInstance | null>(null);
const isPassDialogVisible = ref(false);
const changePassDate = ref({
  password: "",
  newpass: "",
  renewpass: "",
});
const changePassRules: FormRules = {
  password: [
    {
      required: true,
      message: "请输入原密码",
      trigger: "blur",
    },
  ],
  newpass: [
    {
      required: true,
      message: "请输入新密码",
      trigger: "blur",
    },
  ],
  renewpass: [
    {
      required: true,
      message: "确认新密码",
      trigger: "blur",
    },
  ],
};
function openPassDialog() {
  isPassDialogVisible.value = true;
}
function submitChangePass(form: FormInstance) {
  form.validate((valid) => {
    if (valid) {
      proxy?.api.login.edit(changePassDate.value).then((res) => {
        if (res.data.code === 200) {
          ElMessage({
            type: "success",
            message: res.data.msg,
          });
          changePassDate.value = {
            password: "",
            newpass: "",
            renewpass: "",
          };
          isPassDialogVisible.value = false;
        }
      });
    }
  });
}

function loginout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  router.push({ name: "login" });
}
</script>

<template>
  <el-container class="container">
    <el-header>
      <div class="title"><img src="../assets/images/logo.png" alt="" /></div>
      <div
        class="collapse"
        :class="{ active: isCollapse }"
        @click="isCollapse = !isCollapse"
      >
        <i class="iconfont icon-caidan"></i>
      </div>
      <el-menu
        :ellipsis="false"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">通知</el-menu-item>
        <el-sub-menu index="2">
          <template #title>人事专员</template>
          <el-menu-item index="2-1" @click="openPassDialog"
            >修改密码
          </el-menu-item>
          <el-menu-item index="2-2" @click="loginout">退出登录</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? 'auto' : '150px'">
        <el-menu :collapse="isCollapse" :router="true">
          <template v-for="v in $store.state.menus">
            <template v-if="v.meta?.visitable">
              <el-sub-menu :index="v.name" :key="v.name" v-if="v.children">
                <template #title>
                  <i class="iconfont" :class="v.meta?.icon"></i>
                  <span>{{ v.meta?.title }}</span>
                </template>
                <el-menu-item
                  v-for="val in v.children"
                  :key="val.name"
                  :index="val.name"
                  :route="{ name: val.name }"
                >
                  <i class="iconfont" :class="val.meta?.icon"></i
                  >{{ val.meta?.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item
                v-else
                :key="(v.name as RouteRecordName)"
                :index="v.name"
                :route="{ name: v.name }"
              >
                <i class="iconfont" :class="v.meta?.icon"></i>
                <span>{{ v.meta?.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="v in breadcrumb"
              :key="v.name"
              :to="{ name: v.name }"
            >
              {{ v.meta?.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog v-model="isPassDialogVisible" title="修改密码" width="40%">
      <el-form
        ref="changePass"
        :model="changePassDate"
        label-width="100px"
        :rules="changePassRules"
        ><el-form-item label="原密码" prop="password">
          <el-input v-model="changePassDate.password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input v-model="changePassDate.newpass" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="renewpass">
          <el-input v-model="changePassDate.renewpass" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isPassDialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitChangePass(changePass as FormInstance)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>
<style scoped>
.el-container .el-header {
  background-color: #545c64;
}
.el-container .el-header img {
  float: left;
  width: 100px;
  height: 60px;
}
.el-container .el-header .title {
  height: 100%;
  line-height: 60px;
  width: 200px;
  color: #fff;
  margin-left: -20px;
  text-align: center;
  float: left;
  font-size: 20px;
}
.el-container .el-header .collapse {
  width: 60px;
  height: 100%;
  text-align: center;
  line-height: 60px;
  float: left;
  color: #fff;
  transition: all 0.3s;
}
.el-container .el-header .collapse i {
  font-size: 24px;
}
.el-container .el-header .collapse.active {
  transform: rotate(-90deg);
}
.el-container .el-header .el-menu {
  float: right;
}
.el-container .el-aside {
  border-right: 1px solid #545c64;
}
.el-container .el-aside .el-menu {
  border-right: none;
}
.el-container .el-main {
  background: #f1f1f1;
  padding-top: 0;
}
.el-container .el-main .el-breadcrumb {
  line-height: 50px;
}
</style>
