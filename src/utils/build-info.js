import buildInfo from '../generated/build-info.json'

/**
 * Composable que fornece informações de build
 * incluindo a data do último commit
 */
export function useBuildInfo() {
  const lastUpdated = buildInfo.lastUpdated
  const lastUpdatedISO = buildInfo.lastUpdatedISO

  /**
   * Converte data YYYY-MM-DD para formato localizado
   * @param {string} dateString - Data em formato ISO (YYYY-MM-DD)
   * @param {Function} t - Função de tradução
   * @returns {string} Data formatada (ex: "11 de abril de 2026")
   */
  function formatDate(dateString, t) {
    const date = new Date(dateString + 'T00:00:00Z')
    const day = date.getUTCDate()
    const month = date.getUTCMonth()
    const year = date.getUTCFullYear()

    const monthNames = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ]

    return `${day} ${t(monthNames[month])} ${year}`
  }

  return {
    lastUpdated,
    lastUpdatedISO,
    formatDate,
  }
}
