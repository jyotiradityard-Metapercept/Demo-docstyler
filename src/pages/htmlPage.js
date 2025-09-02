import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ChromePicker } from "react-color";
import axios from 'axios';
import DitaUploader from "../components/DitaUploader";


  const sections = [
    { id: "Header", name: "Header",  },
    { id: "Theme_editor", name: "Theme Editor",  },
    { id: "Footer", name: "Footer", },
    { id: "Migration", name: "DITA to HTML Migration", },
  ];

const StylerPage = () => {
  const [activeSection, setActiveSection] = useState("Header");
  const [primaryColor, setPrimaryColor] = useState("#3498db"); // default blue


  const [logoFile, setLogoFile] = useState(null);
const [previewUrl, setPreviewUrl] = useState(null);
// const [error, setError] = useState(null);
const [companyName, setCompanyName] = useState("");
const [companyWebsite, setCompanyWebsite] = useState("");

const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
//   const [showStatus, setShowStatus] = useState(false);
// const [statusMessage, setStatusMessage] = useState("");
// const [statusType, setStatusType] = useState(""); // "info" | "success" | "error"


const sectionOrder = ["Header", "Theme_editor", "Footer", "Migration"];


const handleUpdateTheme = async () => {
  try {
    await axios.post("http://localhost:5055/api/theme", {
      primaryColor: primaryColor,
    });

    setErrorMessage("Theme updated successfully!");
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  } catch (error) {
    console.error("Theme update failed:", error);

    setErrorMessage("Failed to update theme. Please try again.");
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  }
};



const goToNextSection = () => {
  const currentIndex = sectionOrder.indexOf(activeSection);
  if (currentIndex < sectionOrder.length - 1) {
    setActiveSection(sectionOrder[currentIndex + 1]);
  }
};

const goToPreviousSection = () => {
  const currentIndex = sectionOrder.indexOf(activeSection);
  if (currentIndex > 0) {
    setActiveSection(sectionOrder[currentIndex - 1]);
  }
};

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 min-h-[30rem] bg-white">
        {/* Sidebar */}
        <aside className="w-1/4 bg-[#F9FAFB] text-black p-6 text-xl font-medium font-[Poppins] border-r border-gray-700 shadow-sm">
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
        <main className="flex-1 p-10 bg-white text-black">
          {/* <h2 className="text-2xl font-semibold mb-4">
            {sections.find((s) => s.id === activeSection)?.name}
          </h2> */}
          <p className="mb-6">
            {sections.find((s) => s.id === activeSection)?.content}
          </p>

{/* 1st section */}
          {/* Dynamic Section Content Here */}
		  {activeSection === "Header" && (
  <div className="font-[poppins] mt-[-50px]">
    <h3 className="text-xl font-semibold mb-4">Upload Header Logo</h3>

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
          setErrorMessage("❌ Please select a logo file first.");
          setShowError(true);
          setTimeout(() => setShowError(false), 4000);
          return;
        }

        const formData = new FormData();
        formData.append("logo", logoFile);

        fetch("http://localhost:5055/upload-logo", {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            if (!res.ok) throw new Error("Upload failed");
            return res.text();
          })
          .then(() => {
            setErrorMessage("✅ Logo updated successfully!");
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
      <label className="block mb-2 text-sm font-medium">Choose Logo File:</label>
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
          alt="Preview"
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


{/* 2nd section */}

{activeSection === "Theme_editor" && (
  <div className="font-[poppins]">
    <div className="mb-6 mt-[-50px]">
      <h3 className="text-lg font-semibold mb-3">Pick Primary Color</h3>
      <div className="inline-block">
        <ChromePicker
          color={primaryColor}
          onChange={(color) => setPrimaryColor(color.hex)}
          disableAlpha
        />
      </div>
    </div>

    <p className="text-sm">
      Selected Color: <span style={{ color: primaryColor }}>{primaryColor}</span>
    </p>

    {/* Show success or error message */}
    {showError && (
      <div className="mt-3 text-sm text-green-600">
        {errorMessage}
      </div>
    )}

    {/* Update Button */}
    <div className="mt-6">
      <button
        onClick={handleUpdateTheme}
        className="px-4 py-2 bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium rounded hover:bg-gray-700 transition"
      >
        🎨 Update Theme
      </button>
    </div>

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



		  {/* 3th section  */}

{activeSection === "Footer" && (
  <div className="font-[poppins] mt-[-50px]">
    <h3 className="text-xl font-semibold mb-4">Customize Footer</h3>

    {/* Message Box */}
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
        if (!companyName || !companyWebsite) {
          setErrorMessage("❌ Both company name and website are required.");
          setShowError(true);
          setTimeout(() => setShowError(false), 4000);
          return;
        }

        fetch("http://localhost:5055/update-footer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            companyWebsite,
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to update footer");
            return res.text();
          })
          .then(() => {
            setErrorMessage("✅ Footer updated successfully!");
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
          })
          .catch(() => {
            setErrorMessage("❌ Error updating footer.");
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
          });
      }}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. MetaPercept"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Company Website</label>
        <input
          type="url"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          placeholder="e.g. https://www.metapercept.com"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 text-black font-medium px-6 py-2 rounded shadow hover:bg-gray-700 transition"
      >
        Update Footer
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


{/* 4th section  */}
{activeSection === "Migration" && (
  <div className="font-[poppins] mt-[-50px]">
    <DitaUploader/>
   

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
