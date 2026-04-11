// vite-plugin-yaml.js
// Plugin simples que transforma qualquer .yaml/.yml importado
// em um módulo JS com export default, sem dependência de runtime.
// Coloque este arquivo na raiz do projeto.

import { load } from 'js-yaml'
import { readFileSync } from 'fs'

export default function yamlPlugin() {
  return {
    name: 'vite-plugin-yaml',
    transform(src, id) {
      if (!id.endsWith('.yaml') && !id.endsWith('.yml')) return null
      try {
        const parsed = load(src)
        return {
          code: `export default ${JSON.stringify(parsed)}`,
          map: null,
        }
      } catch (e) {
        this.error(`Erro ao parsear YAML em ${id}: ${e.message}`)
      }
    },
  }
}