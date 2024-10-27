import { AudioTranscriber } from "@/components/audio-transcriber";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen flex flex-col">
      <main className="flex-grow">
        <AudioTranscriber />
      </main>
      <footer className="text-right p-4">
        <p className="text-sm text-gray-400">
          Made by Pratik © {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}