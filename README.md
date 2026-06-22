# STACKLY ESPORTS - Professional Esports Platform Website

Welcome to the Stackly Esports website! This is a modern, fully responsive esports platform built with pure HTML, CSS, and JavaScript.

## 🎮 Features

### Pages Included:
1. **Preloading Page** - Animated splash screen with Stackly logo
2. **Home Page** - Hero section with featured games and statistics
3. **Categories** - Game categories showcase
4. **Tournaments** - Active and upcoming tournaments with prize pools
5. **Blog** - Latest esports news and articles
6. **About** - Company information, mission, vision, team, and values
7. **Sign In** - User authentication page
8. **Register** - New account creation
9. **Contact** - Contact form and company information

### Design Features:
✨ **Modern Dark Gaming Theme** - Professional esports aesthetic
🎨 **Smooth Animations** - Engaging page transitions and hover effects
📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
⚡ **Fast Performance** - No external frameworks, pure vanilla JavaScript
🎯 **Interactive Elements** - Smooth scrolling, dynamic forms, notifications
🎪 **Visual Effects** - Parallax scrolling, pulse animations, gradient text
🔔 **Notifications System** - Success/error message notifications
🎹 **Keyboard Shortcuts** - H (Home), C (Categories), T (Tournaments), B (Blog)

## 📁 File Structure

```
stackly-esports/
├── index.html      # Main HTML file with all pages
├── styles.css      # Comprehensive styling with animations
├── script.js       # JavaScript functionality and interactions
├── logo.webp       # Stackly company logo
└── README.md       # This file
```

## 🚀 Getting Started

### Installation:
1. Extract the zip file to your desired location
2. Navigate to the folder
3. Open `index.html` in your web browser

### No Server Required:
This website works as a standalone application. Simply open the HTML file in any modern web browser - no backend server needed!

## 🎨 Color Scheme

- **Primary Color**: #FF6B35 (Orange)
- **Secondary Color**: #00D4FF (Cyan)
- **Background**: #0a0e27 (Dark Blue)
- **Text**: #e0e0e0 (Light Gray)

## 🔧 Customization

### Change Logo:
1. Replace `logo.webp` with your own image
2. Update the image path in HTML if needed

### Change Colors:
Edit the CSS variables in `styles.css` (line 6-12):
```css
:root {
    --primary: #FF6B35;        /* Main accent color */
    --secondary: #00D4FF;      /* Secondary accent */
    --bg-dark: #0a0e27;        /* Dark background */
    /* ... other colors ... */
}
```

### Change Content:
All text content can be easily edited in `index.html`. Simply search for the content you want to change and modify it.

### Add Images:
Replace the image URLs in the HTML with your own image sources. Current images use Unsplash (free stock photos).

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ✨ Key Interactive Features

### 1. Responsive Navigation
- Fixed navbar with scroll effects
- Mobile hamburger menu
- Active link highlighting

### 2. Form Handling
- Sign-in form with validation
- Registration form with multiple fields
- Contact form with submission feedback

### 3. Animations
- Page transition animations
- Hover effects on cards
- Scroll-triggered animations
- Smooth transitions and transforms

### 4. User Experience
- Notification system for feedback
- Local storage for user preferences
- Smooth scrolling behavior
- Keyboard shortcuts for navigation

## 🎯 Page Navigation

- **Home**: `showPage('home')`
- **Categories**: `showPage('categories')`
- **Tournaments**: `showPage('tournaments')`
- **Blog**: `showPage('blog')`
- **About**: `showPage('about')`
- **Sign In**: `showPage('signin')`
- **Register**: `showPage('register')`
- **Contact**: `showPage('contact')`

## 💡 Tips

1. **Preloader Duration**: Change the timeout in script.js (line 60) to adjust preloader duration
2. **Add More Games**: Duplicate the game-card div in the featured-games section
3. **Add More Tournaments**: Copy tournament-card divs to add more tournaments
4. **Customize Forms**: Add/remove form fields as needed in the form sections

## 📝 API Integration (Optional)

The website is ready for API integration. To add backend functionality:

1. Add fetch requests in `script.js` to your API endpoints
2. Update form submissions to send data to your server
3. Load dynamic content from your database

Example:
```javascript
fetch('https://your-api.com/tournaments')
    .then(response => response.json())
    .then(data => {
        // Populate tournaments dynamically
    });
```

## 🎨 Image Credits

Current images are sourced from Unsplash (https://unsplash.com):
- Free to use for both commercial and non-commercial projects
- No attribution required (but appreciated!)

## 📱 Mobile Optimization

The website is fully optimized for mobile devices with:
- Responsive grid layouts
- Touch-friendly buttons
- Mobile-first design approach
- Optimized touch menu
- Viewport meta tags

## 🔒 Performance Tips

1. **Image Optimization**: Compress images for faster loading
2. **Lazy Loading**: Implement lazy loading for images
3. **Minification**: Minify CSS and JavaScript for production
4. **CDN**: Use a CDN for faster content delivery

## 🐛 Troubleshooting

**Images not showing?**
- Check that image URLs are accessible
- Use full URLs or relative paths correctly

**Styles not applying?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check that styles.css is in the same directory

**Mobile menu not working?**
- Ensure JavaScript is enabled in your browser
- Check browser console for errors

## 📞 Support

For customization or issues:
1. Check the HTML comments in index.html
2. Review the CSS variables section
3. Test in different browsers
4. Check browser console for JavaScript errors

## 📄 License

This website template is provided as-is for use with the Stackly brand. Modify as needed for your esports platform!

## 🎮 Final Notes

- The website uses no external JavaScript frameworks (jQuery, React, etc.)
- All animations are CSS-based for better performance
- Forms include validation and submission feedback
- Navigation is completely functional without a backend
- Ready for database integration when you're ready to scale

---

**Enjoy building with Stackly Esports! Good luck with your platform! 🚀**
