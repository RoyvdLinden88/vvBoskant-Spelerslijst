<template>
  <div class="card shadow-md mb-6 border-t-4" style="background: white; border-top-color: #1a3a6b;">
    <div class="card-body p-0">
      <div class="flex items-center justify-between px-5 py-3 border-b" style="background-color: #1a3a6b;">
        <span class="text-xs font-bold uppercase tracking-widest text-white">Naam</span>
        <span class="text-xs font-bold uppercase tracking-widest text-white">Acties</span>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg" style="color: #1a3a6b;"></span>
      </div>

      <div v-else-if="activePlayers.length === 0" class="py-12 text-center text-base-content/40">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p class="text-sm">Nog geen spelers toegevoegd</p>
      </div>

      <ul v-else class="divide-y divide-base-200">
        <li
          v-for="(player, i) in activePlayers"
          :key="player.id"
          class="flex items-center justify-between px-5 py-3 transition-colors hover:bg-blue-50"
        >
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold w-5 text-right tabular-nums" style="color: #1a3a6b;">{{ i + 1 }}</span>
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0"
              style="background-color: #1a3a6b;"
            >
              {{ initials(player) }}
            </div>
            <span class="font-semibold text-sm" style="color: #111;">{{ getFullName(player) }}</span>
          </div>
          <div class="flex gap-1">
            <button @click="emit('edit', player)" class="btn btn-ghost btn-xs btn-square hover:bg-blue-100" style="color: #1a3a6b;" title="Bewerken">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button @click="emit('archive', player)" class="btn btn-ghost btn-xs btn-square hover:bg-amber-50" style="color: #b45309;" title="Archiveren">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </button>
            <button @click="emit('delete', player)" class="btn btn-ghost btn-xs btn-square hover:bg-red-50" style="color: #b91c1c;" title="Verwijderen">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['edit', 'archive', 'delete'])
const { activePlayers, loading, getFullName, initials } = usePlayers()
</script>
