import axios from "axios";
import { useEffect, useState } from "react"; // เพิ่ม useEffect
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../loadingComponent";
import Swal from "sweetalert2";
function LoginUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [load , setload] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      return;
    }
    const verifyUser = async () => {
      try {
        setload(true);
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_API_URL}auth/verify`,
          { userId: user }
        );
        setload(false);
        if (!response.data.isValid) {
          navigate("/");
        } else {
          navigate("/user");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        navigate("/");
      }
    };
    verifyUser();
  }, []);
  const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const url = `${import.meta.env.VITE_REACT_API_URL}auth/userlogin`;
  const Clicky = async () => {
    try {
      setload(true);
      const response = await axios.post(
        url,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      setload(false);
      localStorage.setItem("user", response.data.user.userId);
      if (response.data.message == "Login Successfully") {
        console.log(document.cookie);
        navigate("/user");
      }else{
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
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  const regis = () => {
    navigate("/regisuser");
  };
  const selectLogin = () => {
    navigate("/");
  };
  return (
    <div>
      {load ? <LoadingComponent /> : <nav className="flex justify-center min-h-screen bg-gray-300 max-sm:bg-gray-50 relative">
        <div className="flex flex-1 justify-center items-center bg-gray-50 shasow-xl rounded-xl m-4">
          <div className="items-center rounded-xl p-20 shadow-xl border-gray-100 max-sm:bg-gray-200">
            <div className="text-lg flex-col flex justify-center items-center">
              <img
                src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0"
                className="w-40"
              />
            </div>
            <br />
            <div className="grid p-4">
              <input
                type="text"
                placeholder="username"
                className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                value={username}
                onChange={onUserChange}
              />
              <input
                type="text"
                placeholder="email"
                className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                value={email}
                onChange={onEmailChange}
              />
              <input
                type="password"
                placeholder="password"
                className="bg-gray-200 max-sm:bg-gray-50 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                value={password}
                onChange={onPassChange}
              />
              <br />
              <div className="flex flex-col gap-5 justify-between p-1">
                <button
                  className="hover:cursor-pointer bg-green-500 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-green-500"
                  onClick={Clicky}
                >
                  Login
                </button>
                <button
                  className="hover:cursor-pointer bg-slate-800 p-2 rounded-xl text-slate-50 hover:bg-stone-300 hover:text-gray-950"
                  onClick={regis}
                >
                  Register
                </button>
              </div>
              <button
                className="hover:cursor-pointer absolute bottom-10 left-10 text-xl text-red-500"
                onClick={selectLogin}
              >
                back
              </button>
            </div>
          </div>
        </div>
      </nav>}
    </div>
  );
}

export default LoginUser;
