import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/upload-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-4xl mx-auto px-4 py-10">

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-8">

          {/* LEFT - IMAGE */}
          <div className="flex flex-col items-center md:w-1/3">
            {isEdit ? (
              <label htmlFor="image">
                <div className="relative cursor-pointer">
                  <img
                    className="w-36 h-36 object-cover rounded-full border"
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : userData.image || assets.profile_pic
                    }
                    alt=""
                  />
                  <img
                    className="w-8 absolute bottom-0 right-0"
                    src={assets.upload_area}
                    alt=""
                  />
                </div>
                <input
                id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  hidden
                />   
              </label>
            ) : (
              <img
                className="w-36 h-36 object-cover rounded-full border"
                src={userData.image || assets.profile_pic}
                alt=""
              />
            )}
          </div>

          {/* RIGHT - DETAILS */}
          <div className="flex-1">

            {/* NAME */}
            {isEdit ? (
              <input
                className="text-2xl font-semibold border-b w-full mb-4 outline-none"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            ) : (
              <h2 className="text-2xl font-semibold mb-4">
                {userData.name}
              </h2>
            )}

            {/* CONTACT INFO */}
            <div className="mb-4">
              <p className="text-gray-500 font-medium">
                Contact Information
              </p>

              <div className="mt-2 space-y-2">

                <p>
                  <b>Email:</b> {userData.email}
                </p>

                <div>
                  <b>Phone:</b>
                  {isEdit ? (
                    <input
                      className="ml-2 border px-2 py-1"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    userData.phone
                  )}
                </div>

                <div>
                  <b>Address:</b>
                  {isEdit ? (
                    <div className="mt-1 flex flex-col gap-1">
                      <input
                        className="border px-2 py-1"
                        value={userData.address?.line1 || ""}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              line1: e.target.value,
                            },
                          }))
                        }
                      />
                      <input
                        className="border px-2 py-1"
                        value={userData.address?.line2 || ""}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              line2: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  ) : (
                    <p>
                      {userData.address?.line1}{" "}
                      {userData.address?.line2}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* BASIC INFO */}
            <div className="mb-4">
              <p className="text-gray-500 font-medium">
                Basic Information
              </p>

              <div className="mt-2 flex flex-col md:flex-row gap-4">

                <div>
                  <b>Gender:</b>
                  {isEdit ? (
                    <select
                      className="ml-2 border px-2 py-1"
                      value={userData.gender}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  ) : (
                    userData.gender
                  )}
                </div>

                <div>
                  <b>DOB:</b>
                  {isEdit ? (
                    <input
                      type="date"
                      className="ml-2 border px-2 py-1"
                      value={userData.dob}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    userData.dob
                  )}
                </div>

              </div>
            </div>

            {/* BUTTON */}
            <div className="mt-6">
              {isEdit ? (
                <button
                  onClick={updateUserProfileData}
                  className="px-6 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                >
                  Save Information
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;