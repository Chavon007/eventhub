document.addEventListener("DOMContentLoaded", () => {
  const PageContent = document.getElementById("pageContent");

  async function overView() {
    PageContent.innerHTML = ` <p>Loading Overview....</p>`;
    const eventRes = await fetch("http://localhost:5000/api/totalevents", {
      credentials: "include",
    });
    const eventData = await eventRes.json();

    const userRes = await fetch("http://localhost:5000/api/totaluser", {
      credentials: "include",
    });
    const userData = await userRes.json();

    const ticketRes = await fetch("http://localhost:5000/api/totalticket", {
      credentials: "include",
    });
    const ticketData = await ticketRes.json();

    const upcomingeventRes = await fetch(
      "http://localhost:5000/api/upcomingevents",
      { credentials: "include" }
    );

    const upcomungeventData = await upcomingeventRes.json();

    let upcoming = "";

    upcomungeventData.forEach((ticket) => {
      upcoming += `
            <div class="pastECard">
            <h3>${ticket.title}</h3>
            <p>${ticket.description}</p>
            <small>${new Date(ticket.date).toDateString()}</small>
            <h6>${ticket.venue || ticket.veune}</h6>
            </div>
            `;
    });

    PageContent.innerHTML = `
    <h3>Overview</h3>

    
    <div>
    <div>
    <p>Total Events</p>
    <span>${eventData.totalEvents}</span>
    </div>
    <div><i class="bx bx-calendar"></i></div>
    </div>

    <div>
    <div>
    <p>Total Users</p>
    <span>${userData.totaluser}</span>
    </div>
    <div><i class="bx bx-calendar"></i></div>
    </div>


     <div>
    <div>
    <p>Total Tickets booked</p>
    <span>${ticketData.totalticket}</span>
    </div>
    <div><i class="bx bx-calendar"></i></div>
    </div>

    <div>
    <h4>Upcoming Events</h4>
    ${upcoming || "<p>No Upcoming Events</p>"}
    </div>

   

    `;
  }

  overView();
});
