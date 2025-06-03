const AuthHeader = ({ title }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex flex-col items-center justify-center mb-8">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="w-36 h-32 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
    </div>
  );
};

export default AuthHeader; 