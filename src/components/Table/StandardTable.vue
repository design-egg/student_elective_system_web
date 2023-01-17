<template>
  <div>
    <a-table
      :rowSelection="rowSelection"
      :size="size"
      :loading="loading"
      :bordered="bordered"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      rowKey="id"
      align="center"
      :scroll="{ x: '100%' }"
      @change="handleTableChange"
    >
      <template
        v-for="(col, index) in tableSlot"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="index">
          <a-input
            size="large"
            v-if="record.editable&&col!=='count'&&col!=='credit'&&col!=='is_publish'&&col!=='score'&&col!=='second_score'"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record[editID], col)"
          />
          <a-input-number
            size="large"
            v-else-if="record.editable&&col==='count'"
            style="margin: -5px 0"
            :min="0"
            :max="100"
            :value="text"
            @change="e => handleChange(e, record[editID], col)"
          ></a-input-number>
          <a-input-number
            size="large"
            v-else-if="record.editable&&col==='credit'"
            style="margin: -5px 0"
            :min="0.5"
            :max="4.5"
            :step="0.5"
            :value="text"
            @change="e => handleChange(e, record[editID], col)"
          ></a-input-number>
          <a-input-number
            size="large"
            v-else-if="(record.editable&&col==='score') || (record.editable&&col==='second_score')"
            style="margin: -5px 0"
            :min="0"
            :max="100"
            :value="text"
            @change="e => handleChange(e, record[editID], col)"
          ></a-input-number>

          <a-select
            size="large"
            :value="text"
            v-else-if="record.editable&&col==='is_publish'"
            @change="e => handleChange(e, record[editID], col)"
          >
            <a-select-option value="未公布">未公布</a-select-option>
            <a-select-option value="已公布">已公布</a-select-option>
          </a-select>
          <template v-else>{{ text }}</template>
        </div>
      </template>

      <template
        slot="operation"
        slot-scope="text, record"
        v-if="isDel || isEdit"
      >
        <span v-if="record.editable">
          <a
            @click="() => onSave(record[editID])"
            style="color:#1890ff;"
            class="mr15"
          >保存</a>
          <a-popconfirm
            title="Sure to onCancel?"
            @confirm="() => onCancel(record[editID])"
          >
            <a style="color:#1890ff;">取消</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a
            @click="() => onEdit(record[editID])"
            style="color:#1890ff;"
            class="mr15"
            v-if="isEdit"
          >编辑</a>
          <a-popconfirm
            v-if="data.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record[editID])"
          >
            <a
              style="color:#1890ff;"
              v-if="isDel"
            >删除</a>
          </a-popconfirm>

          <a
            v-if="isMore"
            @click="() => onMore(record)"
            style="color:#1890ff;"
          >更多</a>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { format } from '@/utils/util'

export default {
  name: 'StandardTable',
  props: {
    size: {
      type: String,
      default: 'default',
      validator: value => {
        return ['default', 'middle', 'small'].indexOf(value) !== -1
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    bordered: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    tableSlot: {
      type: Array,
      default: () => {
        return []
      }
    },
    editID: {
      type: String,
      default: 'id'
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isDel: {
      type: Boolean,
      default: false
    },
    isMore: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showRowSelection: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        this.$emit('handlerDel', selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.$emit('handlerDel', selectedRows)
      }
    }

    return {
      rowSelection,
      dataSource: [],
      cacheData: []
    }
  },
  watch: {
    data: {
      handler (val) {
        this.dataSource = this.data
      },
      deep: true
    },
    showRowSelection (val) {
      // console.log(val)
      if (!val) this.rowSelection = null
    }
  },
  mounted () {
    if (!this.showRowSelection) this.rowSelection = null
    this.dataSource = this.data.map(item => ({ ...item }))
    this.cacheData = this.data.map(item => ({ ...item }))
  },
  methods: {
    formatTime (date) {
      return format(date)
    },
    handleTableChange (pagination) {
      this.$emit('handlePagination', pagination)
    },
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item[this.editID])[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
    },
    onDelete (key) {},
    onEdit (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item[this.editID])[0]
      if (target) {
        target.editable = true
        this.dataSource = newData
      }
    },
    onSave (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item[this.editID])[0]
      if (target) {
        delete target.editable
        this.dataSource = newData
        this.cacheData = newData.map(item => ({ ...item }))
        this.$emit('handlerEdit', target)
      }
    },
    onCancel (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item[this.editID])[0]
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item[this.editID])[0]
        )
        delete target.editable
        this.dataSource = newData
      }
    },
    onMore (val) {
      this.$emit('showMore', val)
    }
  }
}
</script>
<style lang="scss" scoped>
  .my-table {
    background-color: #7eb396;
  }
</style>
