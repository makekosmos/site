import { useState } from "react";
import { Fog, LinearGradient, Perspective, RadialGradient, Shader } from "shaders/react";

// Dusk over an endless horizon, in the colors of the Mundus icon.
// WebGPU only: without it the canvas stays transparent and the CSS gradient on `.sky` shows through.
const SKY_STOPS = [
  { color: "#07081a", position: 0 },
  { color: "#191b4a", position: 0.3 },
  { color: "#5a54c9", position: 0.52 },
  { color: "#d69bd2", position: 0.6 },
  { color: "#ffdcc4", position: 0.635 },
  { color: "#9c86d6", position: 0.67 },
  { color: "#2d2a5a", position: 0.8 },
  { color: "#0a0a10", position: 1 },
];

// Alpha mask that keeps the cloud sea below the horizon.
const SEA_MASK = [
  { color: "rgba(255,255,255,0)", position: 0 },
  { color: "rgba(255,255,255,0)", position: 0.625 },
  { color: "rgba(255,255,255,0.85)", position: 0.72 },
  { color: "rgba(255,255,255,1)", position: 1 },
];

const SUN_GLOW = [
  { color: "rgba(255,226,206,0.85)", position: 0 },
  { color: "rgba(232,150,210,0.35)", position: 0.35 },
  { color: "rgba(120,100,220,0)", position: 1 },
];

export default function SkyShader() {
  const [ready, setReady] = useState(false);

  return (
    <Shader className={`sky-canvas${ready ? " is-ready" : ""}`} disableTelemetry onReady={() => setReady(true)}>
      <LinearGradient stops={SKY_STOPS} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} colorSpace="oklab" />
      <LinearGradient id="sea" visible={false} stops={SEA_MASK} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} />
      <Perspective tilt={72} fov={70} zoom={1.6} offset={{ x: 0.5, y: 0.5 }} edges="mirror" maskSource="sea">
        <Fog colorA="#ffe2d2" colorB="#2f2b72" speed={0.35} turbulence={0.8} detail={10} mouseInfluence={0} />
      </Perspective>
      <RadialGradient
        stops={SUN_GLOW}
        center={{ x: 0.68, y: 0.62 }}
        radius={0.28}
        aspect={0.4}
        blendMode="screen"
        opacity={0.75}
      />
    </Shader>
  );
}
