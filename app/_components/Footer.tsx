import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-background text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h1 className="text-xl font-semibold text-white">Quala</h1>
          <p className="text-sm mt-2">
            Smart, simple notifications tailored to your workflow.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white mb-2">Product</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/docs">Documentation</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/security">Security</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-center py-4 border-t border-white/10">
        © {new Date().getFullYear()} Quala. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
