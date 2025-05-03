import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  FaHome,
  FaTools,
  FaFileAlt,
  FaUsers,
  FaChartBar,
  FaUserCog,
  FaCogs,
  FaLifeRing,
  FaChartLine,
  FaTasks,
  FaComments,
  FaListAlt,
} from "react-icons/fa";
import { FaBoxOpen, FaClipboardList } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import {
  MdSecurity,
  MdOutlineHighQuality,
  MdAnnouncement,
} from "react-icons/md";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [activeSubmenuPath, setActiveSubmenuPath] = useState(null);

  // const [roledata, setRoleData] = useState(() => localStorage.getItem("role"));
  const [roledata, setRoleData] = useState(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole || null;
  });
  
  // Add useEffect to update roledata when it changes
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRoleData(storedRole);
    }
  }, []);

  console.log("roleData", roledata);



   
  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome className="menu-icon" />,
      path: "/dashboard",
    },
    {
      title: "Safety Compliance",
      icon: <MdSecurity className="menu-icon" />,
      submenu: [
        { title: "Dashboard", path: "/safety-compliance-dashboard" },
        { title: "SWMS", path: "/swms" },
        { title: "Inductions", path: "/inductions" },
        { title: "Incident Reports", path: "/incidentReports" },
        { title: "Site Entry", path: "/siteEntryTable" },
        { title: "Site Review", path: "/siteReview" },
        { title: "ComplianceReport", path: "/ComplianceReport" },
        { title: "Audit Equipment", path: "/audit-equipment" },
        { title: "Safety Equipment", path: "/safety-equipment" },
      ],
    },

    {
      title: "Quality Compliance",
      icon: <MdOutlineHighQuality className="menu-icon" />,
      submenu: [
        { title: "Dashboard", path: "/ComplianceDashboard" },
        { title: "ITPs", path: "/itps" },
        { title: "Checklists", path: "/checklists" },
        { title: "Defect List", path: "/defects" },
      ],
    },
    {
      title: "Plant & Machinery",
      icon: <FaHome className="menu-icon" />,
      path: "/plantMachinery",
    },
    {
      title: "Communication",
      icon: <FaComments className="menu-icon" />,
      submenu: [
        { title: "Messenger", path: "/messenger" },
        { title: "Announcement Board", path: "/announcements" },
        { title: "RFIs", path: "/rfis" },
        { title: "Toolbox Talks", path: "/toolbox" },
      ],
    },
    {
      title: "Project Planning",
      icon: <BsBuilding className="menu-icon" />,
      submenu: [
        { title: "Project", path: "/ProjectDashboard" },
        { title: "Calendar / Program", path: "/calendar" },
        { title: "Diaries", path: "/diariesTimesheets" },
      ],
    },

    {
      title: "Document Register",
      icon: <FaFileAlt className="menu-icon" />,
      path: "/documents",
    },
    {
      title: "Tasks Management",
      icon: <FaTasks className="menu-icon" />,
      path: "/TaskDashboard",
    },
    {
      title: "Drawing Register",
      icon: <FaListAlt className="menu-icon" />,
      path: "/drawingRegister",
    },
    {
      title: "3D BIM Modeling",
      icon: <FaTools className="menu-icon" />,
      path: "/doc3DBeamModeling",
    },
    {
      title: "AI Construction Assistant",
      icon: <FaChartLine className="menu-icon" />,
      path: "/aiConstructionAssistant",
    },
    {
      title: "Client Portal",
      icon: <FaUsers className="menu-icon" />,
      path: "/clientPortal",
    },
    {
      title: "Reports & Analytics",
      icon: <FaChartBar className="menu-icon" />,
      path: "/reportAnalytics",
    },
    {
      title: "User Management",
      icon: <FaUserCog className="menu-icon" />,
      path: "/userManagement",
    },
    {
      title: "Settings",
      icon: <FaCogs className="menu-icon" />,
      path: "/settings",
    },
    {
      title: "Help & Support",
      icon: <FaLifeRing className="menu-icon" />,
      path: "/helpSupport",
    },

    {
      title: "Dashboard",
      icon: <FaHome className="menu-icon" />,
      path: "/super-admin-dashboard",
    },
    {
      title: "Plan Package",
      icon: <FaBoxOpen className="menu-icon" />,
      path: "/Plan-Package",
    },
    {
      title: "Plan Request",
      icon: <FaClipboardList className="menu-icon" />,
      path: "/Plan-request",
    },
    {
      title: "User Info",
      icon: <FaUserCog className="menu-icon" />,
      path: "/user-info",
    },
    {
      title: "Setting",
      icon: <FaCogs className="menu-icon" />,
      path: "/super-admin-setting",
    },
  ];

  const navigate = useNavigate();

  // useEffect(() => {
  //   const Role = localStorage.getItem("role");
  //   if (Role) {
  //     setRoleData(Role);
  //   }
  // }, []);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handlesubmenuclick = (menuindex, path) => {
    setActiveMenuIndex(menuindex);
    setActiveSubmenuPath(path);
    setOpenMenuIndex(null);
    navigate(path);
  };

  // const filteredMenuItems = menuItems.filter((item) => {
  
  //   if (roledata === "admin" ) {
  //     const hiddenAdminPaths = [
  //       "/super-admin-dashboard",
  //       "/Plan-Package",
  //       "/Plan-request",
  //       "/user-info",
  //       "/super-admin-setting",
  //     ];
  //     return !hiddenAdminPaths.includes(item.path);
  //   } else if (roledata === "superadmin") {
  //     const superAdminMenuItems = [
  //       "/super-admin-dashboard",
  //       "/Plan-Package",
  //       "/Plan-request",
  //       "/user-info",
  //       "/super-admin-setting",
  //     ];
  //     if (superAdminMenuItems.includes(item.path)) {
  //       if (item.submenu) {
  //         item.submenu = item.submenu.filter((subItem) => true);
  //       }
  //       return true;
  //     }
  //     return false;
  //   } else if (roledata === "supervisor") {
  //     if (item.title === "User Management" || item.title === "Settings" || item.path === "/super-admin-dashboard" || item.path === "/Plan-Package" || item.path === "/Plan-request" || item.path === "/user-info" || item.path === "/super-admin-setting") {
  //       return false;
  //     }
  //     if (item.submenu) {
  //       item.submenu = item.submenu.filter((subItem) => {
  //         return subItem.title !== "Site Review";
  //       });
  //     }
  //     return true;
  //   } else if (roledata === "worker") {
  //     if (item.title === "User Management" || item.title === "Settings" || item.path === "/super-admin-dashboard") {
  //       return false;
  //     }


  //     console.log("filteredMenuItems", filteredMenuItems);
  //     // Worker can only see a specific set of items
  //     const workerMenuItems = [
  //       "Dashboard",
  //       "Active Projects",
  //       "Safety Compliance",
  //       "SWMS",
  //       "Incident Reports",
  //       "Toolbox Talks",
  //       "Help & Support",
  //       "Communication",
  //     ];
  //     if (workerMenuItems.includes(item.title)) {
  //       if (item.submenu) {
  //         item.submenu = item.submenu.filter((subItem) => {
  //           return [
  //             "Dashboard",
  //             "SWMS",
  //             "Incident Reports",
  //             "Messenger",
  //             "RFIs",
  //           ].includes(subItem.title);
  //         });
  //       }
  //       return true;
  //     }
  //     return false;
  //   }
  //   return false;
  // });


  const filteredMenuItems = menuItems.filter((item) => {
    // Parse the role data since it's stored as a JSON string
    const userRole = JSON.parse(roledata);
    
    switch(userRole) {
      case "superadmin":
        // Superadmin can see all superadmin-specific routes
        const superAdminMenuItems = [
          "/super-admin-dashboard",
          "/Plan-Package",
          "/Plan-request",
          "/user-info",
          "/super-admin-setting",
        ];
        return superAdminMenuItems.includes(item.path);
  
      case "admin":
        // Admin can see everything except superadmin routes
        const hiddenAdminPaths = [
          "/super-admin-dashboard",
          "/Plan-Package",
          "/Plan-request",
          "/user-info",
          "/super-admin-setting",
        ];
        return !hiddenAdminPaths.includes(item.path);
  
      case "supervisor":
        // Supervisor has limited access
        if (item.title === "User Management" || 
            item.title === "Settings" || 
            item.path?.startsWith("/super-admin")) {
          return false;
        }
        
        // Filter submenu items for supervisor if they exist
        if (item.submenu) {
          item.submenu = item.submenu.filter(subItem => 
            subItem.title !== "Site Review"
          );
        }
        return true;
  
      case "worker":
        // Worker has most limited access
        const workerAllowedMenus = [
          "Dashboard",
          "Safety Compliance",
          "Communication",
          "Tasks Management",
          "Help & Support"
        ];
        
        if (workerAllowedMenus.includes(item.title)) {
          // Filter submenu items for worker if they exist
          if (item.submenu) {
            item.submenu = item.submenu.filter(subItem => 
              ["Dashboard", "SWMS", "Incident Reports", "Messenger", "RFIs"].includes(subItem.title)
            );
          }
          return true;
        }
        return false;
  
      default:
        return false;
    }
  });
  
  // Add console logs for debugging
  console.log("Role:", JSON.parse(roledata));
  console.log("Filtered Menu Items:", filteredMenuItems);
  return (
    <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-text">Construction</span>
        </div>
      </div>
      <ul className="menu">
        {filteredMenuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${
              item.submenu
                ? openMenuIndex === index
                  ? "open"
                  : ""
                : activeMenuIndex === index
                ? "active"
                : ""
            }`}
            onClick={() => {
              if (item.submenu) {
                toggleMenu(index);
              } else {
                handlesubmenuclick(index, item.path);
              }
            }}
          >
            <div className="menu-link menu-i">
              {item.icon}
              {isOpen && <span className="menu-text">{item.title}</span>}
              {item.submenu && isOpen && (
                <i
                  className={`fas fa-chevron-down menu-toggle-icon ${
                    openMenuIndex === index ? "open" : ""
                  }`}
                />
              )}
            </div>
            {item.submenu && isOpen && (
              <ul
                className={`submenu ${openMenuIndex === index ? "open" : ""}`}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`submenu-item ${
                      activeSubmenuPath === subItem.path
                        ? "active-submenu-item"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlesubmenuclick(index, subItem.path);
                    }}
                  >
                    {subItem.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
