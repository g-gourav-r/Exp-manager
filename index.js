document.addEventListener('DOMContentLoaded', function () {
    var swiper5 = new Swiper(".mySwiper5", {
      grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-125%", 0, -800],
          rotate: [0, 0, -90],
        },
        next: {
          shadow: true,
          translate: ["125%", 0, -800],
          rotate: [0, 0, 90],
        },
      },
    });
  
    var swiper6 = new Swiper(".mySwiper6", {
      grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-125%", 0, -800],
          rotate: [0, 0, -90],
        },
        next: {
          shadow: true,
          translate: ["125%", 0, -800],
          rotate: [0, 0, 90],
        },
      },
    });
  
    async function getExpenditure() {
      const apiEndpoint = "https://script.google.com/macros/s/AKfycbwxbF8bhDzIBTf7WB46nhFB3u8Dq8mR6IO7jJ87unszoR-GS27rxWSdRF5-JYX0tQ9r/exec";
  
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
  
        var dateGroups = {};
        var typeOfExpenditure = {};
  
        // Group expenditures by date and calculate total spent
        userData.forEach(item => {
          const date = new Date(item.Date);
          const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
  
          if (dateGroups[formattedDate]) {
            dateGroups[formattedDate].total += parseInt(item.Spent);
            dateGroups[formattedDate].entries.push(item);
          } else {
            dateGroups[formattedDate] = {
              total: parseInt(item.Spent),
              entries: [item]
            };
          }
  
          // Group expenditures by type and calculate total spent
          if (typeOfExpenditure[item['Type of Expenditure']]) {
            typeOfExpenditure[item['Type of Expenditure']].total += parseInt(item.Spent);
            typeOfExpenditure[item['Type of Expenditure']].entries.push(item);
          } else {
            typeOfExpenditure[item['Type of Expenditure']] = {
              total: parseInt(item.Spent),
              entries: [item]
            };
          }
        });
  
        // Convert object to array of key-value pairs and sort by date
        var dateGroupsArray = Object.keys(dateGroups).map(key => ({ date: key, data: dateGroups[key] }));
        dateGroupsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        // Convert object to array of key-value pairs and sort alphabetically by type
        var typeOfExpenditureArray = Object.keys(typeOfExpenditure).map(key => ({ type: key, data: typeOfExpenditure[key] }));
        typeOfExpenditureArray.sort((a, b) => a.type.localeCompare(b.type));
  
        // Process the retrieved user data for date groups
        const swiperWrapperDate = document.querySelector(".mySwiper5 .swiper-wrapper");
        dateGroupsArray.forEach((entry, index) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.textContent = `${entry.date}: ₹${entry.data.total}`;
          swiperWrapperDate.appendChild(slide);
  
          // Generate a unique class name for each date group
          const dateGroupClass = `date-group-${index + 1}`;
  
          // Populate table with expenditure entries in reverse order
          const tableBody = document.querySelector("#expenditureTable tbody");
          entry.data.entries.reverse().forEach(item => {
            const row = document.createElement("tr");
            row.classList.add(dateGroupClass); // Add the unique class
            row.innerHTML = `
              <td>${entry.date}</td>
              <td>${item.Description}</td>
              <td>${item.Spent}</td>
              <td>${item['Type of Expenditure']}</td>
            `;
            tableBody.appendChild(row);
          });
        });
  
        // Process the retrieved user data for type of expenditure
        const swiperWrapperType = document.querySelector(".mySwiper6 .swiper-wrapper");
        typeOfExpenditureArray.forEach((entry, index) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.textContent = `${entry.type}: ₹${entry.data.total}`;
          swiperWrapperType.appendChild(slide);
        });
  
        // Initialize Swipers after adding new slides
        swiper5.update();
        swiper6.update();
  
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
  
    // Call the function to fetch and append the data
    getExpenditure();
  });
  