const FormContainer = ({ children }) => {
    return (
      <div className="container mx-auto mt-10 p-5">
        <div className="flex  justify-center">
          <div className="bg-slate-950 rounded-lg w-full md:w-1/3">
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default FormContainer;
  