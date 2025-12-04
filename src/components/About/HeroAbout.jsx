import React, { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../Section";

const HeroAbout = () => {
  return (
    <>
      <section>
        <div className="flex items-center z-10 relative w-full">
          <div className="flex max-w-xl mt-10 lg:mt-20 xl:mt-28 flex-col lg:flex-row gap-3 text-slate-500">
            <div className="flex flex-col justify-center items-start text-wrap">
              <h1 className="head-text">
                Hello, I'm{" "}
                <span className="blue-gradient_text font-semibold drop-shadow">
                  Aleš
                </span>
              </h1>
              <p className="flex mt-4 leading-wide max-w-md">
                Web Developer based in Czech Republic, specializing on making
                modern beautifull website.
              </p>
              <div className="flex mt-12 ">
                <Link
                  to="/contact"
                  className="btn"
                  // onPointerOver={() => setAnimation("clap")}
                  // onPointerOut={() => setAnimation("sit")}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroAbout;
