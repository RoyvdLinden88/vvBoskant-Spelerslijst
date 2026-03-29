<template>
  <div class="min-h-screen py-10 px-4" style="background-color: #f0f2f0;">
    <div class="max-w-2xl mx-auto">

      <SpelersToast />

      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="w-1 h-14 rounded-full" style="background-color: #1a3a6b;"></div>
        <div>
          <p class="text-xs font-bold uppercase tracking-widest mb-0.5" style="color: #1a3a6b;">V.V. Boskant</p>
          <h1 class="text-3xl font-extrabold uppercase tracking-tight" style="color: #111;">Spelerslijst</h1>
        </div>
        <div class="ml-auto">
          <span class="badge badge-lg font-bold text-white border-0" style="background-color: #1a3a6b;">
            {{ activePlayers.length }} speler{{ activePlayers.length !== 1 ? 's' : '' }}
          </span>
        </div>
      </div>

      <SpelersToevoegen />
      <SpelersLijst @edit="editModal.open($event)" @archive="archiveModal.open($event)" @delete="deleteModal.open($event)" />
      <GearchiveerdeLijst @delete="deleteModal.open($event)" />

      <!-- Footer -->
      <div class="mt-6 text-center text-xs font-semibold uppercase tracking-widest" style="color: #1a3a6b;">
        V.V. Boskant — Spelerslijst selectie
      </div>
    </div>

    <SpelersBewerkenModal ref="editModal" />
    <ArchiverenModal ref="archiveModal" />
    <VerwijderenModal ref="deleteModal" />
  </div>
</template>

<script setup>
const { activePlayers, fetchPlayers } = usePlayers()

const editModal = ref(null)
const archiveModal = ref(null)
const deleteModal = ref(null)

await fetchPlayers()
</script>
