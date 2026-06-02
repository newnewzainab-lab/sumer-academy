lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gvgnwikgnxtrssfcmrrv.supabase.co'
const supabaseAnonKey = 'sb_publishable_h0xu7SSvhb6jYN1w893PPg_hs4gY_'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
