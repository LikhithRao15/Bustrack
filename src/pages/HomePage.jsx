import Hero from '../components/Hero';

export default function HomePage({ onSearch }) {
  return (
    <main className="flex-grow">
      <Hero onSearch={onSearch} />
    </main>
  );
}