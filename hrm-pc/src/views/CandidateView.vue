<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button type="primary" @click="dialogAddVisible = true"
          >新增候选人</el-button
        ></el-col
      >
      <el-col :span="6" :offset="12">
        <el-input
          v-model="searchKey"
          placeholder="请输入姓名"
          stylr="width:100%"
          :clearable="true"
          @clear="clearSubmit"
        >
          <template #append>
            <el-button :icon="Search" @click="searchSubmit" />
          </template> </el-input
      ></el-col>
    </el-row>
    <el-row class="mt20">
      <el-col :span="24">
        <!-- 动态组件 -->
        <optionsTab
          :data="optionsData"
          v-model:status="optionsStatus"
        ></optionsTab>
      </el-col>
    </el-row>
    <el-row class="mt20 mb20">
      <el-col :span="24">
        <!-- 按钮组 -->
        <el-button-group>
          <el-button type="primary" @click="MoveCandidate"
            >移动候选人</el-button
          >
          <el-button type="primary">初选通过</el-button>
          <el-button type="primary">安排面试</el-button>
          <el-button type="primary">面试通过</el-button>
          <el-button type="primary">安排复试</el-button>
          <el-button type="primary">发offer</el-button>
          <el-button type="primary">待入职/入职</el-button>
        </el-button-group>
        <el-button
          type="danger"
          class="ml20"
          style="margin-left: 20px"
          @click="lost"
          >淘汰/流失</el-button
        >
      </el-col>
    </el-row>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      table-layout="fixed"
      :highlight-current-row="true"
      :stripe="true"
      @select="SelectXcheck"
    >
      <el-table-column type="selection" width="55" v-model="checked" />
      <el-table-column label="姓名" width="80" prop="name" />
      <el-table-column label="手机号" width="180" prop="phone" />
      <el-table-column label="性别" width="80" prop="sex">
        <template #default="scope">
          {{ scope.row.sex ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column label="应聘职位" width="100" prop="post_name" />
      <el-table-column label="工作年限" width="80" prop="work_years">
        <template #default="scope">
          {{ scope.row.work_years + "年" }}
        </template>
      </el-table-column>
      <el-table-column label="学历" width="80" prop="education">
        <template #default="scope">
          {{ educationdata[scope.row.education as 1 | 2 | 3 | 4 | 5 | 6] }}
        </template>
      </el-table-column>
      <el-table-column label="毕业院校" width="100" prop="school">
        <template #default="scope">
          {{ scope.row.school ? scope.row.school : "--" }}
        </template>
      </el-table-column>
      <el-table-column label="最近工作单位" width="180" prop="recent_work">
        <template #default="scope">
          {{ scope.row.recent_work ? scope.row.recent_work : "--" }}
        </template>
      </el-table-column>
      <el-table-column label="招聘渠道" width="180" prop="recruiment_channels">
        <template #default="scope">
          {{ recruimentdata[scope.row.recruiment_channels as 12] }}
        </template>
      </el-table-column>
      <el-table-column label="候选人状态" width="180" prop="status">
        <template #default="scope">
          {{ statusdata[scope.row.status as 1] }}
        </template>
      </el-table-column>
      <el-table-column
        label="用人部门"
        width="180"
        prop="department"
      ></el-table-column>
      <el-table-column
        label="招聘负责人"
        width="180"
        prop="hiring_manager"
      ></el-table-column>
      <el-table-column label="面试时间" width="200">
        <template #default="scope">
          {{
            scope.row.interview_time
              ? $filters.date(scope.row.interview_time, "yyyy-MM-dd")
              : "--"
          }}
        </template>
      </el-table-column>
      <el-table-column label="面试轮次" prop="interview_rounds" width="80" />
      <el-table-column label="面试官" prop="interviewer" width="100" />
      <el-table-column label="面试方式" prop="interview_method" width="180">
        <template #default="scope">
          {{ interview_methoddata[scope.row.interview_method as 1 | 2 | 3] }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template #default="scope">
          {{
            scope.row.create_time
              ? $filters.date(scope.row.create_time, "yyyy-MM-dd")
              : "--"
          }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="showSubmit(scope.row)"
            >查看</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="EditVisible(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="deleteRow(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="RecruitDoDataPag.page"
      v-model:page-size="RecruitDoDataPag.limit"
      :page-sizes="[5, 10, 15, 20]"
      :small="true"
      :disabled="false"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="RecruitDoDataPag.total"
      @size-change="RecruitDoSizeChange"
      @current-change="RecruitDoCurrentChange"
    />
  </el-card>
  <!-- 添加候选人 -->
  <el-dialog v-model="dialogAddVisible" title="添加候选人" width="60%">
    <el-form :model="addForm" ref="add" :rules="addRules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="addForm.sex" class="ml-4">
              <el-radio label="1" size="large">男</el-radio>
              <el-radio label="0" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄">
            <el-input v-model="addForm.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="应聘职位" prop="post_name">
            <el-select
              class="block"
              v-model="addForm.post_id"
              placeholder="职位"
            >
              <el-option
                v-for="item in workposition"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作年限">
            <el-input v-model="addForm.work_years"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历" prop="education">
            <el-select
              class="block"
              v-model="addForm.education"
              placeholder="学历"
            >
              <el-option
                v-for="item in educations"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业院校">
            <el-input v-model="addForm.school"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最近工作单位">
            <el-input v-model="addForm.recent_work"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="招聘渠道">
            <el-select
              class="block"
              v-model="addForm.recruiment_channels"
              placeholder="请选择"
            >
              <el-option
                v-for="item in recruimentChannels"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddVisible = false">返回</el-button>
        <el-button type="primary" @click="addSubmit(add as FormInstance)"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 编辑候选人 -->
  <el-dialog v-model="dialogEditVisible" title="编辑候选人" width="60%">
    <el-form
      :model="editForm"
      label-width="100px"
      ref="edit"
      :rules="editRules"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="editForm.sex" class="ml-4">
              <el-radio :label="1" size="large">男</el-radio>
              <el-radio :label="0" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄">
            <el-input v-model="editForm.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="应聘职位" prop="post_name">
            <el-select
              class="block"
              v-model="editForm.post_id"
              placeholder="职位"
            >
              <el-option
                v-for="item in workposition"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作年限">
            <el-input v-model="editForm.work_years"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历" prop="education">
            <el-select
              class="block"
              v-model="editForm.education"
              placeholder="学历"
            >
              <el-option
                v-for="item in educations"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业院校">
            <el-input v-model="editForm.school"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最近工作单位">
            <el-input v-model="editForm.recent_work"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="招聘渠道">
            <el-select
              class="block"
              v-model="editForm.recruiment_channels"
              placeholder="请选择"
            >
              <el-option
                v-for="item in recruimentChannels"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">返回</el-button>
        <el-button type="primary" @click="editSubmit(edit as FormInstance)"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 查看候选人 -->
  <el-drawer v-model="drawer" title="查看候选人" size="50%">
    <el-tabs v-model="activeName">
      <el-tab-pane label="详细资料" name="details">
        <el-descriptions v-model="showForm" columns="2">
          <el-descriptions-item label="姓名">{{
            showForm.name
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            showForm.phone
          }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{
            showForm.sex ? "男" : "女"
          }}</el-descriptions-item>
          <el-descriptions-item label="年龄"
            >{{ showForm.age }}
          </el-descriptions-item>
          <el-descriptions-item label="邮箱">{{
            showForm.email
          }}</el-descriptions-item>
          <el-descriptions-item label="应聘职位">{{
            showForm.post_id
          }}</el-descriptions-item>
          <el-descriptions-item label="工作年限">{{
            showForm.work_years
          }}</el-descriptions-item>
          <el-descriptions-item label="学历">{{
            educationdata[showForm.education as 1 | 2 | 3 | 4 | 5]
          }}</el-descriptions-item>
          <el-descriptions-item label="毕业学院">{{
            showForm.school
          }}</el-descriptions-item>
          <el-descriptions-item label="最近工作单位">{{
            showForm.recent_work
          }}</el-descriptions-item>
          <el-descriptions-item label="招聘渠道">{{
            showForm.recruiment_channels
          }}</el-descriptions-item>
          <el-descriptions-item label="状态">{{
            showForm.status
          }}</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="材料附件"></el-tab-pane>
      <el-tab-pane label="操作记录"></el-tab-pane>
    </el-tabs>
  </el-drawer>
  <!-- 淘汰 -->
  <el-dialog v-model="lostVisible" title="淘汰/流失候选人">
    <el-form :model="lostData" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="淘汰/流失原因">
            <el-select
              v-model="LostValue"
              placeholder="请选择原因"
              class="full"
            >
              <el-option
                v-for="item in LostOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> </el-select></el-form-item></el-col
        ><el-col :span="12">
          <el-form-item label="备注">
            <el-input
              resize="none"
              class="full"
              v-model="lostData.des"
              type="textarea"
              placeholder="请输入" /></el-form-item></el-col></el-row
    ></el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template></el-dialog
  >
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import type { candidateType } from "../types/candidate";
import type { BasecandidateType } from "../types/candidate";
import optionsTab from "../components/optionsTab.vue";
const searchKey = ref("");
// eslint-disable-next-line @typescript-eslint/no-empty-function
function searchSubmit() {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function clearSubmit() {}
const educationdata = {
  1: "小学",
  2: "初中",
  3: "高中",
  4: "大专",
  5: "本科",
  6: "研究生",
};
const recruimentdata = {
  12: "百度",
};
const statusdata = {
  1: "被淘汰",
};
const interview_methoddata = {
  1: "现场面试",
  2: "视频方式",
  3: "语音面试",
};
const optionsStatus = ref(0);
const tableData = ref<candidateType[]>([]);
tableData.value = [
  {
    id: 1,
    post_name: "前端开发",
    status: 1,
    department: "开发部",
    hiring_manager: "fasdfa",
    interview_time: 1658228372575,
    interview_rounds: 1,
    interviewer_id: 9527,
    interviewer: "dfasfd",
    interview_method: 1,
    create_time: 1658228372575,
    name: "dasfd",
    phone: "18503193135",
    sex: 1,
    age: 18,
    email: "123123@qq.com",
    post_id: 23,
    work_years: 3,
    education: 1,
    school: "fdasf",
    recent_work: "asdfdadsf",
    recruiment_channels: 12,
  },
  {
    id: 1,
    post_name: "前端开发",
    status: 1,
    department: "开发部",
    hiring_manager: "fasdfa",
    interview_time: 1658228372575,
    interview_rounds: 1,
    interviewer_id: 9527,
    interviewer: "dfasfd",
    interview_method: 1,
    create_time: 1658228372575,
    name: "dasfd",
    phone: "18503193135",
    sex: 1,
    age: 18,
    email: "123123@qq.com",
    post_id: 23,
    work_years: 3,
    education: 1,
    school: "fdasf",
    recent_work: "asdfdadsf",
    recruiment_channels: 12,
  },
  {
    id: 1,
    post_name: "前端开发",
    status: 1,
    department: "开发部",
    hiring_manager: "fasdfa",
    interview_time: 1658228372575,
    interview_rounds: 1,
    interviewer_id: 9527,
    interviewer: "dfasfd",
    interview_method: 1,
    create_time: 1658228372575,
    name: "dasfd",
    phone: "18503193135",
    sex: 1,
    age: 18,
    email: "123123@qq.com",
    post_id: 23,
    work_years: 3,
    education: 1,
    school: "fdasf",
    recent_work: "asdfdadsf",
    recruiment_channels: 12,
  },
  {
    id: 1,
    post_name: "前端开发",
    status: 1,
    department: "开发部",
    hiring_manager: "fasdfa",
    interview_time: 1658228372575,
    interview_rounds: 1,
    interviewer_id: 9527,
    interviewer: "dfasfd",
    interview_method: 1,
    create_time: 1658228372575,
    name: "dasfd",
    phone: "18503193135",
    sex: 1,
    age: 18,
    email: "123123@qq.com",
    post_id: 23,
    work_years: 3,
    education: 1,
    school: "fdasf",
    recent_work: "asdfdadsf",
    recruiment_channels: 12,
  },
  {
    id: 1,
    post_name: "前端开发",
    status: 1,
    department: "开发部",
    hiring_manager: "fasdfa",
    interview_time: 1658228372575,
    interview_rounds: 1,
    interviewer_id: 9527,
    interviewer: "dfasfd",
    interview_method: 1,
    create_time: 1658228372575,
    name: "dasfd",
    phone: "18503193135",
    sex: 1,
    age: 18,
    email: "123123@qq.com",
    post_id: 23,
    work_years: 3,
    education: 1,
    school: "fdasf",
    recent_work: "asdfdadsf",
    recruiment_channels: 12,
  },
];

const optionsData = ref([
  { status: 0, name: "全部", val: 10 },
  { status: 1, name: "新候选人", val: 1 },
  { status: 2, name: "初试通过", val: 2 },
  { status: 3, name: "安排面试", val: 4 },
  { status: 4, name: "面试通过", val: 6 },
  { status: 5, name: "已发Offer", val: 8 },
  { status: 6, name: "待入职", val: 3 },
  { status: 9, name: "已淘汰", val: 2 },
  { status: 7, name: "已入职", val: 1 },
]);
//获取到下标和对应的数据
//新建弹窗
const drawer = ref(false);
const activeName = ref("details");
function showSubmit(data: {
  name: string;
  sex: number;
  age: number;
  phone: string;
  email: string;
  post_id: number;
  work_years: number;
  education: number;
  school: string;
  recent_work: string;
  recruiment_channels: number;
  status: number;
}) {
  console.log(data);

  drawer.value = true;
  showForm.value = data;
}
const index = ref(0);
const dialogAddVisible = ref(false);
const dialogEditVisible = ref(false);
function EditVisible(data: {
  name: string;
  phone: string;
  sex: number;
  age: number;
  email: string;
  post_id: number;
  work_years: number;
  education: number;
  school: string;
  recent_work: string;
  recruiment_channels: number;
}) {
  dialogEditVisible.value = true;
  editForm.value = data;
}
const workposition = [
  { id: 1, name: "高级系统架构师" },
  { id: 2, name: "高级JAVA工程师" },
  { id: 3, name: "高级产品经理" },
];
const educations = [
  { id: 1, name: "小学" },
  { id: 2, name: "初中" },
  { id: 3, name: "高中" },
  { id: 4, name: "大专" },
  { id: 5, name: "本科" },
  { id: 6, name: "研究生" },
];
const recruimentChannels = [
  { id: 1, name: "前程无忧" },
  { id: 2, name: "58同城" },
  { id: 3, name: "中国人才热线" },
  { id: 4, name: "拉勾网" },
  { id: 5, name: "智联招聘" },
];

const addForm = ref<BasecandidateType>({
  name: "",
  sex: 1,
  age: 1,
  phone: "",
  email: "",
  post_id: 1,
  work_years: 0,
  education: 0,
  school: "",
  recent_work: "",
  recruiment_channels: 1,
});
const addRules = ref<FormRules>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
  position: [{ required: true, message: "请输入应聘职位", trigger: "blur" }],
  education: [{ required: true, message: "请输入学历", trigger: "blur" }],
});
const add = ref<FormInstance>();
function addSubmit(form: FormInstance) {
  form.validate((valid) => {
    if (valid) {
      dialogAddVisible.value = false;
      addForm.value = {
        name: "",
        sex: 0,
        age: 0,
        phone: "",
        email: "",
        post_id: 0,
        work_years: 0,
        education: 0,
        school: "",
        recent_work: "",
        recruiment_channels: 0,
      };
    }
  });
}
const editForm = ref<BasecandidateType>({
  name: "",
  sex: 1,
  age: 1,
  phone: "",
  email: "",
  post_id: 1,
  work_years: 0,
  education: 0,
  school: "",
  recent_work: "",
  recruiment_channels: 1,
});
const editRules = ref<FormRules>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
  position: [{ required: true, message: "请输入应聘职位", trigger: "blur" }],
  education: [{ required: true, message: "请输入学历", trigger: "blur" }],
});
const edit = ref<FormInstance>();
function editSubmit(form: FormInstance) {
  form.validate((valid) => {
    if (valid) {
      dialogEditVisible.value = false;
      editForm.value = {
        name: "",
        sex: 1,
        age: 0,
        phone: "",
        email: "",
        post_id: 0,
        work_years: 0,
        education: 0,
        school: "",
        recent_work: "",
        recruiment_channels: 0,
      };
    }
  });
}
const showForm = ref({
  name: "",
  sex: 1,
  age: 1,
  phone: "",
  email: "",
  post_id: 1,
  work_years: 0,
  education: 0,
  school: "",
  recent_work: "",
  recruiment_channels: 1,
  status: 1,
});
const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};
const RecruitDoDataPag = ref({
  page: 1,
  limit: 5,
  total: 6,
});
const RecruitDoSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const RecruitDoCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
const checked = ref(false);
// 淘汰
const lostVisible = ref(false);
const lostData = ref({
  des: "",
  reason: "",
});
const LostValue = ref([]);
const LostOptions = [
  {
    value: "1",
    label: "沟通表达能力差",
  },
  {
    value: "2",
    label: "候选人放弃",
  },
  {
    value: "3",
    label: "薪资要求过高",
  },
];
function SelectXcheck() {
  checked.value = true;
}
function lost() {
  lostVisible.value = true;
}
function save() {
  if (checked.value === true) {
    lostVisible.value = false;
    tableData.value.splice(index.value, 1);
  }
}

function MoveCandidate() {
  if (checked.value === true) {
    tableData.value.splice(index.value, 1);
  }
}
</script>
