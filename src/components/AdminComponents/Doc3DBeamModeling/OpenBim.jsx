import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import BIMViewer from './BimViewer';
import Toolbar from './ToolBar';
import NewAnnotationForm from './NewAnnotationForm';
import { fetchAnnotations , deleteAnnotation} from '../../../redux/slices/annotationSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddElementModal from './AddElimentModal';
import { formatDistanceToNow} from 'date-fns';
import { fetchElements } from '../../../redux/slices/elementSlice';
const OpenBim = () => {
  const [activeModelTab, setActiveModelTab] = useState('building');
  const [activeSidePanel, setActiveSidePanel] = useState('details');
  const [viewMode, setViewMode] = useState('solid');
  const [details ,  setDetails] = useState("Select an element in the model to view its details");
  const [searchElement, setSearchElement] = useState('');

  const [activeTool, setActiveTool] = useState('select');
  const [selectedElement, setSelectedElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAnnotation, setEditAnnotation] = useState(null);
   const dispatch = useDispatch();
  const delete_annotation  = (id) => {
     dispatch(deleteAnnotation(id));
    dispatch(fetchAnnotations());
};
   useEffect(() => {
    dispatch(fetchAnnotations());
    
  }, [isModalOpen,dispatch]);
  useEffect(()=>{
    dispatch(fetchElements());
  },[]);
  const elements = useSelector((state)=>state?.elements?.elements?.data);
  console.log("elements",elements);
  const annotations = useSelector((state) => state.annotations.annotations.data);
  

  // Use the selector to get the annotations state
   
  const handleEditAnnotation = (element) => {
    setEditAnnotation(element); // set the element to edit
    setIsModalOpen(true);
  };
  const openModal = () => {
    setIsModalOpen(true); // Open modal
  };
  const closeModal = () => {
    setEditAnnotation(null);
    setIsModalOpen(false); // Close modal
  };

  const handleToolSelect = (tool) => {
    setActiveTool(tool);
    if (tool !== 'select') {
      setSelectedElement(null);
    }
  };

  const handleElementSelect = (element) => {
    if (activeTool === 'select') {
      setSelectedElement(element);
      setActiveSidePanel('details');
    }
  };
  

  return (
    <div className="flex flex-col h-screen bg-gray-100" style={{marginTop: "0px"}}>
      {/* Top Navigation Bar */}
      <Toolbar setTool={handleToolSelect} />
      {/* <AddElementModal/> */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <a
            href="#"
            data-readdy="true"
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 cursor-pointer"
          >
            <i className="fas fa-arrow-left"></i>
         <Link to="/Doc3DBeamModeling">   <span className="font-medium">Back</span></Link>
          </a>
        </div>
        <div className="flex items-center">
          <h1 className="text-xl font-medium text-gray-800">
            {activeModelTab === 'building' && 'Building Model v1.3'}
            {activeModelTab === 'mep' && 'MEP Systems Model v2.1'}
            {activeModelTab === 'structural' && 'Structural Model v1.5'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
              onClick={() => {}}
            >
              <i className="fas fa-eye mr-1"></i>
              {viewMode === 'wireframe' && 'Wireframe'}
              {viewMode === 'solid' && 'Solid'}
              {viewMode === 'rendered' && 'Rendered'}
              <i className="fas fa-chevron-down ml-1 text-xs"></i>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 hidden">
              <div
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => setViewMode('wireframe')}
              >
                Wireframe
              </div>
              <div
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => setViewMode('solid')}
              >
                Solid
              </div>
              <div
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => setViewMode('rendered')}
              >
                Rendered
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
            <i className="fas fa-save mr-1"></i>
            Save View
          </button>
        </div>
      </header>
      {/* Model Selection Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex px-6">
          <button
            onClick={() => setActiveModelTab('building')}
            className={`px-4 py-3 text-sm font-medium ${activeModelTab === 'building' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} !rounded-button whitespace-nowrap cursor-pointer`}
          >
            Building Model
          </button>
          <button
            onClick={() => setActiveModelTab('mep')}
            className={`px-4 py-3 text-sm font-medium ${activeModelTab === 'mep' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} !rounded-button whitespace-nowrap cursor-pointer`}
          >
            MEP Systems
          </button>
          <button
            onClick={() => setActiveModelTab('structural')}
            className={`px-4 py-3 text-sm font-medium ${activeModelTab === 'structural' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} !rounded-button whitespace-nowrap cursor-pointer`}
          >
            Structural
          </button>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Side Bar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search elements..."
                name="search"
                value={searchElement}
                onChange={(e) => setSearchElement(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
  {/* {elements?.map((item) => { */}
    {/* return ( */}
      <div className="px-3" > {/* Ensure key is unique */}
        {/* Building Elements Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-sm font-medium text-gray-700">Building Elements</span>
            <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
          </div>
          {elements && elements[0]?.subcategories?.filter((el) => el?.name?.toLowerCase().includes(searchElement.toLowerCase())).map((el) => {
            return (
              <div className="space-y-1" key={el?.name}> {/* Ensure key is unique */}

                {el?.name === "Walls" && (
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>{setDetails(el?.description)}}>
                    <i className="fas fa-square-full text-blue-500 mr-2"></i>
                    Walls
                  </div>
                )}

                {el?.name === "Doors" && (
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>{setDetails(el?.description)}}>
                    <i className="fas fa-door-open text-red-500 mr-2"></i>
                    Doors
                  </div>
                )}

                {el?.name === "Windows" && (
                  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>{setDetails(el?.description)}}>
                    <i className="fas fa-window-maximize text-cyan-500 mr-2"></i>
                    Windows
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Structural Elements Section */}
         <div className="mb-6">
  <div className="flex items-center justify-between mb-2 px-2">
    <span className="text-sm font-medium text-gray-700">Structural Elements</span>
    <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
  </div>
  {elements && elements[1]?.subcategories?.filter((el) => el?.name?.toLowerCase().includes(searchElement.toLowerCase())).map((el) => {
    return (
      <div className="space-y-1" key={el?.name}> {/* Ensure key is unique */}

        {el?.name === "Columns" && (
          <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>{setDetails(el?.description)}}>
            <i className="fas fa-columns text-purple-500 mr-2"></i>
            Columns
          </div>
        )}

        {el?.name === "Beams" && (
          <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>{setDetails(el?.description)}}>
            <i className="fas fa-grip-lines text-green-500 mr-2"></i>
            Beams
          </div>
        )}

        {el?.name === "Floors" && (
          <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"onClick={()=>{setDetails(el?.description)}}>
            <i className="fas fa-layer-group text-yellow-500 mr-2"></i>
            Floors
          </div>
        )}
      </div>
    );
  })}
</div>


        {/* MEP Systems Section */}
        <div className="mb-6">
  <div className="flex items-center justify-between mb-2 px-2">
    <span className="text-sm font-medium text-gray-700">MEP Systems</span>
    <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
  </div>
  {elements && elements[2]?.subcategories?.filter((el)=>{return el?.name?.toLowerCase().includes(searchElement.toLowerCase())}).map((el) => {
    return (
      <div className="space-y-1" key={el?.name}> {/* Ensure key is unique */}

        {el?.name === "HVAC" && (
          <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>{setDetails(el?.description)}}>
            <i className="fas fa-wind text-blue-400 mr-2"></i>
            HVAC
          </div>
        )}

        {el?.name === "Plumbing" && (
          <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>{setDetails(el?.description)}}>
            <i className="fas fa-faucet text-indigo-400 mr-2"></i>
            Plumbing
          </div>
        )}

        {el?.name === "Electrical" && (
          <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer" onClick={()=>{setDetails(el?.description)}}>
            <i className="fas fa-bolt text-orange-400 mr-2"></i>
            Electrical
          </div>
        )}
      </div>
    );
  })}
</div>

      </div>
    
</div>


          <div className="p-4 border-t border-gray-200">
            
            
                  
        <AddElementModal/>
          </div>
        </div>
                {/* Left Toolbar */}
                <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-6">
          <div className="flex flex-col items-center gap-6">
            <button
              className={`w-10 h-10 rounded-md flex items-center justify-center ${activeTool === 'select' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'} cursor-pointer`}
              onClick={() => handleToolSelect('select')}
              title="Select Tool"
            >
              <i className="fas fa-mouse-pointer"></i>
            </button>
            <button
              className={`w-10 h-10 rounded-md flex items-center justify-center ${activeTool === 'measure' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'} cursor-pointer`}
              onClick={() => handleToolSelect('measure')}
              title="Measure Tool"
            >
              <i className="fas fa-ruler-combined"></i>
            </button>
            <button
              className={`w-10 h-10 rounded-md flex items-center justify-center ${activeTool === 'cut' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'} cursor-pointer`}
              onClick={() => handleToolSelect('section')}
              title="Section Plane Tool"
            >
              <i className="fas fa-cut"></i>
            </button>
            <button
              className={`w-10 h-10 rounded-md flex items-center justify-center ${activeTool === 'annotate' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'} cursor-pointer`}
              onClick={() => handleToolSelect('markup')}
              title="Markup Tool"
            >
              <i className="fas fa-pen"></i>
            </button>
            <button
              className={`w-10 h-10 rounded-md flex items-center justify-center ${activeTool === 'screenshot' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'} cursor-pointer`}
              onClick={() => handleToolSelect('screenshot')}
              title="Screenshot Tool"
            >
              <i className="fas fa-camera"></i>
            </button>
          </div>
        </div>
         {/* Main Viewer */}

         <div className="flex-1 relative bg-gray-800 overflow-hidden flex">
  {/* Main Viewer */}
  <div className="flex-1 relative bg-gray-800 overflow-hidden w-">
    {/* 3D Model Viewer */}
    <div className="absolute inset-0 w-full h-full ">
      {activeModelTab === 'building' && (
        <div className="absolute inset-0" >
          <BIMViewer modelUrl={'./1.glb'} activeTool={activeTool} />
        </div>
      )}
      {activeModelTab === 'mep' && (
        <div className="w-full h-full">
          <BIMViewer modelUrl={'./1.glb'} activeTool={activeTool} />
        </div>
      )}
      {activeModelTab === 'structural' && (
        <div className="w-full h-full flex items-center justify-center">
          <BIMViewer modelUrl={'./1.glb'} activeTool={activeTool} />
        </div>
      )}
      {/* Navigation Cube */}
      <div className="absolute top-4 right-4 w-24 h-24 bg-gray-900 bg-opacity-50 rounded-md p-2">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">Y</div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-white text-xs">-Y</div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white text-xs">-X</div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 text-white text-xs">X</div>
              <div className="w-full h-full border-2 border-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full border border-gray-500 border-opacity-20"></div>
        {/* Grid lines would be rendered here */}
      </div>
      {/* Measurement Display (when measure tool is active) */}
      {activeTool === 'measure' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md text-sm">
          Distance: 12.45 m
        </div>
      )}
      {/* Section Plane Controls (when section tool is active) */}
      {/* {activeTool === 'section' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md text-sm flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>X:</span>
            <input type="range" className="w-24" />
          </div>
          <div className="flex items-center gap-2">
            <span>Y:</span>
            <input type="range" className="w-24" />
          </div>
          <div className="flex items-center gap-2">
            <span>Z:</span>
            <input type="range" className="w-24" />
          </div>
        </div>
      )} */}
    </div>
  </div>
</div>

         {/* Right Side Panel */}
         <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Panel Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveSidePanel('details')}
              className={`flex-1 px-4 py-3 text-sm font-medium ${activeSidePanel === 'details' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveSidePanel('layers')}
              className={`flex-1 px-4 py-3 text-sm font-medium ${activeSidePanel === 'layers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Layers
            </button>
            <button
              onClick={() => setActiveSidePanel('annotations')}
              className={`flex-1 px-4 py-3 text-sm font-medium ${activeSidePanel === 'annotations' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Annotations
            </button>
          </div>
          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Details Panel */}
            {activeSidePanel === 'details' && (
              <div>
                {selectedElement ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Element Information</h3>
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Element ID:</div>
                          <div className="text-gray-900 font-medium">EL-10045</div>
                          <div className="text-gray-500">Type:</div>
                          <div className="text-gray-900 font-medium">Wall</div>
                          <div className="text-gray-500">Category:</div>
                          <div className="text-gray-900 font-medium">Structural</div>
                          <div className="text-gray-500">Level:</div>
                          <div className="text-gray-900 font-medium">Level 2</div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Dimensions</h3>
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Length:</div>
                          <div className="text-gray-900 font-medium">4.5 m</div>
                          <div className="text-gray-500">Width:</div>
                          <div className="text-gray-900 font-medium">0.2 m</div>
                          <div className="text-gray-500">Height:</div>
                          <div className="text-gray-900 font-medium">3.2 m</div>
                          <div className="text-gray-500">Area:</div>
                          <div className="text-gray-900 font-medium">14.4 m²</div>
                          <div className="text-gray-500">Volume:</div>
                          <div className="text-gray-900 font-medium">2.88 m³</div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Material</h3>
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Material:</div>
                          <div className="text-gray-900 font-medium">Concrete</div>
                          <div className="text-gray-500">Grade:</div>
                          <div className="text-gray-900 font-medium">C30/37</div>
                          <div className="text-gray-500">Fire Rating:</div>
                          <div className="text-gray-900 font-medium">120 min</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Properties</h3>
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Load Bearing:</div>
                          <div className="text-gray-900 font-medium">Yes</div>
                          <div className="text-gray-500">Phase Created:</div>
                          <div className="text-gray-900 font-medium">New Construction</div>
                          <div className="text-gray-500">Comments:</div>
                          <div className="text-gray-900 font-medium">Structural wall between units</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 p-6">
                    <i className="fas  text-4xl mb-4"></i>
                    <p className="text-center"> {details}</p>
                  </div>
                )}
              </div>
            )}
            {/* Layers Panel */}
            {activeSidePanel === 'layers' && (
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Architectural</h3>
                    <div className="flex items-center">
                      <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Walls</span>
                      </div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Doors</span>
                      </div>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Windows</span>
                      </div>
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Furniture</span>
                      </div>
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Structural</h3>
                    <div className="flex items-center">
                      <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Columns</span>
                      </div>
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Beams</span>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Floors</span>
                      </div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Foundation</span>
                      </div>
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">MEP</h3>
                    <div className="flex items-center">
                      <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">HVAC</span>
                      </div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Plumbing</span>
                      </div>
                      <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Electrical</span>
                      </div>
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" checked />
                        <span className="text-sm text-gray-700">Fire Protection</span>
                      </div>
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Annotations Panel */}
            {activeSidePanel === 'annotations' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Annotations</h3>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer" onClick={openModal}>
                    <i className="fas fa-plus mr-1"></i> New
                  </button>
                  {isModalOpen && (
        <NewAnnotationForm   closeModal={closeModal} editData={editAnnotation} />
      )}
                </div>
                <div className="space-y-3">{
                  annotations?.map((annotation) => (
                    <div key={annotation?._id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-gray-800">{annotation?.title}</div>
                        <div className="text-xs text-gray-500"> {formatDistanceToNow(new Date(annotation?.createdAt))}</div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{annotation?.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">By: {annotation?.author}</div>
                        <div className="flex gap-2">
                          
                          <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => handleEditAnnotation(annotation)}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => delete_annotation(annotation?._id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Panel Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Last updated: April 18, 2025
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-download"></i>
                  <span>Export</span>
                </button>
                <button className="flex items-center gap-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-file-pdf"></i>
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenBim;
