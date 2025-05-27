import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import CanvasLoader from "./Loader";
import * as THREE from 'three';

interface ComputerModelProps {
  isMobile: boolean;
}

const ComputerModel: React.FC<ComputerModelProps> = ({ isMobile }) => {
  const { scene } = useGLTF(
    "./desktop_pc/scene.gltf",
    undefined,
    (loader) => {
      const dracoLoader = new DRACOLoader();
      loader.setDRACOLoader(dracoLoader);
    }
  );

  // Create a ref for the model group
  const modelRef = useRef<THREE.Group>();

  // Animation
  useFrame((state) => {
    if (modelRef.current) {
      // Gentle floating movement
      modelRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Subtle rotation
      modelRef.current.rotation.y = -0.2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <mesh>
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={1.25} />
      
      {/* Hemisphere light for natural sky-ground lighting */}
      <hemisphereLight intensity={0.5} groundColor="black" />
      
      {/* Main key light */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      
      {/* Fill light for the front */}
      <spotLight
        position={[20, 50, -10]}
        angle={0.12}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      
      {/* Rim light for edge definition */}
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[10, 0, -20]} intensity={0.5} />
      
      <group 
        ref={modelRef}
        position={isMobile ? [0, -2, -2.2] : [0, -2, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      >
        <primitive
          object={scene}
          scale={isMobile ? 0.7 : 0.75}
        />
      </group>
    </mesh>
  );
};

const MemoizedComputerModel = React.memo(ComputerModel);

const ComputersCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Check initial
    setIsMobile(mediaQuery.matches);

    // Add listener for subsequent changes
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <MemoizedComputerModel isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas; 