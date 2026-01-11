# Bean & Bliss - Coffee Shop Website

![Bean & Bliss](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

**Sip Happiness** - A modern, responsive coffee shop website with AI-powered beverage recognition and e-commerce functionality.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation--setup)
- [Usage](#usage)
- [Customization](#customization)
- [Testing](#testing)
- [Browser Support](#browser-support)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

### Frontend
- Fully responsive design (Mobile, Tablet, Desktop)
- Modern UI/UX with smooth animations
- Interactive navigation with hamburger menu
- Dynamic shopping cart system
- Client-side visitor analytics

### E-Commerce
- Shopping cart with localStorage persistence
- Add/Remove items functionality
- Quantity adjustment
- Order total calculation
- Checkout form with validation
- Pickup & Delivery options

### AI Integration
- Image recognition using TensorFlow.js
- MobileNet pre-trained model
- Beverage classification
- Hot/Cold drink detection
- Personalized recommendations

### Analytics
- Visitor counter
- Geolocation tracking (City, Country)
- Session-based visit tracking
- Real-time statistics display

---

## Demo

**Live Demo:** [https://your-username.github.io/bean-and-bliss](https://your-username.github.io/bean-and-bliss)

Replace with your GitHub Pages URL after deployment.

---


## Technologies Used

| Technology | Description |
|------------|-------------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Modern styling with CSS Grid & Flexbox |
| **JavaScript (ES6)** | Interactive functionality |
| **TensorFlow.js** | Client-side machine learning |
| **MobileNet** | Pre-trained image classification model |
| **LocalStorage API** | Cart & analytics data persistence |
| **Geolocation API** | Visitor location tracking |
| **Font Awesome** | Icon library |
| **Google Fonts** | Custom typography (Poppins, Playfair Display) |

---

## Project Structure

```
bean-and-bliss/
│
├── index.html                 # Homepage
├── style.css                  # Global styles
│
├── pages/
│   ├── menu.html             # Menu page with products
│   ├── order.html            # Shopping cart & checkout
│   ├── about.html            # About us page
│   ├── contact.html          # Contact page
│   └── ai-recognition.html   # AI beverage recognition
│
├── js/
│   ├── main.js               # Core JavaScript
│   ├── cart.js               # Shopping cart system
│   └── ai-recognition.js     # TensorFlow.js AI
│
├── images/
│   └── logo.png              # Company logo
│
│
├── README.md                 # Project documentation
├── LICENSE                   # MIT License
└── .gitignore               # Git ignore file
```

---

## Installation & Setup

### Prerequisites
- Web browser (Chrome, Firefox, Safari, or Edge)
- Code editor (VS Code recommended)
- Live Server extension (for development)

### Steps

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/bean-and-bliss.git
cd bean-and-bliss
```

**2. Open with Live Server**
- Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
- Right-click on `index.html`
- Select "Open with Live Server"

**3. Alternative: Open Directly**
Simply double-click `index.html` to open in your browser.

---

## Usage

### Browse Menu
1. Navigate to the Menu page
2. Browse available coffee and cookie selections
3. Click "Add to Cart" on desired items

### Shopping Cart
1. Click the Cart icon in navigation
2. Review items in cart
3. Adjust quantities using +/- buttons
4. Remove unwanted items
5. Click "Proceed to Checkout"

### Checkout Process
1. Fill in personal information
2. Choose Pickup or Delivery option
3. Select preferred date and time
4. Add special instructions (optional)
5. Click "Confirm Order"

### AI Beverage Recognition
1. Navigate to AI Recognition page
2. Upload or drag-and-drop a beverage image
3. Wait for TensorFlow.js model to analyze
4. View classification results
5. Receive personalized recommendations

---

## Customization

### Modify Color Scheme
Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #6F4E37;    /* Main brown color */
    --secondary-color: #A0826D;  /* Light brown */
    --accent-color: #D4AF37;     /* Gold accent */
    --text-dark: #2C1810;        /* Dark text */
    --background: #FFF8F0;       /* Cream background */
}
```

### Add Menu Items
Edit products in `pages/menu.html`:

```html
<button class="btn-add-cart" onclick="addToCart('Product Name', Price, 'ImageURL')">
    Add to Cart
</button>
```

### Update Contact Information
Modify footer section in HTML files:

```html
<li><i class="fas fa-phone"></i> +212 XXX-XXXX</li>
<li><i class="fas fa-envelope"></i> your-email@example.com</li>
<li><i class="fas fa-map-marker-alt"></i> Your City, Country</li>
```

---

## Testing

### Cart System Testing
1. Add multiple items to cart
2. Verify quantity updates correctly
3. Check total price calculation
4. Test remove item functionality
5. Verify localStorage persistence (refresh page)
6. Test checkout form validation

### AI Recognition Testing
1. Upload various beverage images
2. Verify TensorFlow.js model loads successfully
3. Check prediction accuracy
4. Test recommendation system
5. Verify error handling for invalid images

### Responsive Design Testing
1. Test on different screen sizes (320px - 1920px)
2. Verify hamburger menu functionality on mobile
3. Check cart layout on tablet devices
4. Test all interactive elements on touch devices

---

## Browser Support

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 90+ | Fully Supported |
| Firefox | 88+ | Fully Supported |
| Safari | 14+ | Fully Supported |
| Edge | 90+ | Fully Supported |
| Opera | 76+ | Supported |

**Note:** TensorFlow.js requires modern browser with WebGL support.

---

## Future Enhancements

### Backend Integration
- Node.js/Express server
- MongoDB database for orders
- RESTful API development

### User Features
- User authentication system
- Order history tracking
- Loyalty rewards program
- Saved favorite items

### Payment Integration
- Stripe payment gateway
- PayPal integration
- Cash on delivery option

### Advanced Features
- Email confirmation system
- SMS notifications
- Real-time order tracking
- Admin dashboard
- Inventory management
- Multi-language support
- Progressive Web App (PWA)

---

## Contributing

Contributions are welcome and appreciated. Please follow these guidelines:

### How to Contribute

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Code Standards
- Use consistent indentation (2 or 4 spaces)
- Write meaningful commit messages
- Comment complex code sections
- Follow existing code structure
- Test before submitting PR

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contact

### Author
**Your Name**

- **GitHub:** [@your-username](https://github.com/your-username)
- **Email:** your-email@example.com
- **LinkedIn:** [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- **Website:** [your-website.com](https://your-website.com)

### Support
For bug reports, feature requests, or general inquiries:
- Open an issue on GitHub
- Email: support@beanandbliss.com

---

## Acknowledgments

This project was built using the following resources and technologies:

- **[TensorFlow.js](https://www.tensorflow.org/js)** - Machine Learning library for JavaScript
- **[MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)** - Pre-trained image classification model
- **[Font Awesome](https://fontawesome.com/)** - Icon library
- **[Google Fonts](https://fonts.google.com/)** - Web fonts (Poppins, Playfair Display)
- **[Unsplash](https://unsplash.com/)** - High-quality stock images
- **[ipapi.co](https://ipapi.co/)** - IP Geolocation API

---

## Project Statistics

![GitHub repo size](https://img.shields.io/github/repo-size/your-username/bean-and-bliss)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/your-username/bean-and-bliss)
![GitHub last commit](https://img.shields.io/github/last-commit/your-username/bean-and-bliss)
![GitHub issues](https://img.shields.io/github/issues/your-username/bean-and-bliss)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/bean-and-bliss)

---

## Changelog

### Version 1.0.0 (2026-01-11)
- Initial release
- Implemented core website functionality
- Added shopping cart system
- Integrated TensorFlow.js AI recognition
- Implemented visitor analytics
- Added responsive design
- Created all main pages (Home, Menu, Order, About, Contact, AI)

---

<div align="center">

**Bean & Bliss Coffee Shop Website**

Made with dedication by [Your Name]

If you found this project helpful, please consider giving it a star on GitHub.

[Report Bug](https://github.com/your-username/bean-and-bliss/issues) • [Request Feature](https://github.com/your-username/bean-and-bliss/issues)

</div>

