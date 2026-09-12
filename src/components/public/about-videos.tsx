"use client";

import { useEffect, useState } from "react";
import { getSiteContent } from "@/lib/content";
import Reveal from "./reveal";

interface VideoItem {
  title: string;
  url: string;
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function VideoFrame({ video, small = false, autoplay = false }: { video: VideoItem; small?: boolean; autoplay?: boolean }) {
  const id = extractYouTubeId(video.url)!;
  // Browsers only allow autoplay when the video starts muted.
  const src = autoplay
    ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`
    : `https://www.youtube.com/embed/${id}`;
  return (
    <div className="rounded-xl overflow-hidden border border-gray-line">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={src}
          title={video.title || "Video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {video.title && !small && (
        <div className="p-3">
          <div className="text-sm font-semibold text-brand-ink">{video.title}</div>
        </div>
      )}
    </div>
  );
}

export default function AboutVideos() {
  const [content, setContent] = useState<Record<string, any>>({});

  useEffect(() => { getSiteContent().then(setContent); }, []);

  const title = content.about_videos_title || "About Us";
  const description = content.about_videos_description || "";
  const videos: VideoItem[] = (content.about_videos || []).filter((v: VideoItem) => v.url && extractYouTubeId(v.url)).slice(0, 3);
  const [featured, ...smallVideos] = videos;

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="text-center mb-10">
          <span className="text-kicker text-brand">About Us</span>
          <h2 className="text-section-title text-brand-ink mt-3 mb-3">{title}</h2>
          <div className="w-16 h-1 bg-brand mx-auto" />
        </Reveal>

        {videos.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Left — description (blue) */}
            <Reveal className="bg-brand text-white rounded-2xl p-8 h-full flex flex-col justify-center">
              {description && (
                <p className="text-white/90 text-[16px] leading-relaxed whitespace-pre-line">{description}</p>
              )}
            </Reveal>

            {/* Right — videos (white): one large featured video, up to two small ones below */}
            <Reveal delay={120} className="bg-white border border-gray-line rounded-2xl p-8 h-full flex flex-col justify-center">
              <div className="space-y-4">
                {featured && <VideoFrame video={featured} autoplay />}
                {smallVideos.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {smallVideos.map((v, i) => (
                      <VideoFrame key={i} video={v} small />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        ) : (
          description && (
            <p className="text-body-lg max-w-[70ch] mx-auto text-center whitespace-pre-line">{description}</p>
          )
        )}
      </div>
    </section>
  );
}
