import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { items as data } from "../utils/items";
import { ChallengeItem } from "../utils/items";

type FormItem = {
  label: string;
  name: string;
  type: "text" | "date" | "select" | "file";
  options?: string[];
  placeholder: string;
};

type FormData = {
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  image: File | null;
  description: string;
};

const items: FormItem[] = [
  {
    label: "Challenge name",
    name: "title",
    type: "text",
    placeholder: "Enter challenge name",
  },
  {
    label: "Start date",
    name: "startDate",
    type: "date",
    placeholder: "Enter start date",
  },
  {
    label: "End date",
    name: "endDate",
    type: "date",
    placeholder: "Enter end date",
  },
  {
    label: "Type",
    name: "type",
    type: "select",
    options: ["Easy", "Medium", "Hard"],
    placeholder: "Select challenge type",
  },
  {
    label: "Image",
    name: "image",
    type: "file",
    placeholder: "Select challenge image",
  },
];

const style =
  "border px-4 py-2 rounded-sm focus:border-custom-light outline-none";

const Admin = () => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    startDate: "",
    endDate: "",
    type: "Easy",
    image: null,
    description: "",
  });

  const { title, startDate, endDate, type, description } = formData;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (
      e.target.name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFormData({
        ...formData,
        image: selectedFile, // Update the formData with the selected file
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Determine the status of the challenge based on the current date
    const currentDate = new Date();
    const challengeStartDate = new Date(formData.startDate);
    const challengeEndDate = new Date(formData.endDate);

    let status: "active" | "past" | "upcoming";
    if (currentDate > challengeEndDate) {
      status = "past";
    } else if (currentDate < challengeStartDate) {
      status = "upcoming";
    } else {
      status = "active";
    }

    // Create a new item with the correct ChallengeItem type
    const newItem: ChallengeItem = {
      id: (data.length + 1).toString(),
      title,
      startDate,
      endDate,
      type: type as "Easy" | "Medium" | "Hard",
      description,
      image: file ? URL.createObjectURL(file) : "",
      status: status,
    };

    // Add the new item to the data array
    data.push(newItem);
    navigate("/hackathon");
  };

  return (
    <section className="flex flex-col h-screen">
      <div className="py-4">
        <h4 className="max-w-6xl mx-auto text-white font-semibold">
          Challenge Details
        </h4>
      </div>
      <div className="bg-white py-16 flex-1">
        <form
          className="max-w-6xl mx-auto grid grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="col-span-1 space-y-8">
            {items.map((item) => (
              <div className="flex flex-col space-y-2" key={item.label}>
                <label>{item.label}</label>
                {item.type === "select" ? (
                  <select
                    className={`${style} appearance-none`}
                    name={item.name}
                    onChange={handleChange}
                  >
                    {item.options!.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : item.type === "file" ? (
                  <input
                    type={item.type}
                    placeholder={item.placeholder}
                    name={item.name}
                    className={`${style} file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-500
                    hover:file:bg-green-100`}
                    ref={filePickerRef}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    className={style}
                    onChange={handleChange}
                    required
                  />
                )}
                {item.type === "file" && file && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="selected image"
                      className="rounded-sm"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white absolute right-4 bottom-4 rounded-xl"
                      onClick={() => {
                        setFile(null);
                        setFormData({ ...formData, image: null });
                        if (filePickerRef.current) {
                          filePickerRef.current.value = "";
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            <label>Description</label>
            <textarea
              name="description"
              className={`${style} h-full col-span-1 resize-none`}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-fit bg-custom-green text-white rounded-xl"
          >
            Create challenge
          </button>
        </form>
      </div>
    </section>
  );
};

export default Admin;
