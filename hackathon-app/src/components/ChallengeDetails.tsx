import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { items } from "../utils/items";
import { MdOutlineWatchLater } from "react-icons/md";
import CarbonSkillIcon from "../assets/carbon_skill-level-basic.svg";
import Navbar from "./Navbar/Navbar";

// Define the type for challenge item
interface Challenge {
  title: string;
  description: string;
  startDate: string;
  type: string;
}

// Type definition for useParams
interface Params {
  id: string;
}

const ChallengeDetails: React.FC = () => {
  // Cast to unknown first before converting to Params
  const { id } = useParams() as unknown as Params; // type-safe access to id
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const item = items[Number(id)];
      setChallenge(item);
    }
  }, [id]);

  const handleDelete = () => {
    if (id) {
      items.splice(Number(id), 1);
      navigate("/hackathon");
    }
  };

  return (
    <section className="flex flex-col h-screen">
      <Navbar />
      <header className="max-w-6xl w-full mx-auto py-16 space-y-16">
        <div className="flex items-center justify-between">
          <button className="flex justify-center items-center bg-yellow-300 text-custom-light gap-2">
            <MdOutlineWatchLater className="text-lg" />
            Starts on {challenge?.startDate}
          </button>
        </div>
        <div className="space-y-8">
          <span className="font-semibold text-white text-5xl leading-tight relative before:absolute">
            {challenge?.title}
          </span>
          <p className="text-white text-lg">{challenge?.description}</p>
        </div>
        <button className="flex gap-2 bg-white rounded-lg px-6">
          <img src={CarbonSkillIcon} alt="skill-logo" />
          {challenge?.type}
        </button>
      </header>
      <div className="bg-white flex-1">
        <div className="mx-auto space-y-4">
          <nav className="border-b-2 border-b-slate-50">
            <div className="h-16 flex justify-between items-center shadow-xl px-48">
              <div className="h-full p-5 font border-b-4 border-b-green-600">
                Overview
              </div>
              <div>
                <Link
                  to={`/hackathon/details/${id}/edit`}
                  className="text-white bg-green-600 rounded-xl px-8 p-[10px]"
                >
                  Edit
                </Link>
                <button
                  className="text-red-600 border-2 border-red-500 p-2 rounded-xl px-6 ml-4"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </nav>
          <div className="w-[58%] ml-44 p-4">
            <p className="text-base">
              Butterflies are the adult flying stage of certain insects
              belonging to an order or group called Lepidoptera. The word
              "Lepidoptera" means "scaly wings" in Greek. This name perfectly
              suits the insects in this group because their wings are covered
              with thousands of tiny scales overlapping in rows.
            </p>
            <p className="text-base mt-4">
              An agency of the Governmental Wildlife Conservation is planning to
              implement an automated system based on computer vision so that it
              can identify butterflies based on captured images. As a consultant
              for this project, you are responsible for developing an efficient
              model.
            </p>
            <p className="text-base mt-4">
              Your Task is to build an Image Classification Model using CNN that
              classifies to which class of weather each image belongs to.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeDetails;
