export interface FilmLink {
  label: string;
  href: string;
  type?: 'apple-tv' | 'hulu' | 'instagram' | 'imdb' | 'other';
}

export interface CastMember {
  name: string;
  role?: string;
}

export interface Film {
  title: string;
  status: string;
  description: string;
  releaseYear?: number;
  runtime?: string;
  genres?: string[];
  director?: string;
  cast?: CastMember[];
  links: FilmLink[];
  image?: string;
  poster?: string;
  images?: string[]; // Additional images/photos
  imdbLink?: string;
  trailerYouTubeUrl?: string;
  instagram?: string;
  synopsis?: string;
}

export const films: Film[] = [
  {
    title: "Griffin in Summer",
    status: "Streaming now on Hulu",
    description: "Griffin Nafly (Everett Blunck) is the most ambitious playwright of his generation. He's also fourteen years old and living with his parents in a humdrum suburb while dreaming of moving to New York City. When his mom (Melanie Lynskey) hires a handsome 25-year-old handyman (Owen Teague), Griffin's life and his new play take an inspired turn.",
    releaseYear: 2024,
    runtime: "1h 33m",
    genres: ["Comedy", "Drama"],
    director: "Nicholas Colia",
    cast: [
      { name: "Everett Blunck", role: "Griffin Nafly" },
      { name: "Owen Teague", role: "Brad" },
      { name: "Melanie Lynskey", role: "Helen Nafly" },
      { name: "Abby Ryder Fortson", role: "Kara" },
      { name: "Kathryn Newton", role: "Chloe" },
      { name: "Michael Esper", role: "Bill" }
    ],
    links: [
      { 
        label: "Watch on Apple TV", 
        href: "https://tv.apple.com/us/movie/griffin-in-summer/umc.cmc.480zltwkjhzn9pi3r5yi9rfvg",
        type: "apple-tv"
      },
      { 
        label: "Stream on Hulu", 
        href: "https://www.hulu.com/movie/20306ecb-a4a6-4f42-b089-9d542041d52f",
        type: "hulu"
      },
      { 
        label: "Instagram", 
        href: "https://www.instagram.com/griffininsummerfilm/?hl=en",
        type: "instagram"
      }
    ],
    image: "/films/griffininsummer.jpg",
    poster: "/films/posters/Griffin_In_Summer_VOD_Portrait_LR.jpg",
    imdbLink: "https://www.imdb.com/title/tt28569819/",
    trailerYouTubeUrl: "https://www.youtube.com/watch?v=rqB0PrvUs0M&pp=ygURZ3JpZmZpbiBpbiBzdW1tZXI%3D",
    instagram: "https://www.instagram.com/griffininsummerfilm/?hl=en",
    synopsis: "Griffin Nafly (Everett Blunck) is the most ambitious playwright of his generation. He's also fourteen years old and living with his parents in a humdrum suburb while dreaming of moving to New York City. When his mom (Melanie Lynskey) hires a handsome 25-year-old handyman (Owen Teague), Griffin's life and his new play take an inspired turn. Also starring Kathryn Newton and Abby Ryder Fortson."
  },
  {
    title: "Idiotka",
    status: "Releases in theaters February 2026",
    description: "In this sharp, irreverent comedy, a disgraced fashion designer with a dangerously low credit score, Margarita (Anna Baryshnikov) enters a reality show with a six-figure cash prize to save her babushka's West Hollywood apartment. But as the competition intensifies, slick producer Nicol (Camila Mendes) pushes her to spin her family's struggle into spectacle, forcing Margarita to decide whether to play along or take control of her own narrative, one unhinged look at a time.",
    releaseYear: 2026,
    genres: ["Comedy"],
    links: [
      {
        label: "Buy Tickets Here (coming soon)",
        href: "#",
        type: "other"
      },
      { 
        label: "Instagram", 
        href: "https://www.instagram.com/idiotkamovie/?hl=en",
        type: "instagram"
      }
    ],
    image: "/films/idiotka.jpg",
    poster: "/films/posters/IDIOTKA-POSTER-2-R10.jpeg",
    imdbLink: "https://www.imdb.com/title/tt35677327/",
    trailerYouTubeUrl: "https://www.youtube.com/watch?v=0xTAq7_40tk",
    instagram: "https://www.instagram.com/idiotkamovie/?hl=en"
  },
  {
    title: "DED",
    status: "In Post-Production",
    description: "A contemporary silent film following the journey of a young man who wakes up to discover he is no longer alive, and is forced to confront his mortality as he watches the world, and everyone he loves, spin on without him.",
    links: [],
  }
];

// Helper function to get a film by title
export function getFilmByTitle(title: string): Film | undefined {
  return films.find(film => film.title === title);
}

// Helper function to get released films
export function getReleasedFilms(): Film[] {
  return films.filter(film => film.status === "Released");
}

// Helper function to get upcoming films
export function getUpcomingFilms(): Film[] {
  return films.filter(film => film.status !== "Released" && film.status !== "In Post-Production");
}
