import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BranchSelection from './BranchSelection';
import SemesterGrid from './SemesterGrid';
import NotesList from './NotesList';
import './Subjects.css';

const SubjectsLayout = () => {
    return (
        <div className="subjects-layout" style={{ minHeight: '70vh' }}>
            <Routes>
                <Route path="/" element={<BranchSelection />} />
                <Route path=":branch" element={<SemesterGrid />} />
                <Route path=":branch/:semester" element={<NotesList />} />
            </Routes>
        </div>
    );
};

export default SubjectsLayout;
