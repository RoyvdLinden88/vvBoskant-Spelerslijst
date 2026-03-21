<template>
  <div class="min-h-screen py-10 px-4" style="background-color: #f0f2f0;">
    <div class="max-w-2xl mx-auto">

      <!-- Toast notification -->
      <Transition name="toast">
        <div
          v-if="toast.visible"
          class="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded shadow-lg text-white text-sm font-semibold"
          :style="{ backgroundColor: toast.color }"
        >
          <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else-if="toast.type === 'archive'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          {{ toast.message }}
        </div>
      </Transition>

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

      <!-- Add player form -->
      <div class="card shadow-md mb-6 border-t-4" style="background: white; border-top-color: #1a3a6b;">
        <div class="card-body pb-5">
          <h2 class="card-title text-base uppercase tracking-wide font-bold mb-3" style="color: #1a3a6b;">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Speler toevoegen
          </h2>
          <form @submit.prevent="createPlayer" class="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              v-model="newPlayer.firstName"
              placeholder="Voornaam"
              required
              class="input input-bordered flex-1"
            />
            <input
              type="text"
              v-model="newPlayer.middleName"
              placeholder="Tussenvoegsel"
              class="input input-bordered flex-1 sm:max-w-28"
            />
            <input
              type="text"
              v-model="newPlayer.lastName"
              placeholder="Achternaam"
              required
              class="input input-bordered flex-1"
            />
            <button
              type="submit"
              class="btn font-bold uppercase tracking-wide text-white border-0 hover:opacity-90"
              style="background-color: #1a3a6b; min-width: 7rem;"
              :disabled="saving"
            >
              <span v-if="saving" class="loading loading-spinner loading-sm"></span>
              <span v-else>Toevoegen</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Active players list -->
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
                <!-- Edit -->
                <button
                  @click="openEditModal(player)"
                  class="btn btn-ghost btn-xs btn-square hover:bg-blue-100"
                  style="color: #1a3a6b;"
                  title="Bewerken"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <!-- Archive -->
                <button
                  @click="confirmArchive(player)"
                  class="btn btn-ghost btn-xs btn-square hover:bg-amber-50"
                  style="color: #b45309;"
                  title="Archiveren"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </button>
                <!-- Delete -->
                <button
                  @click="confirmDelete(player)"
                  class="btn btn-ghost btn-xs btn-square hover:bg-red-50"
                  style="color: #b91c1c;"
                  title="Verwijderen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Archived players list -->
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
            <span class="text-xs font-bold uppercase tracking-widest text-white">Acties</span>
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
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-6 text-center text-xs font-semibold uppercase tracking-widest" style="color: #1a3a6b;">
        V.V. Boskant — Spelerslijst selectie
      </div>
    </div>

    <!-- Edit modal -->
    <dialog ref="editModal" class="modal">
      <div class="modal-box rounded-none border-t-4 p-0" style="border-top-color: #1a3a6b;">
        <div class="px-6 py-4 border-b" style="background-color: #1a3a6b;">
          <h3 class="font-extrabold text-white uppercase tracking-wide">Speler bewerken</h3>
        </div>
        <form @submit.prevent="updatePlayer" class="flex flex-col gap-4 p-6">
          <div class="form-control">
            <label class="label py-1"><span class="label-text font-semibold text-xs uppercase tracking-wide">Voornaam</span></label>
            <input type="text" v-model="editForm.firstName" required class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label py-1"><span class="label-text font-semibold text-xs uppercase tracking-wide">Tussenvoegsel</span></label>
            <input type="text" v-model="editForm.middleName" class="input input-bordered" placeholder="Optioneel" />
          </div>
          <div class="form-control">
            <label class="label py-1"><span class="label-text font-semibold text-xs uppercase tracking-wide">Achternaam</span></label>
            <input type="text" v-model="editForm.lastName" required class="input input-bordered" />
          </div>
          <div class="modal-action mt-1">
            <button type="button" class="btn btn-ghost btn-sm uppercase tracking-wide font-bold" @click="closeEditModal">Annuleren</button>
            <button
              type="submit"
              class="btn btn-sm font-bold uppercase tracking-wide text-white border-0 hover:opacity-90"
              style="background-color: #1a3a6b;"
              :disabled="saving"
            >
              <span v-if="saving" class="loading loading-spinner loading-sm"></span>
              <span v-else>Opslaan</span>
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop"><button>close</button></form>
    </dialog>

    <!-- Archive confirm modal -->
    <dialog ref="archiveModal" class="modal">
      <div class="modal-box rounded-none border-t-4 p-0" style="border-top-color: #b45309;">
        <div class="px-6 py-4 border-b bg-amber-700">
          <h3 class="font-extrabold text-white uppercase tracking-wide">Speler archiveren</h3>
        </div>
        <div class="p-6">
          <p class="text-sm">
            Weet je zeker dat je <span class="font-bold">{{ playerToArchive ? getFullName(playerToArchive) : '' }}</span> wilt archiveren?
            De speler blijft bewaard maar is niet meer actief.
          </p>
          <div class="modal-action mt-4">
            <button class="btn btn-ghost btn-sm uppercase tracking-wide font-bold" @click="closeArchiveModal">Annuleren</button>
            <button
              class="btn btn-sm font-bold uppercase tracking-wide text-white border-0 bg-amber-700 hover:bg-amber-800"
              @click="archivePlayer"
              :disabled="saving"
            >
              <span v-if="saving" class="loading loading-spinner loading-sm"></span>
              <span v-else>Archiveren</span>
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop"><button>close</button></form>
    </dialog>

    <!-- Delete confirm modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box rounded-none border-t-4 p-0" style="border-top-color: #b91c1c;">
        <div class="px-6 py-4 border-b bg-red-700">
          <h3 class="font-extrabold text-white uppercase tracking-wide">Speler verwijderen</h3>
        </div>
        <div class="p-6">
          <p class="text-sm">
            Weet je zeker dat je <span class="font-bold">{{ playerToDelete ? getFullName(playerToDelete) : '' }}</span> definitief wilt verwijderen?
          </p>
          <div class="modal-action mt-4">
            <button class="btn btn-ghost btn-sm uppercase tracking-wide font-bold" @click="closeDeleteModal">Annuleren</button>
            <button
              class="btn btn-sm font-bold uppercase tracking-wide text-white border-0 bg-red-700 hover:bg-red-800"
              @click="deletePlayer"
              :disabled="saving"
            >
              <span v-if="saving" class="loading loading-spinner loading-sm"></span>
              <span v-else>Verwijderen</span>
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop"><button>close</button></form>
    </dialog>
  </div>
</template>

<script setup>
import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();
const client = createClient(
  config.public.supabase.url,
  config.public.supabase.key,
);

const players = ref([]);
const loading = ref(true);
const saving = ref(false);

const newPlayer = reactive({ firstName: '', middleName: '', lastName: '' });

const editModal = ref(null);
const editForm = reactive({ id: null, firstName: '', middleName: '', lastName: '' });

const archiveModal = ref(null);
const playerToArchive = ref(null);

const deleteModal = ref(null);
const playerToDelete = ref(null);

// Toast
const toast = reactive({ visible: false, message: '', type: 'success', color: '#15803d', _timer: null });

function showToast(message, type = 'success') {
  if (toast._timer) clearTimeout(toast._timer);
  toast.message = message;
  toast.type = type;
  toast.color = type === 'archive' ? '#b45309' : type === 'error' ? '#b91c1c' : '#15803d';
  toast.visible = true;
  toast._timer = setTimeout(() => { toast.visible = false; }, 3000);
}

const activePlayers = computed(() =>
  [...players.value]
    .filter(p => p.active !== false)
    .sort((a, b) => {
      const lc = a.last_name.localeCompare(b.last_name);
      return lc !== 0 ? lc : a.first_name.localeCompare(b.first_name);
    })
);

const archivedPlayers = computed(() =>
  [...players.value]
    .filter(p => p.active === false)
    .sort((a, b) => {
      const lc = a.last_name.localeCompare(b.last_name);
      return lc !== 0 ? lc : a.first_name.localeCompare(b.first_name);
    })
);

onMounted(async () => {
  await getPlayers();
  loading.value = false;
});

async function getPlayers() {
  const { data, error } = await client.from("players").select();
  if (error) throw error;
  players.value = data;
}

function getFullName(player) {
  return player.middle_name
    ? `${player.first_name} ${player.middle_name} ${player.last_name}`
    : `${player.first_name} ${player.last_name}`;
}

function initials(player) {
  return `${player.first_name[0]}${player.last_name[0]}`.toUpperCase();
}

async function createPlayer() {
  saving.value = true;
  try {
    const { data, error } = await client.from('players').insert({
      first_name: newPlayer.firstName,
      middle_name: newPlayer.middleName || null,
      last_name: newPlayer.lastName,
      active: true,
    }).select().single();
    if (error) throw error;
    players.value.push(data);
    newPlayer.firstName = '';
    newPlayer.middleName = '';
    newPlayer.lastName = '';
    showToast(`${getFullName(data)} toegevoegd`);
  } finally {
    saving.value = false;
  }
}

function openEditModal(player) {
  editForm.id = player.id;
  editForm.firstName = player.first_name;
  editForm.middleName = player.middle_name ?? '';
  editForm.lastName = player.last_name;
  editModal.value.showModal();
}

function closeEditModal() {
  editModal.value.close();
}

async function updatePlayer() {
  saving.value = true;
  try {
    const { data, error } = await client.from('players').update({
      first_name: editForm.firstName,
      middle_name: editForm.middleName || null,
      last_name: editForm.lastName,
    }).eq('id', editForm.id).select().single();
    if (error) throw error;
    const idx = players.value.findIndex(p => p.id === editForm.id);
    if (idx !== -1) players.value[idx] = data;
    closeEditModal();
    showToast(`${getFullName(data)} opgeslagen`);
  } finally {
    saving.value = false;
  }
}

function confirmArchive(player) {
  playerToArchive.value = player;
  archiveModal.value.showModal();
}

function closeArchiveModal() {
  archiveModal.value.close();
  playerToArchive.value = null;
}

async function archivePlayer() {
  if (!playerToArchive.value) return;
  saving.value = true;
  try {
    const { data, error } = await client.from('players')
      .update({ active: false })
      .eq('id', playerToArchive.value.id)
      .select().single();
    if (error) throw error;
    const idx = players.value.findIndex(p => p.id === playerToArchive.value.id);
    if (idx !== -1) players.value[idx] = data;
    closeArchiveModal();
    showToast(`${getFullName(data)} gearchiveerd`, 'archive');
  } finally {
    saving.value = false;
  }
}

function confirmDelete(player) {
  playerToDelete.value = player;
  deleteModal.value.showModal();
}

function closeDeleteModal() {
  deleteModal.value.close();
  playerToDelete.value = null;
}

async function deletePlayer() {
  if (!playerToDelete.value) return;
  saving.value = true;
  try {
    const name = getFullName(playerToDelete.value);
    const { error } = await client.from('players').delete().eq('id', playerToDelete.value.id);
    if (error) throw error;
    players.value = players.value.filter(p => p.id !== playerToDelete.value.id);
    closeDeleteModal();
    showToast(`${name} verwijderd`, 'error');
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>