"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile, onLoaded }) => {
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
          scale={isMobile ? 0.58 : 0.62}
          position={isMobile ? [0, -3.7, -2.2] : [3, -4.0, -1.5]}
          rotation={[-0.01, -0.85, -0.05]}
        />
      </group>
    </mesh>
  );
};

const ComputersCanvas = ({ onModelLoaded }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 2.5, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, -1.8, 0]}
        />
        <Computers isMobile={isMobile} onLoaded={onModelLoaded} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
