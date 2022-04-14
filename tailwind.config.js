module.exports = {
  content: [
    './frontend/src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        'glow': '0 5px 5px rgba(255, 255, 255, 0.8)',
      },
      boxShadow: {
        'banner': '0 35px 40px -15px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'login_banner': "url('../imgs/login_banner.jpg')",
        'gallery_banner': "url('../imgs/gallery_banner.jpg')",
      }
    },
  },
  plugins: [],
}
