import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* CTA Section */}
      {/* <section className="bg-red-700 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Looking For Bulk Banana Products?
          </h2>

          <p className="mt-4 text-red-100 text-lg">
            Partner with Bihar's trusted Banana Food Products Manufacturer for
            wholesale and bulk orders across India.
          </p>

          <button className="mt-6 px-8 py-4 bg-white text-red-700 rounded-xl font-bold shadow-lg hover:scale-105 transition">
            Get Wholesale Pricing
          </button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-[rgb(250,221,159)] text-gray-800 border-t-4 border-green-700">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Company */}
            <div>
              <h3 className="text-3xl font-extrabold text-green-700">
                Maa Kavita Lakxmi Pvt. Ltd.
              </h3>

              <p className="mt-4 text-gray-700 leading-relaxed text-sm">
                Premium manufacturer of Banana Chips, Banana Powder, Sweet
                Potato Products and other healthy snacks. Freshly prepared,
                hygienically packed and delivered across India.
              </p>

              <div className="flex gap-3 mt-6">
                <SocialIcon link="https://www.facebook.com/profile.php?id=61584024615846">
                  <FaFacebookF />
                </SocialIcon>

                <SocialIcon link="https://twitter.com">
                  <FaTwitter />
                </SocialIcon>
              </div>
            </div>

            {/* Quick Links */}
            <FooterColumn title="Quick Links">
              <div className="flex flex-col gap-3">
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/b2b">Wholesaler / B2B</FooterLink>
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/contactus">Contact Us</FooterLink>
              </div>
            </FooterColumn>

            {/* Products */}
            <FooterColumn title="Products">
              <p>Banana Chips</p>
              <p>Banana Powder</p>
              <p>Sweet Potato Powder</p>
              <p>Sweet Potato Chips</p>
              <p>Mushroom Chips</p>
              <p>Mushroom Powder</p>
              <p>Makhana Kheer Powder</p>
              {/* <p>Badam Powder</p> */}
            </FooterColumn>

            {/* Contact */}
            <FooterColumn title="Contact Us">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                    Call / WhatsApp
                  </p>

                  <a
                    href="tel:+918492995999"
                    className="flex items-center gap-2 mt-2 text-gray-700 hover:text-green-700"
                  >
                    <FaPhoneAlt />
                    +91 8492995999
                  </a>
                  <a
                    href="tel:+917366981951"
                    className="flex items-center gap-2 mt-2 text-gray-700 hover:text-green-700"
                  >
                    <FaPhoneAlt />
                    +91 7366981951
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                    Email
                  </p>

                  <a
                    href="mailto:maakavitalaxmi@gmail.com"
                    className="flex items-center gap-2 mt-2 text-gray-700 hover:text-green-700"
                  >
                    <FaEnvelope />
                    maakavitalaxmi@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                    Office Address
                  </p>

                  <div className="flex gap-2 mt-2">
                    <FaMapMarkerAlt className="mt-1 text-green-700" />

                    <p className="text-sm text-gray-700">
                      Maa Kavita Lakxmi Pvt. Ltd.
                      <br />
                      Ward No - 71, Holding No.- 171/225/182A,
                      <br />
                      Circle No-226, Simlli Murarour,
                      <br />
                      Sahdara, Patna, Bihar - 800008
                    </p>
                  </div>
                </div>
              </div>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 pt-1">
<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-700 p-3">
  <p>
    © {new Date().getFullYear()} Maa Kavita Lakxmi Pvt. Ltd. All Rights Reserved.
  </p>

  <p className="mt-1 text-xs text-gray-600">
    Website Designed & Developed by{" "}
    <a
      href="https://watertreeinfotech.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-red-700 hover:underline"
    >
      WaterTree Infotech Pvt. Ltd.
    </a>
  </p>
</div>
        </div>
      </footer>
    </>
  );
};

const FooterColumn = ({ title, children }) => (
  <div>
    <h4 className="text-sm font-bold uppercase tracking-widest text-green-700">
      {title}
    </h4>

    <div className="w-12 h-1 bg-green-700 rounded-full mt-2 mb-5"></div>

    <div className="space-y-3 text-gray-700 text-sm">{children}</div>
  </div>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-green-700 transition duration-300"
  >
    {children}
  </Link>
);

const SocialIcon = ({ children, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-all duration-300 hover:scale-110"
  >
    {children}
  </a>
);

export default Footer;