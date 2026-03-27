"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Types ─────────────────────────────────────────────────────── */
interface Voice {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  hue: number;
}

/* ─── Active Interns (The Current Pulse) ─────────────────────── */
const INTERNS: Voice[] = [
  {
    id: "i1",
    name: "Yashwardhan Jain",
    role: "Full Stack Intern",
    quote: "I recently discovered an ideal study spot that has quickly become my go-to place for focused work and learning. The tranquil atmosphere allows me to immerse myself in my studies without the usual hustle and bustle. The free Wi-Fi is reliable, enabling seamless access to online resources.",
    initials: "YJ",
    hue: 0
  },
  {
    id: "i2",
    name: "Sanskriti Chouhan",
    role: "Software Intern",
    quote: "Lanos Institute is a excellent coaching. It was a great experience for me to learn the way of teaching is very easy to understand the topic and also friendly atmosphere. I am glad that I joined a Lanos Institute.",
    initials: "SC",
    hue: 24
  },
  {
    id: "i3",
    name: "Isaac Ahirwar",
    role: "Software Intern",
    quote: "The teachers are super knowledgeable and always ready to help. The study materials provided are really comprehensive and have been a great resource for my preparation. I'm really happy with my choice and would definitely recommend it!",
    initials: "IA",
    hue: 48
  },
  {
    id: "i4",
    name: "Kaushlendra Tiwari",
    role: "C++ Intern",
    quote: "I had an excellent teaching experience at the Lanos Institute for Programming Language C. The institute provided a well-structured curriculum and excellent resources. This makes it easy to understand C programming concepts such as pointers and data structures.",
    initials: "KT",
    hue: 72
  },
  {
    id: "i5",
    name: "Prachi Rohit",
    role: "Web Dev Intern",
    quote: "It's one of the best coaching for web development and language courses in Sagar. I found endless learning opportunities that was based on latest company requirements. The mentors here work on a mission to bring out best developers.",
    initials: "PR",
    hue: 96
  },
  {
    id: "i6",
    name: "Vinayak Shukla",
    role: "Software Intern",
    quote: "It's a very good institute to learn new software skills with indepth knowledge and conceptual clarity. Highly recommended to all persons who want to pursue their career in computer science and software skills.",
    initials: "VS",
    hue: 120
  },
  {
    id: "i7",
    name: "Ankita Patel",
    role: "C++ Intern",
    quote: "C++ Mastermind is an excellent coaching institute. With its expert faculty, structured curriculum, and practical approach, it offers great value for aspiring programmers. The quality of education makes it a top choice.",
    initials: "AP",
    hue: 144
  },
  {
    id: "i8",
    name: "Anurag Bala",
    role: "Python Intern",
    quote: "I am currently learning Python and Web development from LANOS institute. The trainers provide precise and accurate knowledge. LANOS provides a quiet, peaceful and positive environment that bolsters easy learning.",
    initials: "AB",
    hue: 168
  },
  {
    id: "i9",
    name: "Sachin Yadav",
    role: "Full Stack Intern",
    quote: "One of the best institutions for programming languages like Python, C++, and Javascript. Currently I am doing a Python full stack course here and from my experience I will say it is the best institution.",
    initials: "SY",
    hue: 192
  },
  {
    id: "i10",
    name: "Mahek Choudhary",
    role: "C++ Developer",
    quote: "I have completed C++ course from this institute and my experience was too good as the faculties here are experienced and supportive and they are always available for doubt solving. Definitely a good choice!",
    initials: "MC",
    hue: 216
  },
  {
    id: "i11",
    name: "Niranjan Yadav",
    role: "Software Intern",
    quote: "At Lanos, innovation thrives in a dynamic environment. Expert faculty guide students towards excellence. Hands-on experiences prepare graduates for real-world challenges. Where passion meets opportunity in the world of technology.",
    initials: "NY",
    hue: 240
  },
  {
    id: "i12",
    name: "C O D E R {Web Developer}",
    role: "Java Intern",
    quote: "I took a 2-month Core Java course here, and I can say that Lanos institute provides the best coding environment in the city. If you want to learn Python, Java, or web development, I highly recommend their course.",
    initials: "CD",
    hue: 264
  },
  {
    id: "i13",
    name: "Vedant Nagayach",
    role: "Python Intern",
    quote: "It's totally amazing. The staff and their skills and command on language are awesome. Very friendly environment, Helpful faculty. Made me master in C language and Python in just 5/6 months.",
    initials: "VN",
    hue: 288
  },
  {
    id: "i14",
    name: "Ayushi Rajak",
    role: "Software Intern",
    quote: "Best coaching ever I came to. The systematic customized structure of syllabus learning is amazing and the personal development classes are too good. Have a visit to pioneer your future in Lanos.",
    initials: "AR",
    hue: 312
  },
  {
    id: "i15",
    name: "Lalit Kurmi",
    role: "Research Intern",
    quote: "I am impressed by the way the learning resource centre is not only systematically arranged but effectively used. Let me congratulate the librarian & his team for their painstaking efforts to see the future in order.",
    initials: "LK",
    hue: 336
  }
];

/* ─── Alumni (The Success Network) ─────────────────────────── */
const ALUMNI: Voice[] = [
  {
    id: "a1",
    name: "Bhawna Badoniya",
    role: "Software Developer",
    quote: "In this time of hard competition it's really tough to find an institute that meets all your desired things. My search ended up here at LANOS. I got my skills sharpened and also my certificates at a very reasonable fee.",
    initials: "BB",
    hue: 0
  },
  {
    id: "a2",
    name: "Ashish Ahirwar",
    role: "AutoCAD Developer",
    quote: "This institute is dedicated to learning all types of software like AutoCAD. I have studied AutoCAD for a full 6 weeks and I have got the best result. I am very happy, thank you for the support.",
    initials: "AA",
    hue: 24
  },
  {
    id: "a3",
    name: "Miss Happy Queen",
    role: "C++ Developer",
    quote: "I have learned a lot from Lanos Institute. I have trained in C & C++ from here and also got the opportunity to work with the group. You should join us!",
    initials: "MQ",
    hue: 48
  },
  {
    id: "a4",
    name: "Amisha Gupta",
    role: "Software Engineer",
    quote: "Lanos is a very good institute for developing great knowledge and helping us to grow. It also develops confidence and motivates us to build our career and personality too.",
    initials: "AG",
    hue: 72
  },
  {
    id: "a5",
    name: "Somil Jain",
    role: "Systems Engineer",
    quote: "Very good institute for learning coding and computer courses. I learned good coding skills here and I'm very confident. The mentors guide you nicely and in good ways.",
    initials: "SJ",
    hue: 96
  },
  {
    id: "a6",
    name: "Ayush",
    role: "AutoCAD Developer",
    quote: "Amazing institute with perfect faculty, overall it's a fantastic place to learn. I mastered AutoCAD 2D and 3D software from here and my overall learning experience was fascinating.",
    initials: "AY",
    hue: 120
  },
  {
    id: "a7",
    name: "Gaurav Soni",
    role: "Java Developer",
    quote: "Thanks to LANOS, I enjoy learning to code and create projects with my teacher. There are also many types of courses available like C, C++, Python, and Java.",
    initials: "GS",
    hue: 144
  },
  {
    id: "a8",
    name: "Aditi Badoniya",
    role: "Software Engineer",
    quote: "I must say LANOS institute is one of the best facilitate institutes around Sagar and the faculties and facilities are also recommendable. You must visit once.",
    initials: "AB",
    hue: 168
  },
  {
    id: "a9",
    name: "Darpana Mhatre",
    role: "Frontend Developer",
    quote: "I had a very great experience at this place. Our teacher is very friendly and teaches all technical topics very clearly. They provide us with good facilities.",
    initials: "DM",
    hue: 192
  },
  {
    id: "a10",
    name: "Bisty Bakery & Cafe",
    role: "Python Developer",
    quote: "Lanos Institute is the best institute in Sagar and the best Python institute. Internship is also available here for C++, Java, and Web Full Stack courses.",
    initials: "BC",
    hue: 216
  },
  {
    id: "a11",
    name: "Deeksha Jain",
    role: "Software Developer",
    quote: "This institute is very good to learn computer courses and there is a very good coding culture in Sagar. I really like the way of teaching.",
    initials: "DJ",
    hue: 240
  },
  {
    id: "a12",
    name: "Umesh Patidar",
    role: "Web Developer",
    quote: "I am doing my Front End Web Development course from here. I honestly say this is the best institute for programming courses in Makronia, Sagar.",
    initials: "UP",
    hue: 264
  },
  {
    id: "a13",
    name: "Ankit Tiwari",
    role: "Java Developer",
    quote: "Best Python institute in Makroniya, Sagar. Best experience and all programming languages are available like Java, Web Development, C, and C++.",
    initials: "AT",
    hue: 288
  },
  {
    id: "a14",
    name: "Vansh Raikwar",
    role: "Software Engineer",
    quote: "Coding and programming language ke liye yah ek bhut acchi institute hai aur hamare Pawan Sir is the best teacher.",
    initials: "VR",
    hue: 312
  },
  {
    id: "a15",
    name: "Aniket Sharma",
    role: "Java Developer",
    quote: "Supportive, clears all doubts and friendly nature. In Sagar, Lanos is the best coding class for C, C++, Java, and Python.",
    initials: "AS",
    hue: 336
  }
];

/* ─── Avatar ────────────────────────────────────────────────────── */
function Avatar({ initials, hue }: { initials: string; hue: number }) {
  return (
    <div
      className="vs-avatar"
      style={{ "--av-hue": hue } as React.CSSProperties}
      aria-hidden
    >
      <span className="vs-avatar-initials">{initials}</span>
    </div>
  );
}

/* ─── Card ──────────────────────────────────────────────────────── */
function VoiceCard({ v }: { v: Voice }) {
  return (
    <div className="vs-card" style={{ "--av-hue": v.hue } as React.CSSProperties}>
      {/* Top accent strip */}
      <div className="vs-card-topline" />

      {/* Ambient glow */}
      <div className="vs-card-glow" />

      {/* Decorative opening quote mark */}
      <svg className="vs-deco-quote" viewBox="0 0 40 30" fill="none" aria-hidden>
        <path d="M0 20C0 10 6 2 16 0L17.5 3C12 4.5 9 8 8.5 12H14V28H0V20ZM22 20C22 10 28 2 38 0L39.5 3C34 4.5 31 8 30.5 12H36V28H22V20Z"
          fill="currentColor" opacity="0.08" />
      </svg>

      {/* Quote body */}
      <p className="vs-quote">{v.quote}</p>

      {/* Footer: avatar + name + role pill */}
      <div className="vs-card-footer">
        <Avatar initials={v.initials} hue={v.hue} />
        <div className="vs-meta">
          <span className="vs-name">{v.name}</span>
          <span className="vs-role-pill">{v.role}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Marquee Row ───────────────────────────────────────────────── */
function MarqueeRow({
  voices,
  direction,
  duration,
  label,
  rowLabel,
}: {
  voices: Voice[];
  direction: "left" | "right";
  duration: number;
  label: string;
  rowLabel: string;
}) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // 1. Clone the original cards so the track is 2× wide
    const origCards = Array.from(track.querySelectorAll<HTMLElement>(".vs-card"));
    origCards.forEach((card) => {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    // 2. Defer scrollWidth read until AFTER the browser has reflowed the DOM
    const rafId = requestAnimationFrame(() => {
      const half = track.scrollWidth / 2; // width of one full set

      // 3. For "right" direction, start the track displaced left by one set
      //    and animate back to 0. For "left", start at 0 and go to -half.
      if (direction === "right") {
        gsap.set(track, { x: -half });
        tweenRef.current = gsap.to(track, {
          x: 0,
          duration,
          ease: "none",
          repeat: -1,
        });
      } else {
        gsap.set(track, { x: 0 });
        tweenRef.current = gsap.to(track, {
          x: -half,
          duration,
          ease: "none",
          repeat: -1,
        });
      }

      // 4. Hover — smoothly slow to 10 % speed, spring back on leave
      const row = track.closest<HTMLElement>(".vs-row-wrap");
      if (!row) return;

      const onEnter = () =>
        gsap.to(tweenRef.current, { timeScale: 0.1, duration: 0.5, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });

      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);

      cleanupRef.current = () => {
        tweenRef.current?.kill();
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupRef.current?.();
    };
  }, [direction, duration]);

  return (
    <div className="vs-row-wrap" aria-label={rowLabel}>
      {/* Edge masks */}
      <div className="vs-fade-left"  aria-hidden />
      <div className="vs-fade-right" aria-hidden />

      {/* Row label */}
      <span className="vs-row-label">{label}</span>

      {/* Track */}
      <div className="vs-row-viewport">
        <div ref={trackRef} className="vs-track">
          {voices.map((v) => <VoiceCard key={v.id} v={v} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function VoicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.set(headerRef.current, { opacity: 0, y: 28 });
    const t = ScrollTrigger.create({
      trigger: headerRef.current,
      start:   "top 82%",
      onEnter: () => gsap.to(headerRef.current!, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }),
    });
    return () => t.kill();
  }, []);

  return (
    <section className="vs-section">

      {/* Top rule */}
      <div className="vs-rule" />

      {/* ── Header ─── */}
      <div ref={headerRef} className="vs-header">
        <span className="vs-eyebrow">Voices from the Ecosystem</span>
        <h2 className="vs-heading">Voices from the<br /><em>Ecosystem.</em></h2>
        <p className="vs-sub">Real stories from our active interns and placed alumni.</p>
      </div>

      {/* ── Marquees ─── */}
      <div className="vs-marquees">
        <MarqueeRow
          voices={INTERNS}
          direction="left"
          duration={55}
          label="The Active Pulse"
          rowLabel="Active interns at Lanos"
        />
        <MarqueeRow
          voices={ALUMNI}
          direction="right"
          duration={40}
          label="The Alumni Network"
          rowLabel="Placed alumni from Lanos"
        />
      </div>

      {/* ── Styles ─── */}
      
    </section>
  );
}
