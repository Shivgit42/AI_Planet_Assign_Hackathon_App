import { useNavigate } from "react-router-dom";

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="h-screen bg-custom-light grid place-content-center place-items-center space-y-8">
      <h2 className="text-white">Hi there, this page isn't valid🥹</h2>
      <button
        className="bg-white text-custom-dark w-fit"
        onClick={() => navigate("/hackathon")}
      >
        Go back to home
      </button>
    </section>
  );
};

export default Error;
