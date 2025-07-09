import React from 'react';

const Footer = () => {
  return (
<footer className="bg-gray-900 text-white py-12 mt-24">
  <div className="max-w-7xl mx-auto px-12 lg:px-20 grid grid-cols-1 md:grid-cols-5 gap-y-10 gap-x-12">
    
    <div className="md:col-span-2">
      <h3 className="text-xl font-semibold mb-4">Job Assistant</h3>
      <p className="text-gray-400 text-sm mb-6">
        Helping you apply smartly and efficiently.
      </p>

      <div className="flex flex-col gap-3 items-start">
        <img src="/appstore.png" alt="App Store" className="h-8 w-32 object-contain" />
        <img src="/googleplay.png" alt="Google Play" className="h-12 object-contain" />
      </div>
    </div>

    <div>
      <h4 className="text-lg font-semibold mb-4">Product</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Resume Builder</a></li>
        <li><a href="#">Job Tracker</a></li>
      </ul>
    </div>

    <div>
      <h4 className="text-lg font-semibold mb-4">About</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#">Company</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div>
      <h4 className="text-lg font-semibold mb-4">Legal</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>
  </div>

  <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
    © {new Date().getFullYear()} Job Assistant. All rights reserved.
  </div>
</footer>
  );
};

export default Footer;
