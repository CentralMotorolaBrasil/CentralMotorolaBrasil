import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Script que gera informações de build incluindo a data do último commit
 */

try {
  // Obter a data do último commit em formato ISO
  const lastCommitDate = execSync('git log -1 --format=%ai', {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: path.join(__dirname, '..')
  }).trim()

  // Extrair apenas a data (YYYY-MM-DD)
  const dateOnly = lastCommitDate.split(' ')[0]
  
  const buildInfo = {
    lastUpdated: dateOnly,
    lastUpdatedISO: lastCommitDate,
    buildTime: new Date().toISOString(),
  }

  // Criar diretório src/generated se não existir
  const generatedDir = path.join(__dirname, '..', 'src', 'generated')
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true })
  }

  // Escrever arquivo de configuração
  const outputPath = path.join(generatedDir, 'build-info.json')
  fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2))

  console.log(`✓ Build info gerado: ${outputPath}`)
  console.log(`  Data do último commit: ${buildInfo.lastUpdated}`)
} catch (error) {
  console.warn('⚠ Aviso: Não foi possível obter data do Git')
  console.warn('  Usando data de build como fallback')
  
  // Fallback: usar data atual se Git não estiver disponível
  const generatedDir = path.join(__dirname, '..', 'src', 'generated')
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true })
  }

  const buildInfo = {
    lastUpdated: new Date().toISOString().split('T')[0],
    lastUpdatedISO: new Date().toISOString(),
    buildTime: new Date().toISOString(),
  }

  const outputPath = path.join(generatedDir, 'build-info.json')
  fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2))
}
