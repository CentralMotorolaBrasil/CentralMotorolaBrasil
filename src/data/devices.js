export const categories = [
  { id: 'moto-g', label: 'Moto G Series', icon: 'bi-phone', description: 'Intermediários e custo-benefício' },
  { id: 'moto-edge', label: 'Moto Edge Series', icon: 'bi-phone-fill', description: 'Topo de linha e premium' },
  { id: 'moto-e', label: 'Moto E Series', icon: 'bi-phone-landscape', description: 'Entrada e acessíveis' },
  { id: 'motorola-one', label: 'Motorola One', icon: 'bi-motherboard', description: 'Linha Android One' },
]

export const devices = [
  // Variantes Moto G
  {
    id: 'moto-g32',
    name: 'Moto G32',
    codename: 'devon',
    category: 'moto-g',
    android: 'Android 12 → 13',
    chip: 'Snapdragon 680',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-g32-1.jpg',
    roms: [
      { name: 'LineageOS 21', version: '21.0', android: 'Android 14', author: 'LineageOS Team', date: '2024-03-10', link: '#', size: '1.1 GB', status: 'stable' },
      { name: 'crDroid 10', version: '10.3', android: 'Android 14', author: 'crDroid', date: '2024-02-20', link: '#', size: '980 MB', status: 'stable' },
      { name: 'Evolution X', version: '9.0', android: 'Android 14', author: 'EvolutionX Team', date: '2024-01-15', link: '#', size: '1.0 GB', status: 'beta' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.7.0', author: 'TeamWin', date: '2023-11-01', link: '#', size: '82 MB' },
      { name: 'OrangeFox', version: 'R12.1', author: 'OrangeFox Team', date: '2024-01-10', link: '#', size: '78 MB' },
    ],
    gcams: [
      { name: 'GCam MGC 8.9', version: '8.9.097', author: 'Urnyx05', date: '2024-02-01', link: '#', size: '95 MB', recommended: true },
      { name: 'GCam BSG 9.3', version: '9.3.218', author: 'BSG', date: '2024-03-05', link: '#', size: '102 MB', recommended: false },
    ],
    kernels: [
      { name: 'Kirisakura Kernel', version: '2.1.0', author: 'freak07', date: '2024-01-20', link: '#', size: '12 MB', features: ['OC/UV', 'TCP Westwood'] },
    ],
  },
  {
    id: 'moto-g52',
    name: 'Moto G52',
    codename: 'rhode',
    category: 'moto-g',
    android: 'Android 12 → 13',
    chip: 'Snapdragon 680',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-g52-1.jpg',
    roms: [
      { name: 'LineageOS 21', version: '21.0', android: 'Android 14', author: 'LineageOS Team', date: '2024-04-01', link: '#', size: '1.1 GB', status: 'stable' },
      { name: 'Pixel Experience', version: '14.0', android: 'Android 14', author: 'PE Team', date: '2024-03-20', link: '#', size: '1.2 GB', status: 'stable' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.7.0', author: 'TeamWin', date: '2023-12-01', link: '#', size: '80 MB' },
    ],
    gcams: [
      { name: 'GCam MGC 8.9', version: '8.9.097', author: 'Urnyx05', date: '2024-02-01', link: '#', size: '95 MB', recommended: true },
    ],
    kernels: [],
  },
  {
    id: 'moto-g60',
    name: 'Moto G60',
    codename: 'hanoip',
    category: 'moto-g',
    android: 'Android 11',
    chip: 'Snapdragon 732G',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-g60-1.jpg',
    roms: [
      { name: 'LineageOS 20', version: '20.0', android: 'Android 13', author: 'LineageOS Team', date: '2023-10-15', link: '#', size: '980 MB', status: 'stable' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.7.0', author: 'TeamWin', date: '2023-08-15', link: '#', size: '85 MB' },
    ],
    gcams: [
      { name: 'GCam BSG 8.4', version: '8.4.400', author: 'BSG', date: '2023-09-10', link: '#', size: '90 MB', recommended: true },
    ],
    kernels: [],
  },
  {
    id: 'moto-g200',
    name: 'Moto G200',
    codename: 'xpeng',
    category: 'moto-g',
    android: 'Android 11 → 12',
    chip: 'Snapdragon 888+',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-g200-5g-1.jpg',
    roms: [
      { name: 'LineageOS 21', version: '21.0', android: 'Android 14', author: 'LineageOS Team', date: '2024-04-05', link: '#', size: '1.3 GB', status: 'stable' },
      { name: 'crDroid 10', version: '10.4', android: 'Android 14', author: 'crDroid', date: '2024-03-01', link: '#', size: '1.1 GB', status: 'stable' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.7.2', author: 'TeamWin', date: '2024-01-20', link: '#', size: '88 MB' },
      { name: 'OrangeFox', version: 'R12.1', author: 'OrangeFox Team', date: '2024-02-05', link: '#', size: '84 MB' },
    ],
    gcams: [
      { name: 'GCam MGC 9.2', version: '9.2.113', author: 'Urnyx05', date: '2024-03-15', link: '#', size: '105 MB', recommended: true },
    ],
    kernels: [
      { name: 'Sultan Kernel', version: '4.0', author: 'sultanxda', date: '2023-12-10', link: '#', size: '14 MB', features: ['Performance', 'KProfiles'] },
    ],
  },

  // Moto Edge Series
  {
    id: 'moto-edge-20',
    name: 'Moto Edge 20',
    codename: 'berlin',
    category: 'moto-edge',
    android: 'Android 11 → 13',
    chip: 'Snapdragon 778G',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-edge-20-2.jpg',
    roms: [
      { name: 'LineageOS 21', version: '21.0', android: 'Android 14', author: 'LineageOS Team', date: '2024-04-10', link: '#', size: '1.0 GB', status: 'stable' },
      { name: 'Pixel Experience Plus', version: '14.0', android: 'Android 14', author: 'PE Team', date: '2024-02-28', link: '#', size: '1.2 GB', status: 'stable' },
      { name: 'ArrowOS 14', version: '14.0', android: 'Android 14', author: 'ArrowOS', date: '2024-01-30', link: '#', size: '1.1 GB', status: 'beta' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.7.1', author: 'TeamWin', date: '2024-01-05', link: '#', size: '82 MB' },
    ],
    gcams: [
      { name: 'GCam MGC 8.9', version: '8.9.097', author: 'Urnyx05', date: '2024-02-01', link: '#', size: '95 MB', recommended: true },
      { name: 'GCam NGCam 8.5', version: '8.5.300', author: 'Nikita', date: '2024-01-15', link: '#', size: '98 MB', recommended: false },
    ],
    kernels: [
      { name: 'Daredevil Kernel', version: '3.2.1', author: 'Daredevil', date: '2024-02-10', link: '#', size: '11 MB', features: ['KVM', 'OC', 'WireGuard'] },
    ],
  },
  {
    id: 'moto-edge-30',
    name: 'Moto Edge 30',
    codename: 'dubai',
    category: 'moto-edge',
    android: 'Android 12 → 13',
    chip: 'Snapdragon 778G+',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-edge-30-1.jpg',
    roms: [
      { name: 'LineageOS 21', version: '21.0', android: 'Android 14', author: 'LineageOS Team', date: '2024-04-08', link: '#', size: '1.1 GB', status: 'stable' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.7.0', author: 'TeamWin', date: '2023-11-20', link: '#', size: '84 MB' },
    ],
    gcams: [
      { name: 'GCam MGC 9.2', version: '9.2.113', author: 'Urnyx05', date: '2024-03-01', link: '#', size: '105 MB', recommended: true },
    ],
    kernels: [],
  },

  // Moto E Series
  {
    id: 'moto-e7-plus',
    name: 'Moto E7 Plus',
    codename: 'guam',
    category: 'moto-e',
    android: 'Android 10',
    chip: 'Snapdragon 460',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-e7-plus-1.jpg',
    roms: [
      { name: 'LineageOS 19', version: '19.1', android: 'Android 12', author: 'LineageOS Team', date: '2023-06-10', link: '#', size: '850 MB', status: 'stable' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.6.2', author: 'TeamWin', date: '2023-04-10', link: '#', size: '75 MB' },
    ],
    gcams: [
      { name: 'GCam BSG 8.1', version: '8.1.101', author: 'BSG', date: '2023-05-15', link: '#', size: '88 MB', recommended: true },
    ],
    kernels: [],
  },
  {
    id: 'moto-e20',
    name: 'Moto E20',
    codename: 'rhodep',
    category: 'moto-e',
    android: 'Android 11',
    chip: 'UNISOC T606',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-e20-1.jpg',
    roms: [],
    recoveries: [
      { name: 'TWRP Unofficial', version: '3.7.0', author: 'Comunidade', date: '2024-01-01', link: '#', size: '77 MB' },
    ],
    gcams: [
      { name: 'GCam BSG 8.4', version: '8.4.400', author: 'BSG', date: '2023-11-10', link: '#', size: '90 MB', recommended: true },
    ],
    kernels: [],
  },

  // Motorola One Series
  {
    id: 'motorola-one',
    name: 'Motorola One',
    codename: 'deen',
    category: 'motorola-one',
    android: 'Android 8.1 → 10',
    chip: 'Snapdragon 625',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-one-1.jpg',
    roms: [
      { name: 'LineageOS 18.1', version: '18.1', android: 'Android 11', author: 'LineageOS Team', date: '2023-01-15', link: '#', size: '780 MB', status: 'stable' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.5.2', author: 'TeamWin', date: '2022-10-01', link: '#', size: '72 MB' },
    ],
    gcams: [
      { name: 'GCam Wichaya', version: '7.3.018', author: 'Wichaya', date: '2022-12-10', link: '#', size: '85 MB', recommended: true },
    ],
    kernels: [],
  },
  {
    id: 'motorola-one-fusion',
    name: 'Motorola One Fusion',
    codename: 'astro',
    category: 'motorola-one',
    android: 'Android 10',
    chip: 'Snapdragon 710',
    img: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-one-fusion-1.jpg',
    roms: [
      { name: 'LineageOS 20', version: '20.0', android: 'Android 13', author: 'LineageOS Team', date: '2023-08-20', link: '#', size: '900 MB', status: 'stable' },
      { name: 'crDroid 9', version: '9.4', android: 'Android 13', author: 'crDroid', date: '2023-09-10', link: '#', size: '950 MB', status: 'stable' },
    ],
    recoveries: [
      { name: 'TWRP', version: '3.6.2', author: 'TeamWin', date: '2023-05-05', link: '#', size: '80 MB' },
      { name: 'SHRP', version: '3.2', author: 'SHRP Team', date: '2023-06-01', link: '#', size: '86 MB' },
    ],
    gcams: [
      { name: 'GCam BSG 8.4', version: '8.4.400', author: 'BSG', date: '2023-07-20', link: '#', size: '90 MB', recommended: true },
    ],
    kernels: [
      { name: 'Dragonheart Kernel', version: '1.5', author: 'saveman71', date: '2023-07-01', link: '#', size: '10 MB', features: ['Performance Mode', 'Schedutil'] },
    ],
  },
]
