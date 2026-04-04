export function useMatches() {
  const client = useSupabaseClient()

  const matches = useState('matches', () => [])
  const loading = ref(false)
  const saving = ref(false)

  async function fetchMatches() {
    loading.value = true
    try {
      const { data, error } = await client
        .from('matches')
        .select()
        .order('boskant1_datum', { ascending: true })
      if (error) throw error
      matches.value = data
    } finally {
      loading.value = false
    }
  }

  async function createMatch(form, playerSelections = []) {
    saving.value = true
    try {
      const { data, error } = await client
        .from('matches')
        .insert(formToRow(form))
        .select()
        .single()
      if (error) throw error
      matches.value.push(data)

      if (playerSelections.length > 0) {
        const { saveMatchPlayers } = useMatchPlayers()
        await saveMatchPlayers(data.id, playerSelections)
      }

      return data
    } finally {
      saving.value = false
    }
  }

  async function updateMatch(id, form, playerSelections = []) {
    saving.value = true
    try {
      const { data, error } = await client
        .from('matches')
        .update(formToRow(form))
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      const idx = matches.value.findIndex(m => m.id === id)
      if (idx !== -1) matches.value[idx] = data

      const { saveMatchPlayers } = useMatchPlayers()
      await saveMatchPlayers(id, playerSelections)

      return data
    } finally {
      saving.value = false
    }
  }

  async function deleteMatch(id) {
    saving.value = true
    try {
      const { error } = await client.from('matches').delete().eq('id', id)
      if (error) throw error
      matches.value = matches.value.filter(m => m.id !== id)
    } finally {
      saving.value = false
    }
  }

  function formToRow(form) {
    return {
      boskant1_wedstrijd:   form.boskant1_wedstrijd   || null,
      boskant1_datum:       form.boskant1_datum        || null,
      boskant1_aanwezig:    form.boskant1_aanwezig     || null,
      boskant1_aanvang:     form.boskant1_aanvang      || null,
      boskant1_opmerkingen: form.boskant1_opmerkingen  || null,
      boskant2_wedstrijd:   form.boskant2_wedstrijd    || null,
      boskant2_datum:       form.boskant2_datum        || null,
      boskant2_aanwezig:    form.boskant2_aanwezig     || null,
      boskant2_aanvang:     form.boskant2_aanvang      || null,
      boskant2_opmerkingen: form.boskant2_opmerkingen  || null,
    }
  }

  function rowToForm(row) {
    return {
      boskant1_wedstrijd:   row.boskant1_wedstrijd   ?? '',
      boskant1_datum:       row.boskant1_datum        ?? '',
      boskant1_aanwezig:    row.boskant1_aanwezig     ?? '',
      boskant1_aanvang:     row.boskant1_aanvang      ?? '',
      boskant1_opmerkingen: row.boskant1_opmerkingen  ?? '',
      boskant2_wedstrijd:   row.boskant2_wedstrijd    ?? '',
      boskant2_datum:       row.boskant2_datum        ?? '',
      boskant2_aanwezig:    row.boskant2_aanwezig     ?? '',
      boskant2_aanvang:     row.boskant2_aanvang      ?? '',
      boskant2_opmerkingen: row.boskant2_opmerkingen  ?? '',
    }
  }

  return {
    matches,
    loading,
    saving,
    fetchMatches,
    createMatch,
    updateMatch,
    deleteMatch,
    rowToForm,
  }
}