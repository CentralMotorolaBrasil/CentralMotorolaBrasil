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

      <div class="d-flex gap-2 mb-4 flex-wrap align-items-center fade-up fade-up-1">
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
        <button type="button" class="btn btn-link btn-sm text-light ms-auto" style="display:flex;align-items:center;justify-content:center;padding:0.4rem 0.5rem;border:none;background:transparent;"
          @click="showFaq = true" aria-label="Ajuda" title="Ajuda">
          <i class="bi bi-question-circle" style="font-size:1.1rem;"></i>
        </button>
      </div>

      <div v-if="showFaq">
        <div class="modal-backdrop show" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:1040;"></div>
        <div class="modal d-block fade show" tabindex="-1" role="dialog" aria-modal="true"
          style="position:fixed;inset:0;z-index:1050;display:flex;align-items:center;justify-content:center;overflow:auto;padding:1.5rem;">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content" style="background:rgba(12,18,33,0.98);border:1px solid rgba(148,163,184,0.15);box-shadow:0 18px 60px rgba(0,0,0,0.45);">
              <div class="modal-header" style="border-bottom-color:rgba(148,163,184,0.15);">
                <div>
                  <h5 class="modal-title" style="font-size:1.25rem;font-weight:700;color:#fff;">Perguntas Frequentes</h5>
                  <p class="mb-0" style="font-size:0.9rem;color:rgba(226,232,240,0.75);">Se você está com dúvidas sobre o site ou as ROMs disponíveis, confira as perguntas mais frequentes abaixo:</p>
                </div>
                <button type="button" class="btn-close btn-close-white" aria-label="Fechar" @click="showFaq = false"></button>
              </div>
              <div class="modal-body" style="color:rgba(226,232,240,0.85);font-size:0.95rem;">
                <div class="list-group">
                  <button
                    v-for="(item, index) in faqItems"
                    :key="index"
                    type="button"
                    class="list-group-item list-group-item-action bg-transparent text-start"
                    :style="{borderColor: 'rgba(148,163,184,0.15)', color: 'rgba(226,232,240,0.95)'}"
                    @click="toggleFaq(index)">
                    <div class="d-flex align-items-center justify-content-between">
                      <span style="font-weight:600;">{{ item.question }}</span>
                      <i :class="item.open ? 'bi bi-dash-lg' : 'bi bi-plus-lg'" style="font-size:1rem;"></i>
                    </div>
                    <p v-if="item.open" class="mt-2 mb-0" style="color:rgba(226,232,240,0.75);font-size:0.9rem;line-height:1.6;">
                      {{ item.answer }}
                    </p>
                  </button>
                </div>
              </div>
              <div class="modal-footer" style="border-top-color:rgba(148,163,184,0.15);">
                <button type="button" class="btn btn-secondary" @click="showFaq = false">Fechar</button>
              </div>
            </div>
          </div>
        </div>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { devices, categories } from '../data/devices/index.js'
import DeviceCard from '../components/DeviceCard.vue'
import { useI18n } from '../utils/i18n.js'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const search = ref(route.query.q || '')
const activeCategory = ref(route.query.category || 'all')

// Sincronizar activeCategory com a query param da rota
function syncCategoryFromRoute() {
  const categoryParam = route.query.category || 'all'
  activeCategory.value = categoryParam
  search.value = route.query.q || ''
}

onMounted(() => {
  syncCategoryFromRoute()
})

watch(() => route.query, () => {
  syncCategoryFromRoute()
})
const showFaq = ref(false)
const faqItems = ref([
  {
    question: 'Uma nova ROM saiu, mas não está no site!',
    answer: 'Calma pequeno gafanhoto, estamos sempre atualizando o site com as últimas ROMs disponíveis. Se você viu uma ROM nova e ela ainda não apareceu aqui, pode ser que ainda estejamos testando ou preparando a postagem. Fique de olho no nosso canal do Telegram ou reporte em nossos canais de comunicação.',
    open: false,
  },
  {
    question: 'A ROM contém links incorretos ou está desatualizada!',
    answer: 'ROMs anteriores a Março de 2026 foram migradas de um sistema antigo e podem conter algumas informações desatualizadas ou links quebrados. Se você encontrar algo assim, por favor, reporte para nós para que possamos corrigir o mais rápido possível. Agradecemos muito a sua ajuda para manter o site atualizado e útil para todos!',
    open: false,
  },
  {
    question: 'Sou manentedor de ROMs, gostaria que minha ROM aparecesse no site!',
    answer: 'Se você é manentedor de ROMs e gostaria que suas ROMs aparecessem no site, entre em contato conosco através dos nossos canais de comunicação. Envie as informações da ROM, como nome, link de download, dispositivo compatível e uma breve descrição. Ficaremos felizes em avaliar a inclusão da sua ROM no nosso catálogo e ajudar a divulgar seu trabalho para a comunidade!',
    open: false,
  },
  {
    question: 'Gostei do site, como faço para contribuir?',
    answer: 'A CentralMotorolaBrasil é uma comunidade colaborativa e estamos sempre abertos a contribuições! Se você tem habilidades em desenvolvimento web, design, redação ou simplesmente quer ajudar a manter as informações atualizadas, sinta-se à vontade para entrar em contato conosco. Você pode contribuir corrigindo informações, adicionando novas ROMs, sugerindo melhorias ou até mesmo ajudando na divulgação do site. Juntos, podemos tornar a CentralMotorolaBrasil um recurso ainda melhor para todos os fãs da Motorola!',
    open: false,
  },
])

function toggleFaq(index) {
  faqItems.value[index].open = !faqItems.value[index].open
}

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