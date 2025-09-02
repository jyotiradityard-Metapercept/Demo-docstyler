import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import backimage2 from "../assets/images/1.png";
import FeatureList from "../components/FeatureList";

// Import your GIFs (update these paths to match your project structure)
import step1Gif from "../assets/gifs/newgif1.gif";
import step2Gif from "../assets/gifs/newgif2.gif";
import step3Gif from "../assets/gifs/newgif3.gif";
import arrow1 from "../assets/images/arrow1.png";
import arrow2 from "../assets/images/arrow2.png";
import conversionDoneImage from "../assets/images/tick.png";
import separatorWave from "../assets/images/svgviewer-output.svg";
import separatorWave2 from "../assets/images/svgviewer-output (1).svg";
import metrlogo from "../assets/images/metRLOGO.png"


const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content - Grow to push footer down */}
      <main className="flex-1 ">
        {/* Hero Section */}
        <div 
          className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-cover bg-center"
          style={{ backgroundImage: `url(${backimage2})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#000000] bg-opacity-70"></div>

          {/* Content */}
          <div className="relative font-[poppins] z-10 text-white max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Welcome to the <img src={metrlogo} alt="Logo" className="inline w-16 h-16 mx-2" /> DOC Styler</h1>
            <p className="text-lg">
  This tool is integrated with a custom DITA-OT and helps convert DITA files to HTML and PDF formats using metR’s custom template plugins for HTML and PDF.
</p>
          </div>
        </div>

       {/* How to Use This Tool Section */}
<section className="py-16 px-6 bg-gray-100 text-black font-[poppins]">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">How to Use This Styler </h2>

    {/* Step 1 */}
    <div className="flex flex-col md:flex-row items-center mb-12">
      <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-4">Step 1: Upload Your Custom logo, Theme color & Footer</h3>
        <p className="text-base text-gray-700">
        Upload your personalized logo, choose a theme color, and add your company name on footer to tailor the look and feel of your HTML & PDF output. These elements help brand your HTML and PDF documents consistently with metR’s custom plugin setup.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src={step1Gif}
          alt="Step 1 GIF"
          className="rounded-xl w-auto h-[300px] object-contain shadow-2xl shadow-gray-700 rotate-3 "
        />
      </div>
    </div>

    {/* Custom Arrow */}
    <div className="flex justify-center mb-12">
      <img
        src= {arrow1}
        alt="Flow Arrow"
        className="h-20 w-auto"
      />
    </div>

    {/* Step 2 */}
    <div className="flex flex-col md:flex-row-reverse items-center mb-12">
      <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8 text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-4">Step 2: Upload your DITA Input ZIP !</h3>
        <p className="text-base text-gray-700">
        Upload your DITA input ZIP file using the dropdown section. Make sure to include the root folder and specify the name of main DITAMAP file in input section for conversion. The conversion process will start when you click the "Start Conversion" button.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src={step2Gif}
          alt="Step 2 GIF"
          className="rounded-xl w-auto h-[300px] object-contain shadow-2xl shadow-gray-700 -rotate-3"
        />
      </div>
    </div>

    {/* Custom Arrow */}
    <div className="flex justify-center mb-12">
      <img
        src= {arrow2}
        alt="Flow Arrow"
        className="h-20 w-auto"
      />
    </div>

    {/* Step 3 */}
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-4">Step 3: Download & Extract the ZIP !</h3>
        <p className="text-base text-gray-700">
        After the conversion process, the output ZIP file containing the HTML and PDF files will be automatically downloaded. Extract the ZIP to access the converted files for use in your system.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src={step3Gif}
          alt="Step 3 GIF"
          className="rounded-xl w-auto h-[300px] object-contain shadow-2xl shadow-gray-700 rotate-3 "
        />
      </div>
    </div>
  </div>
   {/* Conversion Process Done Section */}
<div className="flex justify-center items-center mb-12 mt-[100px]">
  <h3 className="text-3xl font-bold text-center mr-4">Conversion Process is Done</h3>
  <img
    src={conversionDoneImage}  // Replace with the actual image path
    alt="Conversion Done"
    className="w-12 h-12 object-contain"
  />
</div>
</section>
{/* Separator */}
<hr className="my-10 border-t-2 border-gray-300 w-4/5 mx-auto" />

{/* Image Separator */}
<div className="w-full overflow-hidden -mb-1">
  <img
    src={separatorWave} // import and use your separator image
    alt="Section Divider"
    className="w-full object-cover"
  />
</div>




        {/* Feature List Section */}
<section className="p-10 text-center text-black w-full">
  <FeatureList />
  {/* Separator */}
<hr className="my-10 border-t-2 border-gray-300 w-4/5 mx-auto" />

  {/* Navigate to Publisher Heading */}
  <div className="mt-16">
    <h2 className="text-3xl font-bold mb-4 font-[poppins]">Navigate to the Publisher</h2>
    <p className="text-base font-[poppins] text-gray-700 mb-8">
      Choose whether you want to publish your DITA content to HTML or PDF.
    </p>

    {/* Navigation Buttons to Publisher HTML and PDF */}
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-6 font-[poppins]">
      <a
        href="/html-editor"
        className="bg-[#f0f4ff] bg-gradient-to-r from-[#bee5fc] to-[#d3bdfc] text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#d4e0ff] transition duration-300"
      >
        Go to HTML Publisher 
      </a>
      <a
        href="/pdf-editor"
        className="bg-[#ece7ff] bg-gradient-to-r from-[#bee5fc] to-[#d3bdfc] text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#d8d0ff] transition duration-300"
      >
        Go to PDF Publisher 
      </a>
    </div>
  </div>
</section>

{/* Separator */}
<hr className="my-10 border-t-2 border-gray-300 w-4/5 mx-auto" />

        {/* Additional Section - Example: Features or Call to Action */}
        <section className="py-16 px-6 text-black font-[poppins]">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">What’s Next?</h2>
    <p className="text-base text-gray-700 mb-8">
      Explore more tools, check out detailed documentation, or get in touch with MetR.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <a
        href="https://met-r.io/"
        className="bg-gradient-to-r from-[#bee5fc] to-[#d3bdfc] text-black px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Explore Tools
      </a>
      <a
        href="https://met-r.io/contact-us"
        className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition duration-300"
      >
        Contact Us
      </a>
    </div>
  </div>
</section>

{/* Image Separator */}
<div className="w-full overflow-hidden -mb-1">
  <img
    src={separatorWave2} // import and use your separator image
    alt="Section Divider"
    className="w-full object-cover"
  />
</div>

      </main>

      {/* Footer - Stays at Bottom */}
      <Footer />
    </div>
  );
};

export default HomePage;
