import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingComponent from "../loadingComponent";
import Swal from "sweetalert2";
function LoginAdmin() {
  const [adminname, setAdminname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setload] = useState(false);
  let navigate = useNavigate();
  const onAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminname(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const url = `${import.meta.env.VITE_REACT_API_URL}auth/adminlogin`;
  const Clicky = async () => {
    try {
      setload(true);
      const response = await axios.post(
        url,
        {
          adminName: adminname,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      setload(false);
      if (response.data.message == "Login Successfully") {
        localStorage.setItem("admin", response.data.user.adminID)
        navigate("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login didn't Success!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login didn't Success!",
      });
      setload(false);
      setAdminname("");
      setEmail("");
      setPassword("");
    }
  };
  const selectLogin = () => {
    navigate("/");
  };
  return (
    <div>
      {load ? (
        <LoadingComponent />
      ) : (
        <nav className="flex justify-center min-h-screen bg-[#E7E9EC]  max-sm:bg-gray-50 relative">
          <div className="flex flex-1 justify-center items-center bg-gray-50 shasow-xl rounded-xl m-10">
            <div className="items-center rounded-xl p-10 md:p-20  rounded-xl border-gray-100">
              <div className="text-lg justify-center flex items-center flex-col">
                <img
                  src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0"
                  className="w-50"
                />
                {/* Login Admin */}
              </div>
              <div className="grid p-4">
                {/* adminname */}
                <input
                  type="text"
                  placeholder="adminname"
                  className="bg-gray-200 rounded-lg p-3 my-2 transition-transform transform hover:scale-110"
                  onChange={onAdminChange}
                />
                {/* email */}
                <input
                  type="text"
                  placeholder="email"
                  className="bg-gray-200 rounded-lg p-3 my-2 transition-transform transform hover:scale-110"
                  onChange={onEmailChange}
                />
                {/* password */}
                <input
                  type="password"
                  placeholder="password"
                  className="bg-gray-200 rounded-lg p-3 my-2 transition-transform transform hover:scale-110"
                  onChange={onPassChange}
                />
                <br />
                <div className="flex justify-end p-1">
                  {/* <button className="bg-slate-800 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-gray-950">Register</button> */}
                  <button
                    className="hover:cursor-pointer bg-green-500 w-[100%] p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500"
                    onClick={Clicky}
                  >
                    Login
                  </button>
                  <button
                    className="hover:cursor-pointer absolute bottom-14 left-15 text-xl text-red-500"
                    onClick={selectLogin}
                  >
                    back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default LoginAdmin;
