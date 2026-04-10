<template>
  <div class="settings-page">
    <div class="container-lg px-3 px-md-4 py-4" style="max-width:720px;margin:0 auto;">
      <div class="mb-4 fade-up">
        <p class="section-tag">{{ t('preferences') }}</p>
        <h1 style="font-size:1.8rem;font-weight:700;letter-spacing:-0.02em;">{{ t('settings') }}</h1>
      </div>
      <div class="ch-tabs mb-5 fade-up fade-up-1" style="max-width:320px;">
        <button class="ch-tab" :class="{ active: tab === 'themes' }" @click="tab = 'themes'">
          <i class="bi bi-palette"></i> {{ t('themes') }}
        </button>
        <button class="ch-tab" :class="{ active: tab === 'about' }" @click="tab = 'about'">
          <i class="bi bi-info-circle"></i> {{ t('about') }}
        </button>
      </div>

      <template v-if="tab === 'themes'">
        <!-- IDIOMA -->
        <div class="mb-4 fade-up">
          <p class="settings-section-title">{{ t('language') }}</p>
          <div class="settings-row" style="cursor:pointer;position:relative;" @click="toggleLanguageDropdown">
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-globe2" style="color:var(--accent);"></i>
              <span style="font-size:0.9rem;">{{ currentLanguageLabel }}</span>
            </div>
            <i
              class="bi"
              :class="languageDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'"
              style="color:var(--text-muted);font-size:0.8rem;transition:transform 0.2s;"
            ></i>
          </div>
          <transition name="dropdown">
            <div v-if="languageDropdownOpen" class="language-dropdown">
              <div
                v-for="lang in languages"
                :key="lang.code"
                class="language-option"
                :class="{ active: currentLanguage === lang.code }"
                @click.stop="selectLanguage(lang.code)"
              >
                <div class="d-flex align-items-center gap-3">
                  <span class="lang-flag">{{ lang.flag }}</span>
                  <span style="font-size:0.9rem;">{{ lang.label }}</span>
                </div>
                <i v-if="currentLanguage === lang.code" class="bi bi-check2" style="color:var(--accent);"></i>
              </div>
            </div>
          </transition>
        </div>

        <!-- ANIMAÇÕES -->
        <div class="mb-4 fade-up fade-up-1">
          <p class="settings-section-title">{{ t('animations') }}</p>
          <div class="settings-row" @click="animationsEnabled = !animationsEnabled">
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-stars" style="color:var(--accent);"></i>
              <div>
                <div style="font-size:0.9rem;">{{ t('interfaceAnimations') }}</div>
                <div style="font-size:0.75rem;color:var(--text-secondary);">{{ t('animationsDesc') }}</div>
              </div>
            </div>
            <div class="toggle-switch" :class="{ on: animationsEnabled }" @click.stop="animationsEnabled = !animationsEnabled">
              <div class="toggle-thumb"></div>
            </div>
          </div>
        </div>

        <!-- COR DE DESTAQUE -->
        <div class="mb-4 fade-up fade-up-2">
          <p class="settings-section-title">{{ t('accentColor') }}</p>
          <div class="ch-card p-4">
            <div class="d-flex flex-wrap gap-3 justify-content-center">
              <div v-for="color in accentColors" :key="color.name" class="text-center" style="cursor:pointer;" @click="setAccent(color)">
                <div class="color-swatch" :style="{ background: color.hex }" :class="{ active: activeAccent === color.name }"></div>
                <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:6px;">{{ color.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="tab === 'about'">
        <div class="ch-card p-5 text-center fade-up">
          <div style="width:64px;height:64px;background:var(--accent-dim);border:1px solid var(--border-hover);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
            <i class="bi bi-cpu" style="color:var(--accent);font-size:1.8rem;"></i>
          </div>
          <h2 style="font-family:var(--mono);font-size:1.4rem;font-weight:700;margin-bottom:8px;">CentralMotorolaBrasil</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;max-width:380px;margin:0 auto 24px;">
            {{ t('aboutDesc1') }}
          </p>
          <p style="color:var(--text-secondary);font-size:0.9rem;max-width:380px;margin:0 auto 24px;">
            {{ t('aboutDesc2') }}
          </p>
          <div class="d-flex justify-content-center gap-4 mb-4">
            <div class="text-center">
              <div style="font-family:var(--mono);font-size:0.75rem;color:var(--text-muted);">{{ t('version') }}</div>
              <div style="font-family:var(--mono);font-size:1rem;color:var(--accent);">1.0.0</div>
            </div>
            <div style="width:1px;background:var(--border-color);"></div>
            <div class="text-center">
              <div style="font-family:var(--mono);font-size:0.75rem;color:var(--text-muted);">{{ t('updated') }}</div>
              <div style="font-family:var(--mono);font-size:1rem;color:var(--accent);">10 {{ t('april') }} 2026</div>
            </div>
            <div style="width:1px;background:var(--border-color);"></div>
            <div class="text-center">
              <div style="font-family:var(--mono);font-size:0.75rem;color:var(--text-muted);">{{ t('license') }}</div>
              <div style="font-family:var(--mono);font-size:1rem;color:var(--accent);">MIT</div>
            </div>
          </div>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a href="https://github.com/CentralMotorolaBrasil/CentralMotorolaBrasil" class="btn-ghost btn d-flex align-items-center gap-2">
              <i class="bi bi-code-slash"></i> {{ t('sourceCode') }}
            </a>
            <a href="#" class="btn-accent btn d-flex align-items-center gap-2">
              <i class="bi bi-heart"></i> {{ t('support') }}
            </a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t, currentLanguage, currentLanguageLabel, languages, setLanguage } = useI18n()

const tab = ref('themes')
const animationsEnabled = ref(true)
const activeAccent = ref('Ciano')
const languageDropdownOpen = ref(false)

function toggleLanguageDropdown() {
  languageDropdownOpen.value = !languageDropdownOpen.value
}

function selectLanguage(code) {
  setLanguage(code)
  languageDropdownOpen.value = false
}

function closeDropdownOnOutsideClick(e) {
  if (!e.target.closest('.settings-row') && !e.target.closest('.language-dropdown')) {
    languageDropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeDropdownOnOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', closeDropdownOnOutsideClick))

const accentColors = [
  { name: 'Ciano',   hex: '#38bdf8' },
  { name: 'Roxo',    hex: '#818cf8' },
  { name: 'Verde',   hex: '#34d399' },
  { name: 'Âmbar',  hex: '#fbbf24' },
  { name: 'Rosa',    hex: '#f472b6' },
  { name: 'Laranja', hex: '#fb923c' },
]

function setAccent(color) {
  activeAccent.value = color.name
  document.documentElement.style.setProperty('--accent', color.hex)
  document.documentElement.style.setProperty('--accent-dim', color.hex + '22')
  document.documentElement.style.setProperty('--accent-glow', color.hex + '44')
  document.documentElement.style.setProperty('--border-hover', color.hex + '55')
}
</script>

<style scoped>
.toggle-switch {
  width: 44px; height: 24px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}
.toggle-switch.on { background: var(--accent-dim); border-color: var(--accent); }
.toggle-thumb {
  width: 16px; height: 16px;
  border-radius: 50%;
  background: var(--text-muted);
  position: absolute;
  top: 3px; left: 3px;
  transition: transform 0.2s, background 0.2s;
}
.toggle-switch.on .toggle-thumb {
  transform: translateX(20px);
  background: var(--accent);
}
.language-dropdown {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}
.language-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.15s;
  border-bottom: 1px solid var(--border-color);
}
.language-option:last-child { border-bottom: none; }
.language-option:hover { background: var(--accent-dim); }
.language-option.active { background: var(--accent-dim); }
.language-option.active span { color: var(--accent); }
.lang-flag { font-size: 1.2rem; }
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
  transform-origin: top;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>