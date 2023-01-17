<template>
  <div class="logo">
    <img
      src="~@/assets/images/logo.svg"
      alt="logo"
    >
    <h1 v-if="showTitle">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '管理中心',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
