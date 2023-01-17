<template>
  <page-layout>
    <operation
      @add="add"
      @del="del('m_id',MAJOR)"
      @submit="handleSubmit"
      :form="form"
      :disabledDel="disabledDel"
    >
      <a-form-item>
        <a-input
          type="number"
          size="large"
          placeholder="输入专业编号"
          v-decorator="[ 'm_id',{ initialValue: '' } ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          placeholder="输入专业名称关键词"
          v-decorator="[ 'm_name',{ initialValue: '' } ]"
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
      @handlerDel="handlerDel"
      @handlerEdit="handlerEdit($event, MAJOR)"
      @handlePagination="handlePagination($event, MAJOR)"
      isMore
      @showMore="showMore"
    ></s-table>

    <a-modal
      title="专业所在院系信息"
      :visible="showModal"
      :footer="null"
      @cancel="showModal=false"
    >
      <c-card
        :data="moreData"
        type="dept"
        titleProp="d_name"
      ></c-card>
    </a-modal>

    <a-modal
      :title="title"
      :visible="showAddModal"
      @ok="handleOk($event, MAJOR)"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form
        ref="infoForm"
        id="infoForm"
        :form="infoForm"
      >
        <a-form-item
          label="专业编号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="number"
            autocomplete="off"
            placeholder="请输入专业编号"
            v-decorator="[
              'm_id',
                {
                  rules: [
                    { required: true, message: '请输入专业编号', trigger: 'blur' },
                    { min: 1, max: 20, message: '专业编号长度 1~20' },
                    { validator: validateID }
                  ]
                }
              ]"
            @change="handleIdBlur($event, MAJOR)"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="院系编号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-auto-complete
            size="large"
            @select="onSelect"
            @search="handleSearch"
            placeholder="输入院系名字来获取编号"
            autocomplete="off"
            :disabled="addInfoDisabled"
            optionLabelProp="value"
            v-decorator="[
              'd_id',
                {
                  rules: [{ required: true, message: '请输入院系编号', trigger: 'blur' }, { min: 1, max: 20, message: '院系编号长度 1~20'}]
                }
              ]"
          >
            <template slot="dataSource">
              <a-select-option
                v-for="(item, index) in dataByName"
                :key="index"
                :value="item.d_id"
              >
                <div flex="main:between">
                  <span>{{ item.d_id }}</span>
                  <span>{{ item.d_name }}</span>
                </div>
              </a-select-option>
            </template>
          </a-auto-complete>
        </a-form-item>
        <a-form-item
          label="专业名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="text"
            autocomplete="off"
            placeholder="请输入专业名称"
            v-decorator="[
              'm_name',
                {
                  rules: [{ required: true, message: '请输入专业名称', trigger: 'blur' }, { min: 2, max: 20, message: '专业名称长度 2~20'}]
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="专业简介"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea
            size="large"
            placeholder="请输入专业简介"
            :rows="4"
            autocomplete="off"
            v-decorator="[
              'm_info',
                {
                  rules: [{ required: false, message: '请输入专业简介', trigger: 'blur' }, { min: 0, max: 200, message: '简介最长 200 个字符'}],
                  initialValue: ''
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-layout>
</template>

<script>
import columns from './config.json'
import { MAJOR, DEPT } from '@/api/url'
import centerMixin from '@/mixin/centerMixin'

export default {
  name: 'MajorCenter',
  mixins: [centerMixin],
  data () {
    return {
      showModal: false,
      moreData: {},
      columns,
      MAJOR,
      DEPT,
      tableSlot: ['c_name', 'c_info'],
      title: '添加一个专业',
      dataByName: [],
      showOperation: true,
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getInfo({
      url: MAJOR
    })
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'MajorCenter') {
          this.getInfo({
            url: MAJOR
          })
          this.setOperation()
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
            url: MAJOR,
            name: values.m_name
          })
          if (values.m_id) {
            this.getInfoById({
              url: MAJOR,
              id: values.m_id
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
        url: DEPT,
        name: value
      })
    }
  }
}
</script>
