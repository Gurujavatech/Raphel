import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";



function Particles() {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001; 
    }
  });

  
  const positions = new Float32Array(3000); 

  for (let i = 0; i < 3000; i++) {
    positions[i] = (Math.random() - 0.5) * 10; 
  }

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial color="purple" size={0.05} />
    </Points>
  );
}


function Background() {
    return (
        <Canvas style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
          <Particles />
        </Canvas>
      );
    }
export default Background
