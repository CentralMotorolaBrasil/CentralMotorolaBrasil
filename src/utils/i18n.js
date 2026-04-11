import { ref, computed } from 'vue'

const currentLanguage = ref(localStorage.getItem('app-language') || 'pt')

const languages = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'es', label: 'Español',   flag: '🇪🇸' },
  { code: 'en', label: 'English',   flag: '🇺🇸' },
]

const translations = {
  pt: {
    // Settings
    preferences: 'Preferências',
    settings: 'Configurações',
    themes: 'Temas',
    about: 'Sobre',
    language: 'Idioma',
    animations: 'Animações',
    interfaceAnimations: 'Animações de interface',
    animationsDesc: 'Transições e efeitos visuais',
    accentColor: 'Cor de Destaque',
    aboutDesc1: 'Sua fonte central para ROMs, ferramentas e tutoriais para o seu dispositivo Motorola. Busque seu celular e veja tudo que ele pode te oferecer.',
    aboutDesc2: 'Esse projeto é comunitário e de código aberto mantido por voluntários. Se você quer nos ajudar, nos apoie!',
    version: 'VERSÃO',
    updated: 'ATUALIZADO',
    april: 'Abril',
    license: 'LICENÇA',
    sourceCode: 'Código fonte',
    support: 'Apoie o Projeto',

    // App.vue / Nav
    navHome: 'Início',
    navDevices: 'Dispositivos',
    navConfig: 'Config',

    // HomeView
    stableTag: 'v1.0 · Site estável',
    heroTitle1: 'Tudo para seu',
    heroTitle2: 'dispositivo Motorola',
    heroSubtitle: 'ROMs customizadas, recoverys, GCams, kernels e tutoriais organizados por dispositivo.',
    searchPlaceholder: 'Buscar dispositivo, ROM, tutorial...',
    btnExploreDevices: 'Explorar Dispositivos',
    btnSearch: 'Buscar',
    statDevices: 'Dispositivos',
    statRoms: 'ROMs',
    statRecoveries: 'Recoveries',
    statGcams: 'GCams',
    quickNavTag: 'Navegação Rápida',
    quickNavTitle: 'Categorias de Conteúdo',
    catDevicesDesc: 'Lista completa de modelos',
    catRomsDesc: 'Sistemas customizados',
    catRecoveriesDesc: 'TWRP, OrangeFox e mais',
    catSettingsDesc: 'Personalizar interface',
    featuredTag: 'Em destaque',
    featuredTitle: 'Dispositivos Populares',
    viewAll: 'Ver todos',

    // DevicesView
    libraryTag: 'Biblioteca',
    devicesTitle: 'Dispositivos',
    devicesFound: 'dispositivos encontrados',
    searchDevicePlaceholder: 'Buscar por nome, codinome ou chip...',
    filterAll: 'Todos',
    noDeviceFound: 'Nenhum dispositivo encontrado',
    noDeviceFoundSub: 'Tente outro termo de busca',

    // DeviceDetailView
    backToDevices: 'Todos os dispositivos',
    tabRoms: 'ROMs',
    tabRecoveries: 'Recoveries',
    tabGcams: 'GCams',
    tabKernels: 'Kernels',
    noRoms: 'Nenhuma ROM disponível ainda para este dispositivo.',
    noRecoveries: 'Nenhum recovery disponível ainda.',
    noGcams: 'Nenhuma GCam disponível ainda.',
    noKernels: 'Nenhum kernel disponível ainda.',
    deviceNotFound: 'Dispositivo não encontrado.',
    btnBack: '← Voltar',
    btnDownload: 'Download',
    recommended: '⭐ Recomendado',
    badgeOfficial: 'Oficial',
    badgeUnofficial: 'Não oficial',
  },

  es: {
    preferences: 'Preferencias',
    settings: 'Configuración',
    themes: 'Temas',
    about: 'Acerca de',
    language: 'Idioma',
    animations: 'Animaciones',
    interfaceAnimations: 'Animaciones de interfaz',
    animationsDesc: 'Transiciones y efectos visuales',
    accentColor: 'Color de Acento',
    aboutDesc1: 'Tu fuente central para ROMs, herramientas y tutoriales para tu dispositivo Motorola. Busca tu celular y descubre todo lo que puede ofrecerte.',
    aboutDesc2: 'Este proyecto es comunitario y de código abierto mantenido por voluntarios. ¡Si quieres ayudarnos, apóyanos!',
    version: 'VERSIÓN',
    updated: 'ACTUALIZADO',
    april: 'Abril',
    license: 'LICENCIA',
    sourceCode: 'Código fuente',
    support: 'Apoya el Proyecto',

    navHome: 'Inicio',
    navDevices: 'Dispositivos',
    navConfig: 'Config',

    stableTag: 'v1.0 · Sitio estable',
    heroTitle1: 'Todo para tu',
    heroTitle2: 'dispositivo Motorola',
    heroSubtitle: 'ROMs personalizadas, recoveries, GCams, kernels y tutoriales organizados por dispositivo.',
    searchPlaceholder: 'Buscar dispositivo, ROM, tutorial...',
    btnExploreDevices: 'Explorar Dispositivos',
    btnSearch: 'Buscar',
    statDevices: 'Dispositivos',
    statRoms: 'ROMs',
    statRecoveries: 'Recoveries',
    statGcams: 'GCams',
    quickNavTag: 'Navegación Rápida',
    quickNavTitle: 'Categorías de Contenido',
    catDevicesDesc: 'Lista completa de modelos',
    catRomsDesc: 'Sistemas personalizados',
    catRecoveriesDesc: 'TWRP, OrangeFox y más',
    catSettingsDesc: 'Personalizar interfaz',
    featuredTag: 'Destacados',
    featuredTitle: 'Dispositivos Populares',
    viewAll: 'Ver todos',

    libraryTag: 'Biblioteca',
    devicesTitle: 'Dispositivos',
    devicesFound: 'dispositivos encontrados',
    searchDevicePlaceholder: 'Buscar por nombre, nombre clave o chip...',
    filterAll: 'Todos',
    noDeviceFound: 'Ningún dispositivo encontrado',
    noDeviceFoundSub: 'Intenta otro término de búsqueda',

    backToDevices: 'Todos los dispositivos',
    tabRoms: 'ROMs',
    tabRecoveries: 'Recoveries',
    tabGcams: 'GCams',
    tabKernels: 'Kernels',
    noRoms: 'Ninguna ROM disponible aún para este dispositivo.',
    noRecoveries: 'Ninguna recovery disponible aún.',
    noGcams: 'Ninguna GCam disponible aún.',
    noKernels: 'Ningún kernel disponible aún.',
    deviceNotFound: 'Dispositivo no encontrado.',
    btnBack: '← Volver',
    btnDownload: 'Descargar',
    recommended: '⭐ Recomendado',
    badgeOfficial: 'Oficial',
    badgeUnofficial: 'No oficial',
  },

  en: {
    preferences: 'Preferences',
    settings: 'Settings',
    themes: 'Themes',
    about: 'About',
    language: 'Language',
    animations: 'Animations',
    interfaceAnimations: 'Interface animations',
    animationsDesc: 'Transitions and visual effects',
    accentColor: 'Accent Color',
    aboutDesc1: 'Your central source for ROMs, tools and tutorials for your Motorola device. Search your phone and see everything it can offer you.',
    aboutDesc2: 'This is a community open-source project maintained by volunteers. If you want to help us, support us!',
    version: 'VERSION',
    updated: 'UPDATED',
    april: 'April',
    license: 'LICENSE',
    sourceCode: 'Source code',
    support: 'Support the Project',

    navHome: 'Home',
    navDevices: 'Devices',
    navConfig: 'Config',

    stableTag: 'v1.0 · Site stable',
    heroTitle1: 'Everything for your',
    heroTitle2: 'Motorola device',
    heroSubtitle: 'Custom ROMs, recoveries, GCams, kernels and tutorials organized by device.',
    searchPlaceholder: 'Search device, ROM, tutorial...',
    btnExploreDevices: 'Explore Devices',
    btnSearch: 'Search',
    statDevices: 'Devices',
    statRoms: 'ROMs',
    statRecoveries: 'Recoveries',
    statGcams: 'GCams',
    quickNavTag: 'Quick Navigation',
    quickNavTitle: 'Content Categories',
    catDevicesDesc: 'Complete list of models',
    catRomsDesc: 'Custom systems',
    catRecoveriesDesc: 'TWRP, OrangeFox and more',
    catSettingsDesc: 'Customize interface',
    featuredTag: 'Featured',
    featuredTitle: 'Popular Devices',
    viewAll: 'View all',

    libraryTag: 'Library',
    devicesTitle: 'Devices',
    devicesFound: 'devices found',
    searchDevicePlaceholder: 'Search by name, codename or chip...',
    filterAll: 'All',
    noDeviceFound: 'No device found',
    noDeviceFoundSub: 'Try another search term',

    backToDevices: 'All devices',
    tabRoms: 'ROMs',
    tabRecoveries: 'Recoveries',
    tabGcams: 'GCams',
    tabKernels: 'Kernels',
    noRoms: 'No ROM available yet for this device.',
    noRecoveries: 'No recovery available yet.',
    noGcams: 'No GCam available yet.',
    noKernels: 'No kernel available yet.',
    deviceNotFound: 'Device not found.',
    btnBack: '← Back',
    btnDownload: 'Download',
    recommended: '⭐ Recommended',
    badgeOfficial: 'Official',
    badgeUnofficial: 'Unofficial',
  },
}

function t(key) {
  return translations[currentLanguage.value]?.[key] ?? translations['pt'][key]
}

function setLanguage(code) {
  currentLanguage.value = code
  localStorage.setItem('app-language', code)
}

const currentLanguageLabel = computed(() =>
  languages.find(l => l.code === currentLanguage.value)?.label ?? 'Português'
)

export function useI18n() {
  return { t, currentLanguage, currentLanguageLabel, languages, setLanguage }
}