<template>
  <div class="card shadow-md mb-6 border-t-4" style="background: white; border-top-color: #1a3a6b;">
    <div class="card-body pb-5">
      <h2 class="card-title text-base uppercase tracking-wide font-bold mb-3" style="color: #1a3a6b;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Speler toevoegen
      </h2>
      <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          v-model="form.firstName"
          placeholder="Voornaam"
          required
          class="input input-bordered flex-1"
        />
        <input
          type="text"
          v-model="form.middleName"
          placeholder="Tussenvoegsel"
          class="input input-bordered flex-1 sm:max-w-28"
        />
        <input
          type="text"
          v-model="form.lastName"
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
</template>

<script setup>
const { saving, createPlayer, getFullName } = usePlayers()
const { showToast } = useToast()

const form = reactive({ firstName: '', middleName: '', lastName: '' })

async function handleSubmit() {
  const data = await createPlayer({ ...form })
  showToast(`${getFullName(data)} toegevoegd`)
  form.firstName = ''
  form.middleName = ''
  form.lastName = ''
}
</script>
