<template>
  <div class="device-detail-page">
    <div class="container-lg px-3 px-md-4 py-4" style="max-width:1100px;margin:0 auto;">
      <div v-if="!device" class="empty-state">
        <i class="bi bi-exclamation-circle"></i>
        <p>{{ t('deviceNotFound') }}</p>
        <router-link to="/devices" class="btn-accent btn mt-3">{{ t('btnBack') }}</router-link>
      </div>

      <template v-else>
        <router-link to="/devices" class="d-inline-flex align-items-center gap-2 mb-4 text-decoration-none fade-up"
          style="color:var(--text-secondary);font-size:0.875rem;transition:color 0.2s;"
          @mouseenter="e=>e.target.style.color='var(--accent)'"
          @mouseleave="e=>e.target.style.color='var(--text-secondary)'">
          <i class="bi bi-arrow-left"></i> {{ t('backToDevices') }}
        </router-link>

        <div class="ch-card p-4 mb-4 fade-up">
          <div class="row align-items-center g-3">
            <div class="col-auto">
              <div class="device-img-wrap" style="width:88px;height:88px;border-radius:16px;">
                <img :src="device.img" :alt="device.name" @error="onImgErr" />
              </div>
            </div>
            <div class="col">
              <p class="section-tag mb-1">{{ categoryLabel }}</p>
              <h1 style="font-size:1.6rem;font-weight:700;margin-bottom:4px;">{{ device.name }}</h1>
              <div class="d-flex flex-wrap align-items-center gap-3">
                <span style="font-family:var(--mono);font-size:0.78rem;color:var(--accent);">{{ device.codename }}</span>
                <span style="font-size:0.82rem;color:var(--text-secondary);">
                  <i class="bi bi-cpu me-1"></i>{{ device.chip }}
                </span>
                <span style="font-size:0.82rem;color:var(--text-secondary);">
                  <i class="bi bi-phone me-1"></i>{{ device.android }}
                </span>
              </div>
            </div>
            <div class="col-auto d-none d-md-flex gap-3">
              <div v-for="s in summary" :key="s.label" class="text-center">
                <div style="font-family:var(--mono);font-size:1.3rem;font-weight:700;color:var(--accent);">{{ s.count }}</div>
                <div style="font-size:0.72rem;color:var(--text-secondary);">{{ s.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="ch-tabs mb-4 fade-up fade-up-1" style="overflow-x:auto;">
          <button v-for="tab in tabs" :key="tab.id"
            class="ch-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id">
            <i :class="tab.icon"></i> {{ tab.label }}
            <span v-if="tab.count > 0" style="background:var(--accent-dim);color:var(--accent);border-radius:100px;padding:1px 7px;font-size:0.65rem;font-family:var(--mono);">
              {{ tab.count }}
            </span>
          </button>
        </div>

        <div class="fade-up fade-up-2">
          <!-- ROMs -->
          <div v-if="activeTab === 'roms'">
            <div v-if="device.roms.length === 0" class="empty-state">
              <i class="bi bi-android2"></i>
              <p>{{ t('noRoms') }}</p>
            </div>
            <div v-else class="d-flex flex-column gap-3">
              <div v-for="rom in device.roms" :key="rom.name" class="dl-row">
                <div class="row align-items-center g-2">
                  <div class="col">
                    <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                      <span style="font-weight:600;font-size:0.95rem;">{{ rom.name }}</span>
                      <span :class="['ch-badge', rom.status]">{{ rom.status }}</span>
                    </div>
                    <div class="d-flex flex-wrap gap-3" style="font-size:0.78rem;color:var(--text-secondary);">
                      <span><i class="bi bi-android2 me-1"></i>{{ rom.android }}</span>
                      <span><i class="bi bi-person me-1"></i>{{ rom.author }}</span>
                      <span><i class="bi bi-calendar3 me-1"></i>{{ rom.date }}</span>
                      <span><i class="bi bi-hdd me-1"></i>{{ rom.size }}</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <a :href="rom.link" class="btn-accent btn d-flex align-items-center gap-2" style="font-size:0.85rem;padding:8px 18px;">
                      <i class="bi bi-download"></i> {{ t('btnDownload') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'recoveries'">
            <div v-if="device.recoveries.length === 0" class="empty-state">
              <i class="bi bi-arrow-counterclockwise"></i>
              <p>{{ t('noRecoveries') }}</p>
            </div>
            <div v-else class="d-flex flex-column gap-3">
              <div v-for="rec in device.recoveries" :key="rec.name" class="dl-row">
                <div class="row align-items-center g-2">
                  <div class="col">
                    <div class="mb-1" style="font-weight:600;font-size:0.95rem;">{{ rec.name }} <span class="mono" style="font-size:0.75rem;color:var(--text-muted);">{{ rec.version }}</span></div>
                    <div class="d-flex flex-wrap gap-3" style="font-size:0.78rem;color:var(--text-secondary);">
                      <span><i class="bi bi-person me-1"></i>{{ rec.author }}</span>
                      <span><i class="bi bi-calendar3 me-1"></i>{{ rec.date }}</span>
                      <span><i class="bi bi-hdd me-1"></i>{{ rec.size }}</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <a :href="rec.link" class="btn-accent btn d-flex align-items-center gap-2" style="font-size:0.85rem;padding:8px 18px;">
                      <i class="bi bi-download"></i> {{ t('btnDownload') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'gcams'">
            <div v-if="device.gcams.length === 0" class="empty-state">
              <i class="bi bi-camera"></i>
              <p>{{ t('noGcams') }}</p>
            </div>
            <div v-else class="d-flex flex-column gap-3">
              <div v-for="gcam in device.gcams" :key="gcam.name" class="dl-row">
                <div class="row align-items-center g-2">
                  <div class="col">
                    <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                      <span style="font-weight:600;font-size:0.95rem;">{{ gcam.name }}</span>
                      <span v-if="gcam.recommended" class="ch-badge recommended">{{ t('recommended') }}</span>
                    </div>
                    <div class="d-flex flex-wrap gap-3" style="font-size:0.78rem;color:var(--text-secondary);">
                      <span class="mono" style="color:var(--text-muted);">{{ gcam.version }}</span>
                      <span><i class="bi bi-person me-1"></i>{{ gcam.author }}</span>
                      <span><i class="bi bi-calendar3 me-1"></i>{{ gcam.date }}</span>
                      <span><i class="bi bi-hdd me-1"></i>{{ gcam.size }}</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <a :href="gcam.link" class="btn-accent btn d-flex align-items-center gap-2" style="font-size:0.85rem;padding:8px 18px;">
                      <i class="bi bi-download"></i> {{ t('btnDownload') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'kernels'">
            <div v-if="device.kernels.length === 0" class="empty-state">
              <i class="bi bi-cpu"></i>
              <p>{{ t('noKernels') }}</p>
            </div>
            <div v-else class="d-flex flex-column gap-3">
              <div v-for="kernel in device.kernels" :key="kernel.name" class="dl-row">
                <div class="row align-items-center g-2">
                  <div class="col">
                    <div class="mb-1" style="font-weight:600;font-size:0.95rem;">{{ kernel.name }} <span class="mono" style="font-size:0.75rem;color:var(--text-muted);">{{ kernel.version }}</span></div>
                    <div class="d-flex flex-wrap gap-3 mb-2" style="font-size:0.78rem;color:var(--text-secondary);">
                      <span><i class="bi bi-person me-1"></i>{{ kernel.author }}</span>
                      <span><i class="bi bi-calendar3 me-1"></i>{{ kernel.date }}</span>
                      <span><i class="bi bi-hdd me-1"></i>{{ kernel.size }}</span>
                    </div>
                    <div class="d-flex flex-wrap gap-2">
                      <span v-for="feat in kernel.features" :key="feat"
                        style="background:rgba(129,140,248,0.15);color:#818cf8;border-radius:6px;padding:2px 8px;font-size:0.68rem;font-family:var(--mono);">
                        {{ feat }}
                      </span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <a :href="kernel.link" class="btn-accent btn d-flex align-items-center gap-2" style="font-size:0.85rem;padding:8px 18px;">
                      <i class="bi bi-download"></i> {{ t('btnDownload') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { devices, categories } from '../data/devices.js'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
const route = useRoute()
const device = computed(() => devices.find(d => d.id === route.params.id))
const activeTab = ref('roms')

const categoryLabel = computed(() => {
  if (!device.value) return ''
  return categories.find(c => c.id === device.value.category)?.label || ''
})

const tabs = computed(() => {
  if (!device.value) return []
  return [
    { id: 'roms',       label: t('tabRoms'),       icon: 'bi bi-android2',              count: device.value.roms.length },
    { id: 'recoveries', label: t('tabRecoveries'), icon: 'bi bi-arrow-counterclockwise', count: device.value.recoveries.length },
    { id: 'gcams',      label: t('tabGcams'),      icon: 'bi bi-camera',                count: device.value.gcams.length },
    { id: 'kernels',    label: t('tabKernels'),    icon: 'bi bi-cpu',                   count: device.value.kernels.length },
  ]
})

const summary = computed(() => {
  if (!device.value) return []
  return [
    { count: device.value.roms.length,       label: t('tabRoms') },
    { count: device.value.recoveries.length, label: t('tabRecoveries') },
    { count: device.value.gcams.length,      label: t('tabGcams') },
    { count: device.value.kernels.length,    label: t('tabKernels') },
  ]
})

function onImgErr(e) {
  e.target.style.display = 'none'
  e.target.parentElement.innerHTML = '<div class="device-img-fallback" style="font-size:2rem;"><i class="bi bi-phone"></i></div>'
}
</script>