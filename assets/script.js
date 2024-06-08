async function getExpenditure() {
  const apiEndpoint = "https://script.google.com/macros/s/AKfycbwxbF8bhDzIBTf7WB46nhFB3u8Dq8mR6IO7jJ87unszoR-GS27rxWSdRF5-JYX0tQ9r/exec";

  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await response.json();

    // Process the retrieved user data
    const divTags = document.getElementsByClassName("swiper-wrapper");
    if (divTags.length > 0) {
      const parentDiv = divTags[0];
      userData.forEach(item => {
        const newDiv = document.createElement('div');
        newDiv.className = 'swiper-slide';
        newDiv.textContent = item.expenseType;
        parentDiv.appendChild(newDiv); // Append the new div to the parent
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to fetch and log the data
getExpenditure();
