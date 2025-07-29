function openModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeModal(id) {
  const modal = document.getElementById(`modal-${id}`);

  if (modal) {
    modal.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open");
  const closeBtn = document.getElementById("close");
  const navLinks = document.getElementById("navlink");
  const mainLinks = document.querySelectorAll(".mainlinks");

  openBtn.addEventListener("click", function () {
    navLinks.classList.remove("hidden");
    openBtn.classList.add("hidden");
    closeBtn.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", function () {
    navLinks.classList.add("hidden");
    openBtn.classList.remove("hidden");
    closeBtn.classList.add("hidden");
  });

  mainLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.add("hidden");
      openBtn.classList.remove("hidden");
      closeBtn.classList.add("hidden");
    });
  });

  /*event card */

  const eventList = [
    {
      name: "Music Festivals",
      image: "../image/music.jpg",
    },
    {
      name: "Movie Premieres",
      image: "../image/movie.jpg",
    },
    {
      name: "Football Matches",
      image: "../image/football.jpg",
      link: "../football/footballevent.html",
    },
    {
      name: "Bash Party",
      image: "../image/bash.jpg",
      link: "../bash/bash.html",
    },
  ];

  const pastEvent = [
    {
      name: "2025 Unity Cup",
      image: "./image/unitycup.png",
    },

    {
      name: "homecoming music festival 2025",
      image: "./image/homecoming.jpg",
    },
    {
      name: "Fifa Club World Cup 2025",
      image: "./image/fifa.avif",
    },
    {
      name: "Pen Dawn",
      image: "./image/music2.webp",
    },
  ];
  const mainevent = document.getElementById("eventCard");

  if (mainevent) {
    const cards = eventList.map((event) => {
      return ` 
    <div class="h-[40vh] ease-[0.3s] border border-solid border-red-100  hover:scale-[1.05] bg-contain bg-center" style="background-image: url('${event.image}')";>
      <a href="${event.link}"  class="font-bold text-red-100 text-2xl flex justify-center items-center h-full font-serif italic">${event.name}</a>
    </div>`;
    });

    mainevent.innerHTML = cards.join("");

    /* input search*/

    const search = document.getElementById("input");

    search.addEventListener("input", function () {
      const query = search.value.toLowerCase();
      const filtered = eventList.filter((events) => {
        return events.name.toLowerCase().includes(query);
      });

      const filteredcard = filtered.map((event) => {
        return `
      <div class="h-[40vh] ease-[0.3s] border border-solid border-red-100 hover:scale-[1.05] bg-contain bg-center" style="background-image: url('${event.image}')";>
      <a href=""  class="font-bold text-red-100 text-2xl flex justify-center items-center h-full font-serif italic">${event.name}</a>
    </div>`;
      });
      mainevent.innerHTML = filteredcard.join("");
    });

    /* eventhightlight */

    const eventHighlight = document.getElementById("lightevent");

    const mainHighlight = pastEvent.map((highlight) => {
      return `
    <div class="swiper-slide relative bg-cover bg-center" style="background-image: url('${highlight.image}')">
    
    </div>`;
    });

    eventHighlight.innerHTML = mainHighlight.join("");
  }
  new Swiper(".myswiper", {
    slidesPerView: 1,
    loop: true,
    navigation: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  //Football event
  const footballEvents = document.getElementById("actualEvents");

  if (footballEvents) {
    fetch("http://localhost:5000/api/footballevents")
      .then((res) => res.json())
      .then((footballevents) => {
        console.log("API RESPONSE:", footballevents);
        footballEvents.innerHTML = "";

        footballevents.events.forEach((events) => {
          const eventCard = document.createElement("div");

          eventCard.innerHTML = `


              
        <div class="bg-neutral-900 h-auto pb-[10px] ">

          <div class="w-[100%] h-[200px]">
            <img src="${events.image}" alt="${
            events.title
          }" class="w-full h-[200px]">
          </div>

          <div class="flex-col justify-center pt-[20px] pl-[10px] item-align h-full">
            <h2 class="text-2xl font-serif font-bold text-red-100">${
              events.details
            }</h2>
            <h5 class="text-base font-sans italic text-gray-100 ">${
              events.title
            }</h5>

            <div class="flex justify-between items-center pr-[10px] mt-[10px]" >
            <h6 class="text-gray-100 font-mons text-xs font-bold">Time: ${
              events.time
            }</h6>
            <h6 class="text-gray-100 font-mons text-xs font-bold"> Date: ${new Date(
              events.date
            ).toLocaleDateString()}</h6>
          </div>

          <button onclick="openModal('${
            events._id
          }')" class="flex justify-center items-center bg-red-100 w-[100px] p-[10px] mt-[20px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button"> Buy Ticket</button>
        </div>

      
        
        
        <div id="modal-${
          events._id
        }" class="hidden fixed inset-0 bg-black/60  flex justify-center items-center z-50">
          <div class="bg-white  md:w-[500px] h-auto">
            <div class="flex relative justify-between items-center bg-black">

              <div class="w-[90%] flex flex-col justify-center items-center">
                <h3 class="text-red-100 text-sm md:text-2xl font-bold font-mons mt-[10px]">${events.teams.join(
                  " VS "
                )}</h3>
                <h6 class="text-gray-400 mt-[5px] font-sans italic text-sm">
                <span class="pr-[5px] text-xs"><i class='bx bx-time'></i></span>${
                  events.time
                }
                </h6>
                <h5 class="text-gray-300 font-bold pb-[15px] mt-[5px] text-sm md:text-2xl font-serif"><span class="text-xs md:text-base">Venue:</span> ${
                  events.venue
                }</h5>
              </div>

              <div class="w-[10%] ">
                <button class="text-red-100 absolute text-3xl top-2 hover:text-gray-400 cursor-pointer" type="button" onclick="closeModal('${
                  events._id
                }')"><i class='bx bx-x'></i></button>
              </div>
              
            </div>

            <div class="flex justify-between bg-neutral-900 p-[15px]">
              <div class="w-[40%]">
                <h2 class="text-1xl font-mons font-bold text-red-100">Match Information</h2>
                <p class="mt-[3px] text-sm md:text-base text-gray-400 font-sans"><span>${
                  events.details
                }:</span> ${events.description} </p>
              </div>

              <div class= w-[30%]>
                <h2 class="text-sm md:text-1xl font-mons font-bold text-red-100">Ticket Options</h2>

                <div class="mt-[10px] shadow-[0_0_10px_0_theme('colors.red.100')]">
                  <h4 class="text-1xl pt-[10px] font-bold text-gray-400 font-serif text-center">VIPs</h4>
                  <p class="pl-[10px] text-sm text-gray-300 font-semibold font-sans">Price: <span class=" italic" id="vipprice-${
                    events._id
                  }">€${events.vip}</span></p>
                  <p class="pl-[10px] pb-[3px] text-gray-300">
                  <button id="vipminusIcon-${
                    events._id
                  }" class="p-[5px]" type="button"><i class="bx bx-minus"></i></button
                  ><span id="vipnums-${events._id}">1</span
                 ><button id="vipplusIcon-${
                   events._id
                 }" class="p-[5px]" type="button"><i class="bx bx-plus"></i></button>
                 </p>
                </div>

                <div class="mt-[10px] shadow-[0_0_10px_0_theme('colors.red.100')]">
                  <h4 class="text-1xl pt-[10px] font-bold text-gray-400 font-serif text-center">Regulars</h4>
                  <p class="pl-[10px] text-sm text-gray-300 font-semibold font-sans">Price: <span class=" italic" id="regularprice-${
                    events._id
                  }">€${events.regular}</span></p>
                  <p class="pl-[10px] pb-[3px] text-gray-300">
                  <button id="regularminusIcon-${
                    events._id
                  }" class="p-[5px]" type="button"><i class="bx bx-minus"></i></button
                  ><span id="regularnums-${events._id}">1</span
                 ><button id="regularplusIcon-${
                   events._id
                 }" class="p-[5px]" type="button"><i class="bx bx-plus"></i></button>
                 </p>
                </div>
                
                
              </div>
            </div>

            <div class="bg-neutral-900 pb-[30px] pt-[20px]">
              <button class="flex justify-center items-center bg-red-100 w-[150px] p-[10px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button">Pay For Ticket</button>
            </div>
          </div>
        </div>`;

          footballEvents.appendChild(eventCard);

          let vipcount = 1;
          const vPrice = document.getElementById(`vipprice-${events._id}`);
          const vipminusicon = document.getElementById(
            `vipminusIcon-${events._id}`
          );
          const vipplusicon = document.getElementById(
            `vipplusIcon-${events._id}`
          );
          const vipnumber = document.getElementById(`vipnums-${events._id}`);

          vipplusicon.addEventListener("click", () => {
            vipcount++;

            vipnumber.textContent = vipcount;
            vPrice.textContent = "€" + events.vip * vipcount;
          });

          vipminusicon.addEventListener("click", () => {
            if (vipcount > 1) {
              vipcount--;
            }
            vipnumber.textContent = vipcount;
            vPrice.textContent = "€" + events.vip * vipcount;
          });

          let regularcount = 1;

          const regularPrice = document.getElementById(
            `regularprice-${events._id}`
          );
          const regularMinusIcon = document.getElementById(
            `regularminusIcon-${events._id}`
          );

          const regularNums = document.getElementById(
            `regularnums-${events._id}`
          );
          const regularPlusIcon = document.getElementById(
            `regularplusIcon-${events._id}`
          );

          regularPlusIcon.addEventListener("click", () => {
            regularcount++;
            regularNums.textContent = regularcount;
            regularPrice.textContent = "€" + events.regular * regularcount;
          });

          regularMinusIcon.addEventListener("click", () => {
            if (regularcount > 1) {
              regularcount--;
            }
            regularNums.textContent = regularcount;
            regularPrice.textContent = "€" + events.regular * regularcount;
          });
        });
      });
  }

  // bash event

  const bashParty = document.getElementById("bashEvents");

  if (bashParty) {
    fetch("http://localhost:5000/api/bashpartyevents")
      .then((res) => res.json())
      .then((bashpartyevents) => {
        bashParty.innerHTML = "";

        bashpartyevents.events.forEach((partyevents) => {
          const partyCard = document.createElement("div");

          partyCard.innerHTML = `
      <div class="bg-neutral-900 h-auto pb-[10px] ">

          <div class="w-[100%] h-[200px]">
            <img src="${partyevents.image}" alt="${
            partyevents.title
          }" class="w-full h-[200px]">
          </div>

          <div class="flex-col justify-center pt-[20px] pl-[10px] item-align h-full">
            <h2 class="text-1xl font-serif font-bold text-red-100">${
              partyevents.title
            }</h2>
            <h5 class="text-base font-sans italic text-gray-100 ">${
              partyevents.description
            }</h5>

            <div class="flex justify-between items-center pr-[10px] mt-[10px]" >
            <h6 class="text-gray-100 font-mons text-xs font-bold">Time: ${
              partyevents.time
            }</h6>
            <h6 class="text-gray-100 font-mons text-xs font-bold"> Date: ${new Date(
              partyevents.date
            ).toLocaleDateString()}</h6>
          </div>

          <button onclick="openModal('${
            partyevents._id
          }')" class="flex justify-center items-center bg-red-100 w-[100px] p-[10px] mt-[20px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button"> Buy Ticket</button>
        </div>

      
        
        
        <div id="modal-${
          partyevents._id
        }" class="hidden fixed inset-0 bg-black/60  flex justify-center items-center z-50">
          <div class="bg-white  md:w-[500px] h-auto">
            <div class="flex relative justify-between items-center bg-black">

              <div class="w-[90%] flex flex-col justify-center items-center">
               <h3 class="text-red-100 text-sm md:text-2xl font-bold font-mons mt-[10px]">${
                 partyevents.title
               }</h3>
                <h6 class="text-gray-400 mt-[5px] font-sans italic text-sm">
                <span class="pr-[5px] text-xs"><i class='bx bx-time'></i></span>${
                  partyevents.time
                }
                </h6>
                <h5 class="text-gray-300 font-bold pb-[15px] text-center mt-[5px] text-sm md:text-base font-serif"><span class="text-xs md:text-base">Venue:</span> ${
                  partyevents.veune
                }</h5>
              </div>

              <div class="w-[10%] ">
                <button class="text-red-100 absolute text-3xl top-2 hover:text-gray-400 cursor-pointer" type="button" onclick="closeModal('${
                  partyevents._id
                }')"><i class='bx bx-x'></i></button>
              </div>
              
            </div>

            <div class="flex justify-between bg-neutral-900 p-[15px]">
              <div class="w-[40%]">
                <h2 class="text-1xl font-mons font-bold text-red-100">Party Information</h2>
                <p class="mt-[3px] text-sm md:text-base text-gray-400 font-sans">${
                  partyevents.details
                } </p>
                <p>Dress Code: ${partyevents.dress}</p>
              </div>

              <div class= w-[30%]>
                <h2 class="text-sm md:text-1xl font-mons font-bold text-red-100">Ticket Price</h2>

                <div class="mt-[10px] shadow-[0_0_10px_0_theme('colors.red.100')]">
                  <p class="pl-[10px] text-sm text-gray-300 font-semibold font-sans">Price: <span class=" italic" id="vipprice-${
                    partyevents._id
                  }">₦${partyevents.ticket}</span></p>
                  <p class="pl-[10px] pb-[3px] text-gray-300">
                  <button id="vipminusIcon-${
                    partyevents._id
                  }" class="p-[5px]" type="button"><i class="bx bx-minus"></i></button
                  ><span id="vipnums-${partyevents._id}">1</span
                 ><button id="vipplusIcon-${
                   partyevents._id
                 }" class="p-[5px]" type="button"><i class="bx bx-plus"></i></button>
                 </p>
                </div>                
              </div>
            </div>

            <div class="bg-neutral-900 pb-[30px] pt-[20px]">
              <button class="flex justify-center items-center bg-red-100 w-[150px] p-[10px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button">Pay For Ticket</button>
            </div>
          </div>
        </div>`;

          bashParty.appendChild(partyCard);
        });
      });
  }
});
