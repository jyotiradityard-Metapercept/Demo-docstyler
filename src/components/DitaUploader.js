import React, { useState } from 'react';
import JSZip from 'jszip';

const DITAConversionForm = () => {
  const [zipFile, setZipFile] = useState(null);
  const [mainMapName, setMainMapName] = useState('');
  const [error, setError] = useState(null);
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    setFileSizeError(false); // Reset file size error
    if (!file) {
      console.warn('No file selected or dropped');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileSizeError(true); // File too large
    } else {
      setZipFile(file); // Valid file
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleMapNameChange = (e) => setMainMapName(e.target.value);

  const checkDITAFileCount = async (file) => {
    const zip = new JSZip();
    const content = await zip.loadAsync(file);
    const ditaFiles = Object.keys(content.files).filter(name => name.endsWith('.dita'));
    return ditaFiles.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShowLimitPopup(false);
    setLoading(true);

    try {
      const ditaCount = await checkDITAFileCount(zipFile);
      if (ditaCount > 50) {
        setShowLimitPopup(true);
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('zipFile', zipFile);
      formData.append('mainMapName', mainMapName);

      const response = await fetch('http://localhost:5055/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText);
      } else {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'HTML-Output.zip';
        link.click();
      }
    } catch (err) {
      setError('Conversion failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-xl relative">
      <h2 className="text-3xl font-bold mb-6 text-center text-black-700">DITA to HTML Migration</h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        You can upload a ZIP folder containing up to <span className="font-semibold text-blue-600">50 DITA files</span>. 
        If you need to upload more, please contact <span className="font-medium text-blue-500"><a href="https://met-r.io/">met<span className='text-red-700'>R</span></a></span>.
      </p>

      <form onSubmit={handleSubmit}>

        {/* ZIP File Upload */}
        <div className="mb-8">
          <p className="text-md font-semibold text-gray-800 mb-2">
            Upload the ZIP file of your DITA project
          </p>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('hiddenZipInput').click()}
            className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center hover:bg-blue-50 transition-all duration-300 cursor-pointer"
          >
            <p className="text-gray-700 font-medium mb-2">Drag & drop ZIP file here</p>
            <p className="text-sm text-gray-500">or click to browse files</p>

            {/* Show selected file name */}
            {zipFile && (
              <p className="mt-4 text-blue-600 font-medium truncate">
                Selected File: {zipFile.name}
              </p>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            id="hiddenZipInput"
            accept=".zip"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            required
          />
        </div>

        {/* File Size Error Message */}
        {fileSizeError && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            <p className="text-sm">File size exceeds 10MB. Please upload a smaller ZIP file.</p>
          </div>
        )}

        {/* DITAMAP Name Input */}
        <div className="mb-6">
          <p className="text-md font-semibold text-gray-800 mb-2">
            Add your DITA file's main DITAMAP full name (e.g., <code>index.ditamap , main.ditamap</code>)
          </p>
          <input
            type="text"
            id="mainMapName"
            value={mainMapName}
            onChange={handleMapNameChange}
            placeholder="Enter main DITAMAP file name"
            className="w-full h-12 text-base border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || fileSizeError || !zipFile}
          className={`w-full py-3 text-lg rounded-md bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-semibold transition-all duration-300 
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Converting...</span>
            </div>
          ) : (
            'Start Conversion'
          )}
        </button>
      </form>

      {/* Error Alert */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* DITA Limit Popup */}
      {showLimitPopup && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg animate-bounce z-50">
          <p className="font-semibold">🚫 Limit Reached</p>
          <p className="text-sm mt-1">You can upload only 50 DITA files. Please contact MetR for more.</p>
        </div>
      )}
    </div>
  );
};

export default DITAConversionForm;
