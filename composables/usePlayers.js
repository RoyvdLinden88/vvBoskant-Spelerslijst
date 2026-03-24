export function usePlayers() {
const client = useSupabaseClient()

  const players = useState('players', () => [])
  const loading = ref(false)
  const saving = ref(false)

  const activePlayers = computed(() =>
    [...players.value]
      .filter(p => p.active !== false)
      .sort((a, b) => {
        const lc = a.last_name.localeCompare(b.last_name)
        return lc !== 0 ? lc : a.first_name.localeCompare(b.first_name)
      })
  )

  const archivedPlayers = computed(() =>
    [...players.value]
      .filter(p => p.active === false)
      .sort((a, b) => {
        const lc = a.last_name.localeCompare(b.last_name)
        return lc !== 0 ? lc : a.first_name.localeCompare(b.first_name)
      })
  )

  function getFullName(player) {
    return player.middle_name
      ? `${player.first_name} ${player.middle_name} ${player.last_name}`
      : `${player.first_name} ${player.last_name}`
  }

  function initials(player) {
    return `${player.first_name[0]}${player.last_name[0]}`.toUpperCase()
  }

  async function fetchPlayers() {
    loading.value = true
    try {
      const { data, error } = await client.from('players').select()
      if (error) throw error
      players.value = data
    } finally {
      loading.value = false
    }
  }

  async function createPlayer({ firstName, middleName, lastName }) {
    saving.value = true
    try {
      const { data, error } = await client.from('players').insert({
        first_name: firstName,
        middle_name: middleName || null,
        last_name: lastName,
        active: true,
      }).select().single()
      if (error) throw error
      players.value.push(data)
      return data
    } finally {
      saving.value = false
    }
  }

  async function updatePlayer(id, { firstName, middleName, lastName }) {
    saving.value = true
    try {
      const { data, error } = await client.from('players').update({
        first_name: firstName,
        middle_name: middleName || null,
        last_name: lastName,
      }).eq('id', id).select().single()
      if (error) throw error
      const idx = players.value.findIndex(p => p.id === id)
      if (idx !== -1) players.value[idx] = data
      return data
    } finally {
      saving.value = false
    }
  }

  async function archivePlayer(id) {
    saving.value = true
    try {
      const { data, error } = await client.from('players')
        .update({ active: false })
        .eq('id', id)
        .select().single()
      if (error) throw error
      const idx = players.value.findIndex(p => p.id === id)
      if (idx !== -1) players.value[idx] = data
      return data
    } finally {
      saving.value = false
    }
  }

  async function deletePlayer(id) {
    saving.value = true
    try {
      const { error } = await client.from('players').delete().eq('id', id)
      if (error) throw error
      players.value = players.value.filter(p => p.id !== id)
    } finally {
      saving.value = false
    }
  }

  return {
    players,
    loading,
    saving,
    activePlayers,
    archivedPlayers,
    getFullName,
    initials,
    fetchPlayers,
    createPlayer,
    updatePlayer,
    archivePlayer,
    deletePlayer,
  }
}
