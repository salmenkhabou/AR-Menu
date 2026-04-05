# AR Smart Menu - WebAR Restaurant Experience

An immersive, browser-based Augmented Reality experience that transforms standard restaurant menus into interactive 3D displays.

## 🚀 Quick Start

### Prerequisites
- A web server with HTTPS (required for camera access)
- Modern mobile browser (Safari on iOS 11+, Chrome on Android)

### Setup Steps

1. **Generate AR Target Files**
   - Go to [MindAR Image Target Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
   - Upload your menu marker image(s)
   - Download the generated `.mind` file
   - Place it in the `targets/` folder as `targets.mind`

2. **Add 3D Models**
   - Create or obtain `.glb` format 3D models of your dishes
   - Place them in the `models/` folder
   - Recommended tools for creating models:
     - [Polycam](https://poly.cam/) - Mobile photogrammetry
     - [Scaniverse](https://scaniverse.com/) - iOS scanning app
     - [Blender](https://www.blender.org/) - 3D modeling software

3. **Deploy to HTTPS Server**
   Options for free hosting:
   - **GitHub Pages**: Push to a GitHub repo and enable Pages
   - **Vercel**: Connect your repo for automatic deployments
   - **Netlify**: Drag and drop your folder

4. **Local Development**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Then access via https://localhost:8000 (HTTPS required for camera)
   ```

## 📁 Project Structure

```
AR/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── app.js              # Main application logic
├── menu-data.js        # Restaurant menu configuration
├── models/             # 3D model files (.glb)
│   ├── burger.glb
│   ├── pizza.glb
│   └── ...
├── targets/            # MindAR target files
│   └── targets.mind
└── markers/            # Printable marker images
    └── menu-marker.png
```

## 🎯 Creating AR Markers

### Option 1: Use Your Logo
1. Use a high-contrast image with distinct features
2. Avoid repetitive patterns
3. Recommended size: 512x512 pixels minimum

### Option 2: Use a QR Code
1. Generate a QR code pointing to your menu URL
2. Add decorative elements around it for better tracking

### Compile the Marker
1. Visit: https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Upload your marker image(s)
3. Download the `.mind` file
4. Save as `targets/targets.mind`

## 🍽️ Adding Menu Items

Edit `menu-data.js` to customize your menu:
 
```javascript
const menuData = [
    {
        id: 'dish-id',           // Unique identifier
        name: 'Dish Name',       // Display name
        description: 'Description of the dish',
        price: 12.99,            // Price (number)
        category: 'Main Course', // Category label
        emoji: '🍔',             // Emoji for menu display
        modelId: 'burger-model', // ID from index.html a-assets
        targetIndex: 0           // Which AR marker triggers this dish
    }
];
```

## 🎨 Customization

### Branding Colors
Edit the `restaurantConfig` object in `menu-data.js`:

```javascript
const restaurantConfig = {
    name: 'Your Restaurant Name',
    currency: '$',
    primaryColor: '#f39c12',    // Orange accent
    secondaryColor: '#e74c3c'   // Red accent
};
```

### Styling
Modify `styles.css` to match your restaurant's brand:
- Update gradient colors in `body`
- Change button colors in `.ar-button`
- Adjust fonts and spacing as needed

## 📱 Browser Compatibility

| Platform | Browser | Status |
|----------|---------|--------|
| iOS 11+  | Safari  | ✅ Full Support |
| Android  | Chrome  | ✅ Full Support |
| Android  | Firefox | ⚠️ Limited |
| Desktop  | Chrome  | ✅ Development Only |

## 🔧 Troubleshooting

### Camera not working
- Ensure you're accessing via HTTPS
- Check browser permissions for camera access
- Try refreshing the page

### 3D models not appearing
- Verify `.glb` files are valid (test in [glTF Viewer](https://gltf-viewer.donmccurdy.com/))
- Check browser console for loading errors
- Ensure file paths are correct

### AR marker not detected
- Use a well-lit environment
- Hold phone 6-12 inches from marker
- Ensure marker is flat and unwrinkled
- Try regenerating the `.mind` file

## 📄 License

MIT License - Feel free to use for your restaurant!

## 🙏 Credits

Built with:
- [MindAR](https://hiukim.github.io/mind-ar-js-doc/) - Image tracking
- [A-Frame](https://aframe.io/) - WebVR/AR framework
# AR-Menu
