<template>
  <page-layout>
    <operation
      @add="add"
      @submit="handleSubmit"
      @del="del('c_id',COURSE)"
      :form="form"
      :disabledAdd="disabledAdd"
      :disabledDel="disabledDel"
    >
      <a-form-item>
        <a-input
          type="number"
          size="large"
          placeholder="输入课程编号"
          v-decorator="[ 'c_id',{ initialValue: '' } ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          placeholder="输入课程名称关键词"
          v-decorator="[ 'c_name',{ initialValue: '' } ]"
        />
      </a-form-item>
      <a-form-item>
        <a-tooltip placement="top">
          <template slot="title">注意！同时查询编号和名字，结果以编号的返回结果为准</template>
          <a-button
            size="large"
            htmlType="submit"
            type="primary"
            icon="search"
            @click.stop.prevent="handleSubmit"
          >查询</a-button>
        </a-tooltip>
      </a-form-item>
    </operation>

    <s-table
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :tableSlot="tableSlot"
      editID="c_id"
      :isEdit="isEdit"
      :isDel="isDel"
      :pagination="pagination"
      @handlerDel="handlerDel($event, COURSE)"
      @handlerEdit="handlerEdit($event, COURSE)"
      @handlePagination="handlePagination($event, COURSE)"
      isMore
      @showMore="showMore"
    ></s-table>

    <a-modal
      title="教师信息"
      :visible="showModal"
      :footer="null"
      @cancel="showModal=false"
    >
      <c-card
        :data="moreData"
        type="teacher"
        titleProp="t_name"
      ></c-card>
    </a-modal>

    <a-modal
      :title="title"
      :visible="showAddModal"
      @ok="handleOk($event, COURSE)"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form
        ref="infoForm"
        id="infoForm"
        :form="infoForm"
      >
        <a-form-item
          label="课程编号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="number"
            autocomplete="off"
            placeholder="请输入课程编号"
            v-decorator="[
              'c_id',
                {
                  rules: [
                    { required: true, message: '请输入课程编号', trigger: 'blur' },
                    { min: 1, max: 20, message: '课程编号长度 1~20' },
                    { validator: validateID }
                  ]
                }
              ]"
            @change="handleIdBlur($event, COURSE)"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="教师工号"
          v-if="roles==='ADMIN'"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-auto-complete
            size="large"
            @select="onSelect"
            @search="handleSearch"
            placeholder="输入教师名字来获取工号"
            autocomplete="off"
            :disabled="addInfoDisabled"
            optionLabelProp="value"
            v-decorator="[
              't_id',
                {
                  rules: [{ required: true, message: '请输入教师工号', trigger: 'blur' }, { min: 1, max: 20, message: '教师工号长度 1~20'}]
                }
              ]"
          >
            <template slot="dataSource">
              <a-select-option
                v-for="(item, index) in dataByName"
                :key="index"
                :value="item.t_id"
              >
                <div flex="main:between">
                  <span>{{ item.t_id }}</span>
                  <span>{{ item.t_name }}</span>
                </div>
              </a-select-option>
            </template>
          </a-auto-complete>
        </a-form-item>
        <a-form-item
          label="课程名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="text"
            autocomplete="off"
            placeholder="请输入课程名称"
            v-decorator="[
              'c_name',
                {
                  rules: [{ required: true, message: '请输入课程名称', trigger: 'blur' }, { min: 2, max: 20, message: '课程名称长度 2~20'}]
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="课程简介"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea
            size="large"
            placeholder="请输入课程简介"
            :rows="4"
            autocomplete="off"
            v-decorator="[
              'm_info',
                {
                  rules: [{ required: false, message: '请输入课程简介', trigger: 'blur' }, { min: 0, max: 200, message: '简介最长 200 个字符'}],
                  initialValue: ''
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-textarea>
        </a-form-item>
        <a-form-item
          label="课程学分"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number
            size="large"
            autocomplete="off"
            :min="0.5"
            :max="4.5"
            :step="0.5"
            v-decorator="[
              'credit',
                {
                   rules: [{ required: true, type: 'number', message: '必须为数字' }],
                  initialValue: 0.5
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-input-number>
        </a-form-item>
        <a-form-item
          label="可供选课人数"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number
            size="large"
            autocomplete="off"
            :min="0"
            :max="100"
            :step="1"
            v-decorator="[
              'count',
                {
                  rules: [{ required: true, type: 'number', message: '必须为数字' }],
                  initialValue: 10
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-layout>
</template>

<script>
import columns from './config.json'
import { COURSE, TEACHER } from '@/api/url'
import centerMixin from '@/mixin/centerMixin'

export default {
  name: 'CourseCenter',
  mixins: [centerMixin],
  data () {
    return {
      showModal: false,
      moreData: {},
      columns,
      COURSE,
      TEACHER,
      tableSlot: ['c_name', 'credit', 'count', 'c_info'],
      title: '添加一个课程',
      dataByName: [],
      disabledAdd: false,
      form: this.$form.createForm(this)
    }
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'CourseCenter') {
          this.getInfo({
            url: COURSE
          })
          this.setOperation()
        }
      },
      deep: true
    }
  },
  mounted () {
    this.getInfo({
      url: COURSE
    })
    this.setOperation()
  },
  methods: {
    showMore (val) {
      this.moreData = val
      this.showModal = true
    },
    handleSubmit (e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getInfo({
            url: COURSE,
            name: values.c_name
          })
          if (values.c_id) {
            this.getInfoById({
              url: COURSE,
              id: values.c_id
            })
          }
        } else {
          this.loading = false
          this.form.resetFields()
        }
      })
    },
    onSelect (value) {
      // console.log('onSelect', value)
    },
    handleSearch (value) {
      this.getInfoByName({
        url: TEACHER,
        name: value
      })
    }
  }
}
</script>
