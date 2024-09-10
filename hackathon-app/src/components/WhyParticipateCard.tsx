interface ParticipateItem {
  icon: string;
  title: string;
  description: string;
}

interface WhyParticipateCardProps {
  item: ParticipateItem;
}

const WhyParticipateCard: React.FC<WhyParticipateCardProps> = ({ item }) => {
  return (
    <div className="mb-4 p-8 bg-gray-100 rounded-2xl space-y-4 border border-transparent">
      <img className="p-4 rounded-lg w-fit" src={item.icon} alt={item.title} />
      <h4 className="font-bold">{item.title}</h4>
      <p>{item.description}</p>
    </div>
  );
};

export default WhyParticipateCard;
