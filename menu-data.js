// Menu Data Configuration
// Add your restaurant's dishes here

const menuData = [
    {
        id: 'burger',
        name: 'Classic Burger',
        description: 'Juicy beef patty with fresh lettuce, tomato, cheese, and special sauce',
        price: 12.99,
        category: 'Main Course',
        emoji: '🍔',
        modelId: 'burger-model',
        targetIndex: 0
    },
    {
        id: 'pizza',
        name: 'Margherita Pizza',
        description: 'Traditional Italian pizza with fresh mozzarella, basil, and tomato sauce',
        price: 15.99,
        category: 'Main Course',
        emoji: '🍕',
        modelId: 'pizza-model',
        targetIndex: 1
    },
    {
        id: 'salad',
        name: 'Garden Salad',
        description: 'Fresh mixed greens with cherry tomatoes, cucumber, and balsamic dressing',
        price: 8.99,
        category: 'Starters',
        emoji: '🥗',
        modelId: 'salad-model',
        targetIndex: 2
    },
    {
        id: 'pasta',
        name: 'Spaghetti Carbonara',
        description: 'Creamy pasta with crispy bacon, parmesan cheese, and black pepper',
        price: 14.99,
        category: 'Main Course',
        emoji: '🍝',
        modelId: 'pasta-model',
        targetIndex: 0
    },
    {
        id: 'steak',
        name: 'Grilled Ribeye',
        description: 'Premium 12oz ribeye steak with herb butter and seasonal vegetables',
        price: 28.99,
        category: 'Main Course',
        emoji: '🥩',
        modelId: 'steak-model',
        targetIndex: 0
    },
    {
        id: 'dessert',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
        price: 9.99,
        category: 'Desserts',
        emoji: '🍫',
        modelId: 'dessert-model',
        targetIndex: 0
    }
];

// Restaurant Configuration
const restaurantConfig = {
    name: 'AR Smart Menu',
    currency: '$',
    primaryColor: '#f39c12',
    secondaryColor: '#e74c3c'
};
