document.getElementById("logout-btn").addEventListener("click", async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/users/login", {
        method: "DELETE",
        headers: {
          Authorization: token
        }
      });
  
      if (response.status === 200) {
        localStorage.removeItem("token"); 
        window.location.assign('index.html'); 
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  });
