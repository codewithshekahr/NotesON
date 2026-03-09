import React, { useState } from 'react';
import { UploadCloud, CheckCircle, FileText, AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Upload.css';

const Upload = () => {
    const { user, setIsLoginModalOpen } = useAuth();

    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        subjectName: '',
        semester: '',
        unitNumber: ''
    });
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState(''); // success or error

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (uploadedFile) => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
        if (validTypes.includes(uploadedFile.type)) {
            setFile(uploadedFile);
        } else {
            showToast("Only PDF and JPEG formats are supported.", "error");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showToast = (msg, type) => {
        setToastMessage(msg);
        setToastType(type);
        setTimeout(() => {
            setToastMessage('');
            setToastType('');
        }, 4000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            showToast("Please login first to upload notes.", "error");
            return;
        }
        if (!file) {
            showToast("Please upload a file to submit.", "error");
            return;
        }
        if (!formData.subjectName || !formData.semester || !formData.unitNumber) {
            showToast("Please fill in all the details.", "error");
            return;
        }

        // Simulate immediate publish
        setTimeout(() => {
            showToast("Success! Notes have been published live.", "success");
            setFile(null);
            setFormData({ subjectName: '', semester: '', unitNumber: '' });
        }, 800);
    };

    return (
        <div className="upload-container py-8">
            <div className="container">
                <div className="upload-header text-center mb-8">
                    <h1>Upload Notes</h1>
                    <p className="text-muted">Publish your study materials instantly to the community.</p>
                </div>

                <div className="upload-layout card p-8">
                    <form onSubmit={handleSubmit} className="upload-form">

                        <div className="form-grid">
                            {/* Left Column: Form Details */}
                            <div className="form-details">
                                <div className="form-group">
                                    <label htmlFor="subjectName">Subject Name <span className="text-error">*</span></label>
                                    <input
                                        type="text"
                                        id="subjectName"
                                        name="subjectName"
                                        placeholder="e.g. Thermodynamics, Data Structures"
                                        value={formData.subjectName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="semester">Semester <span className="text-error">*</span></label>
                                        <select
                                            id="semester"
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Sem</option>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <option key={num} value={num}>Semester {num}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="unitNumber">Unit Number <span className="text-error">*</span></label>
                                        <input
                                            type="number"
                                            id="unitNumber"
                                            name="unitNumber"
                                            min="1" max="10"
                                            placeholder="e.g. 1"
                                            value={formData.unitNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-info">
                                    <AlertCircle size={16} className="info-icon" />
                                    <p>Materials are published immediately under your name ({user ? user.name : 'Guest'}).</p>
                                </div>
                            </div>

                            {/* Right Column: Drag and Drop Area */}
                            <div className="form-upload-area">
                                <label className="upload-label">Upload File <span className="text-error">*</span></label>

                                <div
                                    className={`drag-drop-zone ${dragActive ? "drag-active" : ""} ${file ? "file-selected" : ""}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept=".pdf,.jpg,.jpeg"
                                        onChange={handleChange}
                                    />

                                    {file ? (
                                        <div className="file-preview">
                                            <FileText size={48} className="file-icon" />
                                            <div className="file-info">
                                                <span className="file-name">{file.name}</span>
                                                <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-remove"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFile(null);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="upload-prompt">
                                            <UploadCloud size={48} className="cloud-icon" />
                                            <p className="prompt-text">Drag & drop your file here</p>
                                            <p className="prompt-muted">or click to browse</p>
                                            <span className="supported-formats">Supported: PDF, JPEG (Max 10MB)</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-actions mt-8 text-center">
                            {user ? (
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Publish Notes
                                </button>
                            ) : (
                                <div className="text-center">
                                    <p className="text-error mb-2 font-bold"><LogIn size={16} className="inline mr-1" /> Login is required to upload files.</p>
                                    <button
                                        type="button"
                                        className="btn btn-outline border-error text-error hover:bg-error hover:text-white"
                                        onClick={() => setIsLoginModalOpen(true)}
                                    >
                                        Click here to Login
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            {toastMessage && (
                <div className={`toast-notification ${toastType}`}>
                    <div className="toast-content">
                        {toastType === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Upload;
