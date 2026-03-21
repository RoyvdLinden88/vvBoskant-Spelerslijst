<template>
  <div>
    <h1>Nieuw project</h1>
    <ul>
      <li v-for="player in sortedPlayers" :key="player.id">
        {{ getFullName(player) }}
      </li>
    </ul>
    <form @submit.prevent="createPlayer()">
      <input
        type="text"
        v-model="firstName"
        placeholder="Voornaam"
        class="p-2 rounded-md"
      />
      <input
        type="text"
        v-model="middleName"
        placeholder="Tussenvoegsel"
        class="p-2 rounded-md"
      />
      <input
        type="text"
        v-model="lastName"
        placeholder="Achternaam"
        class="p-2 rounded-md"
      />
      <button type="submit" class="btn m-2">Toevoegen</button>
    </form>
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
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')

const sortedPlayers = computed(() => {
  return [...players.value].sort((a, b) => {
    const lastCompare = a.last_name.localeCompare(b.last_name)

    if (lastCompare !== 0) {
      return lastCompare
    }

    return a.first_name.localeCompare(b.first_name)
  })
})

onMounted(async () => {
  await getPlayers();
});

async function getPlayers() {
  const { data, error } = await client.from("players").select();
  players.value = data;
}

function getFullName(player) {
  return player.middle_name
    ? `${player.first_name} ${player.middle_name} ${player.last_name}`
    : `${player.first_name} ${player.last_name}`;
}

const createPlayer = async () => {
  const { data, error } = await client.from('players').insert({
    first_name: firstName.value,
    middle_name: middleName.value,
    last_name: lastName.value
  }).select().single()
  if (error) throw error
  firstName.value = ''
  middleName.value = ''
  lastName.value = ''
  players.value.push(data)
}
</script>
