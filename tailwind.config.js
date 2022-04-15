module.exports = {
  content: [
    './frontend/src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        'light-glow': '0 5px 5px rgba(255, 255, 255, 0.65)',
        'glow': '0 5px 5px rgba(255, 255, 255, 1.0)',
      },
      boxShadow: {
        'banner': '0 35px 20px -25px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'login_banner': "url('../imgs/login_banner.jpg')",
        'gallery_banner': "url('../imgs/gallery_banner.jpg')",
        
      },
      backgroundSize: {
        '100%': '100%',
      }
    },
  },
  plugins: [],
}
