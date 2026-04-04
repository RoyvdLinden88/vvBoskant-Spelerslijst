<template>
  <div class="min-h-screen py-10 px-4" style="background-color: #f0f2f0;">
    <div class="max-w-4xl mx-auto">

      <SpelersToast />

      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="w-1 h-14 rounded-full shrink-0" style="background-color: #1a3a6b;"></div>
        <div class="min-w-0">
          <p class="text-xs font-bold uppercase tracking-widest mb-0.5" style="color: #1a3a6b;">V.V. Boskant</p>
          <h1 class="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight" style="color: #111;">Speelrondes</h1>
        </div>
        <div class="ml-auto flex items-center gap-2 shrink-0">
          <span class="badge badge-lg font-bold text-white border-0 hidden sm:inline-flex" style="background-color: #1a3a6b;">
            {{ matches.length }} ronde{{ matches.length !== 1 ? 's' : '' }}
          </span>
          <button
            class="btn btn-sm font-bold uppercase tracking-wide text-white border-0 hover:opacity-90"
            style="background-color: #1a3a6b;"
            @click="formModal.open()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="hidden sm:inline">Toevoegen</span>
          </button>
        </div>
      </div>

      <SpeelrondesLijst @edit="formModal.open($event)" @delete="deleteModal.open($event)" />

      <!-- Footer -->
      <div class="mt-6 text-center text-xs font-semibold uppercase tracking-widest" style="color: #1a3a6b;">
        V.V. Boskant — Speelrondes
      </div>
    </div>

    <SpeelrondesFormModal ref="formModal" />
    <SpeelrondesVerwijderenModal ref="deleteModal" />
  </div>
</template>

<script setup>
const { matches, fetchMatches } = useMatches()
const { fetchPlayers } = usePlayers()

const formModal = ref(null)
const deleteModal = ref(null)

await Promise.all([fetchMatches(), fetchPlayers()])
</script>