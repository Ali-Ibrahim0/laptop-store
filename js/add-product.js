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

// Handle form submission
document.getElementById("addProductForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    // Validate inputs
    if (!name || !price || !image) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please fill in all fields"
        });
        return;
    }

    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Generate new product ID
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price: parseFloat(price),
        image
    };

    // Add new product to array and save to localStorage
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    // Show success message and redirect
    Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product added successfully",
        timer: 1500,
        showConfirmButton: false
    }).then(() => {
        window.location.href = "Products.html";
    });
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