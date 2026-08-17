<div align="center">
  <h1>🚕 Hindustan Tour and Travels</h1>
  <p><strong>A Premium Taxi Booking & Travel Agency Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material UI" />
  </p>
</div>

<br />

## 🌟 Overview

Hindustan Tour and Travels is a modern, high-performance web application designed for a premier travel and taxi booking agency based in Firozabad, India. Built with React and Vite, the platform offers a seamless, mobile-optimized booking experience featuring interactive maps, strict geofencing, and automated email confirmations.

## ✨ Key Features

- **🗺️ Interactive Map Integration**: Built-in Ola Maps API integration allows users to visually select and confirm precise pickup and destination coordinates.
- **🛡️ Intelligent Geofencing**: Enforces a strict 50km booking radius around Firozabad to ensure service availability and prevent invalid out-of-bounds requests.
- **📅 Premium Booking UX**: Features highly customized Material-UI (MUI) Multi-Section Digital Clocks and Date Pickers for frictionless, native-feeling mobile inputs.
- **📧 Automated Notifications**: Powered by EmailJS to instantly dispatch booking details to the agency while automatically launching the user's phone dialer to confirm.
- **🔒 Enterprise Security**: Google reCAPTCHA v2 protects the booking endpoints from spam and automated bot submissions.
- **⚡ Lightning Fast**: Built on Vite with intelligent lazy-loading for heavy image assets, ensuring near-instant page loads.

## 🛠️ Tech Stack

- **Framework**: React.js 18 + Vite
- **Styling**: Tailwind CSS
- **Components**: Material-UI (MUI v6) for Date/Time Pickers
- **Maps**: Ola Maps API
- **Emails**: EmailJS
- **Security**: Google reCAPTCHA
- **Deployment**: Vercel

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development.

### Prerequisites

You will need `Node.js` installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tabsheerul/Hindustan-Tour-and-Travel.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Hindustan-Tour-and-Travel
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure your API keys:
   ```env
   VITE_OLA_MAPS_API_KEY=your_ola_maps_key
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📈 Performance & SEO

This platform is heavily optimized for SEO and Core Web Vitals.
- Features `sitemap.xml` and `robots.txt` for Google Search Console indexing.
- Implements `loading="lazy"` on all heavy DOM elements and graphics.
- Fully semantic HTML structure with meta tags injected globally.

---
<div align="center">
  <i>Developed and maintained by <a href="https://github.com/Tabsheerul">Tabsheerul</a></i>
</div>
