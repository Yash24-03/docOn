// import React, { useState } from "react";
// import "../layout.css";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Badge } from "antd";

// function Layout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const { user } = useSelector((state) => state.user);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const userMenu = [
//     {
//       name: "Home",
//       path: "/",
//       icon: "ri-home-line",
//     },
//     {
//       name: "Appointments",
//       path: "/appointments",
//       icon: "ri-file-list-line",
//     },
//     {
//       name: "Apply Doctor",
//       path: "/apply-doctor",
//       icon: "ri-hospital-line",
//     }
//   ];

//   const doctorMenu = [
//     {
//       name: "Home",
//       path: "/",
//       icon: "ri-home-line",
//     },
//     {
//       name: "Appointments",
//       path: "/doctor/appointments",
//       icon: "ri-file-list-line",
//     },
//     {
//       name: "Profile",
//       path: `/doctor/profile/${user?._id}`,
//       icon: "ri-user-line",
//     },
//   ];

//   const adminMenu = [
//     {
//       name: "Home",
//       path: "/",
//       icon: "ri-home-line",
//     },
//     {
//       name: "Users",
//       path: "/admin/userslist",
//       icon: "ri-user-line",
//     },
//     {
//       name: "Doctors",
//       path: "/admin/doctorslist",
//       icon: "ri-user-star-line",
//     },
//     {
//       name: "Profile",
//       path: "/profile",
//       icon: "ri-user-line",
//     },
//   ];

//   const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
//   const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
//   return (
//     <div className="main">
//       <div className="d-flex layout">
//         <div className="sidebar">
//           <div className="sidebar-header">
//             <h1 className="logo">SH</h1>
//             <h1 className="role">{role}</h1>
//           </div>

//           <div className="menu">
//             {menuToBeRendered.map((menu) => {
//               const isActive = location.pathname === menu.path;
//               return (
//                 <div
//                   className={`d-flex menu-item ${
//                     isActive && "active-menu-item"
//                   }`}
//                 >
//                   <i className={menu.icon}></i>
//                   {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
//                 </div>
//               );
//             })}
//             <div
//               className={`d-flex menu-item `}
//               onClick={() => {
//                 localStorage.clear();
//                 navigate("/login");
//               }}
//             >
//               <i className="ri-logout-circle-line"></i>
//               {!collapsed && <Link to="/login">Logout</Link>}
//             </div>
//           </div>
//         </div>

//         <div className="content">
//           <div className="header">
//             {collapsed ? (
//               <i
//                 className="ri-menu-2-fill header-action-icon"
//                 onClick={() => setCollapsed(false)}
//               ></i>
//             ) : (
//               <i
//                 className="ri-close-fill header-action-icon"
//                 onClick={() => setCollapsed(true)}
//               ></i>
//             )}

//             <div className="d-flex align-items-center px-4">
//               <Badge
//                 count={user?.unseenNotifications.length}
//                 onClick={() => navigate("/notifications")}
//               >
//                 <i className="ri-notification-line header-action-icon px-3"></i>
//               </Badge>

//               <Link className="anchor mx-2" to="/profile">
//                 {user?.name}
//               </Link>
//             </div>
//           </div>

//           <div className="body">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false); // For managing the collapsible behavior
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    }
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <nav className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            SH
          </Link>
        </div>

        <div className="flex text-lg justify-center">
          <div className="flex">
            {menuToBeRendered.map((menu) => (
              <Link
                key={menu.name}
                to={menu.path}
                className={`ml-4 hover:text-gray-300 ${
                  location.pathname === menu.path ? "text-blue-500" : ""
                }`}
              >
                {menu.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-4">
            <Badge count={user?.unseenNotifications.length}>
              <i
                className="ri-notification-line text-xl  cursor-pointer"
                onClick={() => navigate("/notifications")}
              ></i>
            </Badge>
          </div>

          <div className="mr-4">
            <span className="text-lg hover:text-gray-300">{role}</span>
          </div>

          <div className="mr-4">
            <Link className="text-lg hover:text-gray-300" to="/profile">
              {user?.name}
            </Link>
          </div>

          <div>
            <Link className="text-blue-500" onClick={handleLogout} to="/login">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <main className="p-4">
        {children}
      </main>

      {!collapsed && (
        <div className="flex justify-end p-4">
          {/* Other content if required */}
        </div>
      )}
    </div>
  );
}

export default Layout;