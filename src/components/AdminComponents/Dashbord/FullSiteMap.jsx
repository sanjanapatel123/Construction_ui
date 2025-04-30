import React, { useState, useRef, useEffect } from "react";
import * as echarts from "echarts";
import "bootstrap/dist/css/bootstrap.min.css"; // Optional: for any custom overrides

const FullSiteMap = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedZone, setSelectedZone] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const mapPosition = useRef({ x: 0, y: 0 });

  const zones = [
    {
      id: 1,
      name: "Zone A - Excavation",
      supervisor: "John Smith",
      status: "Active",
      safetyEquipment: ["Hard Hat", "Safety Vest", "Steel-toe Boots"],
      coordinates: { x: 25, y: 30 },
      color: "#FF5733",
    },
    {
      id: 2,
      name: "Zone B - Electrical Work",
      supervisor: "Sarah Johnson",
      status: "Active",
      safetyEquipment: ["Hard Hat", "Safety Vest", "Insulated Gloves"],
      coordinates: { x: 45, y: 40 },
      color: "#33A1FF",
    },
    {
      id: 3,
      name: "Zone C - Foundation",
      supervisor: "Michael Chen",
      status: "Inactive",
      safetyEquipment: ["Hard Hat", "Safety Vest", "Respirator"],
      coordinates: { x: 65, y: 25 },
      color: "#33FF57",
    },
    {
      id: 4,
      name: "Zone D - Structural Work",
      supervisor: "Emily Rodriguez",
      status: "Under Maintenance",
      safetyEquipment: ["Hard Hat", "Safety Harness", "Safety Vest"],
      coordinates: { x: 35, y: 60 },
      color: "#9B59B6",
    },
    {
      id: 5,
      name: "Zone E - Material Storage",
      supervisor: "David Wilson",
      status: "Active",
      safetyEquipment: ["Hard Hat", "Safety Vest", "Gloves"],
      coordinates: { x: 75, y: 55 },
      color: "#F1C40F",
    },
  ];

  const points = [
    {
      id: 1,
      name: "Worker Entry Gate",
      type: "entry",
      coordinates: { x: 10, y: 10 },
    },
    {
      id: 2,
      name: "Emergency Exit",
      type: "emergency",
      coordinates: { x: 90, y: 10 },
    },
    {
      id: 3,
      name: "Equipment Zone",
      type: "equipment",
      coordinates: { x: 80, y: 80 },
    },
    {
      id: 4,
      name: "Restricted Area",
      type: "restricted",
      coordinates: { x: 20, y: 70 },
    },
    {
      id: 5,
      name: "Safety Assembly Point",
      type: "safety",
      coordinates: { x: 50, y: 90 },
    },
  ];

  useEffect(() => {
    const minimapChart = echarts.init(document.getElementById("minimap"));
    const option = {
      animation: false,
      backgroundColor: "#f5f5f5",
      xAxis: { type: "value", min: 0, max: 100, show: false },
      yAxis: { type: "value", min: 0, max: 100, show: false },
      series: [
        {
          type: "scatter",
          symbolSize: 15,
          data: zones.map((zone) => [zone.coordinates.x, zone.coordinates.y]),
          itemStyle: { color: (params) => zones[params.dataIndex].color },
        },
        {
          type: "scatter",
          symbolSize: 8,
          data: points.map((p) => [p.coordinates.x, p.coordinates.y]),
          itemStyle: {
            color: (params) => {
              const type = points[params.dataIndex].type;
              return type === "entry"
                ? "#27AE60"
                : type === "emergency"
                ? "#E74C3C"
                : type === "equipment"
                ? "#3498DB"
                : type === "restricted"
                ? "#C0392B"
                : "#2ECC71";
            },
          },
        },
      ],
    };
    minimapChart.setOption(option);
    window.addEventListener("resize", () => minimapChart.resize());
    return () => {
      minimapChart.dispose();
      window.removeEventListener("resize", () => minimapChart.resize());
    };
  }, []);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.2, 0.5));
  const handleReset = () => {
    setZoomLevel(1);
    mapPosition.current = { x: 0, y: 0 };
    updateTransform();
  };
  const updateTransform = () => {
    if (mapRef.current) {
      mapRef.current.style.transform = `scale(${zoomLevel}) translate(${mapPosition.current.x}px, ${mapPosition.current.y}px)`;
    }
  };
  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPosition.current.x;
    const dy = e.clientY - lastPosition.current.y;
    mapPosition.current.x += dx;
    mapPosition.current.y += dy;
    updateTransform();
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => (isDragging.current = false);

  useEffect(() => updateTransform(), [zoomLevel]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
        <button
          className="btn btn-outline-secondary"
          onClick={() => window.history.back()}
        >
          <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
        </button>
        <h4 className="m-0">Construction Site Map</h4>
        <div>
          <button className="btn btn-outline-primary me-2">
            <i className="fas fa-share-alt me-1"></i> Share
          </button>
          <button className="btn btn-outline-primary">
            <i className="fas fa-download me-1"></i> Export
          </button>
        </div>
      </div>

      <div className="row no-gutters" style={{ height: "calc(100vh - 73px)" }}>
        <div
          className="col position-relative"
          ref={mapContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={mapRef}
            className="w-100 h-100 position-absolute"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=construction%20site%20layout')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="position-absolute text-center text-white fw-bold"
                style={{
                  left: `${zone.coordinates.x}%`,
                  top: `${zone.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedZone(zone)}
              >
                <div
                  className="rounded-circle shadow"
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: zone.color,
                    lineHeight: "60px",
                  }}
                >
                  Z{zone.id}
                </div>
                <small className="bg-white text-dark rounded p-1 d-block mt-1">
                  {zone.name}
                </small>
              </div>
            ))}
          </div>

          <div className="position-absolute top-0 start-0 m-3">
            <button
              onClick={handleZoomIn}
              className="btn btn-light d-block mb-2"
            >
              <i className="fas fa-plus"></i>
            </button>
            <button
              onClick={handleZoomOut}
              className="btn btn-light d-block mb-2"
            >
              <i className="fas fa-minus"></i>
            </button>
            <button onClick={handleReset} className="btn btn-light">
              <i className="fas fa-expand-arrows-alt"></i>
            </button>
          </div>

          <div className="position-absolute bottom-0 start-0 m-3 bg-white px-2 py-1 rounded">
            Scale: 50m
          </div>
          <div
            className="position-absolute bottom-0 end-0 m-3 border rounded"
            style={{ width: 200, height: 200 }}
          >
            <div id="minimap" style={{ width: "100%", height: "100%" }}></div>
          </div>
        </div>

        <div
          className="col-auto border-start bg-white"
          style={{ width: sidebarOpen ? 300 : 50 }}
        >
          <div className="p-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i
                className={`fas fa-chevron-${sidebarOpen ? "left" : "right"}`}
              ></i>
            </button>
          </div>
          {sidebarOpen && (
            <div
              className="p-3 overflow-auto"
              style={{ maxHeight: "calc(100vh - 73px)" }}
            >
              <h5>Zones</h5>
              {zones.map((z) => (
                <div
                  key={z.id}
                  className={`border-start border-4 px-2 py-1 mb-2 ${
                    selectedZone?.id === z.id
                      ? "border-primary bg-light"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedZone(z)}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: z.color,
                      }}
                    ></div>
                    <strong>{z.name}</strong>
                  </div>
                  <span className="badge bg-${z.status === 'Active' ? 'success' : z.status === 'Inactive' ? 'secondary' : 'warning'} mt-1">
                    {z.status}
                  </span>
                </div>
              ))}
              {selectedZone && (
                <div className="bg-light p-2 rounded">
                  <h6>{selectedZone.name} Details</h6>
                  <p>
                    <strong>Supervisor:</strong> {selectedZone.supervisor}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedZone.status}
                  </p>
                  <p>
                    <strong>Safety Equipment:</strong>
                  </p>
                  <ul className="ps-3">
                    {selectedZone.safetyEquipment.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullSiteMap;
