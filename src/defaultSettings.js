/**
 * 项目默认配置项
 * primaryColor - 默认主题色
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * autoHideHeader - 向下滚动时，隐藏 Header : boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  primaryColor: '#1890FF', // primary color of ant design
  navTheme: 'dark', // theme for nav menu
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fixed', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  fixSiderbar: true, // sticky siderbar
  autoHideHeader: true, //  auto hide header
  colorWeak: false,
  // vue-ls options
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  iconfont: '//at.alicdn.com/t/font_828723_aer2onrxb9c.js',
  pagination: {
    defaultCurrent: 1, // 默认的当前页数
    defaultPageSize: 10, // 默认的每页条数
    current: 1, // 初始页
    pageSize: 10, // 每一页多少条
    showQuickJumper: true, // 是否可以快速跳转至某页
    total: 10, // 数据总数
    showSizeChanger: true, // 是否可以改变 pageSize
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` // 用于显示数据总量和当前数据顺序
  }
}
