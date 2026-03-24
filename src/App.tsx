import Particles from "./components/Particles";
import AnimatedContent from "./components/AnimatedContent";
import TiltedCard from './components/TiltedCard';
import HoloCard from "./components/HoloCard";
import ResumeButton from "./components/ResumeButton";
import FlipCard from "./components/FlipCard";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { sendContactForm } from "./services/emailjsService";
import { useState, useEffect } from "react";
import "./App.css";

const sections = ["home", "about", "skills", "projects", "contact"];
const techCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: "python/python-original.svg" },
      { name: "JavaScript", icon: "javascript/javascript-original.svg" },
      { name: "PHP", icon: "php/php-original.svg" },
      { name: "C#", icon: "csharp/csharp-original.svg" },
      { name: "Assembly (x86)" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: "react/react-original.svg" },
      { name: "ASP.NET", icon: "dot-net/dot-net-original.svg" },
      { name: ".NET MAUI", icon: "dot-net/dot-net-original.svg" }
    ]
  },
  {
    title: "Web Technologies",
    skills: [
      { name: "HTML", icon: "html5/html5-original.svg" },
      { name: "CSS", icon: "css3/css3-original.svg" },
      { name: "REST APIs" }
    ]
  },
  {
    title: "Development Tools & Version Control",
    skills: [
      { name: "VS Code", icon: "vscode/vscode-original.svg" },
      { name: "VS Community", icon: "visualstudio/visualstudio-original.svg" },
      { name: "Android Studio", icon: "androidstudio/androidstudio-original.svg" },
      { name: "Arduino IDE", icon: "arduino/arduino-original.svg" },
      { name: "Git", icon: "git/git-original.svg" },
      { name: "GitHub", icon: "github/github-original.svg" }
    ]
  },
  {
    title: "Cloud & Databases",
    skills: [
      { name: "SQL Server", icon: "microsoftsqlserver/microsoftsqlserver-original.svg" },
      { name: "Firebase", icon: "firebase/firebase-plain.svg" },
      { name: "Google Cloud", icon: "googlecloud/googlecloud-original.svg" }
    ]
  }
];
const projects = [
  {
    title: "SPATE: Apparel E-Commerce Platform",
    image: "/Spate.png",
    tech: [
      { name: "ASP.NET", icon: "dot-net/dot-net-original.svg" },
      { name: "C#", icon: "csharp/csharp-original.svg" },
      { name: "HTML", icon: "html5/html5-original.svg" },
      { name: "CSS", icon: "css3/css3-original.svg" },
      { name: "SQL Server", icon: "microsoftsqlserver/microsoftsqlserver-original.svg" }
    ]
  },
  {
    title: "SafeStep",
    image: "/SafeStep.png",
    tech: [
      { name: "Arduino IDE", icon: "arduino/arduino-original.svg" },
      { name: ".NET MAUI", icon: "dot-net/dot-net-original.svg" },
      { name: "C#", icon: "csharp/csharp-original.svg" },
      { name: "Firebase", icon: "firebase/firebase-plain.svg" }
    ]
  },
  {
    title: "Inventory Management System with Transaction Tracking",
    image: "/Inventory.png",
    tech: [
      { name: "Python", icon: "python/python-original.svg" },
      { name: "JavaScript", icon: "javascript/javascript-original.svg" },
      { name: "HTML", icon: "html5/html5-original.svg" },
      { name: "CSS", icon: "css3/css3-original.svg" },
      { name: "MySQL", icon: "mysql/mysql-original.svg" }
    ]
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    const nav = document.querySelector('.app__nav');
    const hamburger = document.querySelector('.hamburger');
    if (!nav || !hamburger) return;

    if (nav.classList.contains('open')) {
      
      nav.classList.add('closing');
      nav.classList.remove('open');

      hamburger.classList.remove('open');

      setTimeout(() => {
        nav.classList.remove('closing');
      }, 500);
    } else {
      // Opening
      nav.classList.add('open');
      hamburger.classList.add('open');
    }
  };
  
  const handleCloseMenu = () => {
    const nav = document.querySelector('.app__nav');
    const hamburger = document.querySelector('.hamburger');
    if (!nav || !hamburger) return;

    nav.classList.add('closing');
    nav.classList.remove('open');

    hamburger.classList.remove('open');

    setTimeout(() => {
      nav.classList.remove('closing');
    }, 500);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="app">
      <div className="app__background">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles
          disableRotation
          pixelRatio={1}
        />
      </div>

      <header className="app__header">
        <div className="header-section">
          <a href="#home" className="app__logo">
            <div className="app__title-color">
              Alain.dev
            </div>
          </a>
          <nav className={`app__nav ${menuOpen ? "open" : ""}`}>
            {sections.map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                className={activeSection === sec ? "active" : ""}
                onClick={handleCloseMenu}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </a>
            ))}
          </nav>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        <section id="home">
          <div className="app__container">
            <div className="home-section">
              <div className="home-section-left">
                <AnimatedContent className="app__title"
                  distance={50}
                  direction="vertical"
                  reverse={false}
                  duration={1}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0}
                >
                  Hi, I'm <span className="app__title-color">Alain Nezar A. Peralta</span>
                </AnimatedContent>                  
                <AnimatedContent className="app__subtitle app__title-color"
                  distance={50}
                  direction="vertical"
                  reverse={false}
                  duration={1}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0.3}
                >
                  Aspiring Fullstack Developer & IT Enthusiast
                </AnimatedContent>
                <div className="app__body app__body--primary">
                  <AnimatedContent 
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={1}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0.6}
                  >
                    I design and develop clean, user-focused digital experiences that bring ideas 
                    to life. I'm passionate about improving my craft and creating meaningful work 
                    as a developer.
                  </AnimatedContent>
                </div>
                <AnimatedContent className="btn-group"
                  distance={50}
                  direction="vertical"
                  reverse={false}
                  duration={1}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0.9}
                >
                  <button className="btn-gradient"
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Get In Touch
                  </button>
                  <button className="btn-black"
                    onClick={() =>
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View My Work
                  </button>
                </AnimatedContent>
              </div>
              <div className="home-section-right">
                <div className="home-profile-img">
                  <TiltedCard
                    containerWidth="380px"
                    containerHeight="500px"
                  >
                    <HoloCard imageSrc="/profile2.png" alt="Profile picture of Alain Nezar A. Peralta" />
                  </TiltedCard>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="alt-section-color section-spacing">
          <div className="app__container">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
            >
              <div className="app__section-title">About Me</div>
            </AnimatedContent>
            <div className="app__body app__body--secondary">
              <AnimatedContent
                distance={50}
                direction="horizontal"
                reverse={true}
                duration={1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0}
              >
                Hello! I'm Alain, a passionate developer who enjoys designing and building clean, 
                functional, and impactful technology. I focus on creating applications 
                that are both visually appealing and practical to use.
                <br />
                <br />
                With a strong attention to detail and a commitment to continuous learning, I enjoy 
                turning ideas into working solutions on the web. I'm always looking for opportunities 
                to improve my skills, explore new technologies, and contribute to meaningful projects.
              </AnimatedContent>
            </div>
            <ResumeButton />
          </div>
        </section>
        <section id="skills" className="section-spacing">
          <div className="app__container">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
            >
              <div className="app__section-title">Skills & Technologies</div>
            </AnimatedContent>
            {techCategories.map((category) => (
              <div key={category.title}>
                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={false}
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0}
                >
                  <div className="skills-title">{category.title}</div>
                  <div className="skills-grid">
                    {category.skills.map((skill) => (
                      <div className="skill-card" key={skill.name}>
                        {skill.icon && (
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}`}
                            alt={skill.name}
                          />
                        )}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedContent>
              </div>
            ))}
          </div>
        </section>
        <section id="projects" className="alt-section-color section-spacing">
          <div className="app__container">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
            >
              <div className="app__section-title">Featured Projects</div>
            </AnimatedContent>
            <AnimatedContent
              distance={175}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
            >
              <div className="flip-card-container">
                {projects.map((project, index) => (
                  <FlipCard
                    key={index}
                    frontContent={
                      <div className="card-front-layout">
                        <div className="card-image">
                          <img src={project.image} alt={project.title} />
                        </div>
                        <div className="card-title">
                          <h3>{project.title}</h3>
                        </div>
                      </div>
                    }
                    backContent={
                      <div className="card-back-layout">
                        <p>Technologies Used</p>
                        <div className="project-grid">
                          {project.tech.map((tech, i) => (
                            <div className="project-card" key={i}>
                              {tech.icon && (
                                <img
                                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}`}
                                  alt={tech.name}
                                />
                              )}
                              <span>{tech.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            </AnimatedContent>
          </div>
        </section>
        <section id="contact" className="section-spacing">
          <div className="app__container">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
            >
              <div className="app__section-title">Get In Touch</div>
            </AnimatedContent>
            <div className="contact-section">
              <div className="contact-section-left">
                <AnimatedContent
                  distance={100}
                  direction="horizontal"
                  reverse={true}
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0.5}
                >
                  <div className="contact-subtitle">
                    Let's work together!
                  </div> 
                  <div className="app__body app__body--tertiary">
                    I'm always eager to explore new opportunities and collaborate on exciting 
                    projects. Have a question or want to connect? Feel free to reach out!
                  </div>
                  <div className="contact-details">
                    <FaEnvelope className="contact-icon" />
                    <div className="app__body contact-item">
                      peralta.nezar@gmail.com
                    </div>
                  </div>
                  <div className="contact-details">
                    <FaPhone className="contact-icon phone-icon" />
                    <div className="app__body contact-item">
                      +63 969 035 5686
                    </div>
                  </div>
                  <div className="contact-details">
                    <FaMapMarkerAlt className="contact-icon" />
                    <div className="app__body contact-item">
                      Philippines, Calamba, Laguna
                    </div>
                  </div>                
                  <div className="social-icons">
                    <a href="https://github.com/loleris12" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/alain-nezar-peralta" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  </div>
                </AnimatedContent>
              </div>
              <div className="contact-section-right">
                <AnimatedContent
                  distance={100}
                  direction="horizontal"
                  reverse={false}
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0.5}
                >
                  <form
                    className="contact-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      sendContactForm(form)
                        .then(() => {
                          alert("Message sent successfully!");
                          form.reset();
                        })
                        .catch((err: unknown) => {
                          alert("Failed to send message.");
                          console.error(err);
                        });
                    }}
                  >
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <input type="text" name="subject" placeholder="Subject" required />
                    <textarea name="message" placeholder="Your Message" rows={5} required />
                    <button type="submit" className="btn-gradient btn-gradient-2">
                      Send Message
                    </button>
                  </form>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app__footer">
        © {new Date().getFullYear()} Alain Nezar A. Peralta. All rights reserved.
      </footer>
    </div>
  );
}

export default App;