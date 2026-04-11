// NOSSO AGREGADOR DO CENTRALMOTOROLABRASIL
/* Como adicionar um novo aparelho:
1. crie uma pasta com o nome do id do aparelho
2. dentro de src/data/devices/ coloque info.json e roms.json

info.json <--- info dos devices
roms.json <---- roms do dispositivo respectivo */

import { categories } from './categories.js'

const infoModules = import.meta.glob('./*/info.json', { eager: true })
const romsModules = import.meta.glob('./*/roms.json', { eager: true })

export { categories }

export const devices = Object.entries(infoModules).map(([path, mod]) => {
  // Extrai o id da pasta: "./moto-g32/info.json" ---> "moto-g32"
  const id = path.split('/')[1]

  const romsPath = `./${id}/roms.json`
  const roms = romsModules[romsPath]?.default ?? []

  return {
    ...mod.default,
    id,
    roms,
  }
})
