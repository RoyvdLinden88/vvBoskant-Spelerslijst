<template>
  <div v-if="!loading && archivedPlayers.length > 0" class="card shadow-md border-t-4" style="background: white; border-top-color: #9ca3af;">
    <div class="card-body p-0">
      <div class="flex items-center justify-between px-5 py-3 border-b" style="background-color: #6b7280;">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span class="text-xs font-bold uppercase tracking-widest text-white">Gearchiveerde spelers</span>
          <span class="badge badge-sm text-white border-0 opacity-70" style="background-color: #4b5563;">{{ archivedPlayers.length }}</span>
        </div>
      </div>

      <ul class="divide-y divide-base-200">
        <li
          v-for="(player, i) in archivedPlayers"
          :key="player.id"
          class="flex items-center justify-between px-5 py-3 bg-gray-50"
        >
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold w-5 text-right tabular-nums text-gray-400">{{ i + 1 }}</span>
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0 bg-gray-400">
              {{ initials(player) }}
            </div>
            <span class="font-semibold text-sm text-gray-400 line-through">{{ getFullName(player) }}</span>
          </div>
          <div class="flex gap-1">
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
const emit = defineEmits(['delete'])
const { archivedPlayers, loading, getFullName, initials } = usePlayers()
</script>
