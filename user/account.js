document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/me", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: User not logged in`);
      return res.json();
    })
    .then((data) => {
      const user = data.user;
      if (!user) {
        throw new Error("No user data received");
      }
      const welcomeElement = document.getElementById("welcomeMessage");
      if (welcomeElement) {
        const firstName = user.firstName || "User";
        const lastName = user.lastName || "";
        welcomeElement.innerHTML = `Welcome Back  <span class="text-gray-400 italic text-base md:text-2xl font-semibold font-serif pl-[10px]">${firstName}</span> <span class="text-gray-400 italic  text-base md:text-2xl font-semibold font-serif">${lastName}</span>`;
      }
    })
    .catch((err) => {
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);
    });

  // logout

  const logout = document.getElementById("logout");

  logout.addEventListener("click", () => {
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = "../index.html";
      })
      .catch((err) => {});
  });

  // personal events details

  fetch("http://localhost:5000/api/userstat", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to Fetch");
      return res.json();
    })
    .then((data) => {
      document.getElementById("attend").textContent = data.eventsAttended;
      document
        .getElementById("attend")
        .classList.add("text-red-100", "font-bold");
      document.getElementById("spent").textContent = data.totalSpent.toFixed(2);
      document
        .getElementById("spent")
        .classList.add("text-red-100", "font-bold");
      document.getElementById("ticket").textContent = data.ticketsPurchased;
      document
        .getElementById("ticket")
        .classList.add("text-red-100", "font-bold");
      document.getElementById("upcoming").textContent = data.upcomingEvents;
      document
        .getElementById("upcoming")
        .classList.add("text-red-100", "font-bold");

      document.getElementById("recentTicket").innerHTML = "";

      if (data.recentTicket && data.recentTicket.length > 0) {
        data.recentTicket.forEach((ticket) => {
          const recentT = `
        <div class="recentTCard pl-[20px] pt-[10px]">
        <h3 class="text-base text-gray-400 font-sans font-bold">${
          ticket.eventName
        }</h3>
        <p>${ticket.eventType}</p>
        <small>${new Date(ticket.date).toDateString()}</small>
        <h6>${ticket.price}</h6>
        </div>
        `;
          document.getElementById("recentTicket").innerHTML += recentT;
        });
      } else {
        document.getElementById("recentTicket").innerHTML = `
        <div class="flex flex-col justify-center items-center h-full">
            <h3 class="text-sm text-gray-400 font-serif font-bold italic">No tickets purchased yet</h3>
            <small class="text-gray-400 text-sm font-sans">Your recent tickets will appear here</small>
        </div>`;
      }

      document.getElementById("pastEvent").innerHTML = "";
      if (data.pastEvent && data.pastEvent.length > 0) {
        data.pastEvent.forEach((ticket) => {
          const pastE = `
            <div class="pastECard">
            <h3>${ticket.eventName}</h3>
            <p>${ticket.eventType}</p>
            <small>${new Date(ticket.date).toDateString()}</small>
            <h6>${ticket.location}</h6>
            </div>
            `;
          document.getElementById("pastEvent").innerHTML += pastE;
        });
      } else {
        document.getElementById("pastEvent").innerHTML = `
        <div class="flex flex-col justify-center items-center h-full">
            <h3 class="text-sm text-gray-400 font-serif font-bold italic">You have not atttened any events</h3>
            <small class="text-gray-400 text-sm font-sans">Events attened will appear here</small>
        </div>
        `;
      }

      document.getElementById("recentAct").innerHTML = "";

      if (data.recentActivity && data.recentActivity.length > 0) {
        data.recentActivity.forEach((activity) => {
          const recentA = `
        <div>
            <h3>${activity.action}</h3>
            <p>${activity.timeStamp}</p>
        </div>
        `;
          document.getElementById("recentAct").innerHTML += recentA;
        });
      } else {
        document.getElementById("recentAct").innerHTML = `
        <div class="flex flex-col justify-center items-center h-full">
            <h3 class="text-sm text-gray-400 font-serif font-bold italic">No recent activities yet</h3>
            <small class="text-gray-400 text-sm font-sans">Recent Activities will appear here</small>
        </div>
        `;
      }
    })
    .catch((err) => {
      document.getElementById(
        "pDetails"
      ).innerHTML = `<p> Failed to Fetch Information</p>`;
      console.error(err);
    });
});
