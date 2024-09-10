export interface ChallengeItem {
  id: string;
  image: string;
  startDate: string;
  endDate: string;
  type: "Easy" | "Medium" | "Hard";
  title: string;
  description: string;
  status: "active" | "past" | "upcoming";
}

// Export the items array with proper type annotations
export const items: ChallengeItem[] = [
  {
    id: "0",
    image: "/image/image 1.png",
    startDate: "2024-10-10",
    endDate: "2024-10-30",
    type: "Easy",
    title: "Data Science Bootcamp - Graded Datathon",
    description: "Identify the class to which each butterfly belongs to",
    status: "upcoming",
  },
  {
    id: "1",
    image: "/image/image 2.png",
    startDate: "2024-08-29",
    endDate: "2024-11-02",
    type: "Hard",
    title: "Data Sprint 70-Airline Passenger Satisfaction",
    description: "Identify the class to which each butterfly belongs to",
    status: "active",
  },
  {
    id: "2",
    image: "/image/image 3.png",
    startDate: "2024-10-01",
    endDate: "2024-12-30",
    type: "Medium",
    title: "Data Sprint 72 - Butterfly Identification",
    description: "Identify the class to which each butterfly belongs to",
    status: "upcoming",
  },
  {
    id: "3",
    image: "/image/image 4.png",
    startDate: "2024-07-01",
    endDate: "2024-07-30",
    type: "Easy",
    title: "Engineering Graduates Employment Outcomes",
    description: "Identify the class to which each butterfly belongs to",
    status: "past",
  },
  {
    id: "4",
    image: "/image/image 5.png",
    startDate: "2024-08-20",
    endDate: "2024-10-30",
    type: "Medium",
    title: "Data Sprint 71 - Weather Recognition",
    description: "Identify the class to which each butterfly belongs to",
    status: "active",
  },
  {
    id: "5",
    image: "/image/image 6.png",
    startDate: "2023-06-18",
    endDate: "2024-06-30",
    type: "Easy",
    title: "Travel Insurance Claim Prediction",
    description: "Identify the class to which each butterfly belongs to",
    status: "active",
  },
];
