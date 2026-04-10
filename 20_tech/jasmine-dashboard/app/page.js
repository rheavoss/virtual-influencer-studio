import { getSupabaseClient } from '@/lib/supabase';
import { FALLBACK_DATA } from '@/lib/fallback-data';
import PLDashboard from '@/components/PLDashboard';

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('your-project-ref')) {
    return FALLBACK_DATA;
  }
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('jasmine_pnl')
      .select('*')
      .order('month');
    if (error || !data || data.length === 0) return FALLBACK_DATA;
    return data;
  } catch {
    return FALLBACK_DATA;
  }
}

export const revalidate = 3600; // revalidate every hour

export default async function Page() {
  const data = await getData();
  return <PLDashboard data={data} />;
}
