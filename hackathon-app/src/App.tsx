import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ChallengeDetails from "./components/ChallengeDetails";
import EditChallenge from "./components/EditChallenge";
import Error from "./pages/Error";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hackathon" element={<Home />} />
          <Route path="/hackathon/admin" element={<Admin />} />
          <Route path="/hackathon/details/:id" element={<ChallengeDetails />} />
          <Route
            path="/hackathon/details/:id/edit"
            element={<EditChallenge />}
          />{" "}
          {/* Added route for EditChallenge */}
          <Route path="/hackathon/*" element={<Error />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
