# Seval Gıda Website - React Version

A modern, responsive website for Seval Gıda built with React and Bootstrap, ready for deployment on GitHub Pages.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone/Create your repository:**
```bash
git clone https://github.com/yourusername/seval-gida-website.git
cd seval-gida-website
```

2. **Install dependencies:**
```bash
npm install
```

3. **Copy your assets:**
   - Copy your `assets` folder to `public/assets/`
   - Make sure all images and CSS files are in the correct locations

4. **Update the homepage URL:**
   - In `package.json`, replace `yourusername` with your GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/seval-gida-website"
   ```

5. **Start development server:**
```bash
npm start
```

## 📁 Project Structure

```
seval-gida-website/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css (your CSS file)
│   │   ├── img/
│   │   │   ├── product/
│   │   │   ├── Certificates-icon/
│   │   │   └── seval-website-logo.webp
│   │   └── vendor/
│   ├── katalog.pdf
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── HeroSection.js
│   │   ├── BestSellers.js
│   │   ├── PromoCards.js
│   │   ├── ProductCards.js
│   │   └── CallToAction.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Products.js
│   │   ├── Contact.js
│   │   ├── Export.js
│   │   └── Dealer.js
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
└── README.md
```

## 🌐 Deployment to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "GitHub Actions" as the source

3. **The site will automatically deploy** when you push to the main branch!

### Method 2: Manual Deployment

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Deploy:**
```bash
npm run deploy
```

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Import and add the route in `App.js`
3. Update navigation in `Header.js`

### Updating Content
- **Images**: Place in `public/assets/img/`
- **Styles**: Modify `public/assets/css/main.css`
- **Content**: Update the respective components

### Environment Variables
For different environments, you can use `.env` files:
```
REACT_APP_API_URL=your-api-url
```

## 📱 Features

- ✅ Fully responsive design
- ✅ React Router for navigation
- ✅ Bootstrap 5 integration
- ✅ AOS animations
- ✅ Component-based architecture
- ✅ GitHub Pages ready
- ✅ SEO optimized

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Run tests
npm test
```

## 📝 Important Notes

1. **Asset Paths**: All assets should use `process.env.PUBLIC_URL` for proper GitHub Pages deployment
2. **Router**: Uses `HashRouter` for compatibility with GitHub Pages
3. **Homepage**: Must be set correctly in `package.json` for proper deployment
4. **CSS**: Your existing CSS file should be placed in `public/assets/css/main.css`

## 🐛 Troubleshooting

### Common Issues:

1. **Images not loading:**
   - Check if images are in `public/assets/img/`
   - Verify paths use `process.env.PUBLIC_URL`

2. **Routing issues on GitHub Pages:**
   - Ensure you're using the correct `basename` in the Router

3. **CSS not loading:**
   - Make sure `main.css` is in `public/assets/css/`
   - Check import in `App.js`

## 📞 Support

For issues related to deployment or React conversion, please check:
- [React Documentation](https://reactjs.org/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Create React App Documentation](https://create-react-app.dev/)

## 📄 License

This project is licensed under the MIT License.