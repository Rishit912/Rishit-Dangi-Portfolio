import React, { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll'; 
import image from '../assets/airbnb.png';
import gym from '../assets/tgym.png';
import gymd from '../assets/gymd.jpg';
import ocs from '../assets/ocs.png';
import pluscare from '../assets/pluscare.png';
import worksyn from '../assets/worksync.png';

// SVG Icons
const ExternalLinkIcon = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} focusable="false">
        <path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M7 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    </svg>
);

const CodeIcon = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} focusable="false">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
);

const PaintBrushIcon = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} focusable="false">
        <path d="M9.06 11.96l4.98 4.98c.7.7 1.83.7 2.53 0l2.42-2.42c.7-.7.7-1.83 0-2.53l-4.98-4.98"/><path d="M12.5 12.5L5 20"/><path d="M18.5 5.5l-2 2"/>
    </svg>
);

const MobileIcon = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} focusable="false">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
    </svg>
);

const LaptopIcon = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} focusable="false">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/>
    </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} focusable="false">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-.7-.4-1.5-1.4-2c3.7-.4 7.5-1.5 7.5-7.5s-3.8-7.1-7.5-7.5c-1.8 0-3.5.7-4.8 1.9C6.8 4.7 5 7.4 5 10.5c0 6 3.8 7.1 7.5 7.5-.2.6-.4 1.2-.4 1.9V22"/>
    </svg>
);

// Hardcoded Projects Data
const PROJECTS = [
    {
        _id: 'p1',
        title: 'PlusCare',
        description: 'Team project based on smart appointment system - a web-based platform designed to streamline the process of booking doctor appointments. Patients can register, search for doctors, and manage their appointments.',
        category: 'webDevelopment',
        techStack: ['Html', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
        liveDemo: 'https://pluscare.jaydipsatani.com/',
        github: '',
        imageUrls: [pluscare],
    },
    {
        _id: 'p2',
        title: 'Homes in the Clouds',
        description: 'Complete, high-fidelity frontend platform for a modern property rental marketplace. Showcasing production-ready UI/UX with dynamic search, complex user flows, and a flawless mobile experience.',
        category: 'webDevelopment',
        techStack: ['React', 'Tailwind CSS', 'TypeScript'],
        liveDemo: 'https://homeintheclouds.netlify.app/',
        github: '',
        imageUrls: [image],
    },
    {
        _id: 'p3',
        title: 'TaskLetix GYM',
        description: 'Sleek, powerful frontend for a modern gym platform. Crafted a premium, responsive design emphasizing brand energy and easy navigation with class information and membership details.',
        category: 'webDevelopment',
        techStack: ['React', 'Tailwind CSS', 'TypeScript'],
        liveDemo: 'https://gym-taskletix.netlify.app/',
        github: '',
        imageUrls: [gym],
    },
    {
        _id: 'p4',
        title: 'TaskLetix GYM (Web Design)',
        description: 'High-fidelity prototype designed in Figma for a modern gym SaaS platform with focus on data visualization and user experience.',
        category: 'webDesign',
        techStack: ['Figma', 'UI/UX', 'Prototyping', 'Responsive Design'],
        liveDemo: 'https://www.figma.com/design/lk7olFDMjPBC15PpKnpn0x/Taskletix-GYM?node-id=0-1&t=BXkEyPQm60lwJVQM-1',
        github: '',
        imageUrls: [gymd],
    },
    {
        _id: 'p5',
        title: 'Festival Attire (Web Design)',
        description: 'Pixel-perfect UI/UX design files in Figma for a modern apparel retailer. Focuses on premium aesthetics with attention to product display, filtering, and detailed product pages.',
        category: 'webDesign',
        techStack: ['Figma', 'UI/UX', 'Prototyping', 'Responsive Design'],
        liveDemo: 'https://www.figma.com/design/2M2zqqW4nmzPPau3S6riKx/Taskletix-clothing?node-id=7-128&t=gUlM5SFI7bcvaNAB-1',
        github: '',
        imageUrls: [ocs],
    },
    {
        _id: 'p6',
        title: 'WorkSync',
        description: 'Connects skilled workers with potential employers, helping them find jobs in fields like plumbing, electrical work, and more. Simplifies the job search process for both workers and employers.',
        category: 'webDevelopment',
        techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        liveDemo: 'https://rishit912.github.io/worksync/',
        github: '',
        imageUrls: [worksyn],
    },
];

const Portfolio = () => {
    const [filter, setFilter] = useState('all');

    // Filter projects based on category
    const filterProjects = (projects, filter) => {
        if (filter === 'all') return projects;

        const categoryMap = {
            webDev: 'webDevelopment',
            appDev: 'appDevelopment',
            webDesign: 'webDesign'
        };

        const expectedCategory = categoryMap[filter];
        return projects.filter(project => project.category === expectedCategory);
    };

    const filteredProjects = filterProjects(PROJECTS, filter);

    const filterButtons = [
        { label: 'All', value: 'all', icon: <CodeIcon className="w-5 h-5" /> },
        { label: 'Web Development', value: 'webDev', icon: <LaptopIcon className="w-5 h-5" /> },
        { label: 'App Development', value: 'appDev', icon: <MobileIcon className="w-5 h-5" /> },
        { label: 'Web Design', value: 'webDesign', icon: <PaintBrushIcon className="w-5 h-5" /> }
    ];

    const ProjectCard = ({ project }) => (
        <div className="bg-gray-800 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02] border border-gray-700 overflow-hidden h-full">
            {project?.imageUrls?.length > 0 && (
                <div className="w-full h-56 flex overflow-x-auto">
                    {project.imageUrls.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="h-full w-full object-cover flex-shrink-0"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1e293b/94a3b8?text=Image+Missing"; }}
                        />
                    ))}
                </div>
            )}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex gap-4">
                    {project.liveDemo && (
                        <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:underline"
                        >
                            Live Demo <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-400 font-semibold hover:underline"
                        >
                            GitHub <GithubIcon className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <section className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700 font-[Inter]" id="portfolio">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50">
                        My{" "}
                        <span className="text-6xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Portfolio
                        </span>
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
                        A showcase of featured projects, blending technical excellence and design using modern web technologies.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {filterButtons.map((button) => (
                        <button
                            key={button.value}
                            onClick={() => setFilter(button.value)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                                filter === button.value
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                                }`}
                        >
                            {button.icon}
                            {button.label}
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map(project => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    ) : (
                        <div className="md:col-span-2 lg:col-span-3 text-center p-12 bg-gray-800 rounded-2xl border border-gray-700">
                            <p className="text-gray-400 text-xl font-medium">
                                No projects found for this category yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
