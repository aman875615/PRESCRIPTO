import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [showFilter,setShowFilter]=useState(false)

  // Apply Filter
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-6">

      {/* Heading */}
      <p className="text-gray-600 mb-4">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-6 mt-5">

        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#5f6FFF] text-white' : ''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        {/* LEFT SIDE - SPECIALITY LIST */}
        <div className={` flex-col gap-4 text-sm text-gray-600 sm:w-1/4 ${showFilter ? 'flex' : 'hidden sm:flex' }`}>

          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctor")
                : navigate("/doctor/General physician")
            }
            className={`pl-3 py-1.5 border rounded cursor-pointer ${
              speciality === "General physician"
                ? "bg-blue-100 text-black"
                : ""
            }`}
          >
            General physician
          </p>

          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctor")
                : navigate("/doctor/Gynecologist")
            }
            className={`pl-3 py-1.5 border rounded cursor-pointer ${
              speciality === "Gynecologist" ? "bg-blue-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>

          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctor")
                : navigate("/doctor/Dermatologist")
            }
            className={`pl-3 py-1.5 border rounded cursor-pointer ${
              speciality === "Dermatologist" ? "bg-blue-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>

          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctor")
                : navigate("/doctor/Pediatricians")
            }
            className={`pl-3 py-1.5 border rounded cursor-pointer ${
              speciality === "Pediatricians" ? "bg-blue-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>

          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctor")
                : navigate("/doctor/Neurologist")
            }
            className={`pl-3 py-1.5 border rounded cursor-pointer ${
              speciality === "Neurologist" ? "bg-blue-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>

          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctor")
                : navigate("/doctor/Gastroenterologist")
            }
            className={`pl-3 py-1.5 border rounded cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-blue-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>

        {/* RIGHT SIDE - DOCTOR CARDS */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">

          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              {/* Doctor Image */}
              <img
                src={item.image}
                alt={item.name}
                className="bg-blue-50 w-full"
              />

              <div className="p-4">

                {/* Availability */}
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p>Available</p>
                </div>

                {/* Doctor Name */}
                <p className="text-gray-900 text-lg font-medium mt-2">
                  {item.name}
                </p>

                {/* Speciality */}
                <p className="text-gray-600 text-sm">
                  {item.speciality}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Doctor;

