import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const BIMViewer = ({ modelUrl, activeTool }) => {
  const sceneRef = useRef(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [distance, setDistance] = useState(null);

  const camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)).current;
  const renderer = useRef(new THREE.WebGLRenderer()).current;
  const scene = useRef(new THREE.Scene()).current;
  const raycaster = useRef(new THREE.Raycaster()).current;
  const mouse = useRef(new THREE.Vector2()).current;

  // Setup the scene
  useEffect(() => {
    if (!sceneRef.current) return;

    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Add lights
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);

    // Load the model
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(1, 1, 1);
    });

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;

    // Event listener for mouse click (select object)
    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(scene, true);
      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        setSelectedElement(selectedObject);
        selectedObject.material.emissive.set(0x00ff00);  // Green glow effect
      }
    };

    window.addEventListener('click', onMouseClick);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('click', onMouseClick);
      if (sceneRef.current) sceneRef.current.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  // Measure Tool Logic
  useEffect(() => {
    if (activeTool === 'measure') {
      const onMeasureClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(scene, true);

        if (intersects.length > 0) {
          const clickedPoint = intersects[0].point;

          if (!startPoint) {
            setStartPoint(clickedPoint);  // Set the start point
          } else {
            setEndPoint(clickedPoint);  // Set the end point
            setDistance(startPoint.distanceTo(clickedPoint));  // Calculate the distance
          }
        }
      };

      window.addEventListener('click', onMeasureClick);

      return () => {
        window.removeEventListener('click', onMeasureClick);
      };
    }
  }, [activeTool, startPoint]);

  // Screenshot Tool
  const takeScreenshot = () => {
    const dataUrl = renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'screenshot.png';
    link.click();
  };

  return (
    <div>
      <div ref={sceneRef} style={{ width: '100%', height: '500px' }} />
      {selectedElement && <div>Selected: {selectedElement.name}</div>}
      {distance && <div>Distance: {distance} units</div>}
      {activeTool === 'screenshot' && <button onClick={takeScreenshot}>Take Screenshot</button>}
    </div>
  );
};

export default BIMViewer;
