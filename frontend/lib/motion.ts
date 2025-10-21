export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export const stagger = (staggerChildren = 0.08) => ({
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren } }
});

export const slideIn = (dir: "left" | "right" = "right") => ({
  hidden: { opacity: 0, x: dir === "right" ? 24 : -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -5, scale: 0.95 },
  show: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};
