import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';
import './NavbarModal.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const { user, login, logout, isLoginModalOpen, setIsLoginModalOpen } = useAuth();

    const [loginForm, setLoginForm] = useState({ name: '', email: '' });

    // Mock data for search
    const popularSubjects = [
        { code: 'MA101', name: 'Engineering Mathematics-I', isTrending: true },
        { code: 'PH101', name: 'Engineering Physics', isTrending: true },
        { code: 'ME101', name: 'Engineering Graphics', isTrending: false },
        { code: 'EC601', name: 'Analog Circuits', isTrending: true },
    ];

    const filteredSubjects = popularSubjects.filter(sub =>
        sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginForm.name && loginForm.email) {
            login(loginForm.name, loginForm.email);
            setIsLoginModalOpen(false);
        }
    };

    return (
        <header className="navbar-container">
            <div className="container navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <img src="/logo.jpg.jpeg" alt="NotesOn Logo" className="logo-icon" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span>NotesOn</span>
                </Link>

                {/* Global Smart Search */}
                <div className="navbar-search">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search subjects (e.g. MA101, Physics)"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        />
                    </div>

                    {/* Smart Search Dropdown */}
                    {showDropdown && searchQuery && (
                        <div className="search-dropdown card">
                            <div className="dropdown-header">Results for "{searchQuery}"</div>
                            <ul className="dropdown-results">
                                {filteredSubjects.length > 0 ? (
                                    filteredSubjects.map((sub, idx) => (
                                        <li key={idx} className="dropdown-item">
                                            <Link to={`/subjects/${sub.code}`} className="result-link">
                                                <span className="result-code">{sub.code}</span>
                                                <span className="result-name">{sub.name}</span>
                                                {sub.isTrending && <span className="badge-trending">Trending Now</span>}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="dropdown-empty">No matching subjects found.</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className="navbar-links desktop-only">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/subjects" className="nav-link">Subjects</Link>
                    <Link to="/upload" className="nav-link">Upload</Link>
                    <Link to="/profile" className="nav-link">Profile</Link>

                    {user ? (
                        <div className="user-profile-nav ml-4">
                            <span className="user-greeting text-sm font-bold mr-2 text-primary">Hi, {user.name.split(' ')[0]}</span>
                            {user.role === 'admin' && <span className="badge-admin">Admin</span>}
                            <button className="btn btn-outline btn-sm ml-2" onClick={logout} title="Logout">
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-primary ml-4" onClick={() => setIsLoginModalOpen(true)}>
                            Login
                        </button>
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-btn mobile-only"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="mobile-menu card">
                    <nav className="mobile-links">
                        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/subjects" className="nav-link" onClick={() => setIsOpen(false)}>Subjects</Link>
                        <Link to="/upload" className="nav-link" onClick={() => setIsOpen(false)}>Upload</Link>
                        <Link to="/profile" className="nav-link" onClick={() => setIsOpen(false)}>Profile</Link>
                        {user ? (
                            <button className="btn btn-outline w-full" onClick={() => { logout(); setIsOpen(false); }}>
                                Logout ({user.name})
                            </button>
                        ) : (
                            <button className="btn btn-primary w-full" onClick={() => { setIsLoginModalOpen(true); setIsOpen(false); }}>
                                Login
                            </button>
                        )}
                    </nav>
                </div>
            )}

            {/* Simple Login Modal Form */}
            {isLoginModalOpen && (
                <div className="modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
                    <div className="modal-content card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Sign In</h2>
                            <button className="btn-close" onClick={() => setIsLoginModalOpen(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleLoginSubmit} className="login-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input required type="text" value={loginForm.name} onChange={e => setLoginForm({ ...loginForm, name: e.target.value })} placeholder="e.g. Shekhar Kashyap" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input required type="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="e.g. shekhar@example.com" />
                            </div>
                            <p className="text-sm text-muted mb-4">(Hint: Entering "Shekhar Kashyap" grants Admin role)</p>
                            <button type="submit" className="btn btn-primary w-full">Login to NotesOn</button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
