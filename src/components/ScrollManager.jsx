import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import * as THREE from "three";

export const ScrollManager = ({ section, onSectionChange }) => {
    const data = useScroll();
    const lastScroll = useRef(0);
    const isAnimating = useRef(false);
  
    useEffect(() => {
      if (data.fill) {
        data.fill.classList.add("top-0", "absolute");
      }
    }, [data.fill]);
  
    useEffect(() => {
      if (data.el && !isAnimating.current) {
        gsap.to(data.el, {
          duration: 1,
          scrollTop: section * data.el.clientHeight,
          onStart: () => {
            isAnimating.current = true;
          },
          onComplete: () => {
            isAnimating.current = false;
          },
        });
      }
    }, [section, data.el, data.el.clientHeight]);
  
    useFrame(() => {
      if (isAnimating.current) {
        lastScroll.current = data.scroll.current;
        return;
      }
  
      const currentScroll = data.scroll.current;
      const totalPages = data.pages;
      const curSection = Math.floor(currentScroll * totalPages);
  
      if (curSection !== lastScroll.current) {
        onSectionChange(curSection);
      }
  
      lastScroll.current = curSection;
    });
  
    return null;
  };
