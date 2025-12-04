import React from "react";
import { skills  } from "../../constants";
import { motion } from "framer-motion";
import Section from "../Section";

const SkillAbout = () => {
  return (
    <>
      <Section>
        <motion.div 
          className="py-10 flex flex-col max-w-2xl"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
        >
          <h3 className="subhead-text">My Skills</h3>
          <div className="mt-10 flex flex-wrap gap-10">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="block-container w-12 h-12 lg:w-20 lg:h-20"
              >
                <div className="btn-back rounded-xl" />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default SkillAbout;
