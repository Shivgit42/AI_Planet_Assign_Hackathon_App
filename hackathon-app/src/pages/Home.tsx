import ExploreChallenges from "../components/ExploreChallenges";
import Header from "../components/Header/Header";
import Statistics from "../components/Statistics/Statistics";
import WhyParticipate from "../components/WhyParticipate";

const Home: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <Header />
      <Statistics />
      <WhyParticipate />
      <ExploreChallenges />
    </div>
  );
};

export default Home;
