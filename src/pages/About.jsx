import React, { Suspense, useState, useEffect, useMemo } from "react";

import "react-vertical-timeline-component/style.min.css";
import Developer from "../models/Developer";
import CameraLogger from "../components/CameraLogger";

import { MotionConfig } from "framer-motion";
import { Scroll, ScrollControls } from "@react-three/drei";
import { ScrollManager } from "../components/ScrollManager";

import CTA from "../components/CTA";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import Loader from "../components/Loader";
import useWindowSize from "../hooks/useWindowSize";
import { Office } from "../models/Office";
import HeroAbout from "../components/About/HeroAbout";
import SkillAbout from "../components/About/SkillAbout";
import ExperinceAbout from "../components/About/ExperinceAbout";
import Section from "../components/Section";

const About = () => {
  const [interactionEnabled, setInteractionEnabled] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [section, setSection] = useState(0);
  const [animation, setAnimation] = useState("type");
  const size = useWindowSize();

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

  const toggleModel = () => {
    if (interactionEnabled) {
      // vypnutí modelu
      setInteractionEnabled(false);
      setAnimation("type"); // nebo "sit"
    } else {
      // zapnutí modelu
      setInteractionEnabled(true);
      setAnimation("clap");
    }
  };

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
      { threshold: 0.5 } // Nastav si threshold podle potřeby
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const { scale, position } = adjustCharacterForScreenSize(size.width || 1024); // Použij defaultní hodnotu, pokud je width undefined

  const getFOV = (width) => {
    if (width < 450) return 50;
    if (width < 768) return 60;
    return 70;
  };

  const fov = useMemo(() => getFOV(size.width || 1024), [size.width]);

  useEffect(() => {
    if (!interactionEnabled) return; // sekce aktivní až po kliknutí

    if (currentSection === 0) {
      setAnimation("sit");
    } else if (currentSection === 1) {
      setAnimation("type");
    } else if (currentSection === 2) {
      setAnimation("sit");
    }
  }, [currentSection, interactionEnabled]);

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
              camera={{
                position: [-1.82, 2.57, -3.5], // [x, y, z] pozice kamery
                fov: fov, // Dynamicky nastavené Field of View
                near: 0.1, // Blízký řez kamery
                far: 1000, // Vzdálený řez kamery
              }}
              className="w-full h-full"
              onClick={() => {
                if (!interactionEnabled) return; // blokováno
                setAnimation("clap"); // povoleno po aktivaci
              }}
            >
              <ScrollControls pages={1} damping={0.1}>
                <ScrollManager section={section} onSectionChange={setSection} />
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
              <OrbitControls
                enabled={interactionEnabled}
                enableZoom={false}
                enablePan={true}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2} // Kamera se nemůže dívat pod horizont
                minPolarAngle={1} // Kamera se nemůže dívat nad horizont
                maxDistance={10} // Maximální vzdálenost kamery od cíle
                minDistance={1} // Minimální vzdálenost kamery od cíle gnjf
              />
              <ambientLight intensity={1} />
              <spotLight position={[1, 5, 10]} angle={0.15} penumbra={1} />
              {/* <axesHelper args={[5]} /> */}
              <directionalLight position={[1, 1, 1]} intensity={1} />
              <Environment preset="sunset" />

              <CameraLogger />
            </Canvas>
          </div>
          <div className="flex w-full mt-4 justify-center md:justify-end">
            <button onClick={toggleModel} className="w-40 text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {interactionEnabled ? "Turn Off" : "Turn On"}
            </button>
          </div>
          <div className="flex flex-col"></div>
        </MotionConfig>
        <SkillAbout />
        <ExperinceAbout />
        <CTA />
      </div>
      <div className="ml-0 xl:ml-1/2 z-10 relative w-full xl:w-1/2"></div>
    </>
  );
};

export default About;
