import { create } from "zustand";

export const tagStore = () => ({
  tagsList: [
    "AI",
    "Anime",
    "Art",
    "Astrology",
    "Book",
    "Cyber Sec",
    "Dev Ops",
    "Donghua",
    "Economy",
    "Education",
    "Environment",
    "Esport",
    "Estate",
    "Food",
    "Games",
    "Health",
    "IOT",
    "International Affair",
    "Languages",
    "Manga",
    "Manhwa",
    "Maths",
    "Machine Learning",
    "Mobile Dev",
    "Movie",
    "Music",
    "Networking",
    "Pets",
    "Politic",
    "Programming",
    "Religion",
    "Robotic",
    "Science",
    "Sport",
    "Tech News",
    "Tour",
    "Vehicle",
    "Web Dev",
  ],
});

export const useTagStore = create(tagStore);
