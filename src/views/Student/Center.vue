<template>
  <page-layout>
    <operation
      @add="add"
      @del="del('s_id',STUDENT)"
      @submit="handleSubmit"
      :form="form"
      :showAdd="!(roles === 'TEACHER')"
      :disabledDel="disabledDel"
    >
      <a-form-item>
        <a-input
          type="number"
          size="large"
          placeholder="输入学生学号"
          v-decorator="[ 's_id',{ initialValue: '' } ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          placeholder="输入学生姓名关键词"
          v-decorator="[ 's_name',{ initialValue: '' } ]"
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
      editID="s_id"
      :isEdit="isEdit"
      :isDel="isDel"
      :pagination="pagination"
      @handlerDel="handlerDel($event, STUDENT)"
      @handlerEdit="handlerEdit($event, STUDENT)"
      @handlePagination="handlePagination($event, STUDENT)"
      isMore
      @showMore="showMore"
    ></s-table>

    <a-modal
      title="学生专业信息"
      :visible="showModal"
      :footer="null"
      @cancel="showModal=false"
    >
      <c-card
        :data="moreData"
        type="major"
        titleProp="m_name"
      ></c-card>
    </a-modal>

    <a-modal
      :title="title"
      :visible="showAddModal"
      @ok="handleOk($event, STUDENT)"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form
        ref="infoForm"
        id="infoForm"
        :form="infoForm"
      >
        <a-form-item
          label="学号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="number"
            autocomplete="off"
            placeholder="请输入学号"
            v-decorator="[
              's_id',
                {
                  rules: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                    { min: 5, max: 20, message: '学号长度 5~20' },
                    { validator: validateID }
                  ]
                }
              ]"
            @change="handleIdBlur($event, STUDENT)"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="专业编号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-auto-complete
            size="large"
            @select="onSelect"
            @search="handleSearch"
            placeholder="输入专业名字来获取编号"
            autocomplete="off"
            :disabled="addInfoDisabled"
            optionLabelProp="value"
            v-decorator="[
              'm_id',
                {
                  rules: [{ required: true, message: '请输入专业编号', trigger: 'blur' }, { min: 1, max: 20, message: '专业编号长度 1~20'}]
                }
              ]"
          >
            <template slot="dataSource">
              <a-select-option
                v-for="(item, index) in dataByName"
                :key="index"
                :value="item.m_id"
              >
                <div flex="main:between">
                  <span>{{ item.m_id }}</span>
                  <span>{{ item.m_name }}</span>
                </div>
              </a-select-option>
            </template>
          </a-auto-complete>
        </a-form-item>
        <a-form-item
          label="学生名字"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="text"
            autocomplete="off"
            placeholder="请输入学生名字"
            v-decorator="[
              's_name',
                {
                  rules: [{ required: true, message: '请输入学生名字', trigger: 'blur' }, { min: 2, max: 20, message: '学生名字长度 2~20'}]
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
import { STUDENT, MAJOR } from '@/api/url'
import centerMixin from '@/mixin/centerMixin'

export default {
  name: 'StudentCenter',
  mixins: [centerMixin],
  data () {
    return {
      showModal: false,
      moreData: {},
      columns,
      STUDENT,
      tableSlot: ['s_name', 'phone'],
      title: '添加一位学生',
      sex: ['男', '女'],
      dataByName: [],
      showOperation: true,
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getInfo({
      url: STUDENT
    })
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'StudentCenter') {
          this.getInfo({
            url: STUDENT
          })
        }
      },
      deep: true
    }
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
            url: STUDENT,
            name: values.s_name
          })
          if (values.s_id) {
            this.getInfoById({
              url: STUDENT,
              id: values.s_id
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
        url: MAJOR,
        name: value
      })
    }
  }
}
</script>
