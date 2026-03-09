import React from 'react';
import { BookOpen, GraduationCap, Github, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';
const Footer = () => {
    return (
        <footer className="footer-container">
            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="container footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src="/logo.jpg.jpeg" alt="NotesOn Logo" className="logo-icon text-white" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span>NotesOn</span>
                        </div>
                        <p className="footer-description">
                            Elevating the learning experience with a centralized hub for engineering study materials, notes, and resources.
                        </p>
                        <div className="footer-socials">
                            <a href="https://github.com/codewithshekahr" target="_blank" rel="noopener noreferrer" className="social-link"><Github size={20} /></a>
                            <a href="#" className="social-link"><Twitter size={20} /></a>
                            <a href="https://www.linkedin.com/in/shekhar-kashyap-4ab326204" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <div className="footer-links">
                            <h4 className="links-title">Quick Links</h4>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/subjects">All Subjects</a></li>
                                <li><a href="/upload">Upload Notes</a></li>
                                <li><a href="/profile">Dashboard</a></li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h4 className="links-title">Legal</h4>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Copyright Info</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-college">
                        <h4 className="links-title">In Association With</h4>
                        <div className="college-info">
                            <div className="gec-logo-placeholder">GECB</div>
                            <div>
                                <p className="college-name">Government Engineering College, Bilaspur</p>
                                <a href="http://www.gecbilaspur.ac.in/" target="_blank" rel="noopener noreferrer" className="college-link">
                                    Visit Official Website →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} NotesOn. Built with ❤️ by <strong>Shekhar Kashyap</strong> (Full Stack Web Developer).</p>
            </div>
        </footer>
    );
};

export default Footer;
