<template>
  <div>
    <div class="mb15">
      <a-form
        layout="inline"
        @submit="handleSubmit"
        :form="form"
      >
        <slot></slot>
      </a-form>
    </div>
    <div
      class="mb15"
      v-if="showAdd"
    >
      <a-button
        size="large"
        class="mr15"
        @click="add"
        :disabled="disabledAdd"
      >新增</a-button>
      <a-popconfirm
        :title="delTitle"
        @confirm="del"
        placement="right"
      >
        <a-button
          size="large"
          type="danger"
          :disabled="disabledDel"
        >删除选中项</a-button>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Operation',
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabledAdd: {
      type: Boolean,
      default: false
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    disabledDel: {
      type: Boolean,
      default: true
    },
    delTitle: {
      type: String,
      default: 'Sure to delete?'
    }
  },
  methods: {
    add () {
      this.$emit('add')
    },
    del () {
      this.$emit('del')
    },
    handleSubmit () {
      this.$emit('submit')
    }
  }
}
</script>
