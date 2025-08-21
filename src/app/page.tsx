import { Hero } from '@/components/sections/hero';
import { Timer } from '@/components/sections/timer';
import { Auth } from '@/components/sections/auth';

export default function Home() {
  return (
    <main>
      <Hero />
      <Timer />
      <Auth />
    </main>
  );
}
