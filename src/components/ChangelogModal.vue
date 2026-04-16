<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="ch-modal-backdrop" @click.self="$emit('update:modelValue', false)">
        <div class="ch-modal" role="dialog" aria-modal="true" aria-labelledby="changelog-title">
          <div class="ch-modal-header">
            <div class="d-flex align-items-center gap-3">
              <div class="ch-modal-icon">
                <i class="bi bi-rocket-takeoff-fill"></i>
              </div>
              <div>
                <div class="ch-modal-eyebrow">CentralMotorolaBrasil</div>
                <h2 id="changelog-title" class="ch-modal-title">v1.0 — Lançamento Oficial 🎉</h2>
              </div>
            </div>
            <button class="ch-modal-close" @click="$emit('update:modelValue', false)" aria-label="Fechar">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <div class="ch-modal-body">

            <div class="ch-changelog-intro">
              <p>
                Depois de muito tempo trabalhando no site, finalmente lançamos a primeira versão estável do
                <strong>CentralMotorolaBrasil</strong> — o hub definitivo da comunidade Motorola no Brasil.
                Tudo o que você precisa para seu dispositivo, organizado em um só lugar.
              </p>
            </div>

            <div class="ch-changelog-section">
              <div class="ch-changelog-section-label">
                <i class="bi bi-stars"></i> Novidades desta versão
              </div>
              <ul class="ch-changelog-list">
                <li>
                  <span class="ch-changelog-tag new">NOVO</span>
                  <span>Catálogo de <strong>26 dispositivos</strong> Motorola com suporte a ROMs, GCams, recoveries e kernels</span>
                </li>
                <li>
                  <span class="ch-changelog-tag new">NOVO</span>
                  <span>Busque seus dispositivos usando nossa caixa de pesquisa global.</span>
                </li>
                <li>
                  <span class="ch-changelog-tag new">NOVO</span>
                  <span>Páginas detalhadas por dispositivo com informações de chipset, versão do Android e arquitetura</span>
                </li>
                <li>
                  <span class="ch-changelog-tag new">NOVO</span>
                  <span><strong>379 ROMs</strong> catalogadas e organizadas por dispositivo com links diretos</span>
                </li>
                <li>
                  <span class="ch-changelog-tag new">NOVO</span>
                  <span><strong>85 GCams</strong> testadas pela comunidade com configurações recomendadas</span>
                </li>
                <li>
                  <span class="ch-changelog-tag new">NOVO</span>
                  <span>Filtros por série (Moto G, Edge, E) com navegação por categorias</span>
                </li>
                <li>
                  <span class="ch-changelog-tag new">NOVO</span>
                  <span>Uma infraestrutura moderna e escalável para suportar a crescente demanda da comunidade.</span>
                </li>
              </ul>
            </div>

            <div class="ch-changelog-section">
              <div class="ch-changelog-section-label">
                <i class="bi bi-bar-chart-fill"></i> Estatísticas de lançamento
              </div>
              <div class="ch-stats-grid">
                <div class="ch-stat-item">
                  <span class="ch-stat-value">26</span>
                  <span class="ch-stat-label">Dispositivos</span>
                </div>
                <div class="ch-stat-item">
                  <span class="ch-stat-value">379</span>
                  <span class="ch-stat-label">ROMs</span>
                </div>
                <div class="ch-stat-item">
                  <span class="ch-stat-value">27</span>
                  <span class="ch-stat-label">Recoveries</span>
                </div>
                <div class="ch-stat-item">
                  <span class="ch-stat-value">85</span>
                  <span class="ch-stat-label">GCams</span>
                </div>
              </div>
            </div>

            <div class="ch-changelog-section">
              <div class="ch-changelog-section-label">
                <i class="bi bi-arrow-up-circle-fill"></i> Próximos passos
              </div>
              <ul class="ch-changelog-list">
                <li>
                  <span class="ch-changelog-tag soon">EM BREVE</span>
                  <span>Pretendemos melhorar e disponibilizar ferramentas para manentedores</span>
                </li>
                <li>
                  <span class="ch-changelog-tag soon">EM BREVE</span>
                  <span>Um local para discussão da comunidade</span>
                </li>
                <li>
                  <span class="ch-changelog-tag soon">EM BREVE</span>
                  <span>Adição de novos dispositivos e expansão do catálogo</span>
                </li>
                <li>
                  <span class="ch-changelog-tag soon">EM BREVE</span>
                  <span>Um novo menu focado em dispositivos com Root.</span>
                </li>
              </ul>
            </div>

          </div>

          <!-- Footer -->
          <div class="ch-modal-footer">
            <span class="ch-modal-date">
              <i class="bi bi-calendar3"></i> Lançado em Abril de 2025
            </span>
            <button class="ch-modal-btn-close btn" @click="$emit('update:modelValue', false)">
              Fechar
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({ modelValue: Boolean })
defineEmits(['update:modelValue'])
</script>

<style scoped>
.ch-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 20, 0.82);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1055;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.ch-modal {
  background: var(--bg-secondary);
  border: 1px solid var(--border-hover);
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(56,189,248,0.08);
  overflow: hidden;
}

.ch-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.ch-modal-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent-dim);
  border: 1px solid rgba(56,189,248,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.ch-modal-eyebrow {
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.ch-modal-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
}

.ch-modal-close {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  flex-shrink: 0;
}
.ch-modal-close:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
  background: rgba(56,189,248,0.08);
}

.ch-modal-body {
  overflow-y: auto;
  padding: 20px 24px;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: var(--border-hover) transparent;
}
.ch-modal-body::-webkit-scrollbar { width: 4px; }
.ch-modal-body::-webkit-scrollbar-track { background: transparent; }
.ch-modal-body::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 4px; }

.ch-changelog-intro {
  background: var(--accent-dim);
  border: 1px solid rgba(56,189,248,0.18);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 20px;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
.ch-changelog-intro strong { color: var(--text-primary); }

.ch-changelog-section {
  margin-bottom: 20px;
}

.ch-changelog-section-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ch-changelog-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ch-changelog-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.86rem;
  color: var(--text-secondary);
  line-height: 1.5;
  padding: 10px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  transition: border-color 0.2s;
}
.ch-changelog-list li:hover {
  border-color: var(--border-hover);
}
.ch-changelog-list li strong { color: var(--text-primary); }

.ch-changelog-tag {
  font-family: var(--mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 2px 7px;
  border-radius: 6px;
  flex-shrink: 0;
  margin-top: 1px;
}
.ch-changelog-tag.new {
  background: rgba(56,189,248,0.15);
  color: var(--accent);
  border: 1px solid rgba(56,189,248,0.25);
}
.ch-changelog-tag.soon {
  background: rgba(251,191,36,0.12);
  color: var(--warning);
  border: 1px solid rgba(251,191,36,0.25);
}

/* Stats grid */
.ch-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.ch-stat-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ch-stat-value {
  font-family: var(--mono);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}
.ch-stat-label {
  font-size: 0.72rem;
  color: var(--text-secondary);
}

.ch-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}
.ch-modal-date {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}
.ch-modal-btn-close {
  background: var(--accent);
  color: #0a0f1a;
  border: none;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 10px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}
.ch-modal-btn-close:hover {
  background: #7dd3fc;
  box-shadow: 0 0 16px var(--accent-glow);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}
.modal-fade-enter-active .ch-modal,
.modal-fade-leave-active .ch-modal {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .ch-modal {
  transform: translateY(16px) scale(0.98);
  opacity: 0;
}
.modal-fade-leave-to .ch-modal {
  transform: translateY(8px) scale(0.98);
  opacity: 0;
}

@media (max-width: 480px) {
  .ch-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .ch-modal-title { font-size: 0.95rem; }
}
</style>
