document.addEventListener("DOMContentLoaded", async function () {
  try {
    const apiEndpoint =
      "https://script.google.com/macros/s/AKfycbwxbF8bhDzIBTf7WB46nhFB3u8Dq8mR6IO7jJ87unszoR-GS27rxWSdRF5-JYX0tQ9r/exec";
    const response = await fetch(apiEndpoint);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let userData = await response.json();

    // Reverse the userData array
    userData = userData.reverse();

    // Calculate total spent for each category
    const categoryTotals = {};
    let totalSpent = 0;
    userData.forEach((entry) => {
      const category = entry["Type of Expenditure"];
      const spent = entry.Spent;
      categoryTotals[category] = (categoryTotals[category] || 0) + spent;
      totalSpent += spent; // Calculate total spent
    });

    // Update the swiper slides with category totals
    const swiperWrapper = document.querySelector(".swiper-wrapper");

    // Add total spent to swiper slides
    const totalSlide = document.createElement("div");
    totalSlide.classList.add("swiper-slide");
    totalSlide.textContent = `Total Spent: ${totalSpent}`;
    swiperWrapper.prepend(totalSlide); // Prepend total spent slide

    Object.entries(categoryTotals).forEach(([category, total]) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.textContent = `${category}: ${total}`;
      swiperWrapper.appendChild(slide);
    });

    // Reinitialize Swiper after appending slides
    const mySwiper = new Swiper(".mySwiper", {
      // Swiper configuration options
    });

    // Populate the table with userData
    const tableBody = document.querySelector(".table-container table tbody");
    userData.forEach((entry) => {
      const date = new Date(entry.Date);
      const day = date.getDate();
      const month = date.toLocaleString("en", { month: "short" });
      const year = date.getFullYear();
      const formattedDate = `${day} ${month}, ${year}`;
      const row = `
        <tr>
          <td>${formattedDate}</td>
          <td>${entry.Description}</td>
          <td>${entry.Spent}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
});
