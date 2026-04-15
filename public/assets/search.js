const resultsContainer = document.getElementById("search-results");
const noResultsMessage = document.getElementById("no-results");

const params = new URLSearchParams(window.location.search);
const query = params.get("q") || "";

      
fetch(`/api/search?q=${encodeURIComponent(query)}`)
  .then(res => res.json())
  .then(results => {
    if (!results.length) {
        noResultsMessage.style.display = "block";
        return;
      }    
      
    results.forEach(product => {
      const li = document.createElement("li");
        li.innerHTML = `
        <img src="${product.images[0]?.src}" width="100" alt="${product.title}" />
        <p>${product.title}</p>
        <p>${product.body_html}</p>
        <p>Price: ${product.variants[0]?.price} USD</p>
      `;
      resultsContainer.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Error fetching search results:", err);
    noResultsMessage.textContent = "An error occurred while fetching search results.";
    noResultsMessage.style.display = "block";
  });   