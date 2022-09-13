<template>
  <el-card class="mt20">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" class="mb20" @click="dialogAddVisible = true"
          >新建员工</el-button
        >
      </el-col>
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
      <el-col :span="14">
        <!-- 动态组件 -->
        <optionsTab
          :data="optionsData"
          v-model:status="optionsStatus"
        ></optionsTab>
      </el-col>
      <el-col :span="3" style="margin-left: 10px">
        <!-- 动态组件 -->
        <optionsTab
          :data="optionsData1"
          v-model:status="optionsStatus"
        ></optionsTab>
      </el-col>
      <el-col :span="6" style="margin-left: 10px">
        <!-- 动态组件 -->
        <optionsTab
          :data="optionsData2"
          v-model:status="optionsStatus"
        ></optionsTab>
      </el-col>
    </el-row>
    <el-row class="mt20">
      <el-col :span="24">
        <el-button-group>
          <el-button type="primary">转正</el-button>
          <el-button type="primary">调岗</el-button>
          <el-button type="primary">离职</el-button>
          <el-button type="primary">放弃离职</el-button>
          <el-button type="primary">再入职</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      table-layout="fixed"
      :highlight-current-row="true"
      :stripe="true"
      @selection-change="SelectXcheck"
    >
      <el-table-column type="selection" />
      <el-table-column label="姓名" prop="name">
        <template #default="scope">
          <span
            @click="showSubmit(scope.row)"
            style="cursor: pointer; color: blue; text-decoration: underline"
            >{{ scope.row.name }}</span
          ></template
        >
      </el-table-column>
      <el-table-column label="手机号" prop="phone" width="150" />
      <el-table-column label="证件类型" prop="document_type">
        <template #default="scope">
          {{ document_typedata[scope.row.document_type as 1 | 2 | 3 | 4] }}
        </template>
      </el-table-column>
      <el-table-column label="证件号码" prop="document_val" width="180" />
      <el-table-column label="性别" prop="sex">
        <template #default="scope">
          {{ scope.row.sex ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column label="出生日" prop="birth_date" width="120">
        <template #default="scope">
          {{ $filters.date(scope.row.birth_date) }}
        </template>
      </el-table-column>
      <el-table-column label="生日" prop="birth_day" width="120">
        <template #default="scope">
          {{ $filters.date(scope.row.birth_day, "yyyy-MM-dd") }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age" width="150" />
      <el-table-column label="婚姻状态" prop="marital_status">
        <template #default="scope">
          {{ scope.row.marital_status ? "已婚" : "未婚" }}
        </template>
      </el-table-column>
      <el-table-column label="生育状态" prop="fertility_status">
        <template #default="scope">
          {{ scope.row.fertility_status ? "已育" : "未育" }}
        </template>
      </el-table-column>
      <el-table-column label="国家" prop="country" width="150" />
      <el-table-column label="民族" prop="nation" width="150" />
      <el-table-column label="政治样貌" prop="politics_background">
        <template #default="scope">
          {{
            politics_backgrounddata[scope.row.politics_background as 1 | 2 | 3]
          }}
        </template>
      </el-table-column>
      <el-table-column label="籍贯" prop="Native_place" width="150" />
      <el-table-column
        label="户籍所在地"
        prop="Registered_residence"
        width="150"
      />
      <el-table-column label="健康状态" prop="health_status" width="150" />
      <el-table-column label="最高学历" prop="education">
        <template #default="scope">
          {{ educationdata[scope.row.education as 1 | 2 | 3 | 4 | 5 | 6] }}
        </template>
      </el-table-column>
      <el-table-column label="入职日期" prop="induction_date" width="120">
        <template #default="scope">
          {{ $filters.date(scope.row.induction_date, "yyyy-MM-dd") }}
        </template>
      </el-table-column>
      <el-table-column label="试用期" prop="on_probation" width="120">
        <template #default="scope">
          {{ scope.row.on_probation }}
        </template>
      </el-table-column>
      <el-table-column label="转正日期" prop="confirmation_date" width="120">
        <template #default="scope">
          {{ $filters.date(scope.row.confirmation_date, "yyyy-MM-dd") }}
        </template>
      </el-table-column>
      <el-table-column label="工号" prop="work_id" width="150" />
      <el-table-column label="部门" prop="department" width="150" />
      <el-table-column label="上级" prop="direct_superior" width="150" />
      <el-table-column label="岗位" prop="post_id" width="180">
        <template #default="scope">
          {{ workpositiondata[scope.row.post_id as 1 | 2 | 3] }}
        </template>
      </el-table-column>
      <el-table-column label="职级" prop="rank" width="150" />
      <el-table-column label="工作地点" prop="work_place" width="150" />
      <el-table-column label="详细工作地点" prop="work_location" width="150" />
      <el-table-column label="工作城市" prop="city" width="150">
        <template #default="scope">
          {{ $filters.address(scope.row.city) }}
        </template>
      </el-table-column>
      <el-table-column label="招聘渠道" prop="recruiment_channels" width="120">
        <template #default="scope">
          {{
            recruimentdata[scope.row.recruiment_channels as 1 | 2 | 3 | 4 | 5]
          }}
        </template>
      </el-table-column>
      <el-table-column label="员工状态" prop="status" width="120">
        <template #default="scope">
          {{ statusdata[scope.row.status as 1] }}
        </template>
      </el-table-column>
      <el-table-column label="聘用形式" prop="employ_method" width="120">
        <template #default="scope">
          {{ employ_methoddata[scope.row.employ_method as 1] }}
        </template>
      </el-table-column>
      <el-table-column label="合同类型" prop="contract_type" width="120">
        <template #default="scope">
          {{ contract_typedata[scope.row.contract_type as 1] }}
        </template>
      </el-table-column>
      <el-table-column label="现合同结束日期" prop="contract_end" width="140">
        <template #default="scope">
          {{ $filters.date(scope.row.contract_end, "yyyy-MM-dd") }}
        </template>
      </el-table-column>
      <el-table-column label="现合同期限" prop="contract_date" width="120">
        <template #default="scope">
          {{ $filters.date(scope.row.contract_date, "yyyy-MM-dd") }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
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
      v-model:currentPage="RecruitNoDataPag.page"
      v-model:page-size="RecruitNoDataPag.limit"
      :page-sizes="[5, 10, 15, 20]"
      :small="true"
      :disabled="false"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="RecruitNoDataPag.total"
      @size-change="RecruitNoSizeChange"
      @current-change="RecruitNoCurrentChange"
    />
    <el-dialog v-model="dialogAddVisible" name="新建员工" width="60%">
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
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="addForm.sex" class="ml-4">
                <el-radio label="1" size="large">男</el-radio>
                <el-radio label="0" size="large">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职时间">
              <el-date-picker
                v-model="addForm.induction_date"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试用期">
              <el-date-picker
                v-model="addForm.on_probation"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件类型" prop="document_type">
              <el-select
                class="block"
                v-model="addForm.document_type"
                placeholder="职位"
              >
                <el-option
                  v-for="item in document_typedataarr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="部门">
              <el-input v-model="addForm.department">
                <template #suffix>
                  <el-icon class="el-input__icon">
                    <calendar @click="SelectdepartmentVisible = true" />
                  </el-icon>
                </template>
              </el-input>
              <el-dialog
                v-model="SelectdepartmentVisible"
                name="选择部门"
                width="60%"
                :modal="false"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :draggable="true"
              >
                <theStaffCom
                  v-model:staffName="addForm.department"
                  v-model:staffId="addForm.department_id"
                  v-model:Svisible="SelectdepartmentVisible"
                ></theStaffCom>
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级">
              <el-input v-model="addForm.direct_superior" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="工作城市">
              <theCityCom :data="addForm.city"></theCityCom>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作岗位" prop="post_name">
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
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="工号" prop="work_id">
              <el-input v-model="addForm.work_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="聘用形式" prop="employ_method">
              <el-input v-model="addForm.employ_method"></el-input>
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
    <el-dialog v-model="dialogEditVisible" name="编辑员工" width="60%">
      <el-tabs v-model="activeName1">
        <el-tab-pane label="岗位信息" name="first">
          <el-form
            :model="editForm"
            label-width="100px"
            ref="edit"
            :rules="editRules"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="入职时间">
                  <el-date-picker
                    v-model="editForm.induction_date"
                    type="date"
                    placeholder=""
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="试用期">
                  <el-select
                    class="block"
                    v-model="editForm.on_probation"
                    placeholder="职位"
                  >
                    <el-option
                      v-for="item in shiyongqi"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="部门">
                  <el-input v-model="editForm.department">
                    <template #suffix>
                      <el-icon class="el-input__icon">
                        <calendar @click="SelectdepartmentVisible = true" />
                      </el-icon>
                    </template>
                  </el-input>
                  <el-dialog
                    v-model="SelectdepartmentVisible"
                    name="选择部门"
                    width="60%"
                    :modal="false"
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    :draggable="true"
                  >
                    <theStaffCom
                      v-model:staffName="editForm.department"
                      v-model:staffId="editForm.department_id"
                      v-model:Svisible="SelectdepartmentVisible"
                    ></theStaffCom>
                  </el-dialog>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上级">
                  <el-input v-model="editForm.direct_superior" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工作城市">
                  <theCityCom :data="editForm.city"></theCityCom>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作岗位" prop="post_name">
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
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工号" prop="work_id">
                  <el-input v-model="editForm.work_id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="聘用形式" prop="employ_method">
                  <el-select
                    class="block"
                    v-model="editForm.employ_method"
                    placeholder="职位"
                  >
                    <el-option
                      v-for="item in employ_methoddataForm"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <template v-if="editForm.employ_method === 1">
                  <el-form-item label="非正式" prop="employ_method">
                    <el-select
                      class="block"
                      v-model="editForm.employ_method"
                      placeholder="职位"
                      disabled
                    >
                      <el-option
                        v-for="item in employ_methoddataForm"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </template>
                <template v-else>
                  <el-form-item label="非正式" prop="employ_method">
                    <el-select
                      class="block"
                      v-model="editForm.employ_method"
                      placeholder="职位"
                    >
                      <el-option
                        v-for="item in employ_methodFeizhengshi"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="基本信息" name="second">
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
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="editForm.sex" class="ml-4">
                    <el-radio :label="1" size="large">男</el-radio>
                    <el-radio :label="0" size="large">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型" prop="document_type">
                  <el-select
                    class="block"
                    v-model="editForm.document_type"
                    placeholder="职位"
                  >
                    <el-option
                      v-for="item in document_typedataarr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="证件号码">
                  <el-input v-model="editForm.document_val" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="婚姻状况">
                  <el-radio-group
                    v-model="editForm.marital_status"
                    class="ml-4"
                  >
                    <el-radio :label="1" size="large">已婚</el-radio>
                    <el-radio :label="0" size="large">未婚</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="年龄">
                  <el-input v-model="editForm.age" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生育状况">
                  <el-radio-group
                    v-model="editForm.fertility_status"
                    class="ml-4"
                  >
                    <el-radio :label="1" size="large">已育</el-radio>
                    <el-radio :label="0" size="large">未育</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="国家地区" prop="country">
                  <el-input v-model="editForm.country"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="政治面貌" prop="politics_background">
                  <el-select
                    class="block"
                    v-model="editForm.politics_background"
                    placeholder="职位"
                  >
                    <el-option
                      v-for="item in politics_backgroundtdata"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="民族">
                  <el-input v-model="editForm.nation" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="籍贯">
                  <el-input v-model="editForm.Native_place" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="户籍所在地">
                  <el-input v-model="editForm.Registered_residence" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="健康状态">
                  <el-input v-model="editForm.health_status" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="最高学历">
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
                <el-form-item label="生日日期">
                  <el-date-picker
                    v-model="editForm.birth_date"
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="工资社保" name="third">工资社保</el-tab-pane> -->
      </el-tabs>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogEditVisible = false">返回</el-button>
          <el-button type="primary" @click="editSubmit(edit as FormInstance)"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer" name="查看员工信息" size="50%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="details">
          <div
            style="line-height: 40px; width: 100px; text-align: center"
            class="h3pp"
          >
            基本信息
          </div>
          <el-descriptions v-model="showForm">
            <el-descriptions-item label="姓名">{{
              showForm.name
            }}</el-descriptions-item>
            <el-descriptions-item label="英文名">{{
              showForm.english_name
            }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{
              $filters.date(showForm.birth_date)
            }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{
              showForm.phone
            }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{
              showForm.sex ? "男" : "女"
            }}</el-descriptions-item>
            <el-descriptions-item label="婚姻状态">{{
              showForm.marital_status ? "已婚" : "未婚"
            }}</el-descriptions-item>
            <el-descriptions-item label="生育状态">{{
              showForm.fertility_status ? "已育" : "未育"
            }}</el-descriptions-item>
            <el-descriptions-item label="国家地区">{{
              showForm.country
            }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{
              showForm.nation
            }}</el-descriptions-item>
            <el-descriptions-item label="政治面貌">{{
              showForm.politics_background
            }}</el-descriptions-item>
            <el-descriptions-item label="籍贯">{{
              showForm.Native_place
            }}</el-descriptions-item>
            <el-descriptions-item label="户籍所在地">{{
              showForm.Registered_residence
            }}</el-descriptions-item>
            <el-descriptions-item label="健康状态">{{
              showForm.health_status
            }}</el-descriptions-item>
            <el-descriptions-item label="最高学历">{{
              educationdata[showForm.education as 1 | 2 | 3 | 4 | 5 | 6]
            }}</el-descriptions-item>

            <el-descriptions-item label="证件类型">{{
              document_typedata[showForm.document_type as 1 | 2 | 3 | 4]
            }}</el-descriptions-item>
            <el-descriptions-item label="证件号码">{{
              showForm.document_val
            }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <div
            style="line-height: 40px; width: 100px; text-align: center"
            class="h3pp"
          >
            岗位信息
          </div>
          <el-descriptions v-model="showForm" :column="2">
            <el-descriptions-item label="入职时间"
              >{{ $filters.date(showForm.induction_date) }}
            </el-descriptions-item>
            <el-descriptions-item label="试用期">{{
              showForm.on_probation
            }}</el-descriptions-item>
            <el-descriptions-item label="所属部门">{{
              showForm.department
            }}</el-descriptions-item>
            <el-descriptions-item label="直属上级">{{
              showForm.direct_superior
            }}</el-descriptions-item>
            <el-descriptions-item label="职级">{{
              showForm.rank
            }}</el-descriptions-item>
            <el-descriptions-item label="岗位">{{
              workpositiondata[showForm.post_id as 1 | 2 | 3]
            }}</el-descriptions-item>
            <el-descriptions-item label="工作城市">{{
              $filters.address(showForm.city)
            }}</el-descriptions-item>
            <el-descriptions-item label="工号">{{
              showForm.work_id
            }}</el-descriptions-item>
            <el-descriptions-item label="聘用形式">{{
              showForm.employ_method === 1 ? "正式" : "非正式"
            }}</el-descriptions-item>
            <el-descriptions-item label="员工状态">{{
              showForm.status === 1 ? "正式" : "非正式"
            }}</el-descriptions-item>
            <el-descriptions-item label="招聘渠道">{{
              recruimentdata[showForm.recruiment_channels as 1 | 2 | 3 | 4 | 5]
            }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="工资社保">
          <div
            style="line-height: 40px; width: 100px; text-align: center"
            class="h3pp"
          >
            工资社保
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </el-card>
  <!-- 新建 -->
</template>

<script setup lang="ts">

import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import type { StaffType } from "../types/staff";
import optionsTab from "../components/optionsTab.vue";
import theCityCom from "../components/SelectCity/index.vue";
import type { FormInstance, FormRules } from "element-plus";
import type { OptionsType } from "@/types/common";
import { Calendar } from "@element-plus/icons-vue";

const RecruitNoDataPag = ref({
  page: 1,
  limit: 5,
  total: 6,
});
const RecruitNoSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const RecruitNoCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
const optionsData = ref<OptionsType[]>([]);
const optionsData1 = ref<OptionsType[]>([]);
const optionsData2 = ref<OptionsType[]>([]);
const activeName1 = ref("first");
optionsData.value = [
  { status: 0, name: "在职", val: 15 },
  { status: 1, name: "全职", val: 13 },
  { status: 2, name: "实习", val: 12 },
  { status: 3, name: "劳务", val: 11 },
  { status: 4, name: "顾问", val: 10 },
  { status: 5, name: "返聘", val: 9 },
  { status: 6, name: "外包", val: 8 },
  { status: 7, name: "兼职", val: 7 },
];
optionsData1.value = [
  { status: 8, name: "试用", val: 6 },
  { status: 9, name: "正式", val: 5 },
];
optionsData2.value = [
  { status: 10, name: "待入职", val: 4 },
  { status: 11, name: "待离职", val: 3 },
  { status: 12, name: "已离职", val: 2 },
];
const optionsStatus = ref(0);
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
  1: "前程无忧",
  2: "58同城",
  3: "中国人才热线",
  4: "拉勾网",
  5: "智联招聘",
};
const statusdata = {
  1: "新候选人",
  2: "初试通过",
  3: "安排面试",
  4: "面试通过",
  5: "已发offer",
  6: "待入职",
  7: "已淘汰",
  8: "已入职",
};
const document_typedata = {
  1: "身份证",
  2: "港澳身份证",
  3: "台湾身份证",
  4: "其他",
};
const employ_methoddataForm = [
  { id: 1, name: "正式", stata: false },
  { id: 2, name: "非正式", stata: true },
];
const employ_methodFeizhengshi = [
  { id: 1, name: "实习" },
  { id: 2, name: "兼职" },
  { id: 3, name: "劳务" },
  { id: 4, name: "顾问" },
  { id: 5, name: "返聘" },
  { id: 6, name: "外包" },
];
const politics_backgroundtdata = [
  { id: 1, name: "群众" },
  { id: 2, name: "共青团员" },
  { id: 3, name: "党员" },
];
const shiyongqi = [
  { id: 1, name: "1个月" },
  { id: 2, name: "2个月" },
  { id: 3, name: "3个月" },
  { id: 4, name: "4个月" },
  { id: 5, name: "5个月" },
  { id: 6, name: "6个月" },
];
const politics_backgrounddata = {
  1: "群众",
  2: "共青团员",
  3: "党员",
};
const employ_methoddata = {
  1: "正式",
  2: "非正式",
};
const contract_typedata = {
  1: "劳务",
};
const tableData = ref<StaffType[]>([]);
tableData.value = [
  {
    document_val: 147258369,
    name: "dfsdfsdf",
    english_name: "laoba",
    document_num: "ssss",
    phone: "15238877878",
    sex: 1,
    induction_date: 1658228372571,
    on_probation: "3个月",
    document_type: 1,
    department: "用人部门",
    direct_superior: "直属上级",
    post_id: 2,
    city: {
      city: "1101",
      area: "110101",
      province: "11",
    },
    work_id: 9527,
    employ_method: 1,
    id: 1,
    post_name: "软件开发",
    birth_date: 1658228372571,
    birth_day: 1658228372571,
    age: 22,
    marital_status: 0,
    fertility_status: 0,
    country: "中国",
    nation: "汉族",
    politics_background: 1,
    Native_place: "山西",
    Registered_residence: "山西省",
    health_status: "健康",
    education: 1,
    confirmation_date: 1658228372571,
    rank: 2,
    work_place: "优易可",
    work_location: "培训基地",
    recruiment_channels: 2,
    status: 1,
    contract_type: 1,
    contract_end: 1658228372571,
    contract_date: 1658228372571,
    salarycard_id: 2132121213,
    salarycard_city: "西安",
    bank_name: "一家银行",
    salary_account_bank: "开户行",
    personal_social_security: "个人社保账号",
    personal_accumulation_fund: "个人公积金账号",
    department_id: 1,
  },
  {
    document_val: 147258369,
    name: "dfsdfsdf",
    english_name: "laoba",
    document_num: "ssss",
    phone: "15238877878",
    sex: 1,
    induction_date: 1658228372571,
    on_probation: "3个月",
    document_type: 1,
    department: "用人部门",
    direct_superior: "直属上级",
    post_id: 2,
    city: {
      city: "1101",
      area: "110101",
      province: "11",
    },
    work_id: 9527,
    employ_method: 1,
    id: 1,
    post_name: "软件开发",
    birth_date: 1658228372571,
    birth_day: 1658228372571,
    age: 22,
    marital_status: 0,
    fertility_status: 0,
    country: "中国",
    nation: "汉族",
    politics_background: 1,
    Native_place: "山西",
    Registered_residence: "山西省",
    health_status: "健康",
    education: 1,
    confirmation_date: 1658228372571,
    rank: 2,
    work_place: "优易可",
    work_location: "培训基地",
    recruiment_channels: 2,
    status: 1,
    contract_type: 1,
    contract_end: 1658228372571,
    contract_date: 1658228372571,
    salarycard_id: 2132121213,
    salarycard_city: "西安",
    bank_name: "一家银行",
    salary_account_bank: "开户行",
    personal_social_security: "个人社保账号",
    personal_accumulation_fund: "个人公积金账号",
    department_id: 1,
  },
];
// eslint-disable-next-line @typescript-eslint/no-empty-function
function SelectXcheck() {}

//新建弹窗
const drawer = ref(false);
const activeName = ref("details");
function showSubmit(data: {
  name: string;
  phone: string;
  english_name: string;
  sex: number;
  induction_date: number;
  on_probation: string;
  document_type: number;
  document_val: string;
  department: string;
  direct_superior: string;
  post_id: number;
  city: { city: string; area: string; province: string };
  work_id: number;
  employ_method: number;
  department_id: number;
  post_name: string;
  status: number;
  id: number;
  birth_date: number;
  birth_day: number;
  age: number;
  marital_status: number;
  fertility_status: number;
  country: string;
  nation: string;
  politics_background: string;
  Native_place: string;
  Registered_residence: string;
  health_status: string;
  education: number;
  confirmation_date: number;
  rank: number;
  work_place: string;
  work_location: string;
  recruiment_channels: number;
  contract_type: number;
  contract_end: number;
  contract_date: number;
  salarycard_id: number;
  salarycard_city: number;
  bank_name: number;
  salary_account_bank: number;
  personal_social_security: number;
  personal_accumulation_fund: number;
}) {
  console.log(data);

  drawer.value = true;
  showForm.value = data;
}
const dialogAddVisible = ref(false);
const dialogEditVisible = ref(false);
function EditVisible(data: {
  name: string;
  phone: string;
  english_name: string;
  sex: number;
  induction_date: number;
  on_probation: string;
  document_type: number;
  document_val: string;
  department: string;
  direct_superior: string;
  post_id: number;
  city: { city: string; area: string; province: string };
  work_id: number;
  employ_method: number;
  department_id: number;
  post_name: string;
  status: number;
  id: number;
  birth_date: number;
  birth_day: number;
  age: number;
  marital_status: number;
  fertility_status: number;
  country: string;
  nation: string;
  politics_background: string;
  Native_place: string;
  Registered_residence: string;
  health_status: string;
  education: number;
  confirmation_date: number;
  rank: number;
  work_place: string;
  work_location: string;
  recruiment_channels: number;
  contract_type: number;
  contract_end: number;
  contract_date: number;
  salarycard_id: number;
  salarycard_city: number;
  bank_name: number;
  salary_account_bank: number;
  personal_social_security: number;
  personal_accumulation_fund: number;
}) {
  dialogEditVisible.value = true;
  editForm.value = data;
}
const workposition = [
  { id: 1, name: "高级系统架构师" },
  { id: 2, name: "高级JAVA工程师" },
  { id: 3, name: "高级产品经理" },
];
const workpositiondata = {
  1: "高级系统架构师",
  2: "高级java工程师",
  3: "高级产品经理",
};
const educations = [
  { id: 1, name: "小学" },
  { id: 2, name: "初中" },
  { id: 3, name: "高中" },
  { id: 4, name: "大专" },
  { id: 5, name: "本科" },
  { id: 6, name: "研究生" },
];
const document_typedataarr = [
  { id: 1, name: "居民身份证" },
  { id: 2, name: "港澳身份证" },
  { id: 3, name: "台湾身份证" },
  { id: 4, name: "护照" },
  { id: 5, name: "其他" },
];
const addForm = ref({
  name: "",
  english_name: "",
  phone: "",
  sex: 1,
  induction_date: 0,
  on_probation: "",
  document_type: 1,
  document_val: "",
  department: "",
  direct_superior: "",
  post_id: 1,
  city: {
    city: "1101",
    area: "110101",
    province: "11",
  },
  work_id: 1,
  employ_method: 1,
  department_id: 1,
  post_name: "",
  status: 0,
});
const addRules = ref<FormRules>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
});
const add = ref<FormInstance>();
function addSubmit(form: FormInstance) {
  form.validate((valid) => {
    if (valid) {
      dialogAddVisible.value = false;
      addForm.value = {
        name: "",
        phone: "",
        status: 0,
        english_name: "",
        sex: 1,
        induction_date: 0,
        on_probation: "",
        document_type: 1,
        document_val: "",
        department: "",
        direct_superior: "",
        post_id: 1,
        city: {
          city: "1101",
          area: "110101",
          province: "11",
        },
        work_id: 1,
        employ_method: 1,
        department_id: 1,
        post_name: "",
      };
    }
  });
}
const editForm = ref({
  name: "",
  phone: "",
  english_name: "",
  sex: 1,
  induction_date: 0,
  on_probation: "",
  document_type: 1,
  document_val: "",
  department: "",
  direct_superior: "",
  post_id: 1,
  city: {
    city: "1101",
    area: "110101",
    province: "11",
  },
  work_id: 1,
  employ_method: 1,
  department_id: 1,
  post_name: "",
  status: 0,
  id: 1,
  birth_date: 0,
  birth_day: 0,
  age: 0,
  marital_status: 0,
  fertility_status: 0,
  country: "",
  nation: "",
  politics_background: "",
  Native_place: "",
  Registered_residence: "",
  health_status: "",
  education: 0,
  confirmation_date: 0,
  rank: 0,
  work_place: "",
  work_location: "",
  recruiment_channels: 0,
  contract_type: 0,
  contract_end: 0,
  contract_date: 0,
  salarycard_id: 0,
  salarycard_city: 0,
  bank_name: 0,
  salary_account_bank: 0,
  personal_social_security: 0,
  personal_accumulation_fund: 0,
});
const editRules = ref<FormRules>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
});
const edit = ref<FormInstance>();
function editSubmit(form: FormInstance) {
  form.validate((valid) => {
    if (valid) {
      dialogEditVisible.value = false;
      editForm.value = {
        name: "",
        phone: "",
        english_name: "",
        sex: 1,
        induction_date: 0,
        on_probation: "",
        document_type: 1,
        document_val: "",
        department: "",
        direct_superior: "",
        post_id: 1,
        city: {
          city: "1101",
          area: "110101",
          province: "11",
        },
        work_id: 1,
        employ_method: 1,
        department_id: 1,
        post_name: "",
        status: 0,
        id: 1,
        birth_date: 0,
        birth_day: 0,
        age: 0,
        marital_status: 0,
        fertility_status: 0,
        country: "",
        nation: "",
        politics_background: "",
        Native_place: "",
        Registered_residence: "",
        health_status: "",
        education: 0,
        confirmation_date: 0,
        rank: 0,
        work_place: "",
        work_location: "",
        recruiment_channels: 0,
        contract_type: 0,
        contract_end: 0,
        contract_date: 0,
        salarycard_id: 0,
        salarycard_city: 0,
        bank_name: 0,
        salary_account_bank: 0,
        personal_social_security: 0,
        personal_accumulation_fund: 0,
      };
    }
  });
}
const showForm = ref({
  name: "",
  phone: "",
  english_name: "",
  sex: 1,
  induction_date: 0,
  on_probation: "",
  document_type: 1,
  document_val: "",
  department: "",
  direct_superior: "",
  post_id: 1,
  city: {
    city: "1101",
    area: "110101",
    province: "11",
  },
  work_id: 1,
  employ_method: 1,
  department_id: 1,
  post_name: "",
  status: 0,
  id: 1,
  birth_date: 0,
  birth_day: 0,
  age: 0,
  marital_status: 0,
  fertility_status: 0,
  country: "",
  nation: "",
  politics_background: "",
  Native_place: "",
  Registered_residence: "",
  health_status: "",
  education: 0,
  confirmation_date: 0,
  rank: 0,
  work_place: "",
  work_location: "",
  recruiment_channels: 0,
  contract_type: 0,
  contract_end: 0,
  contract_date: 0,
  salarycard_id: 0,
  salarycard_city: 0,
  bank_name: 0,
  salary_account_bank: 0,
  personal_social_security: 0,
  personal_accumulation_fund: 0,
});
const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};
const SelectdepartmentVisible = ref(false);
</script>

<style scoped>
.ml-4 .ml20 {
  margin-left: 20px;
}

.el-tab-pane .h3pp {
  position: relative;
}

.el-tab-pane .h3pp::before {
  content: "";
  width: 5px;
  height: 50%;
  position: absolute;
  left: 0;
  top: 25%;
  /* background: rgb(104, 104, 193); */
}
</style>
