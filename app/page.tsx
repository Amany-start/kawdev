export const dynamic = 'force-dynamic';
import ClientPage from './ClientPage';
import { createClient } from '@supabase/supabase-js';

async function getContent() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data } = await supabase.from('site_content').select('key, value');
  const defaults: Record<string, string> = { hero_title: 'Maîtrisez le Prompt Engineering comme un Ingénieur.', hero_subtitle: 'Multipliez votre productivité par 10×.', hero_badge: 'Masterclass — Ouverture Prochaine', cta_text: "Rejoindre la Liste d'Attente", module1_title: 'Fondations & LLM', module2_title: 'Frameworks Avancés', module3_title: 'Automatisation Industrielle' };
  if (data) data.forEach((i: {key: string; value: string}) => { defaults[i.key] = i.value; });
  return defaults;
}

export default async function Page() {
  const content = await getContent();
  return <ClientPage content={content} />;
}
