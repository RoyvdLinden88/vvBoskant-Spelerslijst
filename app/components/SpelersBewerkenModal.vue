<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box rounded-none border-t-4 p-0" style="border-top-color: #1a3a6b;">
      <div class="px-6 py-4 border-b" style="background-color: #1a3a6b;">
        <h3 class="font-extrabold text-white uppercase tracking-wide">Speler bewerken</h3>
      </div>
      <form @submit.prevent="handleUpdate" class="flex flex-col gap-4 p-6">
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
          <button type="button" class="btn btn-ghost btn-sm uppercase tracking-wide font-bold" @click="close">Annuleren</button>
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
</template>

<script setup>
const { saving, updatePlayer, getFullName } = usePlayers()
const { showToast } = useToast()

const modal = ref(null)
const editForm = reactive({ id: null, firstName: '', middleName: '', lastName: '' })

function open(player) {
  editForm.id = player.id
  editForm.firstName = player.first_name
  editForm.middleName = player.middle_name ?? ''
  editForm.lastName = player.last_name
  modal.value.showModal()
}

function close() {
  modal.value.close()
}

async function handleUpdate() {
  const data = await updatePlayer(editForm.id, editForm)
  close()
  showToast(`${getFullName(data)} opgeslagen`)
}

defineExpose({ open })
</script>
