import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingComponent from "../loadingComponent";

function RegisUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: ""
  });
  const [load, setload] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_REACT_API_URL}users/register`;
    
    if (formData.password === formData.repassword) {
      try {
        setload(true);
        const response = await axios.post(
          url,
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );
        setload(false);
        if (response.data.username === formData.username) {
          regissucc();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Register didn't Success!",
        });
        setload(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          repassword: ""
        });
      }
    } else {
      setFormData(prev => ({
        ...prev,
        password: "",
        repassword: ""
      }));
    }
  };

  const back = () => {
    navigate("/loginuser");
  };

  const regissucc = () => {
    Swal.fire({
      title: "Good job!",
      text: "Register success",
      icon: "success",
    });
    setTimeout(() => {
      navigate("/loginuser");
    }, 3000);
  };

  return (
    <div>
      {load ? (
        <LoadingComponent />
      ) : (
        <nav className="flex justify-center min-h-screen bg-[#E7E9EC] max-sm:bg-gray-50 relative">
          <div className="flex flex-1 justify-center items-center bg-gray-50 rounded-2xl m-10">
            <div className="items-center rounded-xl p-6 ">
              <div className="text-lg justify-center flex items-center flex-col">
                <div className="text-lg justify-center flex items-center flex-col">
                  <img
                    src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0"
                    className="w-50"
                  />
                </div>
                <form onSubmit={handleSubmit} className="grid p-4">
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    className="bg-gray-200 rounded-lg p-3 my-2 transition-transform transform hover:scale-110"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="bg-gray-200 rounded-lg p-3 my-2 transition-transform transform hover:scale-110"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="bg-gray-200 rounded-lg p-3 my-2 transition-transform transform hover:scale-110"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="repassword"
                    placeholder="re-password"
                    className="bg-gray-200 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                    value={formData.repassword}
                    onChange={handleChange}
                  />
                  <br />
                  <div className="flex justify-between p-1">
                    <button
                      type="button"
                      className="hover:cursor-pointer p-2 rounded-xl text-red-600 hover:text-red-400"
                      onClick={back}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="hover:cursor-pointer bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default RegisUser;
