<template>
  <router-link :to="`/device/${device.id}`" class="text-decoration-none d-block h-100">
    <div class="ch-card p-3 h-100" style="cursor:pointer;">
      <div class="d-flex align-items-start gap-3 mb-3">
        <div class="device-img-wrap" style="width:56px;height:56px;">
          <img v-if="!imageFailed" :src="device.img" :alt="device.name" @error="onImgErr" />
          <div v-else class="device-img-fallback"><i class="bi bi-phone"></i></div>
        </div>
        <div class="flex-grow-1 overflow-hidden">
          <div style="font-weight:600;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            {{ device.name }}
          </div>
          <div style="font-family:var(--mono);font-size:0.68rem;color:var(--accent);margin:2px 0;">
            {{ device.codename }}
          </div>
          <div style="font-size:0.76rem;color:var(--text-secondary);">{{ device.chip }}</div>
        </div>
      </div>

      <!-- Content badges -->
      <div class="d-flex flex-wrap gap-2">
        <span v-if="device.roms.length" class="ch-badge stable" style="white-space:nowrap;">
          <i class="bi bi-android2 me-1"></i>{{ device.roms.length }} ROM{{ device.roms.length > 1 ? 's' : '' }}
        </span>
        <span v-if="device.recoveries.length" class="ch-badge beta" style="white-space:nowrap;">
          <i class="bi bi-arrow-counterclockwise me-1"></i>Recovery
        </span>
        <span v-if="device.gcams.length" class="ch-badge recommended" style="white-space:nowrap;">
          <i class="bi bi-camera me-1"></i>GCam
        </span>
        <span v-if="device.kernels.length" class="ch-badge" style="background:rgba(99,102,241,0.15);color:#818cf8;white-space:nowrap;">
          <i class="bi bi-cpu me-1"></i>Kernel
        </span>
        <span v-if="!device.roms.length && !device.recoveries.length && !device.gcams.length"
          style="font-size:0.7rem;color:var(--text-muted);">Em breve...</span>
      </div>

      <!-- Android version -->
      <div class="mt-2 pt-2" style="border-top:1px solid var(--border-color);">
        <span style="font-size:0.73rem;color:var(--text-muted);">
          <i class="bi bi-phone me-1"></i>{{ device.android }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ device: Object })

const imageFailed = ref(false)

function onImgErr() {
  imageFailed.value = true
}
</script>