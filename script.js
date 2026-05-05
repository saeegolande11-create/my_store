const products = [
    {
        id: 1,
        title: "The Great Gatsby",
        brand: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 399,
        originalPrice: 599,
        rating: 4.8,
        reviews: 1245,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 2,
        title: "Sapiens: A Brief History of Humankind",
        brand: "Yuval Noah Harari",
        category: "Non-Fiction",
        price: 450,
        originalPrice: 650,
        rating: 4.9,
        reviews: 8320,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 3,
        title: "Atomic Habits",
        brand: "James Clear",
        category: "Non-Fiction",
        price: 550,
        originalPrice: 799,
        rating: 4.9,
        reviews: 12500,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 4,
        title: "Dune",
        brand: "Frank Herbert",
        category: "Fiction",
        price: 699,
        originalPrice: 899,
        rating: 4.7,
        reviews: 4500,
        image: "https://images.unsplash.com/photo-1614213173943-7f283296c0b5?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 5,
        title: "Introduction to Algorithms",
        brand: "Thomas H. Cormen",
        category: "Educational",
        price: 2499,
        originalPrice: 3500,
        rating: 4.6,
        reviews: 1420,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 6,
        title: "Steve Jobs",
        brand: "Walter Isaacson",
        category: "Biography",
        price: 499,
        originalPrice: 699,
        rating: 4.8,
        reviews: 5890,
        image: "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 7,
        title: "The Alchemist",
        brand: "Paulo Coelho",
        category: "Fiction",
        price: 299,
        originalPrice: 399,
        rating: 4.7,
        reviews: 15320,
        image: "https://images.unsplash.com/photo-1629196914213-90d5718df86f?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 8,
        title: "A Brief History of Time",
        brand: "Stephen Hawking",
        category: "Science",
        price: 350,
        originalPrice: 499,
        rating: 4.8,
        reviews: 3650,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 9,
        title: "Thinking, Fast and Slow",
        brand: "Daniel Kahneman",
        category: "Science", 
        price: 499,
        originalPrice: 699,
        rating: 4.6,
        reviews: 4120,
        image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 10,
        title: "Becoming",
        brand: "Michelle Obama",
        category: "Biography",
        price: 550,
        originalPrice: 850,
        rating: 4.9,
        reviews: 9210,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 11,
        title: "Clean Code",
        brand: "Robert C. Martin",
        category: "Educational",
        price: 1200,
        originalPrice: 1500,
        rating: 4.8,
        reviews: 5940,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 12,
        title: "The Lord of the Rings",
        brand: "J.R.R. Tolkien",
        category: "Fiction", 
        price: 1500,
        originalPrice: 2000,
        rating: 4.9,
        reviews: 25600,
        image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=300&q=80"
    }
];

// Cart State
let cart = [];

// Initialize Cart from sessionStorage
const initCart = () => {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge();
        renderCartUI();
    }
};

const saveCart = () => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
};

// Utility: Format currency to INR
const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

// Utility: Calculate Discount Percentage
const getDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
};

// DOM Elements
let cartBadge, cartModal, cartItemsContainer, cartTotalPrice, modalCartCount;
let paypalButtonsRendered = false;

document.addEventListener('DOMContentLoaded', () => {
    
    // Set DOM elements for cart
    cartBadge = document.getElementById('cart-badge');
    cartModal = document.getElementById('cart-modal');
    cartItemsContainer = document.getElementById('cart-items-container');
    cartTotalPrice = document.getElementById('cart-total-price');
    modalCartCount = document.getElementById('modal-cart-count');

    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');

    // Cart Modal interactions
    if(cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartModal.classList.remove('hidden');
            renderCartUI();
        });
    }

    if(closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartModal.classList.add('hidden');
        });
    }

    // --- Carousel simple functionality ---
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const container = document.querySelector('.carousel-container');
            container.style.opacity = '0.5';
            setTimeout(() => {
                container.style.opacity = '1';
            }, 200);
        });

        nextBtn.addEventListener('click', () => {
            const container = document.querySelector('.carousel-container');
            container.style.opacity = '0.5';
            setTimeout(() => {
                container.style.opacity = '1';
            }, 200);
        });
    }

    // --- Dynamic Product Catalog Logic ---
    const productGrid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const noResults = document.getElementById('no-results');
    
    // Search
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    
    // Filters
    const categoryFilters = document.querySelectorAll('.category-filter');
    const ratingFilters = document.querySelectorAll('.rating-filter');
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    // Sort
    const sortSelect = document.getElementById('sort-select');

    // Initial State
    let filteredProducts = [...products];
    let currentSearchTerm = '';
    
    // Render Products
    const renderProducts = (productsToRender) => {
        productGrid.innerHTML = '';
        productCount.textContent = `(${productsToRender.length})`;
        
        if (productsToRender.length === 0) {
            productGrid.classList.add('hidden');
            noResults.classList.remove('hidden');
            return;
        } else {
            productGrid.classList.remove('hidden');
            noResults.classList.add('hidden');
        }

        productsToRender.forEach(product => {
            const discount = getDiscount(product.price, product.originalPrice);
            
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="img-container">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <h3>${product.title}</h3>
                <div class="product-rating">
                    ${product.rating} <i class="fas fa-star"></i>
                </div>
                <span style="font-size: 12px; color: var(--text-muted);">(${product.reviews})</span>
                <div class="product-price-row">
                    <span class="product-price">${formatINR(product.price)}</span>
                    <span class="original-price">${formatINR(product.originalPrice)}</span>
                    <span class="discount-text">${discount}% off</span>
                </div>
                <button class="add-to-cart-btn">Add to Cart</button>
            `;
            productGrid.appendChild(card);
            
            // Add click event for cart button
            const btn = card.querySelector('.add-to-cart-btn');
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Add to Cart
                addToCart(product);

                btn.textContent = 'Added!';
                btn.style.background = '#388e3c';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.textContent = 'Add to Cart';
                    btn.style.background = 'var(--highlight-yellow)';
                    btn.style.color = 'var(--text-main)';
                }, 2000);
            });
        });
    };

    // Apply all filters and sorting
    const applyFilters = () => {
        // 1. Search
        let result = products.filter(product => {
            return product.title.toLowerCase().includes(currentSearchTerm) ||
                   product.brand.toLowerCase().includes(currentSearchTerm) ||
                   product.category.toLowerCase().includes(currentSearchTerm);
        });

        // 2. Categories
        const selectedCategories = Array.from(categoryFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
            
        if (selectedCategories.length > 0) {
            result = result.filter(product => selectedCategories.includes(product.category));
        }

        // 3. Ratings
        const selectedRatings = Array.from(ratingFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => parseFloat(checkbox.value));
            
        if (selectedRatings.length > 0) {
            const minRating = Math.min(...selectedRatings);
            result = result.filter(product => product.rating >= minRating);
        }

        // 4. Price
        const maxPrice = parseInt(priceRange.value);
        result = result.filter(product => product.price <= maxPrice);

        // 5. Sort
        const sortType = sortSelect.value;
        if (sortType === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortType === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }

        filteredProducts = result;
        renderProducts(filteredProducts);
    };

    // Search
    const handleSearch = () => {
        currentSearchTerm = searchInput.value.toLowerCase().trim();
        applyFilters();
    };
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    searchInput.addEventListener('input', handleSearch);

    // Filters
    categoryFilters.forEach(cb => cb.addEventListener('change', applyFilters));
    ratingFilters.forEach(cb => cb.addEventListener('change', applyFilters));
    priceRange.addEventListener('input', (e) => {
        priceDisplay.textContent = formatINR(e.target.value);
        applyFilters();
    });
    sortSelect.addEventListener('change', applyFilters);

    clearFiltersBtn.addEventListener('click', () => {
        categoryFilters.forEach(cb => cb.checked = false);
        ratingFilters.forEach(cb => cb.checked = false);
        priceRange.value = 5000;
        priceDisplay.textContent = formatINR(5000);
        searchInput.value = '';
        currentSearchTerm = '';
        sortSelect.value = 'relevance';
        applyFilters();
    });

    // Initial render
    renderProducts(products);
    priceDisplay.textContent = formatINR(priceRange.value);

    // Initialize cart state
    initCart();

    // Dummy Checkout
    const dummyCheckoutBtn = document.getElementById('dummy-checkout-btn');
    if(dummyCheckoutBtn) {
        dummyCheckoutBtn.addEventListener('click', () => {
            if(cart.length === 0) return;
            
            dummyCheckoutBtn.textContent = 'Processing Payment...';
            dummyCheckoutBtn.style.opacity = '0.7';
            dummyCheckoutBtn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                alert('Payment Successful! Dummy Verification Complete. Your order has been placed.');
                cart = [];
                saveCart();
                updateCartBadge();
                renderCartUI();
                cartModal.classList.add('hidden');
                
                // reset button
                dummyCheckoutBtn.textContent = 'Proceed to Checkout (Dummy)';
                dummyCheckoutBtn.style.opacity = '1';
                dummyCheckoutBtn.style.pointerEvents = 'auto';
            }, 1500);
        });
    }
});

// --- Cart Logic Functions ---

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    saveCart();
    updateCartBadge();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCartUI();
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if(totalItems > 0) {
        cartBadge.style.display = 'flex';
        cartBadge.textContent = totalItems;
    } else {
        cartBadge.style.display = 'none';
        cartBadge.textContent = '0';
    }
}

function renderCartUI() {
    cartItemsContainer.innerHTML = '';
    
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-muted);">Your cart is empty!</p>';
        cartTotalPrice.textContent = '₹0';
        modalCartCount.textContent = '0';
        document.getElementById('dummy-checkout-btn').style.display = 'none';
        return;
    }

    document.getElementById('dummy-checkout-btn').style.display = 'block';
    
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        total += (item.price * item.quantity);
        itemCount += item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p style="font-size:12px; color:var(--text-muted);">Qty: ${item.quantity}</p>
                <div class="cart-item-price">${formatINR(item.price)}</div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalPrice.textContent = formatINR(total);
    modalCartCount.textContent = itemCount;
}
