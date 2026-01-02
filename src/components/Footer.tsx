import { Sparkles } from "lucide-react";
import { Facebook, Instagram, Twitter, Mail, Youtube } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Contact", href: "#" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-foreground" />
          </div>
          <h2 className="text-2xl font-bold">Techyprompt</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-background/80 hover:text-background transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-background/30 flex items-center justify-center hover:bg-background/10 transition-colors"
              >
                <IconComponent className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-background/60">
          Copyright © Techyprompt. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
