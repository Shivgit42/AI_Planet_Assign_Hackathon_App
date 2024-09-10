import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChallengeItem, items } from "../utils/items";
import Navbar from "./Navbar/Navbar";
import imageIcon from "../assets/bi_image-fill.svg";
import { FaArrowRightLong } from "react-icons/fa6";

type ChallengeType = "Easy" | "Medium" | "Hard";

interface FormData {
  title: string;
  startDate: string;
  endDate: string;
  type: ChallengeType;
  image: string;
  description: string;
}

const EditChallenge: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    startDate: "",
    endDate: "",
    type: "Easy",
    image: "",
    description: "",
  });

  const formatDate = (date: string | Date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (id) {
      const item = items.find((item) => item.id === id);

      if (item) {
        setFormData({
          title: item.title,
          startDate: formatDate(item.startDate),
          endDate: formatDate(item.endDate),
          type: item.type,
          image: item.image,
          description: item.description,
        });
      }
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "type" ? (value as ChallengeType) : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: URL.createObjectURL(file),
        }));
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      const updatedItem: ChallengeItem = {
        ...formData,
        id: id,
        status: "upcoming",
      };
      const index = items.findIndex((item) => item.id === id);
      if (index !== -1) {
        items[index] = updatedItem;
      }
      navigate(`/hackathon/details/${id}`);
    }
  };

  return (
    <section className="flex flex-col bg-white mb-20">
      <Navbar />
      <header className="w-full mx-auto space-y-10">
        <div className="h-20 flex items-center text-3xl px-36 font-semibold text-black bg-gray-200">
          Challenge Details
        </div>
        <form className="w-[58%] space-y-4 ml-32" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block font-medium w-2/3">
              Challenge Title
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border-2 border-gray-300 font-medium px-4 py-1 mt-3 rounded-md w-full outline-none"
              />
            </label>
            <label className="block font-medium w-2/3">
              Start Date
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border-2 border-gray-300 font-medium px-4 py-1 mt-3 rounded-md w-full outline-none"
              />
            </label>
            <label className="block font-medium w-2/3">
              End Date
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border-2 border-gray-300 font-medium px-4 py-1 mt-3 rounded-md w-full outline-none"
              />
            </label>

            <label className="block font-medium">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border-2 border-gray-300 font-medium px-4 py-1 mt-3 rounded-md w-full h-44 outline-none"
              />
            </label>
            <label className="block font-medium w-[30%]">
              Image
              <div className="bg-gray-200 rounded-md p-3">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Selected"
                    className="mt-2 w-48 rounded-xl"
                  />
                )}

                <input
                  type="file"
                  id="imageInput"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <label
                  htmlFor="imageInput"
                  className="w-[80%] gap-2 flex cursor-pointer text-green-600 bg-gray-200 font-medium px-4 py-1 mt-3 rounded-md"
                >
                  <img src={imageIcon} alt="icon" />
                  Change Image
                  <FaArrowRightLong className="mt-1" />
                </label>
              </div>
            </label>
            <label className="block font-medium w-2/3">
              Level Type
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border-2 border-gray-300 font-medium px-4 py-2 mt-3 rounded-md w-full outline-none"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="w-fit bg-custom-green text-white rounded-xl"
          >
            Save Changes
          </button>
        </form>
      </header>
    </section>
  );
};

export default EditChallenge;
