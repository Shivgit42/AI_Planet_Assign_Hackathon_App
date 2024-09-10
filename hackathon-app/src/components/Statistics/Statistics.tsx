import submissions from "../../assets/ai-icon.svg";
import reach from "../../assets/reach.svg";
import challengesHosted from "../../assets/hosted.svg";

// Define the type for an individual item
interface StatisticItem {
  icon: string;
  number: string;
  title: string;
}

const items: StatisticItem[] = [
  {
    icon: submissions,
    number: "100K+",
    title: "AI model submissions",
  },
  {
    icon: reach,
    number: "50K+",
    title: "Data Scientists",
  },
  {
    icon: challengesHosted,
    number: "100+",
    title: "AI Challenges hosted",
  },
];

const Statistics: React.FC = () => {
  return (
    <section className="py-16 bg-custom-dark">
      <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x">
        {items.map((item) => (
          <div
            className="flex items-center justify-center first:justify-start last:justify-end space-x-4"
            key={item.number}
          >
            <h4 className="aspect-square rounded-xl bg-white p-">
              <img src={item.icon} alt={item.title} className="w-full" />
            </h4>
            <div>
              <h4 className="text-white">{item.number}</h4>
              <p className="text-white">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
