<template>
  <div class="min-h-screen py-10 px-4" style="background-color: #f0f2f0;">
    <div class="max-w-2xl mx-auto">

      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="w-1 h-14 rounded-full shrink-0" style="background-color: #1a3a6b;"></div>
        <div>
          <p class="text-xs font-bold uppercase tracking-widest mb-0.5" style="color: #1a3a6b;">V.V. Boskant</p>
          <h1 class="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight" style="color: #111;">Volgende speelronde</h1>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <span class="loading loading-spinner loading-lg" style="color: #1a3a6b;"></span>
      </div>

      <!-- No match -->
      <div v-else-if="!match" class="card shadow-md py-16 text-center text-base-content/40" style="background: white;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-sm">Geen speelronde beschikbaar</p>
      </div>

      <!-- Match overview -->
      <div v-else class="flex flex-col gap-4">

        <!-- Round label -->
        <div class="px-1">
          <span class="text-xs font-bold uppercase tracking-widest" style="color: #1a3a6b;">{{ roundLabel }}</span>
        </div>

        <!-- Boskant 1 card -->
        <div class="card shadow-md border-t-4 overflow-hidden" style="background: white; border-top-color: #1a3a6b;">
          <button class="w-full flex items-center justify-between px-4 py-2.5 cursor-pointer" style="background-color: #1a3a6b;" @click="open1 = !open1">
            <span class="text-sm font-extrabold text-white tracking-wide uppercase">Boskant 1</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white transition-transform duration-200" :class="{ 'rotate-180': open1 }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="open1" class="p-4 flex flex-col gap-3">

            <!-- Match info -->
            <div>
              <p class="font-extrabold text-base mb-2" style="color: #111;">{{ match.boskant1_wedstrijd || '—' }}</p>
              <div class="flex flex-col gap-1 text-sm text-gray-500">
                <span v-if="match.boskant1_datum" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(match.boskant1_datum) }}
                </span>
                <span v-if="match.boskant1_aanwezig" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Aanwezig {{ match.boskant1_aanwezig }} uur
                </span>
                <span v-if="match.boskant1_aanvang" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Aanvang {{ match.boskant1_aanvang }} uur
                </span>
                <span v-if="match.boskant1_opmerkingen" class="italic text-gray-400 text-xs mt-1">{{ match.boskant1_opmerkingen }}</span>
              </div>
            </div>

            <!-- Players -->
            <div v-if="boskant1Players.length > 0" class="border-t pt-4" style="border-color: #1a3a6b20;">
              <p class="text-xs font-extrabold uppercase tracking-widest mb-3" style="color: #1a3a6b;">Selectie</p>
              <ul class="flex flex-col gap-1.5">
                <li
                  v-for="(p, i) in boskant1Players"
                  :key="p.player_id"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0" style="background-color: #1a3a6b;">#{{ i + 1 }}</span>
                    <div class="flex items-center gap-1">
                      <span class="font-semibold text-sm" style="color: #111;">{{ p.name }}</span>
                      <span v-if="p.alsoBoskant2" class="text-xs font-semibold italic text-gray-400">(Speelt eerst bij 2)</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="border-t pt-4 text-xs text-gray-400 italic" style="border-color: #1a3a6b20;">
              Geen spelers geselecteerd
            </div>

          </div>
        </div>

        <!-- Boskant 2 card -->
        <div class="card shadow-md border-t-4 overflow-hidden" style="background: white; border-top-color: #1a3a6b;">
          <button class="w-full flex items-center justify-between px-4 py-2.5 cursor-pointer" style="background-color: #1a3a6b;" @click="open2 = !open2">
            <span class="text-sm font-extrabold text-white tracking-wide uppercase">Boskant 2</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white transition-transform duration-200" :class="{ 'rotate-180': open2 }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="open2" class="p-4 flex flex-col gap-3">

            <!-- Match info -->
            <div>
              <p class="font-extrabold text-base mb-2" style="color: #111;">{{ match.boskant2_wedstrijd || '—' }}</p>
              <div class="flex flex-col gap-1 text-sm text-gray-500">
                <span v-if="match.boskant2_datum" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(match.boskant2_datum) }}
                </span>
                <span v-if="match.boskant2_aanwezig" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Aanwezig {{ match.boskant2_aanwezig }} uur
                </span>
                <span v-if="match.boskant2_aanvang" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Aanvang {{ match.boskant2_aanvang }} uur
                </span>
                <span v-if="match.boskant2_opmerkingen" class="italic text-gray-400 text-xs mt-1">{{ match.boskant2_opmerkingen }}</span>
              </div>
            </div>

            <!-- Players -->
            <div v-if="boskant2Players.length > 0" class="border-t pt-4" style="border-color: #1a3a6b20;">
              <p class="text-xs font-extrabold uppercase tracking-widest mb-3" style="color: #1a3a6b;">Selectie</p>
              <ul class="flex flex-col gap-1.5">
                <li
                  v-for="(p, i) in boskant2Players"
                  :key="p.player_id"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0" style="background-color: #1a3a6b;">#{{ i + 1 }}</span>
                    <div class="flex items-center gap-1">
                      <span class="font-semibold text-sm" style="color: #111;">{{ p.name }}</span>
                      <span v-if="p.alsoBoskant1" class="text-xs font-semibold italic text-gray-400">(Sluit later aan bij 1)</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="border-t pt-4 text-xs text-gray-400 italic" style="border-color: #1a3a6b20;">
              Geen spelers geselecteerd
            </div>

          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="mt-8 mb-8 text-center text-xs font-semibold uppercase tracking-widest" style="color: #1a3a6b;">
        V.V. Boskant — Speelronde overzicht
      </div>

    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()

const loading = ref(true)
const match = ref(null)
const matchPlayers = ref([])
const open1 = ref(true)
const open2 = ref(true)

onMounted(async () => {
  await loadLatestMatch()
  loading.value = false
})

async function loadLatestMatch() {
  // Fetch the active match
  const { data: matchData, error: matchError } = await client
    .from('matches')
    .select()
    .eq('active', true)
    .limit(1)
    .single()

  if (matchError || !matchData) return
  match.value = matchData

  // Fetch players linked to this match, joined with the players table
  const { data: playerData, error: playerError } = await client
    .from('matches_players')
    .select(`
      player_id,
      boskant1,
      boskant2,
      players (
        first_name,
        middle_name,
        last_name
      )
    `)
    .eq('match_id', matchData.id)

  if (playerError) return
  matchPlayers.value = playerData

  console.log('playerError', playerError)
}

// Players checked for boskant1, sorted by last name
const boskant1Players = computed(() =>
  matchPlayers.value
    .filter(p => p.boskant1)
    .map(p => ({
      player_id: p.player_id,
      name: fullName(p.players),
      alsoBoskant2: p.boskant2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'nl'))
)

// Players checked for boskant2, sorted by last name
const boskant2Players = computed(() =>
  matchPlayers.value
    .filter(p => p.boskant2)
    .map(p => ({
      player_id: p.player_id,
      name: fullName(p.players),
      alsoBoskant1: p.boskant1,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'nl'))
)

const roundLabel = computed(() => {
  if (!match.value) return ''
  const d1 = match.value.boskant1_datum
  const d2 = match.value.boskant2_datum
  if (d1 && d2 && d1 === d2) return formatDate(d1)
  if (d1 && d2) return `${formatDate(d1)} & ${formatDate(d2)}`
  if (d1) return formatDate(d1)
  if (d2) return formatDate(d2)
  return 'Speelronde'
})

function fullName(player) {
  if (!player) return ''
  return player.middle_name
    ? `${player.first_name} ${player.middle_name} ${player.last_name}`
    : `${player.first_name} ${player.last_name}`
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
</script>