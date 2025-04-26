import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const BIMViewer = ({ modelUrl, activeTool }) => {
  const sceneRef = useRef(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [distance, setDistance] = useState(null);
  const [startSphere, setStartSphere] = useState(null);
  const [endSphere, setEndSphere] = useState(null);
  const [line, setLine] = useState(null);
  const [highlightedObject, setHighlightedObject] = useState(null);
  const [pointer, setPointer] = useState(null); // State for the 3D pointer
  const [pointerVisible, setPointerVisible] = useState(true); // Ensure pointer is always visible

  const camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)).current;
  const renderer = useRef(new THREE.WebGLRenderer({ alpha: true })).current; // Enable transparency for pointer
  const scene = useRef(new THREE.Scene()).current;
  const raycaster = useRef(new THREE.Raycaster()).current;
  const mouse = useRef(new THREE.Vector2()).current;

  // Setup the scene
  useEffect(() => {
    if (!sceneRef.current) return;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Make background transparent
    sceneRef.current.appendChild(renderer.domElement);

    // Add lights
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    let model;

    // Load the model
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      model = gltf.scene;
      scene.add(model);
      model.scale.set(1, 1, 1);
    });

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;

    // Event listener for mouse click (select object)
    const onMouseClick = (event) => {
      if (activeTool !== 'select') return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        setSelectedElement(selectedObject);
      } else {
        setSelectedElement(null);
      }
    };

    // Event listener for mouse move (highlighting and pointer)
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      // Handle pointer position updates when measure tool is active
      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;
        const cameraPosition = camera.position;
        const direction = new THREE.Vector3().subVectors(intersectionPoint, cameraPosition).normalize();
        const offset = 0.01;
        pointer.position.copy(new THREE.Vector3().addVectors(intersectionPoint, direction.multiplyScalar(offset)));
      }
    };

    // Add mouse move event listener
    window.addEventListener('mousemove', onMouseMove);
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
      window.removeEventListener('mousemove', onMouseMove);
      if (sceneRef.current) sceneRef.current.removeChild(renderer.domElement);
    };
  }, [modelUrl, activeTool]);

  // Initialize the pointer object once
  useEffect(() => {
    const pointerGeometry = new THREE.SphereGeometry(0.05, 16, 16); // Slightly larger pointer
    const pointerMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffff00, 
      depthTest: false, 
      transparent: true, 
      opacity: 0.8
    });
    const newPointer = new THREE.Mesh(pointerGeometry, pointerMaterial);
    newPointer.renderOrder = 2; // Render on top of markers
    scene.add(newPointer);
    setPointer(newPointer); // Store pointer reference

    return () => {
      if (scene && newPointer) {
        scene.remove(newPointer);
      }
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  // Cleanup pointer on unmount
  useEffect(() => {
    return () => {
      if (pointer) {
        scene.remove(pointer);
      }
    };
  }, [pointer]);

  // Measure Tool Logic
  useEffect(() => {
    if (activeTool === 'measure') {
      const onMeasureClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          const clickedPoint = intersects[0].point;

          if (!startPoint) {
            // First click (start point)
            setStartPoint(clickedPoint);
            const startMarker = createMarker(clickedPoint, 0xff0000); // Red for start
            setStartSphere(startMarker);

            clearPreviousLine();
            clearPreviousSpheres();
            setEndPoint(null);
            setDistance(null);
          } else {
            // Second click (end point)
            setEndPoint(clickedPoint);

            const endMarker = createMarker(clickedPoint, 0x0000ff); // Blue for end
            setEndSphere(endMarker);

            const dist = startPoint.distanceTo(clickedPoint);
            setDistance(dist.toFixed(2));

            drawLine(startPoint, clickedPoint);

            setStartPoint(null);
          }
        }
      };

      window.addEventListener('click', onMeasureClick);

      return () => {
        window.removeEventListener('click', onMeasureClick);
      };
    } else {
      clearPreviousLine();
      clearPreviousSpheres();
      setStartPoint(null);
      setEndPoint(null);
      setDistance(null);
    }
  }, [activeTool, startPoint]);

  // Function to create a marker (sphere)
  const createMarker = (position, color) => {
    const geometry = new THREE.SphereGeometry(0.07, 16, 16); // Slightly larger markers too
    const material = new THREE.MeshBasicMaterial({ color: color, depthTest: false, transparent: true, opacity: 0.8 });
    const marker = new THREE.Mesh(geometry, material);
    marker.position.copy(position);
    marker.renderOrder = 1;
    scene.add(marker);
    return marker;
  };

  // Function to draw a line
  const drawLine = (start, end) => {
    if (line) {
      scene.remove(line);
    }
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
    const newLine = new THREE.Line(geometry, material);
    scene.add(newLine);
    setLine(newLine);
  };

  // Function to clear line
  const clearPreviousLine = () => {
    if (line) {
      scene.remove(line);
      setLine(null);
    }
  };

  // Function to clear spheres
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
    <div style={{ position: 'relative' }}>
      <div
        ref={sceneRef}
        style={{
          width: '100%',
          height: '500px',
          backgroundColor: '#fff',
          cursor: activeTool === 'measure' ? 'none' : 'default',
        }}
      />
      
      {/* UI Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: '#fff',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 100,
        }}
      >
        {selectedElement && <div><strong>Selected:</strong> {selectedElement.name || 'Object'}</div>}
        {distance && <div><strong>Distance:</strong> {distance} units</div>}
        {activeTool === 'screenshot' && (
          <button
            onClick={takeScreenshot}
            style={{
              marginTop: '8px',
              padding: '6px 10px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Take Screenshot
          </button>
        )}
      </div>
    </div>
  );
  
};

export default BIMViewer;
