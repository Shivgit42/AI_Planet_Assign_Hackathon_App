import { useNavigate } from "react-router-dom";
import rocketIcon from "../../assets/rocket-icon.svg";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-between h-2/3 max-w-6xl mx-auto py-32">
        <div className="space-y-16 w-2/3">
          <div className="space-y-8">
            <h1 className="font-semibold">
              Accelerate Innovation with Global AI Challenges
            </h1>
            <p className="text-white w-4/6 text-lg">
              AI Challenges at DPhi simulate real-world problems. It is a great
              place to put your AI/Data Science skills to test on diverse
              datasets allowing you to foster learning through competitions.
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg font-extrabold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            onClick={() => navigate("/hackathon/admin")}
          >
            Create challenge
          </button>
        </div>
        <img src={rocketIcon} alt="rocket-image" className="w-1/3" />
      </section>
    </>
  );
};

export default Header;
