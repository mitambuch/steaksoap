export default function Noise() {
  return (
    <div className="pointer-events-none absolute inset-0 z-300 opacity-[0.55] mix-blend-soft-light">
      <div
        className="animate-noise absolute top-[-50%] left-[-50%] h-[200%] w-[200%] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
}
