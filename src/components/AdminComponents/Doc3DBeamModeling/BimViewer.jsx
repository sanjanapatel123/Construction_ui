import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';  // Import OrbitControls

const BIMViewer = ({ modelUrl }) => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Ensure that sceneRef.current is valid before proceeding
    if (!sceneRef.current) return;

    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Lighting for the scene
    const light = new THREE.AmbientLight(0x404040);  // Ambient light
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Directional light
    scene.add(directionalLight);

    // Load 3D model (e.g., GLTF)
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(1, 1, 1); // Scale the model if necessary
    }, undefined, (error) => {
      console.error('Error loading the model:', error);
    });

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    camera.position.z = 5;

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();  // Update the controls each frame
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current && renderer.domElement) {
        // Ensure sceneRef.current and renderer.domElement are valid before removing
        sceneRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  return <div ref={sceneRef} style={{ width: '100%', height: '500px' }} />;
};

export default BIMViewer;
