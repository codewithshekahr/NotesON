import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Users, Zap, Download } from 'lucide-react';
import './Home.css';

const Home = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const features = [
        {
            icon: <BookOpen className="feature-icon" />,
            title: 'Branch-Wise Navigation',
            desc: 'Access notes for ECE, CSE, Civil, Mechanical, and Electrical from Sem 1 to 8.'
        },
        {
            icon: <Search className="feature-icon" />,
            title: 'Smart Search',
            desc: 'Find any subject instantly using its subject code (e.g., EC601) or name.'
        },
        {
            icon: <Users className="feature-icon" />,
            title: 'Community Driven',
            desc: 'Students can upload their own handwritten notes and lab manuals for review.'
        },
        {
            icon: <Zap className="feature-icon" />,
            title: 'One-Tap Download',
            desc: 'High-speed PDF access without annoying ads or redirected links.'
        }
    ];

    const galleryData = [
        { id: 1, name: 'Digital Electronics', code: 'EC401', branch: 'ECE', prof: 'Dr. Sharma', icon: '💻' },
        { id: 2, name: 'Data Structures', code: 'CS301', branch: 'CSE', prof: 'Prof. Verma', icon: '🌳' },
        { id: 3, name: 'Thermodynamics', code: 'ME402', branch: 'Mechanical', prof: 'Dr. Singh', icon: '🔥' },
        { id: 4, name: 'Signals & Systems', code: 'EC402', branch: 'ECE', prof: 'Prof. Patel', icon: '📡' },
        { id: 5, name: 'Operating Systems', code: 'CS401', branch: 'CSE', prof: 'Dr. Gupta', icon: '⚙️' },
        { id: 6, name: 'Strength of Materials', code: 'ME301', branch: 'Mechanical', prof: 'Prof. Das', icon: '🏗️' }
    ];

    const filteredGallery = activeFilter === 'All'
        ? galleryData
        : galleryData.filter(item => item.branch === activeFilter);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Elevate Your <span>Learning</span></h1>
                        <p className="hero-subtitle">
                            The ultimate central hub for GEC Bilaspur students. Access high-quality handwritten notes,
                            previous year papers, and lab manuals in seconds.
                        </p>

                        <div className="hero-search card">
                            <Search className="search-icon-hero" size={20} />
                            <input type="text" placeholder="Try 'Thermodynamics' or 'CS301'" />
                            <button className="btn btn-primary">Search</button>
                        </div>

                        <div className="hero-cta">
                            <Link to="/subjects" className="btn btn-primary btn-lg">Get Started</Link>
                            <Link to="/upload" className="btn btn-outline btn-lg">Upload Notes</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="mockup-placeholder">
                            <div className="mockup-content">
                                <BookOpen size={64} className="mockup-icon" />
                                <div className="pulse-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Why Use NotesOn?</h2>
                        <p className="text-muted">Designed for students, by students.</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feat, idx) => (
                            <div key={idx} className="feature-card card">
                                <div className="feature-icon-wrapper">{feat.icon}</div>
                                <h3 className="feature-title">{feat.title}</h3>
                                <p className="feature-desc text-muted">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Notes Gallery */}
            <section className="gallery-section">
                <div className="container">
                    <div className="gallery-layout">
                        {/* Sidebar Filter */}
                        <aside className="gallery-sidebar">
                            <div className="sidebar-sticky card">
                                <h3 className="sidebar-title">Filter by Branch</h3>
                                <ul className="filter-list">
                                    {['All', 'ECE', 'CSE', 'Mechanical', 'Civil', 'Electrical', 'IT'].map(branch => (
                                        <li key={branch}>
                                            <button
                                                className={`filter-btn ${activeFilter === branch ? 'active' : ''}`}
                                                onClick={() => setActiveFilter(branch)}
                                            >
                                                {branch}
                                                {activeFilter === branch && <div className="active-indicator"></div>}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Gallery Grid */}
                        <div className="gallery-content">
                            <div className="gallery-header">
                                <h2>Notes Gallery</h2>
                                <span className="badge">{filteredGallery.length} Subjects Found</span>
                            </div>

                            <div className="cards-grid">
                                {filteredGallery.map(item => (
                                    <div key={item.id} className="subject-card card">
                                        <div className="card-top">
                                            <span className="subject-icon">{item.icon}</span>
                                            <span className="subject-code">{item.code}</span>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="subject-name">{item.name}</h3>
                                            <p className="subject-prof">By {item.prof}</p>
                                        </div>
                                        <div className="card-footer">
                                            <span className="branch-tag">{item.branch}</span>
                                            <button className="btn btn-sm btn-outline btn-download">
                                                <Download size={16} /> PDF
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
