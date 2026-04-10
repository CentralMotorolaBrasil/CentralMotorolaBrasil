<template>
  <div class="home-page">
    <div class="container-lg px-3 px-md-4 py-5" style="max-width:1100px;margin:0 auto;">

      <!-- Hero -->
      <div class="text-center mb-5 fade-up">
        <div class="d-inline-flex align-items-center gap-2 mb-4"
          style="background:var(--accent-dim);border:1px solid var(--border-hover);border-radius:100px;padding:6px 16px;">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);display:inline-block;animation:glowPulse 2s infinite;"></span>
          <span style="font-family:var(--mono);font-size:0.7rem;color:var(--accent);">v1.0 · Site estável</span>
        </div>

        <h1 style="font-size:clamp(2rem,5vw,3.2rem);font-weight:700;letter-spacing:-0.03em;line-height:1.1;margin-bottom:16px;">
          Tudo para seu<br>
          <span class="gradient-text">dispositivo Motorola</span>
        </h1>
        <p style="color:var(--text-secondary);font-size:1rem;max-width:440px;margin:0 auto 32px;">
          ROMs customizadas, recoverys, GCams, kernels e tutoriais organizados por dispositivo.
        </p>

        <!-- Search bar -->
        <div class="ch-search-wrap mx-auto mb-4" style="max-width:520px;">
          <i class="bi bi-search ch-search-icon"></i>
          <input class="ch-search" type="text" placeholder="Buscar dispositivo, ROM, tutorial..."
            v-model="searchQuery" @keyup.enter="goSearch" />
        </div>

        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <router-link to="/devices" class="btn-accent btn d-flex align-items-center gap-2">
            <i class="bi bi-phone"></i> Explorar Dispositivos
          </router-link>
          <button class="btn-ghost btn d-flex align-items-center gap-2" @click="goSearch">
            <i class="bi bi-search"></i> Buscar
          </button>
        </div>
      </div>

      <!-- Stats row -->
      <div class="row g-3 mb-5">
        <div class="col-6 col-md-3 fade-up fade-up-1" v-for="stat in stats" :key="stat.label">
          <div class="ch-card p-3 text-center">
            <div style="font-family:var(--mono);font-size:1.6rem;font-weight:700;color:var(--accent);">{{ stat.value }}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Quick categories -->
      <div class="mb-5 fade-up fade-up-2">
        <p class="section-tag">Navegação Rápida</p>
        <h2 style="font-size:1.3rem;font-weight:600;margin-bottom:20px;">Categorias de Conteúdo</h2>
        <div class="row g-3">
          <div class="col-6 col-md-3" v-for="cat in quickCategories" :key="cat.label">
            <router-link :to="cat.to" class="text-decoration-none">
              <div class="ch-card p-4 text-center h-100" style="cursor:pointer;">
                <div class="mb-3" style="width:52px;height:52px;border-radius:14px;background:var(--accent-dim);display:flex;align-items:center;justify-content:center;margin:0 auto;">
                  <i :class="cat.icon" style="color:var(--accent);font-size:1.4rem;"></i>
                </div>
                <div style="font-weight:600;font-size:0.95rem;margin-bottom:6px;">{{ cat.label }}</div>
                <div style="font-size:0.78rem;color:var(--text-secondary);">{{ cat.desc }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Featured devices -->
      <div class="fade-up fade-up-3">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div>
            <p class="section-tag mb-0">Em destaque</p>
            <h2 style="font-size:1.3rem;font-weight:600;">Dispositivos Populares</h2>
          </div>
          <router-link to="/devices" class="btn-ghost btn d-flex align-items-center gap-2" style="font-size:0.85rem;padding:7px 14px;">
            Ver todos <i class="bi bi-arrow-right"></i>
          </router-link>
        </div>

        <div class="row g-3">
          <div class="col-12 col-md-6 col-lg-4" v-for="device in featuredDevices" :key="device.id">
            <router-link :to="`/device/${device.id}`" class="text-decoration-none">
              <div class="ch-card p-3 d-flex align-items-center gap-3" style="cursor:pointer;">
                <div class="device-img-wrap">
                  <img :src="device.img" :alt="device.name" @error="onImgErr" />
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <div style="font-weight:600;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ device.name }}</div>
                  <div style="font-family:var(--mono);font-size:0.7rem;color:var(--accent);margin:2px 0;">{{ device.codename }}</div>
                  <div style="font-size:0.78rem;color:var(--text-secondary);">{{ device.chip }}</div>
                </div>
                <div class="d-flex flex-column align-items-end gap-1">
                  <span v-if="device.roms.length" class="ch-badge stable">{{ device.roms.length }} ROMs</span>
                  <span v-if="device.gcams.length" class="ch-badge recommended">GCam</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { devices } from '../data/devices.js'

const router = useRouter()
const searchQuery = ref('')

function goSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/devices', query: { q: searchQuery.value.trim() } })
  } else {
    router.push('/devices')
  }
}

function onImgErr(e) {
  e.target.style.display = 'none'
  e.target.parentElement.innerHTML = '<div class="device-img-fallback"><i class="bi bi-phone"></i></div>'
}

const stats = [
  { value: `${devices.length}+`, label: 'Dispositivos' },
  { value: `${devices.reduce((a, d) => a + d.roms.length, 0)}+`, label: 'ROMs' },
  { value: `${devices.reduce((a, d) => a + d.recoveries.length, 0)}+`, label: 'Recoveries' },
  { value: `${devices.reduce((a, d) => a + d.gcams.length, 0)}+`, label: 'GCams' },
]

const quickCategories = [
  { label: 'Dispositivos', icon: 'bi bi-phone', desc: 'Lista completa de modelos', to: '/devices' },
  { label: 'ROMs', icon: 'bi bi-android2', desc: 'Sistemas customizados', to: '/devices' },
  { label: 'Recoveries', icon: 'bi bi-arrow-counterclockwise', desc: 'TWRP, OrangeFox e mais', to: '/devices' },
  { label: 'Configurações', icon: 'bi bi-sliders', desc: 'Personalizar interface', to: '/settings' },
]

const featuredDevices = devices.filter(d => d.roms.length >= 2).slice(0, 6)
</script>
