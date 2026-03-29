export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { createClient } from '@supabase/supabase-js';
import ClientPage from './ClientPage';

export default async function Page() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data } = await supabase.from('site_content').select('key, value');
  
  const content: Record<string, string> = {
    hero_title: 'Maîtrisez le Prompt Engineering comme un Ingénieur.',
    hero_subtitle: 'Multipliez votre productivité . Automatisez vos workflows techniques.',
    hero_badge: 'Masterclass  Ouverture Prochaine',
    cta_text: "Rejoindre la Liste d'Attente",
    module1_title: 'Fondations & LLM',
    module2_title: 'Frameworks Avancés',
    module3_title: 'Automatisation Industrielle',
  };
  
  if (data) {
    data.forEach((item: { key: string; value: string }) => {
      content[item.key] = item.value;
    });
  }
  
  return <ClientPage content={content} />;
}
