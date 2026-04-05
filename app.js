// AR Smart Menu - Main Application

class ARSmartMenu {
    constructor() {
        this.currentPage = 'landing';
        this.arScene = null;
        this.arSystem = null;
        this.isARActive = false;
        this.currentDish = null;
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.renderMenu();
        this.bindEvents();
        this.setupAREvents();
    }

    cacheElements() {
        this.elements = {
            landingPage: document.getElementById('landing-page'),
            arPage: document.getElementById('ar-page'),
            menuGrid: document.getElementById('menu-grid'),
            startARBtn: document.getElementById('start-ar-btn'),
            backBtn: document.getElementById('back-btn'),
            arScene: document.getElementById('ar-scene'),
            loadingOverlay: document.getElementById('loading-overlay'),
            scanningIndicator: document.getElementById('scanning-indicator'),
            dishInfo: document.getElementById('dish-info'),
            dishName: document.getElementById('dish-name'),
            dishDescription: document.getElementById('dish-description'),
            dishPrice: document.getElementById('dish-price')
        };
    }

    renderMenu() {
        const menuHTML = menuData.map(dish => `
            <div class="menu-item" data-dish-id="${dish.id}">
                <span class="emoji">${dish.emoji}</span>
                <span class="category">${dish.category}</span>
                <h3>${dish.name}</h3>
                <span class="price">${restaurantConfig.currency}${dish.price.toFixed(2)}</span>
            </div>
        `).join('');
        
        this.elements.menuGrid.innerHTML = menuHTML;
    }

    bindEvents() {
        // Start AR button
        this.elements.startARBtn.addEventListener('click', () => this.startAR());
        
        // Back button
        this.elements.backBtn.addEventListener('click', () => this.stopAR());
        
        // Menu item clicks
        this.elements.menuGrid.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                const dishId = menuItem.dataset.dishId;
                this.selectDish(dishId);
            }
        });
    }

    setupAREvents() {
        // Wait for A-Frame to be ready
        this.elements.arScene.addEventListener('loaded', () => {
            this.arSystem = this.elements.arScene.systems['mindar-image-system'];
        });

        // Track when targets are found/lost
        const targets = document.querySelectorAll('[mindar-image-target]');
        targets.forEach((target, index) => {
            target.addEventListener('targetFound', () => {
                console.log(`Target ${index} found`);
                this.onTargetFound(index);
            });
            
            target.addEventListener('targetLost', () => {
                console.log(`Target ${index} lost`);
                this.onTargetLost(index);
            });
        });
    }

    selectDish(dishId) {
        const dish = menuData.find(d => d.id === dishId);
        if (dish) {
            this.currentDish = dish;
            // Highlight selected item
            document.querySelectorAll('.menu-item').forEach(item => {
                item.style.borderColor = item.dataset.dishId === dishId 
                    ? restaurantConfig.primaryColor 
                    : 'rgba(255, 255, 255, 0.1)';
            });
        }
    }

    async startAR() {
        const self = this;
        
        // Check for camera support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Camera access is not supported on this device or browser.');
            return;
        }

        // Show loading
        self.showLoading(true);

        try {
            // Switch to AR page first
            self.switchPage('ar');
            
            const scene = document.getElementById('ar-scene');
            
            // Wait for scene to fully load (longer timeout for slow connections)
            await new Promise((resolve, reject) => {
                if (scene.hasLoaded) {
                    resolve();
                } else {
                    scene.addEventListener('loaded', resolve, { once: true });
                    scene.addEventListener('error', (e) => reject(new Error('Scene failed to load')), { once: true });
                    // Timeout after 30 seconds
                    setTimeout(() => reject(new Error('Scene load timeout - check your internet connection')), 30000);
                }
            });
            
            // Get the MindAR system after scene is loaded
            self.arSystem = scene.systems['mindar-image-system'];
            
            if (!self.arSystem) {
                throw new Error('MindAR system not initialized');
            }
            
            console.log('Starting MindAR...');
            await self.arSystem.start();
            self.isARActive = true;
            console.log('MindAR started successfully');
            
            self.showLoading(false);
            self.showScanning(true);
            
        } catch (error) {
            console.error('AR Start Error:', error);
            self.showLoading(false);
            
            if (error.name === 'NotAllowedError') {
                alert('Camera permission denied. Please allow camera access and try again.');
            } else {
                alert('Unable to start AR: ' + error.message);
            }
            
            self.switchPage('landing');
        }
    }

    stopAR() {
        if (this.arSystem && this.isARActive) {
            this.arSystem.stop();
            this.isARActive = false;
        }
        
        this.showScanning(false);
        this.hideDishInfo();
        this.switchPage('landing');
    }

    switchPage(page) {
        this.currentPage = page;
        
        if (page === 'ar') {
            this.elements.landingPage.classList.add('hidden');
            this.elements.arPage.classList.add('active');
        } else {
            this.elements.landingPage.classList.remove('hidden');
            this.elements.arPage.classList.remove('active');
        }
    }

    showLoading(show) {
        this.elements.loadingOverlay.classList.toggle('hidden', !show);
    }

    showScanning(show) {
        this.elements.scanningIndicator.classList.toggle('hidden', !show);
    }

    onTargetFound(targetIndex) {
        this.showScanning(false);
        
        // Find the dish associated with this target
        const dish = menuData.find(d => d.targetIndex === targetIndex);
        if (dish) {
            this.showDishInfo(dish);
        }
    }

    onTargetLost(targetIndex) {
        this.hideDishInfo();
        this.showScanning(true);
    }

    showDishInfo(dish) {
        this.elements.dishName.textContent = dish.name;
        this.elements.dishDescription.textContent = dish.description;
        this.elements.dishPrice.textContent = `${restaurantConfig.currency}${dish.price.toFixed(2)}`;
        this.elements.dishInfo.classList.remove('hidden');
    }

    hideDishInfo() {
        this.elements.dishInfo.classList.add('hidden');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.arSmartMenu = new ARSmartMenu();
});

// Handle visibility change (pause/resume AR when app goes to background)
document.addEventListener('visibilitychange', () => {
    if (window.arSmartMenu && window.arSmartMenu.isARActive) {
        if (document.hidden) {
            window.arSmartMenu.arSystem?.pause();
        } else {
            window.arSmartMenu.arSystem?.unpause();
        }
    }
});
