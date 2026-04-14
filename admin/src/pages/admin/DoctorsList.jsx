import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
 

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors ,changeAvailability} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-4 md:m-5 max-h-[90vh] overflow-y-scroll">
      
      <h1 className="text-lg md:text-xl font-semibold mb-4">
        All Doctors
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        
        {doctors.map((item, index) => (
          
          <div
            key={item._id}
            className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition duration-300"
          >

            <img
              className="bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500 w-full h-40 object-cover"
              src={item.image}
              alt=""
            />

            <div className="p-3">
              <p className="text-neutral-800 text-base md:text-lg font-medium">
                {item.name}
              </p>

              <p className="text-zinc-600 text-sm">
                {item.speciality}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <input
                  onChange={()=>changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="accent-indigo-600"
                  
                />
                <p className={`text-sm ${item.available ? "text-green-500" : "text-black"}`}>
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default DoctorsList;