import { t } from "../i18n";
import tuttoegiadiverso from "../assets/tuttoegiadiverso.jpeg";
import esse from "../assets/esse.jpeg";
import labellezzadellasera from "../assets/labellezzadellasera.jpeg";
import lamorecose from "../assets/lamorecose.jpeg";
import giada from "../assets/giada.jpeg";

import tuttoegiadiversoBack from "../assets/tuttoegiadiversoback.jpg";
import esseback from "../assets/esseback.jpg";

export const releases = [
  {
    date: "2024",
    title: "Tutto è già diverso",
    image: tuttoegiadiverso,
    backImage: tuttoegiadiversoBack,
    description:
      t("Un viaggio nelle sonorità pop-rock moderne, con testi introspettivi e ritmi incalzanti.", "A journey through modern pop-rock sounds, with introspective lyrics and driving rhythms."),
    spotifyEmbed:"https://open.spotify.com/embed/album/2EPBkFcUQLkJA4dcOOTDoo?utm_source=generator&theme=0",
    spotifyLink: "https://open.spotify.com/intl-it/album/2EPBkFcUQLkJA4dcOOTDoo",
    buyLink: "https://..."
  },

  {
    date: "2023",
    title: "Esse",
    image: esse,
    backImage: esseback,
    subtitle: t("Opera musicale in cinque parti", "A musical work in five parts"),
    description:
    t("Un'opera che attraversa i passaggi essenziali della vita, traducendo emozioni, tensioni interiori e percezioni in un linguaggio musicale sospeso tra scrittura e sperimentazione.", "A work that moves through the essential passages of life, translating emotions, inner tensions and perceptions into a musical language suspended between songwriting and experimentation."),
    credits: [
    t("Musiche originali di Emanuele Monetti", "Original music by Emanuele Monetti"),
    t("In copertina: Luca Dalmazio, Self-Portrait", "Cover: Luca Dalmazio, Self-Portrait"),
    ],
    spotifyLink: "https://open.spotify.com/...",
    buyLink: "https://..."
  },
 {
    date: "2023",
    title: "La bellezza della sera",
    subtitle: t("Opera musicale in cinque parti", "A musical work in five parts"),
    image: labellezzadellasera,
    backImage: labellezzadellasera,
    description:
      t("Un'opera che attraversa i passaggi essenziali della vita.", "A work that moves through the essential passages of life."),
    spotifyLink: "https://open.spotify.com/...",
    buyLink: "https://..."
  },
  {
    date: "2024",
    title: "L' Amore Cos è",
    subtitle: t("Opera musicale in cinque parti", "A musical work in five parts"),
    image: lamorecose,
    backImage: lamorecose,
    description:
      t("Un'opera che attraversa i passaggi essenziali della vita.", "A work that moves through the essential passages of life."),
    spotifyLink: "https://open.spotify.com/...",
    buyLink: "https://..."
  },
   {
    date: "2025",
    title: "Giada",
    subtitle: t("Opera musicale in cinque parti", "A musical work in five parts"),
    image: giada,
    backImage: giada,
    description:
      t("Un'opera che attraversa i passaggi essenziali della vita.", "A work that moves through the essential passages of life."),
    spotifyLink: "https://open.spotify.com/...",
    buyLink: "https://..."
  },
];
