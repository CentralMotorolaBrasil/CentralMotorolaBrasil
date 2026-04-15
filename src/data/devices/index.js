// NOSSO AGREGADOR DO CENTRALMOTOROLABRASIL
/* Como adicionar um novo aparelho:
1. Crie uma pasta com o nome do id do aparelho dentro de src/data/devices/
2. Dentro dela, crie os arquivos YAML:
   info.yaml        <--- dados do dispositivo
   roms.yaml        <--- ROMs do dispositivo
   gcams.yaml       <--- GCams do dispositivo
   kernels.yaml     <--- Kernels do dispositivo
   recoveries.yaml  <--- Recoveries do dispositivo

O agregador detecta tudo automaticamente. Não precisa registrar nada aqui. */

import { categories } from './categories.js'

const infoModules       = import.meta.glob('./*/info.yaml',        { eager: true })
const romsModules       = import.meta.glob('./*/roms.yaml',        { eager: true })
const recoveriesModules = import.meta.glob('./*/recoveries.yaml',  { eager: true })
const gcamsModules      = import.meta.glob('./*/gcams.yaml',       { eager: true })
const kernelsModules    = import.meta.glob('./*/kernels.yaml',     { eager: true })

export { categories }

export const devices = Object.entries(infoModules).map(([path, mod]) => {
  // Extrai o id da pasta: "./moto-g34/info.yaml" → "moto-g34"
  const id = path.split('/')[1]

  const roms       = romsModules[`./${id}/roms.yaml`]?.default            ?? []
  const recoveries = recoveriesModules[`./${id}/recoveries.yaml`]?.default ?? []
  const gcams      = gcamsModules[`./${id}/gcams.yaml`]?.default           ?? []
  const kernels    = kernelsModules[`./${id}/kernels.yaml`]?.default       ?? []

  return {
    ...mod.default,
    id,
    roms,
    recoveries,
    gcams,
    kernels,
  }
})

export const devicesById = Object.create(null)
for (const device of devices) {
  devicesById[device.id] = device
}

export const categoriesById = Object.create(null)
for (const category of categories) {
  categoriesById[category.id] = category
}
