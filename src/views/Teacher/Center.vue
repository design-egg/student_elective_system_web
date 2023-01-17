<template>
  <page-layout>
    <operation
      @add="add"
      @del="del('t_id',TEACHER)"
      @submit="handleSubmit"
      :form="form"
      :disabledDel="disabledDel"
    >
      <a-form-item>
        <a-input
          type="number"
          size="large"
          placeholder="输入教师工号"
          v-decorator="[ 't_id',{ initialValue: '' } ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          placeholder="输入教师姓名关键词"
          v-decorator="[ 't_name',{ initialValue: '' } ]"
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
      editID="t_id"
      :isEdit="isEdit"
      :isDel="isDel"
      :pagination="pagination"
      @handlerDel="handlerDel($event, TEACHER)"
      @handlerEdit="handlerEdit($event, TEACHER)"
      @handlePagination="handlePagination($event, TEACHER)"
    ></s-table>

    <a-modal
      :title="title"
      :visible="showAddModal"
      @ok="handleOk($event, TEACHER)"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form
        ref="infoForm"
        id="infoForm"
        :form="infoForm"
      >
        <a-form-item
          label="教师工号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="number"
            autocomplete="off"
            placeholder="请输入教师工号"
            v-decorator="[
              't_id',
                {
                  rules: [
                  { required: true, message: '请输入教师工号', trigger: 'blur' },
                  { min: 5, max: 20, message: '教师工号长度 5~20' },
                  { validator: validateID }
                ]
                }
              ]"
            @change="handleIdBlur($event, TEACHER)"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="教师名字"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="text"
            autocomplete="off"
            placeholder="请输入教师名字"
            v-decorator="[
              't_name',
                {
                  rules: [{ required: true, message: '请输入教师名字', trigger: 'blur' }, { min: 2, max: 20, message: '教师名字长度 2~20'}]
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="性别"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group
            :options="sex"
            v-decorator="[
              'sex', {
                rules: [{ required: true, message: '请选择性别', trigger: 'blur' } ],
                initialValue: '女'
              }
            ]"
            :disabled="addInfoDisabled"
          />
        </a-form-item>
        <a-form-item
          label="职称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select
            size="large"
            autocomplete="off"
            :disabled="addInfoDisabled"
            v-decorator="[
              'job', {
                 rules: [{ required: true, message: '请选择职称', trigger: 'blur' } ],
                initialValue: '讲师'
              }
            ]"
          >
            <a-select-option
              v-for="(item, index) in jobs"
              :key="index"
              :value="item"
            >{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="可供开课人数"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number
            size="large"
            autocomplete="off"
            placeholder="请输入可供开课人数"
            :min="0"
            :max="100"
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
        <a-form-item
          label="联系电话"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="text"
            autocomplete="off"
            placeholder="请输入联系电话"
            v-decorator="[
              'phone',
                {
                  initialValue: ''
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-layout>
</template>

<script>
import columns from './config.json'
import { TEACHER } from '@/api/url'
import centerMixin from '@/mixin/centerMixin'

export default {
  name: 'TeacherCenter',
  mixins: [centerMixin],
  data () {
    return {
      columns,
      TEACHER,
      tableSlot: ['t_name', 'phone', 'count'],
      title: '添加一位教师',
      sex: ['男', '女'],
      jobs: ['讲师', '副教授', '教授'],
      form: this.$form.createForm(this)
    }
  },
  watch: {
    $route: {
      handler (val) {
        this.getInfo({
          url: TEACHER
        })
      },
      deep: true
    }
  },
  mounted () {
    this.getInfo({
      url: TEACHER
    })
  },
  methods: {
    handleSubmit (e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getInfo({
            url: TEACHER,
            name: values.t_name
          })
          if (values.t_id) {
            this.getInfoById({
              url: TEACHER,
              id: values.t_id
            })
          }
        } else {
          this.loading = false
          this.form.resetFields()
        }
      })
    }
  }
}
</script>
