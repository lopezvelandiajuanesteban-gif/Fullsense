export default function FloatingWhatsAppButton() {
  const mensaje = encodeURIComponent(
    "Hola, quiero información sobre los perfumes de Fullsense."
  );

  return (
    <a
      href={`https://wa.me/573151878609?text=${mensaje}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      title="Hablar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 fill-current"
        aria-hidden="true"
      >
        <path d="M19.11 17.2c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.59.14-.17.27-.68.87-.83 1.05-.15.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.41.12-.54.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.59-1.42-.81-1.95-.21-.5-.43-.43-.59-.44h-.5c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.14.18 1.91 2.92 4.63 4.09.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.15-1.28-.07-.11-.24-.18-.5-.32Z" />
        <path d="M16.01 3.2c-7.06 0-12.79 5.71-12.79 12.75 0 2.25.59 4.44 1.71 6.36L3 28.8l6.67-1.75a12.83 12.83 0 0 0 6.34 1.72h.01c7.06 0 12.79-5.71 12.79-12.75S23.08 3.2 16.01 3.2Zm0 23.4h-.01a10.7 10.7 0 0 1-5.46-1.49l-.39-.23-3.96 1.04 1.06-3.86-.25-.4a10.56 10.56 0 0 1-1.63-5.63c0-5.86 4.79-10.63 10.68-10.63 2.85 0 5.53 1.1 7.54 3.1a10.54 10.54 0 0 1 3.13 7.52c0 5.86-4.79 10.63-10.7 10.63Z" />
      </svg>
    </a>
  );
}