<template>
  <div id="layout">
    <nav class="ch-nav px-3 px-md-4" style="height:58px;">
      <div class="nav-inner d-flex align-items-center h-100">
        <router-link to="/" class="text-decoration-none d-flex align-items-center gap-2">
          <div class="logo-icon d-flex align-items-center justify-content-center"
               style="width:32px;height:32px;background:var(--accent-dim);border:1px solid var(--border-hover);border-radius:8px;">
            <i class="bi bi-cpu" style="color:var(--accent);font-size:0.85rem;"></i>
          </div>
          <span style="font-family:var(--mono);font-size:0.9rem;font-weight:700;color:var(--text-primary);">
            CentralMotorolaBrasil
          </span>
        </router-link>
        <div class="d-none d-md-flex align-items-center gap-1 nav-center">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link-item"
            :class="{ active: $route.path === link.to || ($route.path.startsWith('/device') && link.to === '/devices') }"
          >
            <i :class="link.icon"></i>
            <span>{{ link.label }}</span>
          </router-link>
        </div>

        <div class="d-flex align-items-center gap-2 nav-right">
          <router-link to="/settings" class="icon-btn" :title="t('settings')">
            <i class="bi bi-gear"></i>
          </router-link>
        </div>
      </div>
    </nav>

    <div class="mobile-nav d-flex d-md-none">
      <router-link v-for="link in navLinks" :key="link.to" :to="link.to"
        class="mobile-nav-item"
        :class="{ active: $route.path === link.to || ($route.path.startsWith('/device') && link.to === '/devices') }">
        <i :class="link.icon"></i>
        <span>{{ link.label }}</span>
      </router-link>
      <router-link to="/settings" class="mobile-nav-item" :class="{ active: $route.path === '/settings' }">
        <i class="bi bi-gear"></i>
        <span>{{ t('navConfig') }}</span>
      </router-link>
    </div>

    <main style="padding-bottom:80px;" class="pb-md-0">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from './utils/i18n.js'
import { devices } from './data/devices/index.js'

const { t } = useI18n()
const route = useRoute()
const appName = 'CentralMotorolaBrasil'

const navLinks = computed(() => [
  { to: '/', label: t('navHome'), icon: 'bi bi-house' },
  { to: '/devices', label: t('navDevices'), icon: 'bi bi-phone' },
])

watchEffect(() => {
  let pageLabel = t('navHome')

  if (route.path === '/devices') {
    pageLabel = t('navDevices')
  } else if (route.path === '/settings') {
    pageLabel = t('settings')
  } else if (route.path.startsWith('/device/')) {
    const device = devices.find(d => d.id === route.params.id)
    pageLabel = device?.name || t('deviceNotFound')
  }

  document.title = `${appName} - ${pageLabel}`
})
</script>

<style scoped>
.nav-inner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.nav-right { margin-left: auto; }
.nav-link-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 9px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: background 0.2s, color 0.2s;
}
.nav-link-item:hover, .nav-link-item.active {
  background: var(--accent-dim);
  color: var(--accent);
}
.icon-btn {
  width: 36px; height: 36px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s;
}
.icon-btn:hover { border-color: var(--border-hover); color: var(--accent); }
.mobile-nav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: rgba(10, 15, 26, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border-color);
  z-index: 100;
  padding: 4px 0 8px;
}
.mobile-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 4px;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.7rem;
  transition: color 0.2s;
}
.mobile-nav-item i { font-size: 1.2rem; }
.mobile-nav-item.active { color: var(--accent); }
</style>