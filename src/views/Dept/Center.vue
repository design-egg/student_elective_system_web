<template>
  <page-layout>
    <operation
      @add="add"
      @del="del('d_id',DEPT)"
      @submit="handleSubmit"
      :form="form"
      :disabledDel="disabledDel"
    >
      <a-form-item>
        <a-input
          type="number"
          size="large"
          placeholder="输入院系编号"
          v-decorator="[ 'd_id',{ initialValue: '' } ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          placeholder="输入院系名称关键词"
          v-decorator="[ 'd_name',{ initialValue: '' } ]"
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
      editID="d_id"
      :isEdit="isEdit"
      :isDel="isDel"
      :pagination="pagination"
      @handlerDel="handlerDel"
      @handlerEdit="handlerEdit($event, DEPT)"
      @handlePagination="handlePagination($event, DEPT)"
    ></s-table>

    <a-modal
      :title="title"
      :visible="showAddModal"
      @ok="handleOk($event, DEPT)"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form
        ref="infoForm"
        id="infoForm"
        :form="infoForm"
      >
        <a-form-item
          label="院系编号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="number"
            autocomplete="off"
            placeholder="请输入院系编号"
            v-decorator="[
              'd_id',
                {
                  rules: [
                    { required: true, message: '请输入院系编号', trigger: 'blur' },
                    { min: 1, max: 20, message: '院系编号长度 1~20' },
                    { validator: validateID }
                  ]
                }
              ]"
            @change="handleIdBlur($event, DEPT)"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="院系名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            size="large"
            type="text"
            autocomplete="off"
            placeholder="请输入院系名称"
            v-decorator="[
              'd_name',
                {
                  rules: [{ required: true, message: '请输入院系名称', trigger: 'blur' }, { min: 2, max: 20, message: '院系名称长度 2~20'}]
                }
              ]"
            :disabled="addInfoDisabled"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="院系简介"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea
            size="large"
            placeholder="请输入院系简介"
            :rows="4"
            autocomplete="off"
            v-decorator="[
              'd_info',
                {
                  rules: [{ required: false, message: '请输入院系简介', trigger: 'blur' }, { min: 0, max: 200, message: '简介最长 200 个字符'}],
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
import { DEPT } from '@/api/url'
import centerMixin from '@/mixin/centerMixin'

export default {
  name: 'DeptCenter',
  mixins: [centerMixin],
  data () {
    return {
      columns,
      DEPT,
      tableSlot: ['d_name', 'd_info'],
      title: '添加一个院系',
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getInfo({
      url: DEPT
    })
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'DeptCenter') {
          this.getInfo({
            url: DEPT
          })
        }
      },
      deep: true
    }
  },
  methods: {
    handleSubmit (e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getInfo({
            url: DEPT,
            name: values.d_name
          })

          if (values.d_id) {
            this.getInfoById({
              url: DEPT,
              id: values.d_id
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
