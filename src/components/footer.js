import React from "react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaRss } from "react-icons/fa6";
import metap from "../assets/images/metRLOGO.png";
import nasscom from "../assets/images/nasscom_img.607fe11643eb7ec76dd7.png"; // update path accordingly
import iso1 from "../assets/images/iso1.a9d42c62d4bedf40f113.png";       // update path accordingly
import iso2 from "../assets/images//iso2.218d423eaf41eb74d0a8.png";       // update path accordingly

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#bee5fc]/100 to-[#d3bdfc]/100 font-[poppins] text-black text-sm pt-10 pb-4 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Subscribe Section */}
        <div className="space-y-4">
          <img src={metap} alt="Metapercept Logo" className="h-20" />
         
        </div>

        {/* Quick Links */}
        <div className="text-base ">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
  <li>
    <a
      href="https://metapercept.com/aboutus/" target="_blank" rel="noopener noreferrer"
      className="hover:translate-x-1 hover:text-blue-500 transition-all duration-300 ease-in-out"
    >
      About us
    </a>
  </li>
  <li>
    <a
      href="https://metapercept.com/solutions/" target="_blank" rel="noopener noreferrer"
      className="hover:translate-x-1 hover:text-blue-500 transition-all duration-300 ease-in-out"
    >
      Solutions
    </a>
  </li>
  <li>
    <a 
      href="https://metapercept.com/services/" target="_blank" rel="noopener noreferrer"
      className="hover:translate-x-1 hover:text-blue-500 transition-all duration-300 ease-in-out"
    >
      Services
    </a>
  </li>
  <li>
    <a
      href="https://met-r.io/contact-us" target="_blank" rel="noopener noreferrer"
      className="hover:translate-x-1 hover:text-blue-500 transition-all duration-300 ease-in-out"
    >
      Contact Us
    </a>
  </li>
</ul>

        </div>

        {/* Contact Details */}
        <div className="text-base ">
          <h3 className="font-semibold mb-2 text-xl">Contact Details</h3>
          <p>📞 <a href="tel:8390905726">+91-839-090-5726</a> </p>
          <p>✉ <a href="mailto:sales@metapercept.com">sales@metapercept.com</a></p>
          <p>✉ <a href="mailto:info@metapercept.com">info@metapercept.com</a></p>
          
        </div>
       

        {/* Offices */}
        <div className="text-base ">
          <h3 className="font-semibold mb-2 text-xl">Offices</h3>
          <p><strong>India Office:</strong><br />Pune, Maharashtra, India</p>
          <p className="mt-2"><strong>USA Office:</strong><br />Arlington, Texas, USA</p>
        </div>

        {/* Social + Accreditation */}
        <div>
          <h3 className="font-semibold mb-2">Social Links</h3>
          <div className="flex space-x-3 mb-4">
  <a href="https://www.facebook.com/metapercepttechservices/" target="_blank" rel="noopener noreferrer">
    <FaFacebookF className="w-6 h-6 hover:text-blue-600 transition-colors duration-200" />
  </a>
  <a href="https://x.com/MetaPercept" target="_blank" rel="noopener noreferrer">
    <FaXTwitter className="w-6 h-6 hover:text-black transition-colors duration-200" />
  </a>
  <a href="https://www.linkedin.com/showcase/metrdocumentpublishingtool/" target="_blank" rel="noopener noreferrer">
    <FaLinkedinIn className="w-6 h-6 hover:text-blue-700 transition-colors duration-200" />
  </a>
  <a href="https://blog.metapercept.com/" target="_blank" rel="noopener noreferrer">
    <FaRss className="w-6 h-6 hover:text-orange-500 transition-colors duration-200" />
  </a>
</div>

          <h3 className="font-semibold mb-2">Accreditations</h3>
          <img src={nasscom} alt="NASSCOM" className="w-24 mb-2" />
          <div className="flex space-x-2">
            <img src={iso1} alt="ISO1" className="w-10 h-10" />
            <img src={iso2} alt="ISO2" className="w-10 h-10" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-400 mt-10 pt-4 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-base">
        <p>Copyright © 2025 <a href="https://metapercept.com/" target="_blank" rel="noopener noreferrer">Metapercept Technology Services LLP</a> All Rights Reserved</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="https://metapercept.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="https://metapercept.com/gdpr/termsandconditions/" target="_blank" rel="noopener noreferrer">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
