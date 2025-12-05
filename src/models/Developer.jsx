import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";



const Developer = ({ animation = 'sit', ...props }) => {
  const group = useRef();
  
  const { nodes, materials } = useGLTF("/model/66dc819918614db10e811e96 (1).glb");

  useEffect(() => {
    console.log("Nodes in model:", nodes);
  }, [nodes]);

  const { animations: typeAnimation } = useFBX("animations/Typing.fbx");
  const { animations: sitAnimation } = useFBX("animations/Sitting.fbx");
  const { animations: clapAnimation } = useFBX("animations/Sitting Clap.fbx");
  const { animations: idleAnimation } = useFBX("animations/Idle.fbx");

  typeAnimation[0].name = "type";
  sitAnimation[0].name = "sit";
  clapAnimation[0].name = "clap";
  idleAnimation[0].name = "idle";

  const { actions } = useAnimations(
    [typeAnimation[0], sitAnimation[0], clapAnimation[0],idleAnimation[0]],
    group
  );

  useEffect(() => {
    console.log("Available actions:", actions);
    if (actions[animation]) {
      actions[animation].reset().fadeIn(0.2).play();
      return () => {
        actions[animation].reset().fadeOut(0.2);
      };
    } else {
      console.warn(`Animation ${animation} not found in actions`);
    }
  }, [animation, actions]);

  return (
    <group {...props} dispose={null} ref={group}>
      <group rotation={[ 0,Math.PI / 2, 0, ]}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          frustumCulled={false}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          frustumCulled={false}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          frustumCulled={false}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
          frustumCulled={false}
        />
      </group>
    </group>
  );
}

useGLTF.preload("model/developerModel.glb");

export default Developer;