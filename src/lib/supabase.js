import { createClient } from "@supabase/supabase-js";

// ⚠️ Supabase → Settings → API sayfasından al
const SUPABASE_URL  = "https://wwuuurdoqxgzppiumrie.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3dXV1cmRvcXhnenBwaXVtcmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxODM1NzEsImV4cCI6MjA4ODc1OTU3MX0.5cNLIxzRrsYRB3FkCyeKQT-5g-0BjDLSgVH52EF0TMA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);