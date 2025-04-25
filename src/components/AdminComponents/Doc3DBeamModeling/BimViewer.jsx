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
  const [startSphere, setStartSphere] = useState(null);
  const [endSphere, setEndSphere] = useState(null); 
  const [line, setLine] = useState(null);

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
            // First click (start point)
            setStartPoint(clickedPoint);

            // Create and store the start sphere
            const startMarker = createMarker(clickedPoint);
            setStartSphere(startMarker);

            // Clear previous line and spheres if any
            clearPreviousLine();
            clearPreviousSpheres();
          } else {
            // Second click (end point)
            setEndPoint(clickedPoint);  // Using the endPoint state to store the end position

            // Create and store the end sphere at the end point
            const endMarker = createMarker(clickedPoint);
            setEndSphere(endMarker);  // Assign endSphere marker

            // Calculate and display distance
            const dist = startPoint.distanceTo(clickedPoint);
            setDistance(dist);

            // Draw line between start and end point
            drawLine(startPoint, clickedPoint);
          }
        }
      };

      window.addEventListener('click', onMeasureClick);

      return () => {
        window.removeEventListener('click', onMeasureClick);
      };
    }
  }, [activeTool, startPoint, endPoint]);  // endPoint is now used here

  // Function to create a marker (sphere)
  const createMarker = (position) => {
    const geometry = new THREE.SphereGeometry(0.1, 16, 16); // Small sphere for markers
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
    const marker = new THREE.Mesh(geometry, material);
    marker.position.copy(position);
    scene.add(marker);
    return marker;
  };

  // Function to draw a line between start and end points
  const drawLine = (start, end) => {
    // Clear any existing line
    if (line) {
      scene.remove(line); // Remove the previous line
    }

    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green color for line
    const newLine = new THREE.Line(geometry, material);
    scene.add(newLine);
    setLine(newLine); // Store the new line state
  };

  // Function to clear previous line (before starting a new measurement)
  const clearPreviousLine = () => {
    if (line) {
      scene.remove(line);
      setLine(null); // Reset the line state
    }
  };

  // Function to clear previous spheres (start and end)
  const clearPreviousSpheres = () => {
    if (startSphere) {
      scene.remove(startSphere);
      setStartSphere(null);
    }
    if (endSphere) {
      scene.remove(endSphere);
      setEndSphere(null);
    }
  };

  // Screenshot Tool
  const takeScreenshot = () => {
    renderer.render(scene, camera);

    const dataUrl = renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'screenshot.png';
    link.click();
  };

  return (
    <div>
      <div ref={sceneRef} style={{ width: '100%', height: '500px', backgroundColor: '#fff' }} />
      {selectedElement && <div>Selected: {selectedElement.name}</div>}
      {distance && <div>Distance: {distance} units</div>}
      {activeTool === 'screenshot' && <button onClick={takeScreenshot}>Take Screenshot</button>}
    </div>
  );
};

export default BIMViewer;
