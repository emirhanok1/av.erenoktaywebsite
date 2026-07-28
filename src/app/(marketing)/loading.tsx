// Homepage's loading boundary only (every other marketing route has its
// own loading.tsx). Matches HeroSlider's h-[100dvh] navy shape so the rare
// cache-miss/revalidation request doesn't cause a big layout shift when
// the real content swaps in.
export default function Loading() {
  return (
    <div className="h-[100dvh] w-full bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-accent border-t-white rounded-full animate-spin" />
        <p className="font-heading text-white text-sm tracking-widest uppercase">Yükleniyor...</p>
      </div>
    </div>
  )
}
