import Page from '../components/ui/Page';
import HeroParallax from '../components/home/HeroParallax';
import ServiceTiles from '../components/home/ServiceTiles';
import FrequentTests from '../components/home/FrequentTests';
import StatsCounter from '../components/home/StatsCounter';
import TrustBadges from '../components/home/TrustBadges';
import SedesPreview from '../components/home/SedesPreview';
import BlogPreview from '../components/home/BlogPreview';

export default function Home() {
  return (
    <Page
      title="Confialab — Laboratorio Clínico en Lima"
      description="Más de 15 años cuidando tu salud. Análisis clínicos, vacunación y atención a domicilio en Lima. Cotiza online y obtén resultados confiables."
    >
      <HeroParallax />
      <ServiceTiles />
      <FrequentTests />
      <StatsCounter />
      <TrustBadges />
      <SedesPreview />
      <BlogPreview />
    </Page>
  );
}
