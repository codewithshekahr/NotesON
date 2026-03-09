import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Settings, Zap, HardHat, Building2, MonitorSmartphone } from 'lucide-react';

const branches = [
    { id: 'cse', name: 'Computer Science', icon: <MonitorSmartphone size={40} />, color: 'var(--primary-color)' },
    { id: 'ece', name: 'Electronics & Comm', icon: <Cpu size={40} />, color: '#8b5cf6' },
    { id: 'mechanical', name: 'Mechanical', icon: <Settings size={40} />, color: '#f59e0b' },
    { id: 'electrical', name: 'Electrical', icon: <Zap size={40} />, color: '#ef4444' },
    { id: 'civil', name: 'Civil', icon: <Building2 size={40} />, color: '#10b981' },
    { id: 'it', name: 'Information Tech', icon: <HardHat size={40} />, color: '#06b6d4' }
];

const BranchSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="container py-8">
            <div className="hierarchy-header text-center">
                <h1 className="mb-2">Select Your Branch</h1>
                <p className="text-muted">Level 1 of our Hierarchical Data Structure</p>
            </div>

            <div className="branch-grid">
                {branches.map(branch => (
                    <div
                        key={branch.id}
                        className="branch-card card"
                        onClick={() => navigate(`/subjects/${branch.id}`)}
                    >
                        <div
                            className="branch-icon-wrapper"
                            style={{ color: branch.color, backgroundColor: `${branch.color}15` }}
                        >
                            {branch.icon}
                        </div>
                        <h3 className="branch-name">{branch.name}</h3>
                        <span className="btn btn-outline btn-sm mt-3">View Semesters →</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BranchSelection;
