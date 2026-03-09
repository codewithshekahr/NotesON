import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, FileText, Folder, Download, Trash2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import hierarchicalData from './hierarchicalData.json';

// Sample mutable data to demonstrate deletion
const initialSubjects = {
    'cse': {
        '4': [
            { id: 'CS401', name: 'Operating Systems', type: 'Core', prof: 'Dr. A. Singh', uploaderId: 'sys-admin', uploaderName: 'System' },
            { id: 'CS402', name: 'Computer Networks', type: 'Core', prof: 'Prof. V. Kumar', uploaderId: 'mock-1', uploaderName: 'Aarav Sharma' },
            { id: 'CS403', name: 'Theory of Computation', type: 'Core', prof: 'Dr. R. Reddy', uploaderId: 'mock-2', uploaderName: 'Priya Patel' },
        ]
    }
};

const getSubjectsForSemester = (branch, semester) => {
    // If local notes data exists for this branch & sem, return those subjects
    if (hierarchicalData[branch] && hierarchicalData[branch][semester]) {
        return hierarchicalData[branch][semester];
    }

    // If we have mutable mock data for this route, return it, otherwise fallback
    if (initialSubjects[branch] && initialSubjects[branch][semester]) {
        return initialSubjects[branch][semester];
    }

    // Fallback for others
    return [
        { id: `${branch.toUpperCase()}301`, name: `${branch} Core Subject 1`, type: 'Core', prof: 'Staff', uploaderId: 'sys-admin', uploaderName: 'System' },
        { id: `${branch.toUpperCase()}302`, name: `${branch} Core Subject 2`, type: 'Core', prof: 'Staff', uploaderId: 'sys-admin', uploaderName: 'System' },
    ];
};

const NotesList = () => {
    const { branch, semester } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    // Use state to allow mock deletions
    const [subjects, setSubjects] = useState(() => getSubjectsForSemester(branch, semester));
    const [currentPath, setCurrentPath] = useState([]);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleDelete = (subjectId, uploaderId) => {
        if (!user) return;

        // Permission Check:
        // Admin (Shekhar Kashyap) CAN delete anything except system default subjects (or can delete those too if wanted, we'll allow all for demo).
        // Student CAN ONLY delete their own uploaded files.
        if (user.role === 'admin' || user.id === uploaderId) {
            setSubjects(prev => prev.filter(s => s.id !== subjectId));
            showToast("Note deleted successfully.");
        } else {
            showToast("Unauthorized: You can only delete your own notes.");
        }
    };

    let currentItems = subjects;
    for (const folderName of currentPath) {
        const folder = currentItems.find(item => item.name === folderName);
        if (folder && folder.items) {
            currentItems = folder.items;
        }
    }

    const filteredSubjects = currentItems.filter(sub =>
        (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (sub.id && sub.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleBack = () => {
        if (currentPath.length > 0) {
            setCurrentPath(prev => prev.slice(0, -1));
        } else {
            navigate(`/subjects/${branch}`);
        }
    };

    return (
        <div className="container py-8 relative">
            <div className="notes-list-header mb-8">
                <button
                    className="btn-back"
                    onClick={handleBack}
                >
                    <ArrowLeft size={18} /> {currentPath.length > 0 ? 'Back to Folder' : 'Back to Semesters'}
                </button>

                <div className="header-content mt-4">
                    <div>
                        <h1 className="mb-2">
                            Sem {semester} {currentPath.length > 0 ? ` / ${currentPath.join(' / ')}` : 'Subjects'}
                        </h1>
                        <p className="text-muted">Level 3: Select a subject to view resources</p>
                    </div>

                    <div className="search-filter">
                        <Search size={18} className="text-muted" />
                        <input
                            type="text"
                            placeholder="Filter subjects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {user?.role === 'admin' && (
                <div className="admin-notice mb-4" style={{ padding: '0.75rem', backgroundColor: 'var(--warning-color)', color: 'white', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={16} /> Admin View: You have permission to delete any user's notes.
                </div>
            )}

            <div className="subjects-list">
                {filteredSubjects.map(sub => {
                    const isFolder = sub.type === 'folder';
                    // Determine if current user can delete this note
                    const canDelete = user && (user.role === 'admin' || user.id === sub.uploaderId) && !isFolder;

                    return (
                        <div
                            key={sub.id || sub.name}
                            className="subject-row card"
                            onClick={() => { if (isFolder) setCurrentPath([...currentPath, sub.name]); }}
                            style={{ cursor: isFolder ? 'pointer' : 'default' }}
                        >
                            <div className="row-icon">
                                {isFolder ? <Folder size={24} className="text-primary" /> : <FileText size={24} className="text-primary" />}
                            </div>

                            <div className="row-content">
                                <div className="row-title">
                                    <h3>{sub.name}</h3>
                                    {!isFolder && sub.type ? <span className="badge-type">{sub.type}</span> : null}
                                </div>
                                {!isFolder && sub.prof && <p className="row-meta">Code: {sub.id} • Taught by {sub.prof}</p>}
                                {!isFolder && sub.uploaderName && (
                                    <p className="row-meta mt-1" style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>
                                        Uploaded by: {sub.uploaderName}
                                    </p>
                                )}
                            </div>

                            <div className="row-actions flex gap-2">
                                {isFolder ? (
                                    <button className="btn btn-outline btn-sm">
                                        Open Folder
                                    </button>
                                ) : sub.link ? (
                                    <a
                                        href={sub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary btn-sm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Download size={16} /> <span className="hidden sm:inline">Download</span>
                                    </a>
                                ) : (
                                    <button className="btn btn-primary btn-sm" onClick={(e) => e.stopPropagation()}>
                                        <Download size={16} /> <span className="hidden sm:inline">Download</span>
                                    </button>
                                )}

                                {canDelete && (
                                    <button
                                        className="btn btn-outline btn-sm"
                                        style={{ borderColor: 'var(--error-color)', color: 'var(--error-color)' }}
                                        onClick={(e) => { e.stopPropagation(); handleDelete(sub.id, sub.uploaderId); }}
                                        title="Delete this note"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                {filteredSubjects.length === 0 && (
                    <div className="empty-state">
                        <p>No subjects found for "{searchTerm}"</p>
                    </div>
                )}
            </div>

            {toastMessage && (
                <div className="toast-notification success" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, backgroundColor: 'var(--success-color)', color: 'white', padding: '1rem', borderRadius: '8px', fontWeight: 'bold' }}>
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default NotesList;
