import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDateDiff } from "../utils/formatTime";
import { formatDate1 } from "../utils/formatTime";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface Challenge {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
  status?: string;
}

interface ExploreChallengesCardProps {
  item: Challenge;
}

const ExploreChallengesCard: React.FC<ExploreChallengesCardProps> = ({
  item,
}) => {
  const [diff, setDiff] = useState<{
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  // Determine the status of the challenge based on current date
  const status =
    new Date() > new Date(item.startDate) && new Date() < new Date(item.endDate)
      ? "Active"
      : new Date() > new Date(item.endDate)
      ? "Past"
      : "Upcoming";

  item.status = status;

  useEffect(() => {
    let timer: number | undefined;
    if (status === "Upcoming" || status === "Active") {
      timer = window.setInterval(() => {
        setDiff(getDateDiff(new Date(), new Date(item.startDate)));
      }, 1000);
    }
    return () => {
      if (timer !== undefined) {
        clearInterval(timer);
      }
    };
  }, [item, status]);

  return (
    <Link to={`/hackathon/details/${item.id}`}>
      <div className="m-3 bg-white rounded-xl overflow-hidden">
        <img src={item.image} alt="card header image" />
        <div className="p-8 space-y-4 flex flex-col items-center">
          <div
            className={`px-3 ${
              status === "Upcoming"
                ? "bg-orange-100"
                : status === "Active"
                ? "text-custom-green bg-green-100"
                : "bg-red-100"
            } rounded-lg`}
          >
            {status}
          </div>

          <h4>{item.title}</h4>
          <p>
            {status === "Upcoming"
              ? "Starts in"
              : status === "Active"
              ? "Ends in"
              : "Ended on"}
          </p>
          {status !== "Past" ? (
            <div className="w-full grid grid-cols-4 divide-x">
              <div>
                <h4>{diff.day}</h4>
                <p>Days</p>
              </div>
              <div>
                <h4>{diff.hour}</h4>
                <p>Hours</p>
              </div>
              <div>
                <h4>{diff.minute}</h4>
                <p>Mins</p>
              </div>
              <div>
                <h4>{diff.second}</h4>
                <p>Secs</p>
              </div>
            </div>
          ) : (
            <h4 className="text-center">{formatDate1(item.endDate)}</h4>
          )}
          <div className="space-x-4">
            <button
              disabled={status === "Past"}
              className="flex text-white bg-custom-green rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoMdCheckmarkCircleOutline className="mt- mr-2 text-xl" />
              Participate now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExploreChallengesCard;
