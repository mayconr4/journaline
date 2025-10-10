import Image from "next/image";

export default function Cabecalho() {
  return (
    <header>
      <Image
        src="/images/logo.png"
        alt="Journaline logo"
        width={150}
        height={150}
      />
    </header>
  );
}
