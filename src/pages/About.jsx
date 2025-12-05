import React, { Suspense, useState, useEffect, useMemo } from "react";

import "react-vertical-timeline-component/style.min.css";
import Developer from "../models/Developer";
import CameraLogger from "../components/CameraLogger";

import { MotionConfig } from "framer-motion";
import { Scroll, ScrollControls } from "@react-three/drei";
import { ScrollManager } from "../components/ScrollManager";

import CTA from "../components/CTA";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Loader from "../components/Loader";
import useWindowSize from "../hooks/useWindowSize";
import { Office } from "../models/Office";
import HeroAbout from "../components/About/HeroAbout";
import SkillAbout from "../components/About/SkillAbout";
import ExperinceAbout from "../components/About/ExperinceAbout";

const About = () => {
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [section, setSection] = useState(0);
  const [animation, setAnimation] = useState("sit");

  const size = useWindowSize();
  const isMobile = size.width < 768;

  // ----------------------------
  // SCALE / POSITION
  // ----------------------------
  const adjustCharacterForScreenSize = (width) => {
    let scale, position;

    if (width < 420) {
      scale = [0.8, 0.8, 0.8];
      position = [-0.2, -0.4, 0.54];
    } else if (width < 768) {
      scale = [1.5, 1.5, 1.5];
      position = [0.5, -0.5, 0.5];
    } else {
      scale = [2, 2, 2];
      position = [1, -0.63, 0.52];
    }

    return { scale, position };
  };

  const { scale, position } = adjustCharacterForScreenSize(size.width || 1024);

  // ----------------------------
  // CAMERA FOV
  // ----------------------------
  const getFOV = (width) => {
    if (width < 450) return 50;
    if (width < 768) return 60;
    return 70;
  };

  const fov = useMemo(() => getFOV(size.width || 1024), [size.width]);

  // ----------------------------
  // SCROLL OBSERVER
  // ----------------------------
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            setCurrentSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // ----------------------------
  // ANIMACE PODLE SECTION
  // ----------------------------
  useEffect(() => {
    if (currentSection === 0) setAnimation("sit");
    else if (currentSection === 1) setAnimation("type");
    else if (currentSection === 2) setAnimation("idle");
  }, [currentSection]);

  return (
    <>
      <div className="max-container">
        <MotionConfig
          transition={{
            type: "spring",
            mass: 5,
            stiffness: 500,
            damping: 50,
            restDelta: 0.0001,
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen w-screen mx-auto max-w-7xl">
            <HeroAbout section={section} />

            <Canvas
              onPointerDown={() => {
                setControlsEnabled(true);
                setAnimation("type");
              }}
              onPointerUp={() => setControlsEnabled(false)}
              onPointerLeave={() => setControlsEnabled(false)}
              camera={{
                position: [-1.82, 2.57, -3.5],
                fov: fov,
                near: 0.1,
                far: 1000,
              }}
              className="w-full h-full"
            >
              {/* DESKTOP = ScrollControls ON */}
              {!isMobile && (
                <ScrollControls pages={1} damping={0.1}>
                  <ScrollManager
                    section={section}
                    onSectionChange={setSection}
                  />
                  <Scroll>
                    <Suspense fallback={<Loader />}>
                      <group position={[0, -1.5, 0]}>
                        <Office
                          position={position}
                          scale={scale}
                          section={section}
                        />
                        <Developer
                          position={[-1, -0.25, 0.58]}
                          scale={scale}
                          animation={animation}
                        />
                      </group>
                    </Suspense>
                  </Scroll>
                </ScrollControls>
              )}

              {/* MOBILE = ScrollControls OFF */}
              {isMobile && (
                <Suspense fallback={<Loader />}>
                  <group position={[0, -1.5, 0]}>
                    <Office
                      position={position}
                      scale={scale}
                      section={section}
                    />
                    <Developer
                      position={[-1, -0.25, 0.58]}
                      scale={scale}
                      animation={animation}
                    />
                  </group>
                </Suspense>
              )}

              <OrbitControls
                enabled={controlsEnabled}
                enableZoom={false}
                enableRotate={true}
                enablePan={true}
                minPolarAngle={1}
                maxPolarAngle={Math.PI / 2}
                minDistance={1}
                maxDistance={10}
              />

              <ambientLight intensity={1} />
              <Environment preset="sunset" />
              <CameraLogger />
            </Canvas>
          </div>
        </MotionConfig>

        <SkillAbout />
        <ExperinceAbout />
        <CTA />
      </div>
    </>
  );
};

export default About;
