import React from "react";

interface RequireRoleProps {
  children: React.ReactNode;
  allowRoles: string[];
}

/**
 * RequireRole component restricts access to its children based on user roles.
 * If the user's role is not included in the allowed roles, it applies a blur effect
 * and overlays a warning message indicating lack of access.
 */
const RequireRole: React.FC<RequireRoleProps> = ({ children, allowRoles }) => {
  // Retrieve user information from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user.role;

  // Check if the user has one of the allowed roles
  const hasAccess = allowRoles.includes(userRole);

  return (
    <div className="relative">
      {/* Render children with blur and disable interaction if access is denied */}
      <div className={hasAccess ? "" : "blur-sm pointer-events-none select-none"}>
        {children}
      </div>

      {/* Overlay warning message if user does not have access */}
      {!hasAccess && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 z-10 flex items-start justify-center pt-[10px]">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center">
            <h2 className="text-red-600 text-xl font-bold mb-2">🚫 Access Denied</h2>
            <p className="text-gray-700 text-sm">Please contact the administrator for access permissions.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequireRole;
