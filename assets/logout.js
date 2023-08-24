document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token"); // Clear the stored token
    window.location.assign('index.html'); // Redirect to the login page
  });