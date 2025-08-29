// Load Navbar from external file
fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    updateCartCount();
  });

// Check if user is logged in
if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "index.html";
}

// Initialize Swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    autoplay: {
        delay: 1000,
        disableOnInteraction: false
    },
    speed: 800,
    effect: 'fade'
});

// Update cart count in Navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

// Update cart count on page load
updateCartCount();