import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
    Code2,
    Terminal,
    Coffee,
    Mail,
    Github,
    Linkedin,
    ExternalLink,
    Download,
    ChevronDown,
    Menu,
    X,
    Server,
    Database,
    Globe,
    Briefcase,
    User,
    Award,
    Moon,
    Sun,
    Phone,
} from "lucide-react";
import emailjs from "@emailjs/browser";

import hero_bg from "./asset/images/hero_bg.jpg";
import logo from "./asset/images/logo.png";
import cv from "./asset/cv/cv_aquilas_dev.pdf";

function App() {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState("hero");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isCursorVisible, setIsCursorVisible] = useState(false);
    const scrollTimeoutRef = useRef(null);

    // Framer Motion scroll tracking
    const { scrollYProgress } = useScroll();
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    useEffect(() => {
        emailjs.init("YOUR_PUBLIC_KEY");
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsCursorVisible(true);
        };

        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            setMousePosition({ x: touch.clientX, y: touch.clientY });
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            setMousePosition({ x: touch.clientX, y: touch.clientY });
            setIsCursorVisible(true);

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                setIsCursorVisible(false);
            }, 100);
        };

        const handleTouchEnd = () => {
            setIsCursorVisible(false);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        window.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const handleDownloadResume = () => {
        const lastDownload = localStorage.getItem("cv_last_download");

        const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD

        // Vérifie si l’utilisateur a déjà téléchargé aujourd’hui
        if (lastDownload === today) {
            toast.error("Vous avez déja telechargé.", {
                style: {
                    background: isDarkMode ? "#1f2937" : "#f9fafb",
                    color: isDarkMode ? "#f9fafb" : "#1f2937",
                    border: `1px solid ${isDarkMode ? "#374151" : "#d1d5db"}`,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "14px",
                },
            });
            return;
        }

        // Si pas encore téléchargé aujourd’hui → Téléchargement du fichier
        const link = document.createElement("a");
        link.href = `${cv}`; // Mets ici le chemin de ton CV dans public/
        link.download = "CV_AQUILAS_DEV.pdf";
        link.click();

        // Enregistre la date du téléchargement
        localStorage.setItem("cv_last_download", today);

        toast.success("CV téléchargé avec succès!", {
            style: {
                background: isDarkMode ? "#1f2937" : "#f9fafb",
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                border: `1px solid ${isDarkMode ? "#374151" : "#d1d5db"}`,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "14px",
            },
        });
    };

    const handleViewWork = () => {
        scrollToSection("projects");
        toast("Découvrez mes projets ci-dessous", {
            icon: "👀",
            style: {
                background: isDarkMode ? "#1f2937" : "#f9fafb",
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                border: `1px solid ${isDarkMode ? "#374151" : "#d1d5db"}`,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "14px",
            },
        });
    };

    const handleContactClick = (type, value) => {
        navigator.clipboard.writeText(value);
        toast.success(`${type} copié dans le presse-papiers!`, {
            style: {
                background: isDarkMode ? "#1f2937" : "#f9fafb",
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                border: `1px solid ${isDarkMode ? "#374151" : "#d1d5db"}`,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "14px",
            },
        });
    };

    const handleProjectAction = (action, projectTitle, url) => {
        if (url === "#") {
            toast(`Ce code est privé pour le client`, {
                icon: action === "CODE" ? "💻" : "🚀",
                style: {
                    background: isDarkMode ? "#1f2937" : "#f9fafb",
                    color: isDarkMode ? "#f9fafb" : "#1f2937",
                    border: `1px solid ${isDarkMode ? "#374151" : "#d1d5db"}`,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "14px",
                },
            });
            return;
        }
        toast(`${action} - ${projectTitle}`, {
            icon: action === "CODE" ? "💻" : "🚀",
            style: {
                background: isDarkMode ? "#1f2937" : "#f9fafb",
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                border: `1px solid ${isDarkMode ? "#374151" : "#d1d5db"}`,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "14px",
            },
        });
        if (url) {
            window.open(url, "_blank");
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        emailjs
            .sendForm(
                "service_5leulb8",
                "template_k8thkke",
                form,
                "OXrZwlg839aN0C2hQ",
            )
            .then(
                () => {
                    toast.success("Message envoyé avec succès!", {
                        style: {
                            background: isDarkMode ? "#1f2937" : "#f9fafb",
                            color: isDarkMode ? "#f9fafb" : "#1f2937",
                            border: `1px solid ${
                                isDarkMode ? "#374151" : "#d1d5db"
                            }`,
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "14px",
                        },
                    });
                    form.reset();
                },
                (error) => {
                    toast.error("Erreur lors de l'envoi du message.", {
                        style: {
                            background: isDarkMode ? "#1f2937" : "#f9fafb",
                            color: isDarkMode ? "#f9fafb" : "#1f2937",
                            border: `1px solid ${
                                isDarkMode ? "#374151" : "#d1d5db"
                            }`,
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "14px",
                        },
                    });
                    console.error("EmailJS error:", error);
                },
            );
    };

    useEffect(() => {
        const sections = ["hero", "about", "skills", "projects", "contact"];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 },
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    const skills = [
        { name: "JavaScript/TypeScript/PHP", level: 95, category: "Languages" },
        { name: "React/Next.js", level: 75, category: "Frontend" },
        { name: "Node.js/Nest.js/Laravel", level: 90, category: "Backend" },
        { name: "MySql/MongoDB", level: 80, category: "Database" },
        { name: "Docker/Git, CI/CD", level: 80, category: "DevOps" },
        { name: "AWS/GCP", level: 82, category: "Cloud" },
    ];

    const projects = [
        {
            title: "Konsortium ci",
            description:
                "Un site vitrine moderne de presentation d'entreprise.",
            tech: ["React Js", "Tailwind Css", "Email Js"],
            year: "JUIN 2025",
            status: "Production",
            link: "https://konsortium-ci.com/",
            url: "#",
            enCours: true,
        },
        {
            title: "200bounty",
            description:
                "Une application web qui met en relation les hackers ethiques et les entreprises. J'ai travaillé sur le backend.",
            tech: ["Nest Js", "Node Js", "Mysql"],
            year: "Fevrier 2025",
            status: "Production",
            link: "https://200bounty.com/",
            url: "#",
            enCours: false,
        },
        {
            title: "Mon portfolio",
            description:
                "Tu es en train de le voir! Mon portfolio personnel développé avec React et Framer Motion.",
            tech: ["React Js", "Tailwind Css", "Email Js"],
            year: "Juillet 2025",
            status: "Production",
            link: "#",
            url: "https://github.com/Dev-aquilas225/porfolio-final",
            enCours: true,
        },
        {
            title: "Volailles d'or",
            description:
                "J'ai juste aidé a la conception et au deployement sur mon serveur",
            tech: ["React Js", "Tailwind Css", "Email Js"],
            year: "Novembre 2025",
            status: "Production",
            link: "https://volaillesdor.com/",
            url: "#",
            enCours: true,
        },
    ];

    // Animation variants for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    // Animation variants for elements
    const elementVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" },
        }),
    };

    return (
        <div className="bg-white dark:bg-black text-black dark:text-white font-mono overflow-x-hidden relative transition-colors duration-300">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        fontFamily: "JetBrains Mono, monospace",
                    },
                }}
            />

            <div
                className={`fixed w-4 h-4 border-2 border-black dark:border-white rounded-full pointer-events-none z-50 transition-transform duration-100 ${
                    isCursorVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    left: mousePosition.x - 8,
                    top: mousePosition.y - 8,
                    transform: `scale(${scrollY > 100 ? 1.5 : 1})`,
                    mixBlendMode: isDarkMode ? "difference" : "multiply",
                }}
            />

            <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(${
                                isDarkMode
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(0,0,0,0.1)"
                            } 1px, transparent 1px),
                            linear-gradient(90deg, ${
                                isDarkMode
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(0,0,0,0.1)"
                            } 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                    }}
                />
            </div>

            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-black/20 dark:border-white/20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center py-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-xl font-bold tracking-wider"
                        >
                            <img
                                src={logo}
                                className="w-12 h-12 md:w-14 md:h-14"
                                alt="Logo"
                            />
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-8">
                            {[
                                { id: "hero", label: "HOME" },
                                { id: "about", label: "A PROPOS" },
                                { id: "skills", label: "SKILLS" },
                                { id: "projects", label: "WORK" },
                                { id: "contact", label: "CONTACT" },
                            ].map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={elementVariants}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative text-sm tracking-widest transition-all duration-300 hover:text-gray-600 dark:hover:text-gray-400 ${
                                        activeSection === item.id
                                            ? "text-black dark:text-white"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <motion.div
                                            className="absolute -bottom-1 left-0 w-full h-px bg-black dark:bg-white"
                                            layoutId="underline"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.button>
                            ))}

                            <motion.button
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-colors duration-300"
                            >
                                {isDarkMode ? (
                                    <Sun size={18} />
                                ) : (
                                    <Moon size={18} />
                                )}
                            </motion.button>
                        </div>

                        <div className="md:hidden flex items-center space-x-4">
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-colors duration-300"
                            >
                                {isDarkMode ? (
                                    <Sun size={16} />
                                ) : (
                                    <Moon size={16} />
                                )}
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white dark:bg-black border-t border-black/20 dark:border-white/20 transition-colors duration-300"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {[
                                { id: "hero", label: "HOME" },
                                { id: "about", label: "A PROPOS" },
                                { id: "skills", label: "SKILLS" },
                                { id: "projects", label: "WORK" },
                                { id: "contact", label: "CONTACT" },
                            ].map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={elementVariants}
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full text-left text-sm tracking-widest hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </nav>

            <motion.section
                id="hero"
                style={{ opacity: opacityHero, scale: scaleHero }}
                className="min-h-screen flex items-center justify-center relative overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <img
                        src={hero_bg}
                        alt="Developer workspace"
                        className="w-full h-full object-cover"
                        style={{
                            filter: isDarkMode
                                ? "brightness(0.3) contrast(1.2) grayscale(1)"
                                : "brightness(0.4) contrast(1.3) grayscale(1)",
                        }}
                    />
                    <div
                        className={`absolute inset-0 ${
                            isDarkMode ? "bg-black/60" : "bg-black/50"
                        }`}
                    />
                </div>

                <div className="absolute inset-0 z-5">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-px bg-white/20"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: "-100%",
                                width: "200%",
                            }}
                            animate={{
                                x: ["-100%", "100%"],
                                transition: {
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 3 + i * 0.5,
                                    ease: "easeInOut",
                                },
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold tracking-tighter leading-none"
                        variants={elementVariants}
                        custom={0}
                    >
                        AQUILAS
                    </motion.h1>
                    <motion.h2
                        className="text-4xl md:text-6xl font-light tracking-wider mt-8"
                        variants={elementVariants}
                        custom={1}
                    >
                        DEV
                    </motion.h2>
                    <motion.div
                        className="w-24 h-px bg-white mx-auto my-8"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    />
                    <motion.p
                        className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                        variants={elementVariants}
                        custom={2}
                    >
                        Développeur passionné, je conçois des solutions web
                        modernes et efficaces, alliant performance et
                        simplicité.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                        variants={elementVariants}
                        custom={3}
                    >
                        <motion.button
                            onClick={handleViewWork}
                            className="group border-2 border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">MES PROJETS</span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </motion.button>
                        <motion.button
                            onClick={handleDownloadResume}
                            className="border border-gray-300 px-8 py-3 text-sm tracking-widest hover:border-white transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download className="inline mr-2" size={16} />
                            MON CV
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-px h-16 bg-white/50 mb-2" />
                        <ChevronDown className="text-white/70" size={20} />
                    </div>
                </motion.div>
            </motion.section>

            <motion.section
                id="about"
                className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold tracking-tight"
                                variants={elementVariants}
                                custom={0}
                            >
                                A PROPOS
                            </motion.h2>
                            <motion.div
                                className="w-16 h-px bg-black dark:bg-white"
                                initial={{ width: 0 }}
                                whileInView={{ width: 64 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            />
                            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                                <motion.p
                                    className="text-lg"
                                    variants={elementVariants}
                                    custom={1}
                                >
                                    Étudiant en informatique et développeur Full
                                    Stack, j’aime apprendre et concevoir des
                                    projets concrets qui répondent à de vrais
                                    besoins.
                                </motion.p>
                                <motion.p variants={elementVariants} custom={2}>
                                    Je travaille principalement avec des
                                    frameworks frontend comme React et Vue.js,
                                    ainsi que des technologies backend telles
                                    que Node.js et Nest.js.
                                </motion.p>
                                <motion.p variants={elementVariants} custom={3}>
                                    Mon objectif est de créer des applications
                                    utiles et intuitives, tout en respectant les
                                    bonnes pratiques de développement.
                                </motion.p>
                            </div>
                            <motion.div
                                className="grid grid-cols-3 gap-8 pt-8"
                                variants={elementVariants}
                                custom={4}
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-2">
                                        2+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 tracking-wider">
                                        ANNÉES
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-2">
                                        10+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 tracking-wider">
                                        PROJETS
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-2">
                                        7+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 tracking-wider">
                                        CLIENTS
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                            className="relative"
                            variants={elementVariants}
                            custom={5}
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <motion.div
                                        className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300 group"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Code2
                                            className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                            size={32}
                                        />
                                        <h3 className="font-bold mb-2 tracking-wide">
                                            FRONTEND
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            React, Next.js, TypeScript, ReactJS
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300 group"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Database
                                            className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                            size={32}
                                        />
                                        <h3 className="font-bold mb-2 tracking-wide">
                                            DATABASE
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            MySql, MongoDB, PostgreSQL
                                        </p>
                                    </motion.div>
                                </div>
                                <div className="space-y-6 mt-12">
                                    <motion.div
                                        className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300 group"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Server
                                            className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                            size={32}
                                        />
                                        <h3 className="font-bold mb-2 tracking-wide">
                                            BACKEND
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Node.js, Nest.js, Laravel, Java,
                                            SpringBoot
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300 group"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Globe
                                            className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                            size={32}
                                        />
                                        <h3 className="font-bold mb-2 tracking-wide">
                                            CLOUD
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            AWS, Google Cloud
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="skills"
                className="py-24 bg-white dark:bg-black transition-colors duration-300"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold tracking-tight"
                            variants={elementVariants}
                            custom={0}
                        >
                            EXPERTISE
                        </motion.h2>
                        <motion.div
                            className="w-16 h-px bg-black dark:bg-white mx-auto"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="group"
                                variants={elementVariants}
                                custom={index + 1}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold tracking-wide">
                                        {skill.name}
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {skill.level}%
                                    </span>
                                </div>
                                <div className="h-px bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                    <motion.div
                                        className="h-full bg-black dark:bg-white"
                                        initial={{ width: 0 }}
                                        whileInView={{
                                            width: `${skill.level}%`,
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: index * 0.2,
                                        }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 tracking-wider">
                                    {skill.category}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="projects"
                className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold tracking-tight"
                            variants={elementVariants}
                            custom={0}
                        >
                            MES PROJETS
                        </motion.h2>
                        <motion.div
                            className="w-16 h-px bg-black dark:bg-white mx-auto"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        />
                    </div>
                    <div className="space-y-16">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                className="group border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-500 bg-white dark:bg-gray-800"
                                variants={elementVariants}
                                custom={index + 1}
                            >
                                <div className="p-8 md:p-12">
                                    <div className="grid md:grid-cols-3 gap-8 items-start">
                                        <div className="md:col-span-2 space-y-6">
                                            <motion.div
                                                className="flex items-center gap-4"
                                                variants={elementVariants}
                                                custom={index + 2}
                                            >
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 tracking-wider">
                                                    {project.year}
                                                </div>
                                            </motion.div>
                                            <motion.p
                                                className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                                                variants={elementVariants}
                                                custom={index + 3}
                                            >
                                                {project.description}
                                            </motion.p>
                                            <motion.div
                                                className="flex flex-wrap gap-3"
                                                variants={elementVariants}
                                                custom={index + 4}
                                            >
                                                {project.tech.map((tech) => (
                                                    <motion.span
                                                        key={tech}
                                                        className="border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs tracking-wider hover:border-black dark:hover:border-white transition-colors"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </motion.div>
                                        </div>
                                        <motion.div
                                            className="space-y-4"
                                            variants={elementVariants}
                                            custom={index + 5}
                                        >
                                            <div className="text-sm text-gray-600 dark:text-gray-400 tracking-wider">
                                                STATUS:{" "}
                                                <span className="text-black font-bold">
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-3">
                                                <motion.button
                                                    onClick={() =>
                                                        handleProjectAction(
                                                            "CODE",
                                                            project.title,
                                                            project.url,
                                                        )
                                                    }
                                                    className="flex-1 border border-gray-400 dark:border-gray-600 py-2 px-4 text-xs tracking-wider hover:border-black dark:hover:border-white transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Github
                                                        className="inline mr-2"
                                                        size={14}
                                                    />
                                                    CODE
                                                </motion.button>
                                                <motion.button
                                                    onClick={() =>
                                                        handleProjectAction(
                                                            "LIVE",
                                                            project.title,
                                                            project.link,
                                                        )
                                                    }
                                                    className="flex-1 border border-gray-400 dark:border-gray-600 py-2 px-4 text-xs tracking-wider hover:border-black dark:hover:border-white transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <ExternalLink
                                                        className="inline mr-2"
                                                        size={14}
                                                    />
                                                    VOIR
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="contact"
                className="py-24 bg-black dark:bg-gray-950 text-white transition-colors duration-300"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold tracking-tight"
                            variants={elementVariants}
                            custom={0}
                        >
                            VENEZ ME PARLER
                        </motion.h2>
                        <motion.div
                            className="w-16 h-px bg-white mx-auto"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        />
                        <motion.p
                            className="text-gray-400 dark:text-gray-500 mt-8 text-lg"
                            variants={elementVariants}
                            custom={1}
                        >
                            Prêt a developper une idée ensemble, voici comment
                            me joindre
                        </motion.p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            {[
                                {
                                    icon: Mail,
                                    type: "Email",
                                    value: "christoinaquilas@gmail.com",
                                    label: "EMAIL",
                                },
                                {
                                    icon: Github,
                                    type: "GitHub",
                                    value: "github.com/Dev-aquilas225",
                                    label: "GITHUB",
                                },
                                {
                                    icon: Phone,
                                    type: "Phone",
                                    value: "002250546794565",
                                    label: "CEL / WHATSAPP / TELEGRAM",
                                    display: "+2250546794565",
                                },
                            ].map((contact, index) => (
                                <motion.div
                                    key={contact.type}
                                    className="group cursor-pointer"
                                    variants={elementVariants}
                                    custom={index + 2}
                                >
                                    <div
                                        onClick={() =>
                                            handleContactClick(
                                                contact.type,
                                                contact.value,
                                            )
                                        }
                                        className="flex items-center space-x-4 p-4 border border-gray-800 dark:border-gray-700 hover:border-white transition-colors duration-300"
                                    >
                                        <contact.icon
                                            className="group-hover:scale-110 transition among-transform duration-300"
                                            size={24}
                                        />
                                        <div>
                                            <h3 className="font-bold tracking-wide">
                                                {contact.label}
                                            </h3>
                                            <p className="text-gray-400 dark:text-gray-500">
                                                {contact.display ||
                                                    contact.value}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            className="bg-gray-900 dark:bg-gray-800 p-8 border border-gray-800 dark:border-gray-700"
                            variants={elementVariants}
                            custom={5}
                        >
                            <form
                                onSubmit={handleFormSubmit}
                                className="space-y-6"
                            >
                                <motion.div
                                    variants={elementVariants}
                                    custom={6}
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="TON NOM COMPLET"
                                        className="w-full bg-transparent border-b border-gray-700 dark:border-gray-600 pb-3 focus:outline-none focus:border-white transition-colors text-sm tracking-wider"
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    variants={elementVariants}
                                    custom={7}
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="TON EMAIL"
                                        className="w-full bg-transparent border-b border-gray-700 dark:border-gray-600 pb-3 focus:outline-none focus:border-white transition-colors text-sm tracking-wider"
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    variants={elementVariants}
                                    custom={8}
                                >
                                    <textarea
                                        rows={4}
                                        name="message"
                                        placeholder="TON MESSAGE"
                                        className="w-full bg-transparent border-b border-gray-700 dark:border-gray-600 pb-3 focus:outline-none focus:border-white transition-colors resize-none text-sm tracking-wider"
                                        required
                                    ></textarea>
                                </motion.div>
                                <motion.button
                                    type="submit"
                                    className="w-full border-2 border-white text-white py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">
                                        SEND MESSAGE
                                    </span>
                                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <motion.footer
                className="bg-black dark:bg-gray-950 text-white py-8 border-t border-gray-800 dark:border-gray-700 transition-colors duration-300"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <motion.p
                        className="text-gray-400 dark:text-gray-500 text-sm tracking-wider"
                        variants={elementVariants}
                        custom={0}
                    >
                        © 2025. TIENDREBEOGO CHRISTOIN AQUILAS
                    </motion.p>
                </div>
            </motion.footer>
        </div>
    );
}

export default App;
