"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

/* ══════════════════════════════════════════════════════
   HIGH-PRECISION PROCEDURAL WORLD MAP & BRANDING TEXTURE
   2048×1024 equirectangular canvas.
   - Elegant stylized vector continents with tech dot-matrix
   - Global tech flight arcs and city telemetry beacons
   - Continuous 360° equatorial ribbon featuring "shahidur.dev"
     seamlessly flowing across all perspectives.
══════════════════════════════════════════════════════ */
function buildGlobeTexture() {
  const W = 2048, H = 1024;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");

  // Helper: map (lon [-180, 180], lat [-90, 90]) to canvas (X, Y)
  const toXY = (lon, lat) => [
    ((lon + 180) / 360) * W,
    ((90 - lat) / 180) * H,
  ];

  // ── 1. Cosmic Obsidian Background ────────────────────
  const bg = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, W / 1.8);
  bg.addColorStop(0,   "#010402");
  bg.addColorStop(0.5, "#010301");
  bg.addColorStop(1,   "#000201");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle starry grid dots across space
  ctx.fillStyle = "rgba(0, 245, 155, 0.05)";
  for (let sx = 20; sx < W; sx += 80) {
    for (let sy = 20; sy < H; sy += 80) {
      if ((sx + sy) % 160 === 0) {
        ctx.fillRect(sx, sy, 1.2, 1.2);
      }
    }
  }

  // ── 2. Vector Continent Polygons ──────────────────────
  const CONTINENTS = [
    // North America
    [
      [-168, 65], [-160, 71], [-130, 70], [-95, 72], [-75, 75], [-60, 62],
      [-55, 50], [-65, 44], [-75, 35], [-80, 26], [-97, 26], [-105, 20],
      [-85, 15], [-77, 8], [-85, 12], [-100, 18], [-108, 28], [-118, 34],
      [-124, 48], [-135, 58], [-165, 60]
    ],
    // South America
    [
      [-77, 10], [-60, 10], [-50, 0], [-35, -5], [-35, -12], [-40, -22],
      [-50, -32], [-55, -40], [-66, -55], [-75, -50], [-72, -35], [-70, -18],
      [-80, -2], [-80, 8]
    ],
    // Europe
    [
      [-10, 36], [0, 43], [12, 43], [20, 38], [28, 41], [32, 46],
      [40, 56], [32, 65], [16, 68], [8, 58], [0, 50], [-8, 44]
    ],
    // Scandinavia
    [
      [5, 58], [12, 57], [18, 60], [28, 71], [24, 71], [15, 66], [5, 62]
    ],
    // UK & Ireland
    [
      [-10, 52], [-6, 58], [-2, 58], [1, 52], [-5, 50]
    ],
    // Africa
    [
      [-17, 15], [-17, 28], [-5, 36], [10, 37], [25, 32], [33, 31],
      [36, 24], [43, 12], [51, 10], [42, -5], [36, -20], [30, -32],
      [20, -35], [17, -33], [12, -15], [9, 4], [-4, 5], [-15, 11]
    ],
    // Madagascar
    [
      [44, -13], [50, -15], [47, -25], [44, -25]
    ],
    // Asia
    [
      [32, 31], [40, 40], [50, 42], [55, 30], [60, 25], [68, 24],
      [76, 9], [82, 14], [88, 22], [98, 18], [104, 10], [102, 2],
      [105, 12], [108, 15], [118, 24], [122, 32], [126, 40], [132, 43],
      [140, 52], [160, 60], [178, 66], [170, 72], [130, 74], [100, 77],
      [70, 72], [55, 60], [45, 55], [35, 45]
    ],
    // Japan
    [
      [130, 32], [135, 35], [141, 43], [143, 40], [137, 34], [131, 31]
    ],
    // Australia
    [
      [114, -22], [125, -15], [135, -12], [145, -15], [152, -28],
      [153, -33], [148, -38], [138, -36], [130, -32], [115, -34], [113, -27]
    ],
    // New Zealand
    [
      [166, -46], [174, -41], [178, -37], [174, -36], [170, -42]
    ],
    // Indonesia / SE Asia islands
    [
      [96, 4], [106, -6], [115, -8], [120, -8], [115, -3], [100, 0]
    ]
  ];

  // Tech Dot-Matrix Pattern for Continent Interiors
  const dotCanvas = document.createElement("canvas");
  dotCanvas.width = 16;
  dotCanvas.height = 16;
  const dCtx = dotCanvas.getContext("2d");
  dCtx.fillStyle = "rgba(0, 245, 155, 0.40)";
  dCtx.beginPath();
  dCtx.arc(8, 8, 1.8, 0, Math.PI * 2);
  dCtx.fill();
  const dotPattern = ctx.createPattern(dotCanvas, "repeat");

  // Render Continents
  for (const poly of CONTINENTS) {
    ctx.save();
    ctx.beginPath();
    const [startLon, startLat] = poly[0];
    const [sx, sy] = toXY(startLon, startLat);
    ctx.moveTo(sx, sy);

    for (let i = 1; i < poly.length; i++) {
      const [lon, lat] = poly[i];
      const [px, py] = toXY(lon, lat);
      ctx.lineTo(px, py);
    }
    ctx.closePath();

    // Continent dark glowing fill
    ctx.fillStyle = "rgba(0, 245, 155, 0.07)";
    ctx.fill();

    // High-tech dot-matrix stippling inside landmass
    if (dotPattern) {
      ctx.fillStyle = dotPattern;
      ctx.fill();
    }

    // Glowing perimeter outline
    ctx.shadowColor = "#00f59b";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "rgba(0, 245, 155, 0.65)";
    ctx.lineWidth = 2.0;
    ctx.stroke();

    ctx.restore();
  }

  // ── 3. High-Tech Precision Grid ───────────────────────
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 245, 155, 0.08)";
  ctx.setLineDash([4, 8]);

  // Latitude parallels (excluding equator which has dedicated ribbon)
  for (let lat = -60; lat <= 60; lat += 30) {
    if (lat === 0) continue;
    const y = ((90 - lat) / 180) * H;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Longitude meridians
  for (let lon = 0; lon <= 360; lon += 30) {
    const x = (lon / 360) * W;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  ctx.restore();

  // ── 4. Global Flight Arcs ─────────────────────────────
  const CONNECTIONS = [
    { from: [90.4, 23.7],   to: [139.7, 35.7]  }, // Dhaka → Tokyo
    { from: [90.4, 23.7],   to: [-0.12, 51.5]  }, // Dhaka → London
    { from: [90.4, 23.7],   to: [103.8, 1.4]   }, // Dhaka → Singapore
    { from: [-0.12, 51.5],  to: [-74.0, 40.7]  }, // London → New York
    { from: [-74.0, 40.7],  to: [-122.4, 37.8] }, // New York → San Francisco
    { from: [103.8, 1.4],   to: [151.2, -33.9] }, // Singapore → Sydney
    { from: [55.3, 25.3],   to: [90.4, 23.7]   }, // Dubai → Dhaka
    { from: [-0.12, 51.5],  to: [55.3, 25.3]   }, // London → Dubai
  ];

  for (const { from, to } of CONNECTIONS) {
    const [x1, y1] = toXY(from[0], from[1]);
    const [x2, y2] = toXY(to[0], to[1]);

    // Only draw if not crossing wide canvas seam wrap
    if (Math.abs(x1 - x2) < W * 0.45) {
      const midX = (x1 + x2) / 2;
      const midY = Math.min(y1, y2) - 45; // arch upwards

      ctx.save();
      ctx.strokeStyle = "rgba(0, 245, 155, 0.40)";
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.stroke();

      // Traveling data packet pulse
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#00f59b";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(midX, midY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ── 5. City Hub Beacons ───────────────────────────────
  const CITIES = [
    { name: "DHAKA [HOME BASE]", lat: 23.7, lon: 90.4, home: true },
    { name: "TOKYO",            lat: 35.7, lon: 139.7, home: false },
    { name: "LONDON",           lat: 51.5, lon: -0.12, home: false },
    { name: "NEW YORK",         lat: 40.7, lon: -74.0, home: false },
    { name: "SAN FRANCISCO",    lat: 37.8, lon: -122.4, home: false },
    { name: "SINGAPORE",        lat: 1.4,  lon: 103.8, home: false },
    { name: "SYDNEY",           lat: -33.9, lon: 151.2, home: false },
    { name: "DUBAI",            lat: 25.3, lon: 55.3, home: false },
  ];

  for (const city of CITIES) {
    const [cx, cy] = toXY(city.lon, city.lat);

    if (city.home) {
      // Dhaka Pulse Radar rings
      ctx.save();
      for (const r of [14, 26, 40]) {
        ctx.strokeStyle = `rgba(0, 245, 155, ${0.8 - r * 0.015})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Brilliant core
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#00f59b";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Home Beacon Label
      ctx.font = "bold 13px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "#00f59b";
      ctx.shadowBlur = 6;
      ctx.fillText(`★ ${city.name}`, cx + 18, cy + 4);
      ctx.restore();
    } else {
      // Standard tech node
      ctx.save();
      ctx.fillStyle = "#00f59b";
      ctx.shadowColor = "#00f59b";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "11px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(0, 245, 155, 0.75)";
      ctx.shadowBlur = 0;
      ctx.fillText(city.name, cx + 8, cy + 3);
      ctx.restore();
    }
  }

  // ── 6. CONTINUOUS 360° EQUATORIAL DATA RIBBON ─────────
  // A solid deep-black telemetry ribbon for maximum text legibility & contrast.
  // Repeated 4 times evenly (every 90°: at 0°, 90°, 180°, 270°)
  // so "shahidur.dev" is razor-sharp and continuously readable from all angles.
  const ribbonHeight = 72;
  const ribbonY = H / 2 - ribbonHeight / 2;

  // Solid deep dark ribbon backdrop (no rail lines)
  ctx.fillStyle = "#010301";
  ctx.fillRect(0, ribbonY, W, ribbonHeight);

  // 4 Repeating Quadrant Blocks:
  // Each quadrant is W / 4 = 512px wide.
  const quadrantW = W / 4;
  const blocks = [
    { title: "SHAHIDUR.DEV", tag: "CREATIVE ENGINEER" },
    { title: "SHAHIDUR.DEV", tag: "3D & FULL STACK" },
    { title: "SHAHIDUR.DEV", tag: "PORTFOLIO UNIVERSE" },
    { title: "SHAHIDUR.DEV", tag: "INNOVATE & BUILD" },
  ];

  const drawRibbonItem = (centerX, item) => {
    const centerY = H / 2;

    ctx.save();
    // High-contrast, razor-sharp typography
    ctx.font = "800 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Subtle dark drop-shadow for separation
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    // Pure brilliant white core text (extremely legible on dark background)
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`✦   ${item.title}   ✦`, centerX, centerY - 9);

    // Crisp neon mint subtitle / telemetry tag
    ctx.font = "700 12px 'Courier New', monospace";
    ctx.fillStyle = "#00f59b";
    ctx.shadowBlur = 3;
    ctx.shadowColor = "#000000";
    ctx.fillText(`[ ${item.tag} ]`, centerX, centerY + 16);
    ctx.restore();
  };

  for (let i = 0; i < 4; i++) {
    const cx = i * quadrantW + quadrantW / 2;
    drawRibbonItem(cx, blocks[i]);
    // Also draw wrapped seam buffers
    if (cx < quadrantW) drawRibbonItem(cx + W, blocks[i]);
    if (cx > W - quadrantW) drawRibbonItem(cx - W, blocks[i]);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/* ── Floating Holographic Orbit Ring ────────────────── */
const OrbitRing = ({ radius, count, color, speed, tilt, size = 0.02 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      pts.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
    }
    return new Float32Array(pts);
  }, [radius, count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += speed * dt;
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={size}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

/* ── Ambient Space Stardust ────────────────────────── */
const Stardust = () => {
  const count = 160;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const r = 1.35 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(pos);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00f59b"
        size={0.016}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Glowing Multi-Layer Atmosphere Halo ───────────── */
const Atmosphere = () => {
  const innerRef = useRef();
  const outerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.material.opacity = 0.20 + Math.sin(t * 1.4) * 0.05;
    }
    if (outerRef.current) {
      outerRef.current.material.opacity = 0.07 + Math.sin(t * 0.9 + 1) * 0.03;
    }
  });

  return (
    <>
      {/* Inner Emerald Rim Glow */}
      <mesh ref={innerRef} scale={1.03}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#00f59b"
          transparent
          opacity={0.20}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Ethereal Halo */}
      <mesh ref={outerRef} scale={1.18}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

/* ── Physical Equatorial 3D Accent Ring ─────────────── */
const EquatorRing = () => (
  <mesh rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[1.008, 0.0035, 16, 128]} />
    <meshBasicMaterial
      color="#00f59b"
      transparent
      opacity={0.55}
      blending={THREE.AdditiveBlending}
    />
  </mesh>
);

/* ── Polar Compass Beacon ───────────────────────────── */
const PolarBeacon = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.015;
    }
  });

  return (
    <group ref={ref} position={[0, 1.015, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.07, 0.003, 8, 32]} />
        <meshBasicMaterial
          color="#00f59b"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <sphereGeometry args={[0.014, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

/* ── Main High-Tech Textured Globe ─────────────────── */
const PersonalGlobe = () => {
  const groupRef = useRef();
  const texture = useMemo(() => buildGlobeTexture(), []);

  // Reversed rotation direction (negative) and increased speed (-0.35)
  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.35 * dt;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Sphere Surface with high-res texture & balanced emissive glow */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.20}
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>

      {/* Precision Equatorial 3D Ring */}
      <EquatorRing />

      {/* North Polar Beacon */}
      <PolarBeacon />

      {/* Atmospheric Bloom */}
      <Atmosphere />
    </group>
  );
};

/* ── Canvas Scene Wrapper ───────────────────────────── */
const PersonalGlobeCanvas = () => (
  <Canvas
    frameloop="always"
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true, antialias: true }}
    camera={{ fov: 50, near: 0.1, far: 200, position: [0, 0, 3.5] }}
    className="touch-pan-y"
    style={{ touchAction: "pan-y" }}
  >
    {/* Refined Studio Lighting - Rim-focused to prevent text glare */}
    <ambientLight intensity={0.55} />
    <pointLight position={[4, 2, -1]} intensity={1.2} color="#00f59b" />
    <pointLight position={[-4, -1, -1]} intensity={0.9} color="#10b981" />
    <pointLight position={[0, 4, 1.5]} intensity={0.6} color="#34d399" />
    <directionalLight position={[0, 0, 5]} intensity={0.35} color="#ffffff" />

    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />

      {/* Central Interactive Globe */}
      <PersonalGlobe />

      {/* 3 Balanced Holographic Orbit Rings */}
      <OrbitRing radius={1.42} count={120} color="#00f59b" speed={-0.22} tilt={0.35} size={0.022} />
      <OrbitRing radius={1.65} count={85}  color="#6ee7b7" speed={ 0.15} tilt={1.15} size={0.018} />
      <OrbitRing radius={1.86} count={60}  color="#10b981" speed={-0.10} tilt={0.75} size={0.015} />

      {/* Cosmic Stardust particles */}
      <Stardust />

      <Preload all />
    </Suspense>
  </Canvas>
);

export default PersonalGlobeCanvas;
