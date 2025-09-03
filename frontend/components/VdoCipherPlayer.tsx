"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type VdoCipherPlayerProps = {
  otp: string;
  playbackInfo: string;
  configuration?: Record<string, string | number | boolean>;
  className?: string;
};

export default function VdoCipherPlayer({
  otp,
  playbackInfo,
  configuration,
  className,
}: VdoCipherPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoAdded, setIsVideoAdded] = useState(false);

  const loadVideo = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Limpa antes de inserir novo iframe
    container.innerHTML = "";

    const params = new URLSearchParams();
    const toAppend: Record<string, unknown> = {
      otp,
      playbackInfo,
      ...(configuration ?? {}),
    };

    for (const [key, value] of Object.entries(toAppend)) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }

    const iframe = document.createElement("iframe");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("allow", "autoplay; encrypted-media");
    iframe.setAttribute("frameborder", "0");
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.style.overflow = "auto";
    iframe.src = "https://player.vdocipher.com/v2/?" + params.toString();

    container.appendChild(iframe);
    setIsVideoAdded(true);
  }, [otp, playbackInfo, configuration]);

  // Remove iframe ao desmontar
  useEffect(() => {
    return () => {
      const container = containerRef.current;
      if (container) container.innerHTML = "";
    };
  }, []);

  const handleClick = useCallback(() => {
    if (!containerRef.current) return;

    if (isVideoAdded) {
      containerRef.current.textContent = 'Clique em "Adicionar vídeo"';
      setIsVideoAdded(false);
      return;
    }

    loadVideo();
  }, [isVideoAdded, loadVideo]);

  return (
    <div className={className}>
      <h2 className="mb-3">
        VdoCipher <span style={{ color: "red" }}>❤</span> Next.js
      </h2>

      <button onClick={handleClick} className="mb-3 px-3 py-2 rounded border">
        {isVideoAdded ? "Remover vídeo" : "Adicionar vídeo"}
      </button>

      <div
        className="vdo-container"
        ref={containerRef}
        style={{
          width: "100%",
          height: "56.25vw", // 16:9 responsivo; ajuste se preferir valor fixo
          maxHeight: 600,
          background: "#f6f6f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
        Clique em “Adicionar vídeo”
      </div>

      <div className="documentation mt-4 text-sm">
        <p>
          Para métodos e eventos do player, veja{" "}
          <a
            href="https://www.vdocipher.com/docs/player/v2/api-reference/accessing-player"
            target="_blank"
            rel="noreferrer">
            a documentação da API
          </a>
          .
        </p>
      </div>
    </div>
  );
}
