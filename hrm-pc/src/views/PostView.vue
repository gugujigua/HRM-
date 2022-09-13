<template>
  <el-card>
    <h1>招聘岗位</h1>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button type="primary" @click="RecruitDialog = true"
          >新建岗位</el-button
        >
      </el-col>
      <el-col :span="4" :offset="12">
        <el-input
          v-model="input1"
          class="w-50 m-2"
          placeholder="Please Input"
          :suffix-icon="Search"
        />
      </el-col>
    </el-row>
    <el-tabs class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <el-badge :value="RecruitDoData.length" class="item" style="top: 8px">
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span>招聘中</span>
            </span>
          </el-badge>
        </template>
        <div class="tabbox">
          <el-table :data="RecruitDoData" style="width: 100%">
            <el-table-column label="职位名称" width="120">
              <template #default="scope">
                <span
                  @click="DrawerTrigger(scope.row)"
                  style="cursor: pointer; color: #a0cfff"
                  >{{ scope.row.jobtitle }}</span
                ></template
              >
            </el-table-column>
            <el-table-column prop="department" label="用人部门" width="120" />
            <el-table-column prop="city" label="工作城市" width="120">
              <template #default="scope">
                <span>{{ $filters.address(scope.row.city) }}</span></template
              >
            </el-table-column>

            <el-table-column prop="recruitnum" label="招聘人数" width="120" />
            <el-table-column prop="workexp" label="工作经验" width="120">
            </el-table-column>
            <el-table-column prop="education" label="学历要求" width="120" />
            <el-table-column prop="salaryrange" label="薪资范围" width="120">
              <template #default="scope">
                <span>{{
                  !scope.row.salaryrange.type
                    ? scope.row.salaryrange.min +
                      "-" +
                      scope.row.salaryrange.max +
                      scope.row.salaryrange.unit
                    : "面谈"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="agereq" label="年龄要求" width="120">
              <template #default="scope">
                <span>{{
                  !scope.row.agereq.type
                    ? scope.row.agereq.min + "-" + scope.row.agereq.max + "岁"
                    : "不限"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="urgent" label="紧急程度" width="120">
              <template #default="scope">
                <span>{{ urgentHow[scope.row.urgent as 1 | 2 | 3] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="charge" label="负责人" width="120" />
            <el-table-column prop="interviewer" label="面试官 " width="120" />
            <el-table-column prop="state" label="状态" width="120">
              <template #default="scope">
                <span>{{ scope.row.state ? "正在招聘" : "停止招聘" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="lastpost" label="最迟到岗时间" width="120">
              <template #default="scope">
                <span>{{ $filters.date(scope.row.lastpost) }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="Recruitdel(scope.$index, scope.row)"
                  >停止招聘
                </el-button>
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
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <el-badge :value="RecruitNoData.length" class="item" style="top: 8px">
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span>停止招聘</span>
            </span>
          </el-badge>
        </template>
        <div class="tabbox">
          <el-table :data="RecruitNoData" style="width: 100%">
            <el-table-column label="职位名称" width="120">
              <template #default="scope">
                <span
                  @click="DrawerNoTrigger(scope.row)"
                  style="cursor: pointer; color: #a0cfff"
                  >{{ scope.row.jobtitle }}</span
                ></template
              >
            </el-table-column>
            <el-table-column prop="department" label="用人部门" width="120" />
            <el-table-column prop="city" label="工作城市" width="120">
              <template #default="scope">
                <span>{{ $filters.address(scope.row.city) }}</span></template
              >
            </el-table-column>
            <el-table-column prop="recruitnum" label="招聘人数" width="120" />
            <el-table-column prop="workexp" label="工作经验" width="120" />
            <el-table-column prop="education" label="学历要求" width="120" />
            <el-table-column prop="salaryrange" label="薪资范围" width="120">
              <template #default="scope">
                <span>{{
                  !scope.row.salaryrange.type
                    ? scope.row.salaryrange.min +
                      "-" +
                      scope.row.salaryrange.max +
                      scope.row.salaryrange.unit
                    : "面谈"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="agereq" label="年龄要求" width="120">
              <template #default="scope">
                <span>{{
                  !scope.row.agereq.type
                    ? scope.row.agereq.min + "-" + scope.row.agereq.max + "岁"
                    : "不限"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="urgent" label="紧急程度" width="120">
              <template #default="scope">
                <span>{{ urgentHow[scope.row.urgent as 1 | 2 | 3] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="charge" label="负责人" width="120" />
            <el-table-column prop="interviewer" label="面试官 " width="120" />
            <el-table-column prop="state" label="状态" width="120">
              <template #default="scope">
                <span>{{ scope.row.state ? "正在招聘" : "停止招聘" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="lastpost" label="最迟到岗时间" width="120">
              <template #default="scope">
                <span>{{ $filters.date(scope.row.lastpost) }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="RecruitNodel(scope.$index, scope.row)"
                  >启用招聘
                </el-button>
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
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
  <!-- 抽屉 -->
  <el-drawer
    v-model="theDrawerTrigger"
    title="I am the title"
    size="70%"
    :modal="false"
    :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">
        <el-icon> <calendar /> </el-icon>{{ "招聘岗位：" + indexdata.jobtitle }}
      </h4>
      <el-button type="primary" @click="RecruitindexEdit(indexdata)">
        <el-icon class="el-icon--left">
          <Edit />
        </el-icon>
        编辑
      </el-button>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left">
          <CircleCloseFilled />
        </el-icon>
        关闭
      </el-button>
    </template>
    <el-descriptions title="详细资料" :column="2">
      <el-descriptions-item label="职位名称">{{
        indexdata.jobtitle
      }}</el-descriptions-item>
      <el-descriptions-item label="用人部门">{{
        indexdata.department
      }}</el-descriptions-item>
      <el-descriptions-item label="工作城市">{{
        $filters.address(indexdata.city)
      }}</el-descriptions-item>
      <el-descriptions-item label="招聘人数">{{
        indexdata.recruitnum
      }}</el-descriptions-item>
      <el-descriptions-item label="工作经验">{{
        indexdata.workexp
      }}</el-descriptions-item>
      <el-descriptions-item label="学历要求">{{
        educationdata[indexdata.education as 1 | 2 | 3 | 4 | 5]
      }}</el-descriptions-item>
      <el-descriptions-item label="薪资范围">{{
        indexdata.salaryrange.type
          ? "面谈"
          : indexdata.salaryrange.min +
            "-" +
            indexdata.salaryrange.max +
            indexdata.salaryrange.unit
      }}</el-descriptions-item>
      <el-descriptions-item label="年龄要求">{{
        indexdata.agereq.type
          ? "不限"
          : indexdata.agereq.min + "-" + indexdata.agereq.max + "岁"
      }}</el-descriptions-item>
      <el-descriptions-item label="紧张程度">{{
        urgentHow[indexdata.urgent as 1 | 2 | 3]
      }}</el-descriptions-item>
      <el-descriptions-item label="负责人">{{
        indexdata.charge
      }}</el-descriptions-item>
      <el-descriptions-item label="面试官">{{
        indexdata.interviewer
      }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{
        indexdata.state ? "正在招聘" : "停止招聘"
      }}</el-descriptions-item>
      <el-descriptions-item label="最迟到岗时间">{{
        $filters.date(indexdata.lastpost)
      }}</el-descriptions-item>
    </el-descriptions>
  </el-drawer>
  <!-- 新建 -->
  <el-dialog v-model="RecruitDialog" width="50%" center>
    <el-form :model="RecruitCreateform" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="职位名称">
            <el-input v-model="RecruitCreateform.jobtitle" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用人部门">
            <el-cascader
              v-model="RecruitCreateform.department"
              :options="thedepartment"
              placeholder="请选择 用人部门"
              :props="{
                emitPath: false,
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="工作城市">
            <theCityCom :data="RecruitCreateform.city"></theCityCom>
          </el-form-item>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="招聘人数">
            <el-input v-model="RecruitCreateform.recruitnum" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作经验">
            <el-select
              v-model="RecruitCreateform.workexp"
              placeholder="请选择工作经验"
            >
              <el-option
                v-for="item in workyear"
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
          <el-form-item label="学历要求">
            <el-select
              v-model="RecruitCreateform.education"
              placeholder="请选择学历要求"
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
          <el-form-item label="薪资要求">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input
                  v-model="RecruitCreateform.salaryrange.min"
                  :disabled="RecruitCreateform.salaryrange.isdisabled"
                />
              </el-col>
              -
              <el-col :span="6">
                <el-input
                  v-model="RecruitCreateform.salaryrange.max"
                  :disabled="RecruitCreateform.salaryrange.isdisabled"
                />
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="RecruitCreateform.salaryrange.unit"
                  class="m-2"
                  style="width: 76px; margin-left: 10px"
                  :disabled="RecruitCreateform.salaryrange.isdisabled"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-checkbox
                  v-model="RecruitCreateform.salaryrange.type"
                  label="面议"
                  size="large"
                  @change="
                    (RecruitCreateform.salaryrange.isdisabled =
                      !RecruitCreateform.salaryrange.isdisabled),
                      (RecruitCreateform.salaryrange.max = 0),
                      (RecruitCreateform.salaryrange.min = 0)
                  "
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="年龄要求">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input
                  v-model="RecruitCreateform.agereq.min"
                  :disabled="RecruitCreateform.agereq.isdisabled"
                />
              </el-col>
              -
              <el-col :span="6">
                <el-input
                  v-model="RecruitCreateform.agereq.max"
                  :disabled="RecruitCreateform.agereq.isdisabled"
                />
              </el-col>
              <el-col :span="6">
                <el-checkbox
                  v-model="RecruitCreateform.agereq.type"
                  label="不限 "
                  size="large"
                  @change="
                    (RecruitCreateform.agereq.isdisabled =
                      !RecruitCreateform.agereq.isdisabled),
                      (RecruitCreateform.agereq.max = 0),
                      (RecruitCreateform.agereq.min = 0)
                  "
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急程度">
            <el-select
              v-model="RecruitCreateform.urgent"
              placeholder="请选择紧急程度"
            >
              <el-option
                v-for="item in urgentHows"
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
          <el-form-item label="负责人">
            <el-input v-model="RecruitCreateform.interviewer">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <calendar @click="TheinterviewerSelect" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面试官">
            <el-input v-model="RecruitCreateform.charge">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <calendar @click="chargeTheinterviewerSelect" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="最迟到岗时间">
        <el-col :span="20">
          <el-date-picker
            v-model="RecruitCreateform.lastpost"
            type="date"
            placeholder="Pick a Date"
            format="YYYY/MM/DD"
            value-format="x"
          />
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="RecruitDialog = false">取消</el-button>
        <el-button type="primary" @click="AddSureForm">确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 编辑 -->
  <el-dialog v-model="RecruitEditDialog" width="50%" center>
    <el-form :model="RecruitEditform" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="职位名称">
            <el-input v-model="RecruitEditform.jobtitle" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用人部门">
            <el-cascader
              v-model="RecruitEditform.department"
              :options="thedepartment"
              placeholder="请选择 用人部门"
              :props="{
                emitPath: false,
              }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="工作城市">
            <theCityCom :data="RecruitEditform.city"></theCityCom>
          </el-form-item>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="招聘人数">
            <el-input v-model="RecruitEditform.recruitnum" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作经验">
            <el-select
              v-model="RecruitEditform.workexp"
              placeholder="请选择工作经验"
            >
              <el-option
                v-for="item in workyear"
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
          <el-form-item label="学历要求">
            <el-select
              v-model="RecruitEditform.education"
              placeholder="请选择学历要求"
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
          <el-form-item label="薪资要求">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input
                  v-model="RecruitEditform.salaryrange.min"
                  :disabled="RecruitEditform.salaryrange.isdisabled"
                />
              </el-col>
              -
              <el-col :span="6">
                <el-input
                  v-model="RecruitEditform.salaryrange.max"
                  :disabled="RecruitEditform.salaryrange.isdisabled"
                />
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="RecruitEditform.salaryrange.unit"
                  class="m-2"
                  style="width: 76px; margin-left: 10px"
                  :disabled="RecruitEditform.salaryrange.isdisabled"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-checkbox
                  v-model="RecruitEditform.salaryrange.type"
                  label="面议"
                  size="large"
                  @change="
                    (RecruitEditform.salaryrange.isdisabled =
                      !RecruitEditform.salaryrange.isdisabled),
                      (RecruitEditform.salaryrange.max = 0),
                      (RecruitEditform.salaryrange.min = 0)
                  "
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="年龄要求">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input
                  v-model="RecruitEditform.agereq.min"
                  :disabled="RecruitEditform.agereq.isdisabled"
                />
              </el-col>
              -
              <el-col :span="6">
                <el-input
                  v-model="RecruitEditform.agereq.max"
                  :disabled="RecruitEditform.agereq.isdisabled"
                />
              </el-col>
              <el-col :span="6">
                <el-checkbox
                  v-model="RecruitEditform.agereq.type"
                  label="不限 "
                  size="large"
                  @change="
                    (RecruitEditform.agereq.isdisabled =
                      !RecruitEditform.agereq.isdisabled),
                      (RecruitEditform.agereq.max = 0),
                      (RecruitEditform.agereq.min = 0)
                  "
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急程度">
            <el-select
              v-model="RecruitEditform.urgent"
              placeholder="请选择紧急程度"
            >
              <el-option
                v-for="item in urgentHows"
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
          <el-form-item label="面试官">
            <el-input v-model="RecruitEditform.interviewer">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <calendar @click="EditTheinterviewerSelect" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-input v-model="RecruitEditform.charge">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <calendar @click="EditchargeTheinterviewerSelect" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="最迟到岗时间">
        <el-col :span="20">
          {{ RecruitEditform.lastpost }}
          <el-date-picker
            v-model="RecruitEditform.lastpost"
            type="date"
            placeholder="Pick a Date"
            format="YYYY/MM/DD"
            value-format="x"
          />
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="RecruitEditDialog = false">取消</el-button>
        <el-button type="primary" @click="EditSureForm">确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 新建负责人 -->
  <el-dialog
    v-model="SelectVisible"
    title="负责人"
    width="60%"
    :modal="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <theStaffCom
      v-model:staff="RecruitCreateform.interviewer"
      v-model:staffId="RecruitCreateform.interviewerId"
      v-model:visible="SelectVisible"
    ></theStaffCom>
  </el-dialog>
  <!-- 编辑负责人 -->
  <el-dialog
    v-model="EditSelectVisible"
    title="负责人"
    width="60%"
    :modal="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <theStaffCom
      v-model:staff="RecruitEditform.interviewer"
      v-model:staffId="RecruitEditform.interviewerId"
      v-model:visible="EditSelectVisible"
    ></theStaffCom>
  </el-dialog>
  <!--新建面试官-->
  <el-dialog
    v-model="chargeSelectVisible"
    title="面试官"
    width="60%"
    :modal="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <theStaffCom
      v-model:staff="RecruitCreateform.charge"
      v-model:staffId="RecruitCreateform.chargeId"
      v-model:visible="chargeSelectVisible"
    ></theStaffCom>
  </el-dialog>
  <el-dialog
    v-model="EditchargeSelectVisible"
    title="面试官"
    width="60%"
    :modal="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <theStaffCom
      v-model:staff="RecruitEditform.charge"
      v-model:staffId="RecruitEditform.chargeId"
      v-model:visible="EditchargeSelectVisible"
    ></theStaffCom>
  </el-dialog>
</template>
<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import theCityCom from "../components/SelectCity/index.vue";
import { Search, Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { CircleCloseFilled, Calendar } from "@element-plus/icons-vue";
import theStaffCom from "../components/selectStaff.vue";
import type { PostType } from "@/types/recruits";
import type { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const RecruitDoData = ref<PostType[]>([]);
//停止招聘数据
const RecruitNoData = ref<PostType[]>([]);
const urgentHow = {
  1: "一般",
  2: "不紧急",
  3: "非常紧急",
};
const urgentHows = [
  { id: 1, name: "紧急" },
  { id: 2, name: "不紧急" },
  { id: 3, name: "非常紧急" },
];
const educations = [
  { id: 1, name: "小学" },
  { id: 2, name: "初中" },
  { id: 3, name: "高中" },
  { id: 4, name: "大专" },
  { id: 5, name: "本科" },
  { id: 6, name: "研究生" },
];
const educationdata = {
  1: "小学",
  2: "初中",
  3: "高中",
  4: "大专",
  5: "本科",
  6: "研究生",
};
const workyear = [
  { id: 1, name: "一年" },
  { id: 2, name: "三年" },
  { id: 3, name: "五年" },
  { id: 4, name: "五年至十年" },
  { id: 5, name: "十年以上" },
];
function getdata() {
  proxy?.api.post.all().then((res) => {
    const dodata = [];
    const nodata = [];
    if (res?.data.code === 200) {
      const data = res.data.data;
      for (let i = 0; i < data.length; i++) {
        delete data[i].cityname;
        delete data[i].cityProvince;
        delete data[i].cityArea;
        delete data[i].ageReqIsdisabled;
        delete data[i].ageReqMax;
        delete data[i].ageReqMin;
        delete data[i].ageReqType;
        delete data[i].salaryRangeType;
        delete data[i].salaryRangeMax;
        delete data[i].salaryRangeMin;
        delete data[i].salaryRangeIsdisabled;
        delete data[i].salaryRangeUnit;
        if (data[i].state) {
          dodata.push(data[i]);
        } else {
          nodata.push(data[i]);
        }
      }

      RecruitDoData.value = dodata;
      console.log(dodata);

      RecruitNoData.value = nodata;
    }
  });
}
getdata();
const theDrawerTrigger = ref(false);

const input1 = ref("");
//停止招聘和启用招聘
function Recruitdel(index: number, row: PostType) {
  RecruitDoData.value.splice(index, 1);
  row.state = 0;
  proxy?.api.post.edit(row.id, row).then((res) => {
    console.log(res);
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg);
      RecruitNoData.value.push(row);
      getdata();
    } else {
      ElMessage.error(res.data.msg);
    }
  });
}
function RecruitNodel(index: number, row: PostType) {
  RecruitNoData.value.splice(index, 1);
  row.state = 1;
  proxy?.api.post.edit(row.id, row).then((res) => {
    console.log(res);
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg);
      RecruitDoData.value.push(row);
      getdata();
    } else {
      ElMessage.error(res.data.msg);
    }
  });
}
function EditSureForm() {
  proxy?.api.post
    .edit(RecruitEditform.value.id, RecruitEditform.value)
    .then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        ElMessage.success(res.data.msg);
        getdata();
      } else {
        ElMessage.error(res.data.msg);
      }
    });
  RecruitEditDialog.value = false;
}
function AddSureForm() {
  proxy?.api.post.add(RecruitCreateform.value).then((res) => {
    console.log(res);
    if (res.data.code === 200) {
      ElMessage.success(res.data.msg);
      getdata();
      RecruitDialog.value = false;
    } else {
      ElMessage.error(res.data.msg);
    }
  });
}
const options = [
  {
    value: "month",
    label: "元/月",
  },
  {
    value: "year",
    label: "元/年",
  },
];
//抽屉的数据
const indexdata = ref<PostType>({
  id: 0,
  jobtitle: "",
  department: "",
  city: {
    city: "",
    area: "",
    province: "",
  },
  recruitnum: 0,
  workexp: 0,
  education: 0,
  salaryrange: {
    type: false,
    max: 0,
    min: 0,
    isdisabled: false,
    unit: "",
  },
  agereq: {
    type: false,
    max: 0,
    min: 0,
    isdisabled: false,
  },
  urgent: 0,
  charge: "",
  chargeId: 0,
  interviewer: "",
  interviewerId: 0,
  state: 0,
  lastpost: 0,
});
//查看
function DrawerTrigger(row: PostType) {
  theDrawerTrigger.value = true;
  indexdata.value = row;
  console.log(indexdata.value);
}
function DrawerNoTrigger(row: PostType) {
  console.log(row);
  theDrawerTrigger.value = true;
  indexdata.value = row;
}
//招聘中分页
const RecruitDoDataPag = ref({
  page: 1,
  limit: 5,
  total: 6,
});
//停止招聘分页
const RecruitNoDataPag = ref({
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
const RecruitNoSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const RecruitNoCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

// 新建弹窗
const RecruitDialog = ref(false);
const RecruitCreateform = ref({
  id: 1,
  jobtitle: "",
  department: "",
  city: {
    city: "",
    area: "",
    province: "",
  },
  recruitnum: 0,
  workexp: 0,
  education: 0,
  salaryrange: {
    type: false,
    max: 0,
    min: 0,
    isdisabled: false,
    unit: "",
  },
  agereq: {
    type: false,
    max: 0,
    min: 0,
    isdisabled: false,
  },
  urgent: 0,
  charge: "",
  chargeId: 0,
  interviewer: "",
  interviewerId: 0,
  state: 0,
  lastpost: 0,
});
// 编辑弹窗
const RecruitEditDialog = ref(false);
const RecruitEditform = ref({
  id: 0,
  jobtitle: "",
  department: "",
  city: {
    city: "",
    area: "",
    province: "",
  },
  recruitnum: 0,
  workexp: 0,
  education: 0,
  salaryrange: {
    type: false,
    max: 0,
    min: 0,
    isdisabled: false,
    unit: "",
  },
  agereq: {
    type: false,
    max: 0,
    min: 0,
    isdisabled: false,
  },
  urgent: 0,
  charge: "",
  chargeId: 0,
  interviewer: "",
  interviewerId: 0,
  state: 0,
  lastpost: 0,
});
function RecruitindexEdit(data: PostType) {
  RecruitEditDialog.value = true;
  RecruitEditform.value = data;
}
//用人部门数据
const thedepartment = [
  {
    value: "软件工程",
    label: "软件工程",
    children: [
      {
        value: "后端开发",
        label: "后端开发",
        children: [
          {
            value: "java工程师",
            label: "java工程师",
          },
          {
            value: "c++工程师",
            label: "c++工程师",
          },
          {
            value: "PHP工程师",
            label: "PHP工程师",
          },
          {
            value: "Python",
            label: "爬虫开发工程师",
          },
        ],
      },
    ],
  },
];
//负责人数据
function TheinterviewerSelect() {
  SelectVisible.value = true;
}
function chargeTheinterviewerSelect() {
  chargeSelectVisible.value = true;
}
function EditTheinterviewerSelect() {
  EditSelectVisible.value = true;
}
function EditchargeTheinterviewerSelect() {
  EditchargeSelectVisible.value = true;
}
const SelectVisible = ref(false);
const chargeSelectVisible = ref(false);
const EditSelectVisible = ref(false);
const EditchargeSelectVisible = ref(false);
</script>
<style scoped>
.el-card {
  width: 100%;
}

.tabbox {
  border: 1px solid #e5e5e5;
}
</style>
