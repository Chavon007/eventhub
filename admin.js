document.addEventListener("DOMContentLoaded", () => {
  const PageContent = document.getElementById("pageContent");

  // overwiew
  async function overView() {
    PageContent.innerHTML = ` <p class="text-red-100 text-base font-serif">Loading Overview....</p>`;
    const eventRes = await fetch("https://eventhubbackend-qa6q.onrender.com/api/totalevents", {
      credentials: "include",
    });
    const eventData = await eventRes.json();

    const userRes = await fetch("https://eventhubbackend-qa6q.onrender.com/api/totaluser", {
      credentials: "include",
    });
    const userData = await userRes.json();

    const ticketRes = await fetch("https://eventhubbackend-qa6q.onrender.com/api/totalticket", {
      credentials: "include",
    });
    const ticketData = await ticketRes.json();

    const upcomingeventRes = await fetch(
      "https://eventhubbackend-qa6q.onrender.com/api/upcomingevents",
      { credentials: "include" }
    );

    const upcomingeventData = await upcomingeventRes.json();

    let upcoming = "";

    upcomingeventData.top4.forEach((ticket) => {
      upcoming += `
            <div class="flex justify-between items-center border-b-1 border-white mb-[10px] p-[10px]">
            <h3 class="text-xs w-[20%] text-gray-400">${ticket.title}</h3>
            <p class="w-[30%x] pl-[10px] text-xs text-gray-400">${
              ticket.description
            }</p>
            <small class="text-gray-400 pl-[10px] w-[20%] text-xs">${new Date(
              ticket.date
            ).toDateString()}</small>
            <h6 class="text-gray-400 w-[30%] pl-[10px] text-xs">${
              ticket.venue || ticket.veune
            }</h6>
            </div>
            `;
    });

    PageContent.innerHTML = `
    <h3 class="text-2xl text-red-100 font-bold font-serif ">Overview</h3>

    
    <div class="mt-[20px] w-[90%]  p-[20px]  shadow-[0_0_10px_0_theme('colors.red.100')] flex justify-between items-center">
    <div>
    <p class="text-red-100 font-semibold font-sans text-base">Total Events</p>
    <span class="text-gray-400 flex justify-center font-bold font-serif text-sm">${
      eventData.totalEvents
    }</span>
    </div>
    <div><i class="bx bx-calendar text-red-100 text-1xl"></i></div>
    </div>

    <div class="mt-[20px] w-[90%]  p-[20px]  shadow-[0_0_10px_0_theme('colors.red.100')] flex justify-between items-center">
    <div>
    <p class="text-red-100 font-semibold font-sans text-base">Total Users</p>
    <span class="text-gray-400 flex justify-center font-bold font-serif text-sm">${
      userData.totaluser
    }</span>
    </div>
    <div><i class="bx bx-user text-red-100 text-1xl"></i></div>
    </div>


     <div class="mt-[20px] w-[90%]  p-[20px]  shadow-[0_0_10px_0_theme('colors.red.100')] flex justify-between items-center">
    <div>
    <p class="text-red-100 font-semibold font-sans text-base">Tickets booked</p>
    <span class="text-gray-400 flex justify-center font-bold font-serif text-sm">${
      ticketData.totalticket
    }</span>
    </div>
    <div><i class="bx bx-book text-red-100 text-1xl"></i></div>
    </div>

    <div class="mt-[20px] w-[90%]  p-[20px]  shadow-[0_0_10px_0_theme('colors.red.100')]">
    <h4 class="text-red-100 font-semibold font-sans text-base">Upcoming Events</h4>
    ${upcoming || "<p>No Upcoming Events</p>"}
    </div>

   

    `;
  }

  // events

  async function events() {
    PageContent.innerHTML = `<p class="text-red-100 text-base font-serif">Loading Events</p>`;
    const allEventsRes = await fetch(
      "https://eventhubbackend-qa6q.onrender.com/api/upcomingevents",
      {
        credentials: "include",
      }
    );
    const allEventData = await allEventsRes.json();

    let allevents = "";

    allEventData.top10.forEach((ticket) => {
      allevents += `
            <div class="flex justify-between items-center border-b-1 border-white mb-[10px] p-[10px]">
            <h3 class="text-xs w-[20%] text-gray-400">${ticket.title}</h3>
            <p class="w-[30%x] pl-[10px] text-xs text-gray-400">${
              ticket.description
            }</p>
            <small class="text-gray-400 pl-[10px] w-[20%] text-xs">${new Date(
              ticket.date
            ).toDateString()}</small>
            <h6 class="text-gray-400 w-[30%] pl-[10px] text-xs">${
              ticket.venue || ticket.veune
            }</h6>
            </div>
            `;
    });

    PageContent.innerHTML = `

    <h3 class="text-2xl text-red-100 font-bold font-serif ">Upcoming Events</h3>
   <div class="mt-[20px] w-[90%] p-[20px] shadow-[0_0_10px_0_theme('colors.red.100')]">
     ${allevents}
   </div>
    `;
  }

  // users
  async function users() {
    PageContent.innerHTML = `<p class="text-red-100 text-base font-serif">Loading users</p>`;
    const userRes = await fetch("https://eventhubbackend-qa6q.onrender.com/api/totaluser", {
      credentials: "include",
    });
    const userData = await userRes.json();

    let allUser = "";
    userData.user.forEach((user) => {
      allUser += `
        <div class="flex justify-between items-center border-b-1 border-white mb-[10px] p-[10px]">
        <h4 class="flex-col flex justify-center items-center"><strong class="font-sans text-red-100 text-base">Users</strong> <span class="text-sm font-serif italic text-gray-400 font-semibold">${
          user.name
        }</span><small class="text-xs text-gray-500 font-mons">${
        user.email
      }</small></h4>
        <p class="flex-col flex justify-center items-center"><strong class="font-sans text-red-100 text-base">Phone Number</strong><span class="text-sm font-serif italic text-gray-400 font-semibold">${
          user.phone
        }</span></p>
        <h6 class="flex-col flex justify-center items-center"><strong class="font-sans text-red-100 text-base">Joined</strong> <span class="text-sm font-serif italic text-gray-400 font-semibold">${new Date(
          user.joined
        ).toDateString()}</span></h6>

        <h5 class="flex-col flex justify-center items-center"><strong class="font-sans text-red-100 text-base">Event Attended</strong><span class="text-sm font-serif italic text-gray-400 font-semibold">${
          user.eventsAttended
        }</span></h5>
        </div>
        `;
    });

    PageContent.innerHTML = `
        <h3 class="text-2xl text-red-100 font-bold font-serif ">Users</h3>
        <div class="mt-[20px] w-[90%]  p-[5px]  shadow-[0_0_10px_0_theme('colors.red.100')]">
        ${allUser}
        
        </div>
    `;
  }

  document.getElementById("overView").addEventListener("click", overView);
  document.getElementById("Event").addEventListener("click", events);
  document.getElementById("user").addEventListener("click", users);

  overView();
});
