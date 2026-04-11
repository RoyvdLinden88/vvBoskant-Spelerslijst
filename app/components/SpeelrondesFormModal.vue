<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box rounded-none border-t-4 p-0 max-w-2xl w-full max-h-[90dvh] overflow-y-auto" style="border-top-color: #1a3a6b;">
      <div class="px-6 py-4 border-b" style="background-color: #1a3a6b;">
        <h3 class="font-extrabold text-white uppercase tracking-wide">
          {{ isEditing ? 'Speelronde bewerken' : 'Speelronde toevoegen' }}
        </h3>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 flex flex-col gap-6">

        <!-- Two columns: boskant1 | boskant2 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <!-- Boskant 1 -->
          <div class="flex flex-col gap-3">
            <h4 class="text-xs font-extrabold uppercase tracking-widest pb-1 border-b" style="color: #1a3a6b; border-color: #1a3a6b;">Boskant 1</h4>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Wedstrijd</span></label>
              <input type="text" v-model="form.boskant1_wedstrijd" class="input input-bordered input-sm placeholder:text-xs" placeholder="bv. VV Boskant — FC Oss" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Datum</span></label>
              <input type="date" v-model="form.boskant1_datum" class="input input-bordered input-sm" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Aanvang</span></label>
              <input type="time" v-model="form.boskant1_aanvang" class="input input-bordered input-sm" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Aanwezig</span></label>
              <input type="time" v-model="form.boskant1_aanwezig" class="input input-bordered input-sm" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Opmerkingen</span></label>
              <textarea v-model="form.boskant1_opmerkingen" class="textarea textarea-bordered textarea-sm placeholder:text-xs" placeholder="Optioneel" rows="2" />
            </div>
          </div>

          <!-- Boskant 2 -->
          <div class="flex flex-col gap-3">
            <h4 class="text-xs font-extrabold uppercase tracking-widest pb-1 border-b" style="color: #1a3a6b; border-color: #1a3a6b;">Boskant 2</h4>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Wedstrijd</span></label>
              <input type="text" v-model="form.boskant2_wedstrijd" class="input input-bordered input-sm placeholder:text-xs" placeholder="bv. VV Boskant — FC Oss" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Datum</span></label>
              <input type="date" v-model="form.boskant2_datum" class="input input-bordered input-sm" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Aanvang</span></label>
              <input type="time" v-model="form.boskant2_aanvang" class="input input-bordered input-sm" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Aanwezig</span></label>
              <input type="time" v-model="form.boskant2_aanwezig" class="input input-bordered input-sm" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs font-semibold uppercase tracking-wide">Opmerkingen</span></label>
              <textarea v-model="form.boskant2_opmerkingen" class="textarea textarea-bordered textarea-sm placeholder:text-xs" placeholder="Optioneel" rows="2" />
            </div>
          </div>
        </div>

        <!-- Players section -->
        <div class="border rounded-lg overflow-hidden" style="border-color: #1a3a6b40;">
          <!-- Collapsible toggle -->
          <button
            type="button"
            class="w-full flex items-center justify-between px-4 py-3 text-left font-extrabold text-xs uppercase tracking-widest transition-colors hover:bg-blue-50"
            style="color: #1a3a6b;"
            @click="playersOpen = !playersOpen"
          >
            <span class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Spelers selecteren
              <span v-if="selectedCount > 0" class="badge badge-sm text-white border-0 font-bold" style="background-color: #1a3a6b;">
                {{ selectedCount }}
              </span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform"
              :class="{ 'rotate-180': playersOpen }"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Player list -->
          <div v-if="playersOpen" class="border-t" style="border-color: #1a3a6b40;">
            <!-- Loading players -->
            <div v-if="loadingPlayers" class="flex justify-center py-6">
              <span class="loading loading-spinner loading-sm" style="color: #1a3a6b;"></span>
            </div>

            <div v-else-if="playerSelections.length === 0" class="py-6 text-center text-xs text-gray-400">
              Geen actieve spelers gevonden
            </div>

            <div v-else>
              <!-- Column headers -->
              <div class="grid grid-cols-[1fr_auto_auto] items-center px-4 py-2 bg-gray-50 border-b text-xs font-bold uppercase tracking-widest text-gray-400" style="border-color: #1a3a6b20;">
                <span>Speler</span>
                <span class="w-16 text-center" style="color: #1a3a6b;">B1</span>
                <span class="w-16 text-center" style="color: #1a3a6b;">B2</span>
              </div>

              <ul class="divide-y" style="border-color: #1a3a6b10;">
                <li
                  v-for="p in playerSelections"
                  :key="p.player_id"
                  class="grid grid-cols-[1fr_auto_auto] items-center px-4 py-2.5 hover:bg-blue-50 transition-colors"
                >
                  <span class="text-sm font-semibold" style="color: #111;">{{ p.name }}</span>
                  <label class="w-16 flex justify-center cursor-pointer">
                    <input type="checkbox" v-model="p.boskant1" class="checkbox checkbox-sm" style="--chkbg: #1a3a6b; --chkfg: white;" />
                  </label>
                  <label class="w-16 flex justify-center cursor-pointer">
                    <input type="checkbox" v-model="p.boskant2" class="checkbox checkbox-sm" style="--chkbg: #1a3a6b; --chkfg: white;" />
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Active checkbox -->
        <div class="form-control">
          <label class="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" v-model="setActive" class="checkbox checkbox-sm" style="--chkbg: #1a3a6b; --chkfg: white;" />
            <span class="text-sm font-semibold" style="color: #111;">Stel deze speelronde in als actieve speelronde</span>
          </label>
        </div>

        <div class="modal-action mt-0">
          <button type="button" class="btn btn-ghost btn-sm uppercase tracking-wide font-bold" @click="close">Annuleren</button>
          <button
            type="submit"
            class="btn btn-sm font-bold uppercase tracking-wide text-white border-0 hover:opacity-90"
            style="background-color: #1a3a6b;"
            :disabled="saving"
          >
            <span v-if="saving" class="loading loading-spinner loading-sm"></span>
            <span v-else>{{ isEditing ? 'Opslaan' : 'Toevoegen' }}</span>
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
  </dialog>
</template>

<script setup>
const { saving, createMatch, updateMatch, rowToForm } = useMatches()
const { fetchMatchPlayers, saveMatchPlayers } = useMatchPlayers()
const { activePlayers } = usePlayers()
const { showToast } = useToast()

const modal = ref(null)
const editingId = ref(null)
const isEditing = computed(() => editingId.value !== null)
const playersOpen = ref(false)
const loadingPlayers = ref(false)
const setActive = ref(true)

const emptyForm = () => ({
  boskant1_wedstrijd: '', boskant1_datum: '', boskant1_aanvang: '', boskant1_aanwezig: '', boskant1_opmerkingen: '',
  boskant2_wedstrijd: '', boskant2_datum: '', boskant2_aanvang: '', boskant2_aanwezig: '', boskant2_opmerkingen: '',
})

const form = reactive(emptyForm())

// Flat list of player selections: { player_id, name, boskant1, boskant2 }
const playerSelections = ref([])

const selectedCount = computed(() =>
  playerSelections.value.filter(p => p.boskant1 || p.boskant2).length
)

function buildPlayerSelections(existingMap = {}) {
  playerSelections.value = activePlayers.value.map(p => ({
    player_id: p.id,
    name: p.middle_name
      ? `${p.first_name} ${p.middle_name} ${p.last_name}`
      : `${p.first_name} ${p.last_name}`,
    boskant1: existingMap[p.id]?.boskant1 ?? false,
    boskant2: existingMap[p.id]?.boskant2 ?? false,
  }))
}

async function open(match = null) {
  playersOpen.value = false
  loadingPlayers.value = true

  if (match) {
    editingId.value = match.id
    setActive.value = match.active ?? false
    Object.assign(form, rowToForm(match))
    const existingMap = await fetchMatchPlayers(match.id)
    buildPlayerSelections(existingMap)
  } else {
    editingId.value = null
    setActive.value = true
    Object.assign(form, emptyForm())
    buildPlayerSelections()
  }

  loadingPlayers.value = false
  modal.value.showModal()
}

function close() {
  modal.value.close()
}

async function handleSubmit() {
  if (isEditing.value) {
    await updateMatch(editingId.value, form, playerSelections.value, setActive.value)
    showToast('Speelronde opgeslagen')
  } else {
    await createMatch(form, playerSelections.value, setActive.value)
    showToast('Speelronde toegevoegd')
  }
  close()
}

defineExpose({ open })
</script>