// components/Navbar.tsx
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded, user } = useUser();

  const fullName = user?.fullName ?? "Guest";
  const email = user?.emailAddresses?.[0]?.emailAddress ?? "No email available";

  return (
    <nav className="top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="mx-auto px-4 py-3 flex justify-between items-center">
        {/* Right Side - Profile */}
        <div className="flex items-center space-x-2 ml-auto mr-1">
          <div className="text-sm text-right">
            {isLoaded ? (
              <>
                <p className="font-medium mr-1">{fullName}</p>
                <p className="text-gray-500 mr-1">{email}</p>
              </>
            ) : (
              <>
                {/* Placeholder for username and email, aligned to the right */}
                <div className="flex flex-col items-end">
                  <p className="font-medium bg-gray-300 h-5 w-24 rounded animate-pulse"></p>
                  <p className="text-gray-500 bg-gray-200 h-4 w-32 rounded mt-1 animate-pulse"></p>
                </div>
              </>
            )}
          </div>
          <div>
            {isLoaded ? (
              <UserButton />
            ) : (
              <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
