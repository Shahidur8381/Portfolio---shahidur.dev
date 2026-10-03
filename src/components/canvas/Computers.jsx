"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ deviceMode, onLoaded }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");
  const modelRef = useRef();

  useEffect(() => {
    if (computer && onLoaded) {
      onLoaded();
    }
  }, [computer, onLoaded]);

  // Rotate slowly with respect to Y-axis and add a floating effect
  useFrame((state, delta) => {
    if (modelRef.current) {
      // Rotation
      modelRef.current.rotation.y += delta * 0.18;
      
      // Floating (sine wave on Y axis)
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  const isMobile = deviceMode === "mobile";
  const isTablet = deviceMode === "tablet";

  // Reduced scale on mobile so model sits gracefully below hero text without crowding
  const scale = isMobile ? 0.36 : isTablet ? 0.52 : 0.62;
  const position = isMobile
    ? [0, -3.2, -2.0]
    : isTablet
    ? [1.2, -3.8, -1.8]
    : [3, -4.0, -1.5];

  return (
    <mesh>
      {/* Front key light to brightly illuminate the monitors, desk and keyboard */}
      <directionalLight position={[0, 12, 12]} intensity={1.8} color='#ffffff' />
      <ambientLight intensity={0.65} color='#e0fbee' />

      {/* Cyber mint / emerald side rim lights */}
      <spotLight
        position={[-15, 30, 10]}
        angle={0.2}
        penumbra={1}
        intensity={1.4}
        color='#a7f3d0'
      />
      <pointLight intensity={1.8} color='#00f59b' position={[0, -1, 1]} distance={7} />

      <group ref={modelRef}>
        <primitive
          object={computer.scene}
          scale={scale}
          position={position}
          rotation={[-0.01, -0.85, -0.05]}
        />
      </group>
    </mesh>
  );
};

const ComputersCanvas = ({ onModelLoaded, isInteractive = false }) => {
  const [deviceMode, setDeviceMode] = useState(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      if (w < 768) return "mobile";
      if (w < 1024) return "tablet";
      return "desktop";
    }
    return "desktop";
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceMode("mobile");
      } else if (width < 1024) {
        setDeviceMode("tablet");
      } else {
        setDeviceMode("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = deviceMode === "mobile";
  const canInteract = !isMobile || isInteractive;

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 2.5, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className={`touch-pan-y ${canInteract ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"}`}
      style={{
        pointerEvents: canInteract ? "auto" : "none",
        touchAction: canInteract ? "none" : "pan-y",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enabled={canInteract}
          enableZoom={false}
          enableRotate={canInteract}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, -1.8, 0]}
        />
        <Computers deviceMode={deviceMode} onLoaded={onModelLoaded} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
