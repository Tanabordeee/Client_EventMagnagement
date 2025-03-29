import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingComponent from "../loadingComponent";

function RegisClub() {
  const [clubname, setClubname] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [load, setload] = useState(false);
  let navigate = useNavigate();

  const onClubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClubname(e.target.value);
  };
  const onDescripChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onRepassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_REACT_API_URL}club/register`;
    if (password == repassword) {
      try {
        setload(true);
        const response = await axios.post(
          url,
          {
            clubName: clubname,
            description: description,
            email: email,
            password: password,
          },
          { withCredentials: true }
        );
        setload(false);
        if (response.data.clubName == clubname) {
          regissucc();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Register didn't Success!",
        });
        setload(false);
        setClubname("");
        setEmail("");
        setPassword("");
        setRepassword("");
      }
    } else {
      setPassword("");
      setRepassword("");
    }
  };

  const back = () => {
    navigate("/loginclub");
  };

  const regissucc = () => {
    Swal.fire({
      title: "Good job!",
      text: "Register success",
      icon: "success",
    });
    setTimeout(() => {
      navigate("/loginclub");
    }, 3000);
  };

  return (
    <div>
      {load ? <LoadingComponent /> : <nav className="flex justify-center min-h-screen bg-[#E7E9EC] max-sm:bg-gray-50 relative">
        <div className="flex flex-1 justify-center items-center bg-gray-50 shasow-xl rounded-xl m-10">
          <div className="items-center rounded-xl p-6 ">
            <div className="text-lg justify-center flex items-center flex-col">
              <div className="text-lg justify-center flex items-center flex-col">
                <img
                  src="https://th.bing.com/th/id/R.42e6ec3449dea58699565dd1ea96b485?rik=jEWzso5OGALO%2fw&pid=ImgRaw&r=0"
                  className="w-50"
                />
                {/* Register Club */}
              </div>
              <form onSubmit={handleSubmit} className="grid p-4">
                {/* username */}
                <input
                  type="text"
                  placeholder="clubname"
                  className="bg-gray-200 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                  value={clubname}
                  onChange={onClubChange}
                />
                <input
                  type="text"
                  placeholder="description"
                  className="bg-gray-200  rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                  value={description}
                  onChange={onDescripChange}
                />
                {/* email */}
                <input
                  type="email"
                  placeholder="email"
                  className="bg-gray-200  rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                  value={email}
                  onChange={onEmailChange}
                />
                {/* password */}
                <input
                  type="password"
                  placeholder="password"
                  className="bg-gray-200 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                  value={password}
                  onChange={onPassChange}
                />
                {/* password */}
                <input
                  type="password"
                  placeholder="re-password"
                  className="bg-gray-200 rounded-lg p-2 my-2 transition-transform transform hover:scale-110"
                  value={repassword}
                  onChange={onRepassChange}
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
      </nav>}
    </div>
  );
}

export default RegisClub;
