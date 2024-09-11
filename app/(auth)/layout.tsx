import Image from "next/image";
import TopLoader from "nextjs-toploader"; // Import TopLoader

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Include TopLoader */}
      <TopLoader />

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl w-full mx-4">
        <div className="auth-layout-container flex flex-col lg:flex-row ">
          {/* Left Column */}
          <div className="auth-layout-left flex flex-col justify-between lg:w-1/2 bg-primary p-10 rounded-lg">
            {/* Logo Section */}
            <div className="flex items-center justify-center">
              <div className="mr-2">
                <Image
                  src="/icon.png"
                  alt=""
                  width={50}
                  height={50}
                  className="invert"
                ></Image>
              </div>
              <div className="text-primary-foreground text-3xl">
                STARTUP DEFENSE
              </div>
            </div>
            {/* Copyright Section */}
            <div className="flex justify-center text-primary-foreground mt-6 lg:mt-0">
              <p className="text-sm">Copyrited 2024 - All Rights Reserved.</p>
            </div>
          </div>
          {/* Right Column */}
          <div className="auth-layout-right flex items-center justify-center lg:w-1/2 p-10">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
