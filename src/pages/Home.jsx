import { useState , Suspense, useEffect ,useRef } from 'react';
import { Canvas } from '@react-three/fiber';
// import hollow from "../assets/hollow.mp3";
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';

import Sky from '../models/Sky';
import Island from '../models/Island';
import Bird from '../models/Bird';
import Plane from '../models/Plane';

import { soundon, soundoff} from '../assets/icons';


const Home = () => {
  const audioRef = useRef(new Audio(hollow));
  audioRef.current.volume = 0.01;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic){
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic])


  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9];
    }else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  
  
  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if(window.innerWidth < 768){
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    }else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  }

  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
      {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{ near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5}/>
          <pointLight position={[10,5,10]} intensity={2}/>
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>

          <Bird />
          <Sky
            isRotating={isRotating}
          />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating} 
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img 
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className='w-10 h-10 cursor-pointer object-contain'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
      <div className='absolute bottom-2 right-2'>
        <img 
          src='./src/assets/images/logo3.png'
          alt='logo3'
          className='w-10 h-10 rounded-lg'
        />
      </div>
    </section>
  )
}
export default Home