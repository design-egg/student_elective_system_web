<template>
  <a-layout
    class="layout"
    :class="[device]"
    flex
  >
    <template v-if="isSideMenu()">
      <a-drawer
        v-if="isMobile()"
        :wrapClassName="'drawer-sider ' + navTheme"
        :closable="false"
        :visible="collapsed"
        placement="left"
        @close="() => this.collapsed = false"
      >
        <side-menu
          :menus="menus"
          :theme="navTheme"
          :collapsed="false"
          :collapsible="true"
          mode="inline"
          @menuSelect="menuSelect"
        ></side-menu>
      </a-drawer>
      <side-menu
        v-else
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :collapsible="true"
      ></side-menu>
    </template>
    <template v-else>
      <a-drawer
        v-if="isMobile()"
        :wrapClassName="'drawer-sider ' + navTheme"
        placement="left"
        @close="() => this.collapsed = false"
        :closable="false"
        :visible="collapsed"
      >
        <side-menu
          :menus="menus"
          :theme="navTheme"
          :collapsed="false"
          :collapsible="true"
          mode="inline"
          @menuSelect="menuSelect"
        ></side-menu>
      </a-drawer>
    </template>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: fixSiderbar && isDesktop() ? `${sidebarOpened ? 256 : 80}px` : '0' }"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content :style="{ margin: '24px 24px 0',  paddingTop: fixedHeader ? '64px' : '0' }">
        <slot></slot>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer style="padding: 0px">
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/Page/GlobalHeader'
import GlobalFooter from '@/components/Page/GlobalFooter'

import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin.js'
import { triggerWindowResizeEvent } from '@/utils/util'

export default {
  name: 'GlobalLayout',
  components: {
    SideMenu,
    GlobalHeader,
    GlobalFooter
  },
  mixins: [mixin, mixinDevice],
  data () {
    return {
      collapsed: false,
      menus: []
    }
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  computed: {
    ...mapState({
      // ?????????
      mainMenu: state => state.permission.addRouters
    })
  },
  mounted () {
    this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    menuSelect () {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    }
  }
}
</script>

<style lang="scss">
  body {
    // ???????????????????????????
    overflow-y: scroll;

    &.colorWeak {
      filter: invert(80%);
    }
  }

  .layout.ant-layout {
    height: 100%;
    min-height: 100vh;
    overflow-x: hidden;

    > div {
      height: 100%;
      min-height: 100vh;
    }

    &.mobile,
    &.tablet {
      .ant-layout-content {
        .content {
          margin: 24px 0 0;
        }
      }

      /**
             * ant-table-wrapper
             * ?????????????????????????????????????????????????????????????????????????????????????????????????????????
             */
      .ant-table-wrapper {
        .ant-table-content {
          overflow-y: auto;
        }

        .ant-table-body {
          min-width: 800px;
        }
      }

      .sidemenu {
        .ant-header-fixedHeader {
          &.ant-header-side-opened,
          &.ant-header-side-closed {
            width: 100%;
          }
        }
      }

      .topmenu {
        /* ????????? topmenu  ???????????????????????? */
        &.content-width-Fluid {
          .header-index-wide {
            margin-left: 0;
          }
        }
      }
    }

    &.ant-layout-has-sider {
      flex-direction: row;
    }

    .trigger {
      font-size: 20px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .topmenu {
      .ant-header-fixedHeader {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: 100%;
        transition: width 0.2s;

        &.ant-header-side-opened {
          width: 100%;
        }

        &.ant-header-side-closed {
          width: 100%;
        }
      }

      /* ????????? topmenu  ???????????????????????? */
      &.content-width-Fluid {
        .header-index-wide {
          max-width: unset;
          margin-left: 24px;
        }

        .page-header-index-wide {
          max-width: unset;
        }
      }
    }

    .sidemenu {
      .ant-header-fixedHeader {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: 100%;
        transition: width 0.2s;

        &.ant-header-side-opened {
          width: calc(100% - 256px);
        }

        &.ant-header-side-closed {
          width: calc(100% - 80px);
        }
      }
    }

    .header {
      height: 64px;
      padding: 0 12px 0 0;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      position: relative;
    }

    .header,
    .top-nav-header-index {
      .user-wrapper {
        float: right;
        height: 100%;

        .action {
          cursor: pointer;
          padding: 0 12px;
          display: inline-block;
          transition: all 0.3s;
          height: 100%;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }

          .avatar {
            margin: 20px 8px 20px 0;
            color: #1890ff;
            background: hsla(0, 0%, 100%, 0.85);
            vertical-align: middle;
          }

          .icon {
            font-size: 16px;
            padding: 4px;
          }
        }
      }

      &.dark {
        .user-wrapper {
          .action {
            color: rgba(255, 255, 255, 0.85);

            &:hover {
              background: rgba(255, 255, 255, 0.16);
            }
          }
        }
      }
    }

    &.mobile,
    &.tablet {
      .top-nav-header-index {
        .header-index-wide {
          .header-index-left {
            .trigger {
              color: rgba(255, 255, 255, 0.85);
              padding: 0 12px;
            }

            .logo.top-nav-header {
              text-align: center;
              width: 56px;
              line-height: 58px;
            }
          }
        }

        &.light {
          .header-index-wide {
            .header-index-left {
              .trigger {
                color: rgba(0, 0, 0, 0.65);
              }
            }
          }

          //
        }
      }
    }

    &.tablet {
      // overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
      .top-nav-header-index {
        .header-index-wide {
          .header-index-left {
            .logo > a {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }

    .top-nav-header-index {
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      position: relative;
      transition: background 0.3s, width 0.2s;

      .header-index-wide {
        max-width: 1200px;
        margin: auto;
        padding-left: 0;
        display: flex;
        height: 64px;

        .ant-menu.ant-menu-horizontal {
          border: none;
          height: 64px;
          line-height: 64px;
        }

        .header-index-left {
          flex: 1 1;
          display: flex;

          .logo.top-nav-header {
            width: 165px;
            height: 64px;
            position: relative;
            line-height: 64px;
            transition: all 0.3s;
            overflow: hidden;

            img {
              display: inline-block;
              vertical-align: middle;
              height: 32px;
            }

            h1 {
              color: #fff;
              display: inline-block;
              vertical-align: top;
              font-size: 16px;
              margin: 0 0 0 12px;
              font-weight: 400;
            }
          }
        }

        .header-index-right {
          float: right;
          height: 64px;
          overflow: hidden;
        }
      }

      &.light {
        background-color: #fff;

        .header-index-wide {
          .header-index-left {
            .logo {
              h1 {
                color: #002140;
              }
            }
          }
        }
      }
    }

    // ?????????
    .layout-content {
      margin: 24px 24px 0px;
      height: 100%;
      height: 64px;
      padding: 0 12px 0 0;
    }
  }

  .topmenu {
    .page-header-index-wide {
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  // drawer-sider ?????????
  .ant-drawer.drawer-sider {
    .sider {
      box-shadow: none;
    }

    &.dark {
      .ant-drawer-content {
        background-color: rgb(0, 21, 41);
      }
    }

    &.light {
      box-shadow: none;

      .ant-drawer-content {
        background-color: #fff;
      }
    }

    .ant-drawer-body {
      padding: 0;
    }
  }

  // ????????????
  .sider {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    position: relative;
    z-index: 10;

    &.ant-fixed-sidemenu {
      position: fixed;
      height: 100%;
    }

    .logo {
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 24px;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      background: #002140;
      overflow: hidden;

      img,
      h1 {
        display: inline-block;
        vertical-align: middle;
      }

      img {
        height: 32px;
      }

      h1 {
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont,
          "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
          "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: 600;
      }
    }

    &.light {
      background-color: #fff;
      box-shadow: 2px 0px 8px 0px rgba(29, 35, 41, 0.05);

      .logo {
        background: #fff;
        box-shadow: 1px 1px 0px 0px #e8e8e8;

        h1 {
          color: unset;
        }
      }

      .ant-menu-light {
        border-right-color: transparent;
      }
    }
  }

  // ?????????????????????
  .user-dropdown-menu-wrapper.ant-dropdown-menu {
    padding: 4px 0;

    .ant-dropdown-menu-item {
      width: 160px;
    }

    .ant-dropdown-menu-item > .anticon:first-child,
    .ant-dropdown-menu-item > a > .anticon:first-child,
    .ant-dropdown-menu-submenu-title
      > .anticon:first-child
      .ant-dropdown-menu-submenu-title
      > a
      > .anticon:first-child {
      min-width: 12px;
      margin-right: 8px;
    }
  }

  // ???????????? ??????
  .table-alert {
    margin-bottom: 16px;
  }

  .table-page-search-wrapper {
    .ant-form-inline {
      .ant-form-item {
        display: flex;
        margin-bottom: 24px;
        margin-right: 0;

        .ant-form-item-control-wrapper {
          flex: 1 1;
          display: inline-block;
          vertical-align: middle;
        }

        > .ant-form-item-label {
          line-height: 32px;
          padding-right: 8px;
          width: auto;
        }

        .ant-form-item-control {
          height: 32px;
          line-height: 32px;
        }
      }
    }

    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
  }

  .content {
    .table-operator {
      margin-bottom: 18px;

      button {
        margin-right: 8px;
      }
    }
  }
</style>
