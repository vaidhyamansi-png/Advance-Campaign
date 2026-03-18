<script setup>
  import johnprofile from '@images/thumbnails/john_profile.png'
import logout from '@images/thumbnails/logout_icon.png'
import moon from '@images/thumbnails/moon.png'
import sun from '@images/thumbnails/sun.png'
import {
  layoutConfig
} from '@layouts'
import {
  VerticalNavGroup,
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts/components'
import {
  useLayoutConfigStore
} from '@layouts/stores/config'
import {
  injectionKeyIsVerticalNavHovered
} from '@layouts/symbols'
import {
  ref
} from 'vue'
import {
  PerfectScrollbar
} from 'vue3-perfect-scrollbar'
import {
  VNodeRenderer
} from './VNodeRenderer'
  const props = defineProps({
    tag: {
      type: null,
      required: false,
      default: 'aside',
    },
    navItems: {
      type: null,
      required: true,
    },
    isOverlayNavActive: {
      type: Boolean,
      required: true,
    },
    toggleIsOverlayNavActive: {
      type: Function,
      required: true,
    },
  })
  const refNav = ref()
  const isHovered = useElementHover(refNav)
  provide(injectionKeyIsVerticalNavHovered, isHovered)
  const configStore = useLayoutConfigStore()
  const resolveNavItemComponent = item => {
    if ('heading' in item) return VerticalNavSectionTitle
    if ('children' in item) return VerticalNavGroup
    return VerticalNavLink
  }
  /*ℹ️ Close overlay side when route is changed
  Close overlay vertical nav when link is clicked
  */
  const route = useRoute()
  watch(() => route.name, () => {
    props.toggleIsOverlayNavActive(false)
  })
  const isVerticalNavScrolled = ref(false)
  const updateIsVerticalNavScrolled = val => isVerticalNavScrolled.value = val
  const handleNavScroll = evt => {
    isVerticalNavScrolled.value = evt.target.scrollTop > 0
  }
  const hideTitleAndIcon = configStore.isVerticalNavMini(isHovered)
  const theme = ref('light')
</script>
<template>
  <Component :is="props.tag" ref="refNav" data-allow-mismatch class="layout-vertical-nav" :class="[
      {
        'overlay-nav': configStore.isLessThanOverlayNavBreakpoint,
        'hovered': isHovered,
        'visible': isOverlayNavActive,
        'scrolled': isVerticalNavScrolled,
      },
    ]">
    <!-- 👉 Header -->
    <div class="nav-header">
      <slot name="nav-header">
        <RouterLink to="/" class="app-logo app-title-wrapper">
          <VNodeRenderer :nodes="layoutConfig.app.logo" />
          <Transition name="vertical-nav-app-title">
            <h1 v-show="!hideTitleAndIcon" class="app-logo-title"> Frontend Task </h1>
          </Transition>
        </RouterLink>
        <!-- 👉 Vertical nav actions -->
        <!-- Show toggle collapsible in >md and close button in <md -->
        <!-- <div class="header-action"><Component
            :is="layoutConfig.app.iconRenderer || 'div'"
            v-show="configStore.isVerticalNavCollapsed"
            class="d-none nav-unpin"
            :class="configStore.isVerticalNavCollapsed && 'd-lg-block'"
            v-bind="layoutConfig.icons.verticalNavUnPinned"
            @click="configStore.isVerticalNavCollapsed = !configStore.isVerticalNavCollapsed"
          /><Component
            :is="layoutConfig.app.iconRenderer || 'div'"
            v-show="!configStore.isVerticalNavCollapsed"
            class="d-none nav-pin"
            :class="!configStore.isVerticalNavCollapsed && 'd-lg-block'"
            v-bind="layoutConfig.icons.verticalNavPinned"
            @click="configStore.isVerticalNavCollapsed = !configStore.isVerticalNavCollapsed"
          /><Component
            :is="layoutConfig.app.iconRenderer || 'div'"
            class="d-lg-none"
            v-bind="layoutConfig.icons.close"
            @click="toggleIsOverlayNavActive(false)"
          /></div> -->
      </slot>
    </div>
    <slot name="before-nav-items">
      <div class="vertical-nav-items-shadow" />
    </slot>
    <slot name="nav-items" :update-is-vertical-nav-scrolled="updateIsVerticalNavScrolled">
      <PerfectScrollbar :key="String(configStore.isAppRTL)" tag="ul" class="nav-items" :options="{ wheelPropagation: false }" @ps-scroll-y="handleNavScroll">
        <Component :is="resolveNavItemComponent(item)" v-for="(item, index) in navItems" :key="index" :item="item" />
      </PerfectScrollbar>
    </slot>
    <div class="profile-card side_bar_bottom_side_wrap">
      <div class="profile_background_wrap">
        <!-- Profile Box -->
        <div class="profile-box">
          <div class="left">
            <div class="john_circle_outer_wrap">
              <img :src="johnprofile" class="" />
            </div>
            <div class="info">
              <h3>John Doe</h3>
              <p class="role">Admin</p>
            </div>
            <span class="status-dot"></span>
          </div>
          <div class="logout_outer_wrap">
            <img :src="logout" class="" />
          </div>
        </div>
        <!-- Email -->
        <p class="email-label">Email</p>
        <p class="email-value">johndoe@gmail.com</p>
      </div>
      <!-- Theme Switch -->
      <div class="theme-switch">
        <button :class="['option', theme === 'light' ? 'active' : '']" @click="theme = 'light'">
          <img :src="sun" class="" /> Light </button>
        <button :class="['option', theme === 'dark' ? 'active' : '']" @click="theme = 'dark'">
          <img :src="moon" class="" /> Dark </button>
      </div>
    </div>
    <slot name="after-nav-items" />
  </Component>
</template>
<style lang="scss">
  @use "@configured-variables"as variables;
  @use "@layouts/styles/mixins";

  // 👉 Vertical Nav
  .layout-vertical-nav {
    position: fixed;
    z-index: variables.$layout-vertical-nav-z-index;
    display: flex;
    flex-direction: column;
    block-size: 100%;
    inline-size: variables.$layout-vertical-nav-width;
    inset-block-start: 0;
    inset-inline-start: 0;
    transition: inline-size 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
    will-change: transform, inline-size;

    .nav-header {
      display: flex;
      align-items: center;

      .header-action {
        cursor: pointer;

        @at-root {
          #{variables.$selector-vertical-nav-mini} .nav-header .header-action {

            &.nav-pin,
            &.nav-unpin {
              display: none !important;
            }
          }
        }
      }
    }

    .app-title-wrapper {
      margin-inline-end: auto;
    }

    .nav-items {
      block-size: 100%;
      // ℹ️ We no loner needs this overflow styles as perfect scrollbar applies it
      // overflow-x: hidden;
      // // ℹ️ We used `overflow-y` instead of `overflow` to mitigate overflow x. Revert back if any issue found.
      // overflow-y: auto;
    }

    .nav-item-title {
      overflow: hidden;
      margin-inline-end: auto;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    // 👉 Collapsed
    .layout-vertical-nav-collapsed & {
      &:not(.hovered) {
        inline-size: variables.$layout-vertical-nav-collapsed-width;
      }
    }
  }

  // Small screen vertical nav transition
  @media (max-width: 1279px) {
    .layout-vertical-nav {
      &:not(.visible) {
        transform: translateX(-#{variables.$layout-vertical-nav-width});

        @include mixins.rtl {
          transform: translateX(variables.$layout-vertical-nav-width);
        }
      }

      transition: transform 0.25s ease-in-out;
    }
  }
</style>
<style scoped>
  .profile-card {
    width: 230px;
    padding: 14px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 14px rgb(0 0 0 / 8%);
    font-family: Inter, sans-serif;
  }

  /* Profile Top Box */
  .left {
    display: flex;
    align-items: center;
    position: relative;
  }

  /* User Image */
  /* Green Dot */
  .status-dot {
    width: 11px;
    height: 11px;
    background: #0bcf40;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    left: 32px;
    bottom: 2px;
  }
</style>
