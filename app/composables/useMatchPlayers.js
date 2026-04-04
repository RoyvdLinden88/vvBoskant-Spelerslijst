export function useMatchPlayers() {
  const client = useSupabaseClient()

  // Fetch existing player selections for a match, returns a map of player_id -> { boskant1, boskant2 }
  async function fetchMatchPlayers(matchId) {
    const { data, error } = await client
      .from('matches_players')
      .select()
      .eq('match_id', matchId)
    if (error) throw error

    const map = {}
    for (const row of data) {
      map[row.player_id] = { boskant1: row.boskant1, boskant2: row.boskant2 }
    }
    return map
  }

  // Save player selections for a match (upsert all, delete removed)
  async function saveMatchPlayers(matchId, playerSelections) {
    // Delete all existing records for this match first
    const { error: deleteError } = await client
      .from('matches_players')
      .delete()
      .eq('match_id', matchId)
    if (deleteError) throw deleteError

    // Only insert players where at least one checkbox is checked
    const rows = playerSelections
      .filter(p => p.boskant1 || p.boskant2)
      .map(p => ({
        match_id: matchId,
        player_id: p.player_id,
        boskant1: p.boskant1,
        boskant2: p.boskant2,
      }))

    if (rows.length === 0) return

    const { error: insertError } = await client
      .from('matches_players')
      .insert(rows)
    if (insertError) throw insertError
  }

  return { fetchMatchPlayers, saveMatchPlayers }
}