export default function InstagramFeed() {
  return (
    <div className="mx-auto w-full max-w-[765px] overflow-hidden rounded-2xl border border-white/10 bg-[var(--blue-mid)] shadow-2xl shadow-black/30">
      <iframe
        src="https://snapwidget.com/embed/1127167"
        title="Posts do Instagram da Academia Belfort"
        frameBorder="0"
        scrolling="no"
        className="aspect-[765/510] w-full border-none"
      />
    </div>
  );
}
