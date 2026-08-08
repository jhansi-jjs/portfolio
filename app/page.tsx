import { getPinnedRepos, getAllRepos } from '@/lib/github';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Certificates } from '@/components/sections/certificates';
import { Skills } from '@/components/sections/skills';
import { Achievements } from '@/components/sections/achievements';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/shared/footer';

export const revalidate = 3600; // 1-hour ISR revalidation

export default async function HomePage() {
  const [pinnedRes, allReposRes] = await Promise.all([
    getPinnedRepos(),
    getAllRepos(),
  ]);

  const rateLimit = pinnedRes.rateLimit || allReposRes.rateLimit || null;
  const isMockData = Boolean(pinnedRes.isMockData || allReposRes.isMockData);
  const error = pinnedRes.error || allReposRes.error || null;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
      <div className="space-y-12">
        <Hero />
        <About />
        <Experience />
        <Projects
          pinnedRepos={pinnedRes.data || []}
          allRepos={allReposRes.data || []}
          rateLimit={rateLimit}
          error={error}
          isMockData={isMockData}
        />
        <Certificates />
        <Skills />
        <Achievements />
        <Contact />
      </div>
      <Footer rateLimit={rateLimit} isMockData={isMockData} />
    </main>
  );
}
