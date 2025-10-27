const AuthLayout = ({ children }) => {
  return (
   <div className="flex justify-center">
      <div className="w-screen min-h-screen md:w-[60vw] p-4 sm:p-8 md:p-0 lg:p-12 items-center content-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
