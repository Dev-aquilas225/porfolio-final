import React, { useState, useEffect } from "react";
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

function App() {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState("hero");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleDownloadResume = () => {
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

    const handleContactClick = (type: string, value: string) => {
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

    const handleProjectAction = (
        action: string,
        projectTitle: string,
        url?: string,
    ) => {
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

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        emailjs
            .sendForm(
                "service_5leulb8",
                "template_k8thkke", // Replace with your EmailJS template ID
                form,
                "OXrZwlg839aN0C2hQ", // Replace with your EmailJS public key
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

    const scrollToSection = (sectionId: string) => {
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
        { name: "Docker/Git", level: 85, category: "DevOps" },
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
    ];

    return (
        <div className="bg-white dark:bg-black text-black dark:text-white font-mono overflow-x-hidden relative transition-colors duration-300">
            {/* Toast Container */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        fontFamily: "JetBrains Mono, monospace",
                    },
                }}
            />

            {/* Custom Cursor */}
            <div
                className="fixed w-4 h-4 border-2 border-black dark:border-white rounded-full pointer-events-none z-50 transition-transform duration-100"
                style={{
                    left: mousePosition.x - 8,
                    top: mousePosition.y - 8,
                    transform: `scale(${scrollY > 100 ? 1.5 : 1})`,
                    mixBlendMode: isDarkMode ? "difference" : "multiply",
                }}
            />

            {/* Vintage Grid Background */}
            <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
            linear-gradient(${
                isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            } 1px, transparent 1px),
            linear-gradient(90deg, ${
                isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            } 1px, transparent 1px)
          `,
                        backgroundSize: "20px 20px",
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-black/20 dark:border-white/20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-xl font-bold tracking-wider">
                            <img src={logo} className="w-20 h-20" alt="Logo" />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-12">
                            {[
                                { id: "hero", label: "HOME" },
                                { id: "about", label: "A PROPOS" },
                                { id: "skills", label: "SKILLS" },
                                { id: "projects", label: "WORK" },
                                { id: "contact", label: "CONTACT" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative text-sm tracking-widest transition-all duration-300 hover:text-gray-600 dark:hover:text-gray-400 ${
                                        activeSection === item.id
                                            ? "text-black dark:text-white"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <div className="absolute -bottom-1 left-0 w-full h-px bg-black dark:bg-white" />
                                    )}
                                </button>
                            ))}

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-colors duration-300"
                            >
                                {isDarkMode ? (
                                    <Sun size={18} />
                                ) : (
                                    <Moon size={18} />
                                )}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center space-x-4">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-colors duration-300"
                            >
                                {isDarkMode ? (
                                    <Sun size={16} />
                                ) : (
                                    <Moon size={16} />
                                )}
                            </button>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-black border-t border-black/20 dark:border-white/20 transition-colors duration-300">
                        <div className="px-6 py-4 space-y-4">
                            {[
                                { id: "hero", label: "HOME" },
                                { id: "about", label: "A PROPOS" },
                                { id: "skills", label: "SKILLS" },
                                { id: "projects", label: "WORK" },
                                { id: "contact", label: "CONTACT" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full text-left text-sm tracking-widest hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section
                id="hero"
                className="min-h-screen flex items-center justify-center relative overflow-hidden"
            >
                {/* Hero Background Image */}
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
                    {/* Overlay for better text readability */}
                    <div
                        className={`absolute inset-0 ${
                            isDarkMode ? "bg-black/60" : "bg-black/50"
                        }`}
                    />
                </div>

                {/* Animated Lines */}
                <div className="absolute inset-0 z-5">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-px bg-white/20"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: "-100%",
                                width: "200%",
                                animation: `slideRight ${
                                    3 + i * 0.5
                                }s ease-in-out infinite alternate`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
                    <div className="overflow-hidden mb-8">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none animate-slideUp">
                            AQUILAS
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-8">
                        <h2
                            className="text-4xl md:text-6xl font-light tracking-wider animate-slideUp"
                            style={{ animationDelay: "0.2s" }}
                        >
                            DEV
                        </h2>
                    </div>

                    <div
                        className="w-24 h-px bg-white mx-auto mb-8 animate-expandWidth"
                        style={{ animationDelay: "0.4s" }}
                    />

                    <p
                        className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fadeInUp"
                        style={{ animationDelay: "0.6s" }}
                    >
                        Développeur passionné, je conçois des solutions web
                        modernes et efficaces, alliant performance et
                        simplicité.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp"
                        style={{ animationDelay: "0.8s" }}
                    >
                        <button
                            onClick={handleViewWork}
                            className="group border-2 border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden"
                        >
                            <span className="relative z-10">MES PROJETS</span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={handleDownloadResume}
                            className="border border-gray-300 px-8 py-3 text-sm tracking-widest hover:border-white transition-colors duration-300"
                        >
                            <Download className="inline mr-2" size={16} />
                            MON CV
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex flex-col items-center animate-bounce">
                        <div className="w-px h-16 bg-white/50 mb-2" />
                        <ChevronDown className="text-white/70" size={20} />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="overflow-hidden">
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight animate-slideUp">
                                    A PROPOS
                                </h2>
                            </div>
                            <div className="w-16 h-px bg-black dark:bg-white animate-expandWidth" />

                            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                                <p
                                    className="text-lg animate-fadeInUp"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    Étudiant en informatique et développeur Full
                                    Stack, j’aime apprendre et concevoir des
                                    projets concrets qui répondent à de vrais
                                    besoins.
                                </p>
                                <p
                                    className="animate-fadeInUp"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    Je travaille principalement avec des
                                    frameworks frontend comme React et Vue.js,
                                    ainsi que des technologies backend telles
                                    que Node.js et Nest.js.
                                </p>
                                <p
                                    className="animate-fadeInUp"
                                    style={{ animationDelay: "0.6s" }}
                                >
                                    Mon objectif est de créer des applications
                                    utiles et intuitives, tout en respectant les
                                    bonnes pratiques de développement.
                                </p>
                            </div>

                            <div
                                className="grid grid-cols-3 gap-8 pt-8 animate-fadeInUp"
                                style={{ animationDelay: "0.8s" }}
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-2">
                                        1+
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
                                        11+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 tracking-wider">
                                        CLIENTS
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300 group">
                                        <Code2
                                            className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                            size={32}
                                        />
                                        <h3 className="font-bold mb-2 tracking-wide">
                                            FRONTEND
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            React, Next.js, TypeScript
                                        </p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300 group">
                                        <Database
                                            className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                            size={32}
                                        />
                                        <h3 className="font-bold mb-2 tracking-wide">
                                            DATABASE
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            MySql, MongoDB
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-6 mt-12">
                                    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300 group">
                                        <Server
                                            className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                            size={32}
                                        />
                                        <h3 className="font-bold mb-2 tracking-wide">
                                            BACKEND
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Node.js, Nest.js, Laravel
                                        </p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300 group">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section
                id="skills"
                className="py-24 bg-white dark:bg-black transition-colors duration-300"
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="overflow-hidden mb-4">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight animate-slideUp">
                                EXPERTISE
                            </h2>
                        </div>
                        <div className="w-16 h-px bg-black dark:bg-white mx-auto animate-expandWidth" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {skills.map((skill, index) => (
                            <div key={skill.name} className="group">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold tracking-wide">
                                        {skill.name}
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {skill.level}%
                                    </span>
                                </div>
                                <div className="h-px bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                    <div
                                        className="h-full bg-black dark:bg-white transition-all duration-2000 ease-out"
                                        style={{
                                            width: `${skill.level}%`,
                                            animationDelay: `${index * 200}ms`,
                                        }}
                                    />
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 tracking-wider">
                                    {skill.category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section
                id="projects"
                className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="overflow-hidden mb-4">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight animate-slideUp">
                                SELECTED WORK
                            </h2>
                        </div>
                        <div className="w-16 h-px bg-black dark:bg-white mx-auto animate-expandWidth" />
                    </div>

                    <div className="space-y-16">
                        {projects.map((project, index) => (
                            <div
                                key={project.title}
                                className="group border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-500 bg-white dark:bg-gray-800"
                            >
                                <div className="p-8 md:p-12">
                                    <div className="grid md:grid-cols-3 gap-8 items-start">
                                        <div className="md:col-span-2 space-y-6">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 tracking-wider">
                                                    {project.year}
                                                </div>
                                            </div>

                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-3">
                                                {project.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs tracking-wider hover:border-black dark:hover:border-white transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-400 tracking-wider">
                                                STATUS:{" "}
                                                <span className="text-black font-bold">
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() =>
                                                        handleProjectAction(
                                                            "CODE",
                                                            project.title,
                                                            project.url,
                                                        )
                                                    }
                                                    className="flex-1 border border-gray-400 dark:border-gray-600 py-2 px-4 text-xs tracking-wider hover:border-black dark:hover:border-white transition-colors"
                                                >
                                                    <Github
                                                        className="inline mr-2"
                                                        size={14}
                                                    />
                                                    CODE
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleProjectAction(
                                                            "LIVE",
                                                            project.title,
                                                            project.link,
                                                        )
                                                    }
                                                    className="flex-1 border border-gray-400 dark:border-gray-600 py-2 px-4 text-xs tracking-wider hover:border-black dark:hover:border-white transition-colors"
                                                >
                                                    <ExternalLink
                                                        className="inline mr-2"
                                                        size={14}
                                                    />
                                                    LIVE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                className="py-24 bg-black dark:bg-gray-950 text-white transition-colors duration-300"
            >
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="overflow-hidden mb-4">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight animate-slideUp">
                                VENEZ ME PARLER
                            </h2>
                        </div>
                        <div className="w-16 h-px bg-white mx-auto animate-expandWidth" />
                        <p className="text-gray-400 dark:text-gray-500 mt-8 text-lg">
                            Prêt a developper une idée ensemble, voici comment
                            me joindre
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div className="group cursor-pointer">
                                <div
                                    onClick={() =>
                                        handleContactClick(
                                            "Email",
                                            "christoinaquilas@gmail.com",
                                        )
                                    }
                                    className="flex items-center space-x-4 p-4 border border-gray-800 dark:border-gray-700 hover:border-white transition-colors duration-300"
                                >
                                    <Mail
                                        className="group-hover:scale-110 transition-transform duration-300"
                                        size={24}
                                    />
                                    <div>
                                        <h3 className="font-bold tracking-wide">
                                            EMAIL
                                        </h3>
                                        <p className="text-gray-400 dark:text-gray-500">
                                            christoinaquilas@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div
                                    onClick={() =>
                                        handleContactClick(
                                            "GitHub",
                                            "github.com/Dev-aquilas225",
                                        )
                                    }
                                    className="flex items-center space-x-4 p-4 border border-gray-800 dark:border-gray-700 hover:border-white transition-colors duration-300"
                                >
                                    <Github
                                        className="group-hover:scale-110 transition-transform duration-300"
                                        size={24}
                                    />
                                    <div>
                                        <h3 className="font-bold tracking-wide">
                                            GITHUB
                                        </h3>
                                        <p className="text-gray-400 dark:text-gray-500">
                                            github.com/Dev-aquilas225
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div
                                    onClick={() =>
                                        handleContactClick(
                                            "Phone",
                                            "002250768571247",
                                        )
                                    }
                                    className="flex items-center space-x-4 p-4 border border-gray-800 dark:border-gray-700 hover:border-white transition-colors duration-300"
                                >
                                    <Phone
                                        className="group-hover:scale-110 transition-transform duration-300"
                                        size={24}
                                    />
                                    <div>
                                        <h3 className="font-bold tracking-wide">
                                            CEL / WHATSAPP / TELEGRAM
                                        </h3>
                                        <p className="text-gray-400 dark:text-gray-500">
                                            +2250768571247
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 dark:bg-gray-800 p-8 border border-gray-800 dark:border-gray-700">
                            <form
                                onSubmit={handleFormSubmit}
                                className="space-y-6"
                            >
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="TON NOM COMPLET"
                                        className="w-full bg-transparent border-b border-gray-700 dark:border-gray-600 pb-3 focus:outline-none focus:border-white transition-colors text-sm tracking-wider"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="TON EMAIL"
                                        className="w-full bg-transparent border-b border-gray-700 dark:border-gray-600 pb-3 focus:outline-none focus:border-white transition-colors text-sm tracking-wider"
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        placeholder="TON MESSAGE"
                                        className="w-full bg-transparent border-b border-gray-700 dark:border-gray-600 pb-3 focus:outline-none focus:border-white transition-colors resize-none text-sm tracking-wider"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full border-2 border-white text-white py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10">
                                        SEND MESSAGE
                                    </span>
                                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black dark:bg-gray-950 text-white py-8 border-t border-gray-800 dark:border-gray-700 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-gray-400 dark:text-gray-500 text-sm tracking-wider">
                        © 2025. TIENDREBEOGO CHRISTOIN AQUILAS
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
