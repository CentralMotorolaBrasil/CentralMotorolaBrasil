<template>
  <div class="devices-page">
    <div class="container-lg px-3 px-md-4 py-4" style="max-width:1100px;margin:0 auto;">
      <div class="mb-4 fade-up">
        <p class="section-tag">{{ t('libraryTag') }}</p>
        <h1 style="font-size:1.8rem;font-weight:700;letter-spacing:-0.02em;">{{ t('devicesTitle') }}</h1>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:4px;">
          {{ filteredDevices.length }} {{ t('devicesFound') }}
        </p>
      </div>

      <div class="ch-search-wrap mb-4 fade-up fade-up-1" style="max-width:480px;">
        <i class="bi bi-search ch-search-icon"></i>
        <input class="ch-search" type="text" :placeholder="t('searchDevicePlaceholder')"
          v-model="search" />
      </div>

      <div class="d-flex gap-2 mb-4 flex-wrap fade-up fade-up-1">
        <button class="cat-pill" :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">
          <i class="bi bi-grid-3x3-gap"></i> {{ t('filterAll') }}
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="cat-pill"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id">
          <i :class="cat.icon"></i> {{ cat.label }}
        </button>
      </div>

      <template v-if="!search && activeCategory === 'all'">
        <div v-for="cat in categories" :key="cat.id" class="mb-5 fade-up">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center gap-2">
              <div style="width:32px;height:32px;border-radius:9px;background:var(--accent-dim);display:flex;align-items:center;justify-content:center;">
                <i :class="cat.icon" style="color:var(--accent);font-size:0.9rem;"></i>
              </div>
              <div>
                <div style="font-weight:600;font-size:1rem;">{{ cat.label }}</div>
                <div style="font-size:0.75rem;color:var(--text-secondary);">{{ cat.description }}</div>
              </div>
            </div>
            <button class="cat-pill" style="padding:5px 12px;font-size:0.78rem;" @click="activeCategory = cat.id">
              {{ t('viewAll') }} <i class="bi bi-arrow-right"></i>
            </button>
          </div>
          <div class="row g-3">
            <div class="col-12 col-sm-6 col-lg-4"
              v-for="device in categoryPreview[cat.id]"
              :key="device.id">
              <DeviceCard :device="device" />
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div v-if="filteredDevices.length === 0" class="empty-state">
          <i class="bi bi-search"></i>
          <p style="font-size:1rem;font-weight:500;">{{ t('noDeviceFound') }}</p>
          <p style="font-size:0.85rem;">{{ t('noDeviceFoundSub') }}</p>
        </div>
        <div class="row g-3" v-else>
          <div class="col-12 col-sm-6 col-lg-4"
            v-for="device in filteredDevices"
            :key="device.id">
            <DeviceCard :device="device" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { devices, categories } from '../data/devices/index.js'
import DeviceCard from '../components/DeviceCard.vue'
import { useI18n } from '../utils/i18n.js'

const { t } = useI18n()
const route = useRoute()
const search = ref(route.query.q || '')
const activeCategory = ref('all')

const devicesByCategoryMap = computed(() => {
  const byCategory = Object.create(null)
  for (const device of devices) {
    if (!byCategory[device.category]) byCategory[device.category] = []
    byCategory[device.category].push(device)
  }
  return byCategory
})

const categoryPreview = computed(() => {
  const preview = Object.create(null)
  for (const cat of categories) {
    preview[cat.id] = (devicesByCategoryMap.value[cat.id] || []).slice(0, 3)
  }
  return preview
})

const normalizedDevices = devices.map(device => ({
  device,
  category: device.category,
  searchKey: `${device.name} ${device.codename} ${device.chip}`.toLowerCase(),
}))

const filteredDevices = computed(() => {
  let list = normalizedDevices
  if (activeCategory.value !== 'all') {
    list = list.filter(d => d.category === activeCategory.value)
  }
  const normalizedSearch = search.value.trim().toLowerCase()
  if (normalizedSearch) {
    list = list.filter(d => d.searchKey.includes(normalizedSearch))
  }
  return list.map(d => d.device)
})
</script>