import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

export default function WhatsFloat() {
  return (
    <a
      href="https://wa.me/5591984862479"
      target="_blank"
      rel="noreferrer"
      title="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 active:scale-95"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/60" />
      <ChatBubbleLeftRightIcon className="relative h-6 w-6 text-white" />
    </a>
  );
}
