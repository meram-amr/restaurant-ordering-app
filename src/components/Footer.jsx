import { useState } from "react";
import { Link } from "react-router-dom";
import { LuLeaf } from "react-icons/lu";
import { MdOutlineWatchLater, MdOutlineEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

function Footer() {
  return (
    <footer className="bg-[#081D14] text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 px-6 md:px-12 lg:px-16 py-12">
        <div>
          <div className="flex items-center">
            <LuLeaf className="text-lime-300 text-xl mr-2" />
            <h2 className="text-2xl font-bold font-playfair tracking-wide">
              AVERO
            </h2>
          </div>
          <p className="text-lime-300 mt-2 font-medium">
            KITCHEN & BAR
          </p>
          <p className="text-[#53614F] mt-6 leading-7 max-w-xs">
            Good food brings people together. We bring you an experience
            you will always remember.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-5">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="text-[#53614F] hover:text-[#BBC76E] transition"
            >
              Home
            </a>
            <a
              href="#"
              className="text-[#53614F] hover:text-[#BBC76E] transition"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-[#53614F] hover:text-[#BBC76E] transition"
            >
              Menu
            </a>
            <a
              href="#"
              className="text-[#53614F] hover:text-[#BBC76E] transition"
            >
              Gallery
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-5">
            Opening Hours
          </h3>
          <div className="flex flex-col gap-3">
            <p className="text-[#53614F] flex items-center gap-2">
              <MdOutlineWatchLater />
              Mon - Thu 11:00 AM - 10:00 PM
            </p>
            <p className="text-[#53614F] flex items-center gap-2">
              <MdOutlineWatchLater />
              Fri - Sat 11:00 AM - 11:30 PM
            </p>
            <p className="text-[#53614F] flex items-center gap-2">
              <MdOutlineWatchLater />
              Sunday 11:00 AM - 09:30 PM
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-5">
            Contact Us
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+12345678900"
              className="text-[#53614F] hover:text-[#BBC76E] transition flex items-center gap-2"
            >
              <BsTelephoneFill />
              +1 234 567 8900
            </a>
            <a
              href="mailto:hello@averokitchen.com"
              className="text-[#53614F] hover:text-[#BBC76E] transition break-words flex items-center gap-2"
            >
              <MdOutlineEmail />
              hello@averokitchen.com
            </a>
            <a
              href="#"
              className="text-[#53614F] hover:text-[#BBC76E] transition flex items-center gap-2"
            >
              <CiLocationOn />
              Talaatharb Street, Cairo
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#9EAD63] px-6 md:px-12 lg:px-16 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#53614F] text-sm text-center md:text-left">
            © 2026 Avero Kitchen & Bar. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <a
              href="#"
              className="text-[#53614F] text-sm hover:text-[#BBC76E] transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#53614F] text-sm hover:text-[#BBC76E] transition"
            >
              Terms of Services
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
