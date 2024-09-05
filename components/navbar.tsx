// components/Navbar.tsx
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Right Side - Profile */}
        <div className="flex items-center space-x-2 ml-auto mr-1">
          <div className="text-sm text-right">
            <p className="font-medium mr-1">{user?.fullName}</p>
            <p className=" text-gray-500 mr-1">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
