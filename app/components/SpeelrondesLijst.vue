<template>
  <div class="flex flex-col gap-4">

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg" style="color: #1a3a6b;"></span>
    </div>

    <!-- Empty -->
    <div v-else-if="matches.length === 0" class="card shadow-md py-12 text-center text-base-content/40" style="background: white;">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-sm">Nog geen speelrondes toegevoegd</p>
    </div>

    <!-- One card per speelronde -->
    <div
      v-else
      v-for="match in matches"
      :key="match.id"
      class="card shadow-md border-t-4 overflow-hidden"
      :style="match.active ? 'background: white; border-top-color: #1a3a6b;' : 'background: #f9f9f9; border-top-color: #9ca3af;'"
    >
      <!-- Round header bar -->
      <div class="flex items-center justify-between px-4 py-2.5" :style="match.active ? 'background-color: #1a3a6b;' : 'background-color: #9ca3af;'">
        <div class="flex items-center gap-2">
          <span class="text-sm font-extrabold text-white tracking-wide">
            {{ roundLabel(match) }}
          </span>
          <span v-if="match.active" class="badge badge-xs text-white border-white/40 font-bold uppercase tracking-wide" style="background-color: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4);">Actief</span>
        </div>
        <div class="flex gap-1">
          <button @click="emit('edit', match)" class="btn btn-ghost btn-xs btn-square text-white hover:bg-white/20" title="Bewerken">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button @click="emit('delete', match)" class="btn btn-ghost btn-xs btn-square text-white hover:bg-red-500/30" title="Verwijderen">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Two match slots -->
      <div class="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">

        <!-- Boskant 1 -->
        <div class="p-4">
          <p class="text-xs font-extrabold uppercase tracking-widest mb-3" :style="match.active ? 'color: #1a3a6b;' : 'color: #9ca3af;'">Boskant 1</p>
          <p class="font-bold text-sm mb-2" style="color: #111;">{{ match.boskant1_wedstrijd || '—' }}</p>
          <div class="flex flex-col gap-1 text-xs text-gray-500">
            <span v-if="match.boskant1_datum" class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(match.boskant1_datum) }}
            </span>
            <span v-if="match.boskant1_aanvang" class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Aanvang {{ match.boskant1_aanvang }}
            </span>
            <span v-if="match.boskant1_aanwezig" class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Aanwezig {{ match.boskant1_aanwezig }}
            </span>
            <span v-if="match.boskant1_opmerkingen" class="italic text-gray-400 mt-1">{{ match.boskant1_opmerkingen }}</span>
          </div>
        </div>

        <!-- Boskant 2 -->
        <div class="p-4">
          <p class="text-xs font-extrabold uppercase tracking-widest mb-3" :style="match.active ? 'color: #1a3a6b;' : 'color: #9ca3af;'">Boskant 2</p>
          <p class="font-bold text-sm mb-2" style="color: #111;">{{ match.boskant2_wedstrijd || '—' }}</p>
          <div class="flex flex-col gap-1 text-xs text-gray-500">
            <span v-if="match.boskant2_datum" class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(match.boskant2_datum) }}
            </span>
            <span v-if="match.boskant2_aanvang" class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Aanvang {{ match.boskant2_aanvang }}
            </span>
            <span v-if="match.boskant2_aanwezig" class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Aanwezig {{ match.boskant2_aanwezig }}
            </span>
            <span v-if="match.boskant2_opmerkingen" class="italic text-gray-400 mt-1">{{ match.boskant2_opmerkingen }}</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
const emit = defineEmits(['edit', 'delete'])
const { matches, loading } = useMatches()

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function roundLabel(match) {
  const d1 = match.boskant1_datum
  const d2 = match.boskant2_datum
  if (d1 && d2 && d1 === d2) return `Speelronde ${formatDate(d1)}`
  if (d1 && d2) return `Speelronde ${formatDate(d1)} & ${formatDate(d2)}`
  if (d1) return `Speelronde ${formatDate(d1)}`
  if (d2) return `Speelronde ${formatDate(d2)}`
  return 'Speelronde'
}
</script>