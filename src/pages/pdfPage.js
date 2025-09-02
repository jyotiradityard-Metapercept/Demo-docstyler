import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import DitaUploader2 from "../components/ditaUploaderPdf";
import axios from 'axios';

// import { ChromePicker } from "react-color";

const sections = [
  { id: "Front-Page", name: "Front Page",  },
  { id: "Base-Color", name: "Base Color", },
  { id: "Footer", name: "Header & Footer",},
  { id: "Migration", name: "DITA to PDF Migration",},
];



const StylerPage = () => {
  const [activeSection, setActiveSection] = useState("Front-Page");

  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [footerText, setFooterText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [faviconFile, setFaviconFile] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [faviconMessage, setFaviconMessage] = useState("");
  const [showFaviconMessage, setShowFaviconMessage] = useState(false);
  // const [showStatus, setShowStatus] = useState(false);
// const [statusMessage, setStatusMessage] = useState("");
// const [statusType, setStatusType] = useState(""); // "info" | "success" | "error"

  

  
  
  const sectionOrder = ["Front-Page", "Base-Color", "Footer", "Migration"];


  

  const handleFaviconUpload = async () => {
    if (!faviconFile) {
      setFaviconMessage("Please select a favicon file to upload.");
      setShowFaviconMessage(true);
      setTimeout(() => setShowFaviconMessage(false), 3000);
      return;
    }
  
    const formData = new FormData();
    formData.append("faviconLogo", faviconFile);
  
    try {
      const response = await axios.post("http://localhost:5055/upload-favicon", formData);
      setFaviconMessage(response.data.message);
    } catch (error) {
      setFaviconMessage("Failed to upload favicon.");
      console.error("Upload error:", error);
    }
  
    setShowFaviconMessage(true);
    setTimeout(() => setShowFaviconMessage(false), 3000);
  };
  
  const goToPreviousSection = () => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sectionOrder[currentIndex - 1]);
    }
  };
  
  const goToNextSection = () => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex < sectionOrder.length - 1) {
      setActiveSection(sectionOrder[currentIndex + 1]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 min-h-[30rem] bg-white">
        {/* Sidebar */}
        <aside className="w-1/4 bg-[#F9FAFB]  text-black p-6 text-xl font-medium font-[Poppins] border-r border-gray-700 shadow-sm">
          <ul className="space-y-3">
            {sections.map((section) => (
              <li
                key={section.id}
                className={`cursor-pointer p-2 rounded transition ${
                  activeSection === section.id ? "bg-[#bee5fc]/60 backdrop-blur-md"  : "hover:bg-[#bee5fc]/80 transition "
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-10 bg-white text-gray-900">
          {/* <h2 className="text-2xl font-semibold mb-4">
            {sections.find((s) => s.id === activeSection)?.name}
          </h2> */}
          <p className="mb-6">
            {sections.find((s) => s.id === activeSection)?.content}
          </p>

          {/* Dynamic Section Content Here */}

          {/* 1st section  */}
          {activeSection === "Front-Page" && (
  <div className="font-[poppins] mt-[-50px]">
    <h3 className="text-xl font-semibold mb-4">Upload PDF Cover Logo</h3>

    {/* Feedback Message */}
    {showError && (
      <div
        className={`px-4 py-2 mb-4 rounded shadow transition-all duration-300 ${
          errorMessage.includes("✅")
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white animate-bounce"
        }`}
      >
        {errorMessage}
      </div>
    )}

    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!logoFile) {
          setErrorMessage("❌ Please select a cover logo file first.");
          setShowError(true);
          setTimeout(() => setShowError(false), 4000);
          return;
        }

        const formData = new FormData();
        formData.append("logo", logoFile);

        fetch("http://localhost:5055/upload-logo2", {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            if (!res.ok) throw new Error("Upload failed");
            return res.json();
          })
          .then(() => {
            setErrorMessage("✅ Cover logo updated successfully!");
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
          })
          .catch(() => {
            setErrorMessage("❌ Logo upload failed.");
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
          });
      }}
    >
      <label className="block mb-2 text-sm font-medium">Choose PDF Cover Logo:</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const allowedTypes = ["image/png", "image/jpeg"];
            const maxSize = 5 * 1024 * 1024;

            if (!allowedTypes.includes(file.type)) {
              setErrorMessage("❌ Only PNG or JPEG files are allowed.");
              setShowError(true);
              setTimeout(() => setShowError(false), 4000);
              return;
            }

            if (file.size > maxSize) {
              setErrorMessage("❌ File exceeds 5MB limit.");
              setShowError(true);
              setTimeout(() => setShowError(false), 4000);
              return;
            }

            setLogoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setErrorMessage("");
            setShowError(false);
          }
        }}
        className="mb-4"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Cover Preview"
          className="h-24 mb-4 border rounded"
        />
      )}

      <button
        type="submit"
        className="bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium px-6 py-2 rounded shadow hover:bg-gray-700 transition"
      >
        Upload Logo
      </button>
    </form>

   {/* ------------------ Cover Image Upload ------------------ */}
   <h3 className="text-xl font-semibold mb-4">Upload PDF Cover Image</h3>

<form
  onSubmit={(e) => {
    e.preventDefault();

    if (!coverFile) {
      setErrorMessage("❌ Please select a cover image first.");
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    const formData = new FormData();
    formData.append("image", coverFile); // backend expects 'image'

    fetch("http://localhost:5055/cover-image", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setErrorMessage("✅ Cover image uploaded successfully!");
        } else {
          setErrorMessage("❌ Cover image upload failed.");
        }
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
      })
      .catch(() => {
        setErrorMessage("❌ Upload failed. Try again.");
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
      });
  }}
>
  <label className="block mb-2 text-sm font-medium">Choose Cover Image:</label>
  <input
    type="file"
    accept="image/png, image/jpeg"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const allowedTypes = ["image/png", "image/jpeg"];
        const maxSize = 5 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
          setErrorMessage("❌ Only PNG or JPEG files are allowed.");
          setShowError(true);
          setTimeout(() => setShowError(false), 4000);
          return;
        }

        if (file.size > maxSize) {
          setErrorMessage("❌ File exceeds 5MB limit.");
          setShowError(true);
          setTimeout(() => setShowError(false), 4000);
          return;
        }

        setCoverFile(file);
        setCoverPreview(URL.createObjectURL(file));
        setErrorMessage("");
        setShowError(false);
      }
    }}
    className="mb-4"
  />

  {coverPreview && (
    <img src={coverPreview} alt="Cover Preview" className="h-24 mb-4 border rounded" />
  )}

  <button
    type="submit"
    className="bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium px-6 py-2 rounded shadow hover:bg-gray-700 transition"
  >
    Upload Cover Image
  </button>
</form>


    {/* Navigation Buttons */}
    <div className="mt-6 flex justify-between">
      {sectionOrder.indexOf(activeSection) > 0 && (
        <button
          onClick={goToPreviousSection}
          className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-400 transition"
        >
          ⬅ Back
        </button>
      )}
      {sectionOrder.indexOf(activeSection) < sectionOrder.length - 1 && (
        <button
          onClick={goToNextSection}
          className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-700 transition"
        >
          Next ➡
        </button>
      )}
    </div>
  </div>
)}


{/* 2nd section  */}
{activeSection === "Base-Color" && (
  <div className="font-[poppins] mt-[-50px]">
    {/* Title */}
    <h3 className="text-xl font-semibold mb-4">Choose Base Theme Color</h3>

    {/* Feedback Message */}
    {showError && (
      <div
        className={`px-4 py-2 mb-4 rounded shadow transition-all duration-300 ${
          errorMessage.includes("✅")
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white animate-bounce"
        }`}
      >
        {errorMessage}
      </div>
    )}

    {/* Form */}
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!/^#([A-Fa-f0-9]{6})$/.test(selectedColor)) {
          setErrorMessage("❌ Invalid color format. Use #RRGGBB.");
          setShowError(true);
          setTimeout(() => setShowError(false), 4000);
          return;
        }

        fetch("http://localhost:5055/update-color", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ color: selectedColor }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              setErrorMessage("✅ Color updated successfully!");
            } else {
              setErrorMessage("❌ Color update failed.");
            }
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
          })
          .catch(() => {
            setErrorMessage("❌ Server error while updating color.");
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
          });
      }}
    >
      <label className="block mb-2 text-sm font-medium">Pick a color:</label>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="w-20 h-10 rounded mb-4 border-2 border-gray-300 cursor-pointer"
      />

      <div className="mb-4">
        <input
          type="text"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border px-4 py-2 rounded w-40"
          placeholder="#RRGGBB"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium px-6 py-2 rounded shadow hover:bg-gray-700 transition"
      >
        Update Theme Color
      </button>
    </form>

    {/* Navigation Buttons */}
    <div className="mt-6 flex justify-between">
      {sectionOrder.indexOf(activeSection) > 0 && (
        <button
          onClick={goToPreviousSection}
          className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-400 transition"
        >
          ⬅ Back
        </button>
      )}
      {sectionOrder.indexOf(activeSection) < sectionOrder.length - 1 && (
        <button
          onClick={goToNextSection}
          className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-700 transition"
        >
          Next ➡
        </button>
      )}
    </div>
  </div>
)}

{/* 3rd section  */}

{activeSection === "Footer" && (
  <div className="font-[poppins] mt-[-50px]">
    <p className="text-lg mb-4">Upload a custom favicon logo for the PDF.</p>

    {/* Favicon Upload UI */}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setFaviconFile(file);
          setFaviconPreview(URL.createObjectURL(file));
        }
      }}
      className="mb-4 block"
    />

    {faviconPreview && (
      <img
        src={faviconPreview}
        alt="Favicon Preview"
        className="h-16 w-16 mb-4 border rounded"
      />
    )}

    <button
      onClick={handleFaviconUpload}
      className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-700 transition"
    >
      Upload Favicon
    </button>

   {/* Feedback message for favicon */}
   {showFaviconMessage && (
  <div
    className={`px-4 py-2 mt-2 mb-4 rounded shadow transition-all duration-300 ${
      faviconMessage.toLowerCase().includes("success")
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white animate-bounce"
    }`}
  >
    {faviconMessage}
  </div>
)}



    {/* Company Name Input */}
    <div className="mb-4 mt-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Company Name
      </label>
      <input
        type="text"
        value={footerText}
        onChange={(e) => setFooterText(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your company name"
      />
    </div>

    {/* Update Button */}
    <button
      onClick={async () => {
        if (!footerText.trim()) {
          setErrorMessage("Company name cannot be empty.");
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
          return;
        }

        setIsUpdating(true);
        setErrorMessage("");
        setShowError(false);

        try {
          const response = await fetch("http://localhost:5055/update-footer2", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ companyName: footerText }),
          });

          const result = await response.json();

          if (response.ok) {
            setErrorMessage("✅ Footer updated successfully!");
          } else {
            setErrorMessage(`❌ ${result.message}`);
          }
        } catch (error) {
          console.error(error);
          setErrorMessage("❌ Failed to update footer.");
        }

        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        setIsUpdating(false);
      }}
      className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-blue-700 transition"
    >
      {isUpdating ? "Updating..." : "Update Footer"}
    </button>

    {/* Feedback Message */}
    {showError && (
      <div
        className={`px-4 py-2 mb-4 mt-4 rounded shadow transition-all duration-300 ${
          errorMessage.includes("✅")
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white animate-bounce"
        }`}
      >
        {errorMessage}
      </div>
    )}
 


    {/* Navigation Buttons */}
    <div className="mt-6 flex justify-between">
      {sectionOrder.indexOf(activeSection) > 0 && (
        <button
          onClick={goToPreviousSection}
          className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-400 transition"
        >
          ⬅ Back
        </button>
      )}
      {sectionOrder.indexOf(activeSection) < sectionOrder.length - 1 && (
        <button
          onClick={goToNextSection}
          className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-700 transition"
        >
          Next ➡
        </button>
      )}
    </div>
  </div>
)}

{/* 4th section  */}
{activeSection === "Migration" && (
  <div className="font-[poppins] mt-[-50px]">
    <DitaUploader2/>
    

    {/* Navigation Buttons */}
    <div className="mt-6 flex justify-between">
      {sectionOrder.indexOf(activeSection) > 0 && (
        <button
          onClick={goToPreviousSection}
          className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-400 transition"
        >
          ⬅ Back
        </button>
      )}
    </div>
  </div>
)}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StylerPage;
