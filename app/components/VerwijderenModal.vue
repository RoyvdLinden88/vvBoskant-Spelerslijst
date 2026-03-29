<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box rounded-none border-t-4 p-0" style="border-top-color: #b91c1c;">
      <div class="px-6 py-4 border-b bg-red-700">
        <h3 class="font-extrabold text-white uppercase tracking-wide">Speler verwijderen</h3>
      </div>
      <div class="p-6">
        <p class="text-sm">
          Weet je zeker dat je <span class="font-bold">{{ player ? getFullName(player) : '' }}</span> definitief wilt verwijderen?
        </p>
        <div class="modal-action mt-4">
          <button class="btn btn-ghost btn-sm uppercase tracking-wide font-bold" @click="close">Annuleren</button>
          <button
            class="btn btn-sm font-bold uppercase tracking-wide text-white border-0 bg-red-700 hover:bg-red-800"
            @click="handleDelete"
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
</template>

<script setup>
const { saving, deletePlayer, getFullName } = usePlayers()
const { showToast } = useToast()

const modal = ref(null)
const player = ref(null)

function open(p) {
  player.value = p
  modal.value.showModal()
}

function close() {
  modal.value.close()
  player.value = null
}

async function handleDelete() {
  const name = getFullName(player.value)
  await deletePlayer(player.value.id)
  close()
  showToast(`${name} verwijderd`, 'error')
}

defineExpose({ open })
</script>
