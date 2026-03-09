import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const semesters = [
    { id: '1', name: 'Semester 1', tag: 'Common First Year' },
    { id: '2', name: 'Semester 2', tag: 'Common First Year' },
    { id: '3', name: 'Semester 3', tag: 'Core Subjects' },
    { id: '4', name: 'Semester 4', tag: 'Core Subjects' },
    { id: '5', name: 'Semester 5', tag: 'Advanced Core' },
    { id: '6', name: 'Semester 6', tag: 'Advanced Core' },
    { id: '7', name: 'Semester 7', tag: 'Electives & Proj' },
    { id: '8', name: 'Semester 8', tag: 'Major Project' },
];

const SemesterGrid = () => {
    const { branch } = useParams();
    const navigate = useNavigate();

    const branchName = branch.toUpperCase();

    return (
        <div className="container py-8">
            <button
                className="btn-back"
                onClick={() => navigate('/subjects')}
            >
                <ArrowLeft size={18} /> Back to Branches
            </button>

            <div className="hierarchy-header text-center">
                <h1 className="mb-2">{branchName} Semesters</h1>
                <p className="text-muted">Level 2: Select your current semester</p>
            </div>

            <div className="semester-grid">
                {semesters.map(sem => (
                    <div
                        key={sem.id}
                        className="semester-card card"
                        onClick={() => navigate(`/subjects/${branch}/${sem.id}`)}
                    >
                        <div className="sem-number">{sem.id}</div>
                        <div className="sem-details">
                            <h3>{sem.name}</h3>
                            <p className="text-muted text-sm">{sem.tag}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SemesterGrid;
