import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const CameraLogger = () => {
  const { camera } = useThree();
  const lastLogged = useRef(0);
  const logInterval = 1000; // Interval logování v milisekundách (1 sekunda)

  useFrame(() => {
    const currentTime = Date.now();
    if (currentTime - lastLogged.current > logInterval) {
      console.log(`Camera position: x=${camera.position.x.toFixed(2)}, y=${camera.position.y.toFixed(2)}, z=${camera.position.z.toFixed(2)}`);
      lastLogged.current = currentTime;
    }
  });

  return null;
};

export default CameraLogger;
