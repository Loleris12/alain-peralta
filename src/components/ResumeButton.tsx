import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ResumeButton = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const lastScroll = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const scrollingUp = current < lastScroll.current;

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) setShow(true);               // Animate in
        if (!inView && scrollingUp) setShow(false); // Reset when scrolling up past
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="center-btn"
    >
      <button
        className="btn-gradient"
        onClick={() =>
          window.open("/Peralta_Resume.pdf", "_blank", "noopener,noreferrer")
        }
      >
        View My Resume
      </button>
    </motion.div>
  );
};

export default ResumeButton;
