<template>
  <div class="device-detail-page">
    <div class="container-lg px-3 px-md-4 py-4" style="max-width:1100px;margin:0 auto;">
      <div v-if="!device" class="empty-state">
        <i class="bi bi-exclamation-circle"></i>
        <p>{{ t('deviceNotFound') }}</p>
        <router-link to="/devices" class="btn-accent btn mt-3">{{ t('btnBack') }}</router-link>
      </div>

      <template v-else>
        <router-link to="/devices" class="d-inline-flex align-items-center gap-2 mb-4 text-decoration-none fade-up detail-back-link"
          style="color:var(--text-secondary);font-size:0.875rem;transition:color 0.2s;">
          <i class="bi bi-arrow-left"></i> {{ t('backToDevices') }}
        </router-link>

        <div class="ch-card p-4 mb-4 fade-up">
          <div class="row align-items-center g-3">
            <div class="col-auto">
              <div class="device-img-wrap" style="width:88px;height:88px;border-radius:16px;">
                <img v-if="!deviceImageFailed" :src="device.img" :alt="device.name" @error="onImgErr" />
                <div v-else class="device-img-fallback" style="font-size:2rem;"><i class="bi bi-phone"></i></div>
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
                      <span :class="['ch-badge', rom.status]">{{ statusLabel(rom.status) }}</span>
                      <span v-if="rom.origin" :class="['ch-badge', 'origin-' + rom.origin]">
                        {{ rom.origin === 'official' ? t('badgeOfficial') : t('badgeUnofficial') }}
                      </span>
                    </div>
                    <div class="d-flex flex-wrap gap-3" style="font-size:0.78rem;color:var(--text-secondary);">
                      <span><i class="bi bi-android2 me-1"></i>{{ rom.android }}</span>
                      <span><i class="bi bi-person me-1"></i>{{ rom.author }}</span>
                      <span><i class="bi bi-calendar3 me-1"></i>{{ rom.date }}</span>
                      <span><i class="bi bi-hdd me-1"></i>{{ rom.size }}</span>
                    </div>
                  </div>
                  <div class="col-auto">

                    <!-- ROM com variantes → dropdown -->
                    <div v-if="rom.variants && rom.variants.length" class="variant-dropdown-wrap">
                      <button
                        class="btn-accent btn d-flex align-items-center gap-2"
                        style="font-size:0.85rem;padding:8px 18px;"
                        @click.stop="toggleVariant(rom.name)">
                        <i class="bi bi-download"></i>
                        {{ t('btnDownload') }}
                        <i class="bi ms-1"
                          :class="openVariant === rom.name ? 'bi-chevron-up' : 'bi-chevron-down'"
                          style="font-size:0.7rem;"></i>
                      </button>
                      <transition name="variant-drop">
                        <div v-if="openVariant === rom.name" class="variant-menu">
                          <a
                            v-for="v in rom.variants"
                            :key="v.label"
                            :href="v.link"
                            target="_blank"
                            rel="noopener"
                            class="variant-item"
                            @click="openVariant = null">
                            <i class="bi bi-download me-2" style="color:var(--accent);font-size:0.8rem;"></i>
                            {{ v.label }}
                          </a>
                        </div>
                      </transition>
                    </div>

                    <!-- ROM sem variantes → botão direto -->
                    <a v-else
                      :href="rom.link"
                      target="_blank"
                      rel="noopener"
                      class="btn-accent btn d-flex align-items-center gap-2"
                      style="font-size:0.85rem;padding:8px 18px;">
                      <i class="bi bi-download"></i> {{ t('btnDownload') }}
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recoveries -->
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
                    <a :href="rec.link" target="_blank" rel="noopener" class="btn-accent btn d-flex align-items-center gap-2" style="font-size:0.85rem;padding:8px 18px;">
                      <i class="bi bi-download"></i> {{ t('btnDownload') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- GCams -->
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
                    <a :href="gcam.link" target="_blank" rel="noopener" class="btn-accent btn d-flex align-items-center gap-2" style="font-size:0.85rem;padding:8px 18px;">
                      <i class="bi bi-download"></i> {{ t('btnDownload') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Kernels -->
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
                    <a :href="kernel.link" target="_blank" rel="noopener" class="btn-accent btn d-flex align-items-center gap-2" style="font-size:0.85rem;padding:8px 18px;">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { devices, categories } from '../data/devices/index.js'
import { useI18n } from '../utils/i18n.js'

const { t, currentLanguage } = useI18n()
const route = useRoute()
const device = computed(() => devices.find(d => d.id === route.params.id))
const activeTab = ref('roms')
const openVariant = ref(null)
const deviceImageFailed = ref(false)

function toggleVariant(romName) {
  openVariant.value = openVariant.value === romName ? null : romName
}

function closeOnOutsideClick(e) {
  if (!e.target.closest('.variant-dropdown-wrap')) {
    openVariant.value = null
  }
}

onMounted(() => document.addEventListener('click', closeOnOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', closeOnOutsideClick))

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

const statusLabels = {
  stable:   { pt: 'Estável',   es: 'Estable',   en: 'Stable'   },
  estavel:  { pt: 'Estável',   es: 'Estable',   en: 'Stable'   },
  beta:     { pt: 'Beta',      es: 'Beta',       en: 'Beta'     },
  nightly:  { pt: 'Nightly',   es: 'Nightly',    en: 'Nightly'  },
  unstable: { pt: 'Instável',  es: 'Inestable',  en: 'Unstable' },
  instavel: { pt: 'Instável',  es: 'Inestable',  en: 'Unstable' },
}

function statusLabel(status) {
  return statusLabels[status]?.[currentLanguage.value] ?? status
}

function onImgErr(e) {
  deviceImageFailed.value = true
}
</script>

<style scoped>
.detail-back-link:hover {
  color: var(--accent);
}

.variant-dropdown-wrap {
  position: relative;
}

.variant-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  min-width: 220px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-hover);
  border-radius: 12px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.variant-item {
  display: flex;
  align-items: center;
  padding: 11px 16px;
  font-size: 0.85rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: background 0.15s;
  border-bottom: 1px solid var(--border-color);
}
.variant-item:last-child {
  border-bottom: none;
}
.variant-item:hover {
  background: var(--accent-dim);
  color: var(--accent);
}

.variant-drop-enter-active,
.variant-drop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: top right;
}
.variant-drop-enter-from,
.variant-drop-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}

/* Badge oficial — azul */
.ch-badge.origin-official {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

/* Badge unofficial — amarelo */
.ch-badge.origin-unofficial {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}
</style>