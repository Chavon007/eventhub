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
      link: "../music/music.html",
    },
    {
      name: "Movie Premieres",
      image: "../image/movie.jpg",
      link: "../movie/movies.html",
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
                  }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-minus"></i></button
                  ><span id="vipnums-${events._id}">1</span
                 ><button id="vipplusIcon-${
                   events._id
                 }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-plus"></i></button>
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
                  }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-minus"></i></button
                  ><span id="regularnums-${events._id}">1</span
                 ><button id="regularplusIcon-${
                   events._id
                 }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-plus"></i></button>
                 </p>
                </div>
                
                
              </div>
            </div>

            <div class="bg-neutral-900 pb-[30px] pt-[20px]">
              <button id="payment" class="flex justify-center items-center bg-red-100 w-[150px] p-[10px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button">Pay For Ticket</button>
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

          const payment = document.getElementById("payment");

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

          payment.addEventListener("click", () => {
            fetch("http://localhost:5000/api/ticket", {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
              })
              .then((ticket) => {
                paymentPlatform(ticket);
              })
              .catch((err) => {
                alert("unable to fetch ticket" + err.message);
              });
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

            <div class="flex flex-col bg-neutral-900 p-[15px]">
              <div class="w-[80%] mx-auto">
                <h2 class="text-2xl text-center font-mons font-bold text-red-100">Party Information</h2>
                <p class="mt-[3px] text-center text-sm md:text-base text-gray-400 font-sans">${
                  partyevents.details
                } </p>
                <p class="text-sm italic text-red-200 font-bold font-serif mt-[5px] pl-[20px]">Dress Code: ${
                  partyevents.dress
                }</p>
              </div>

              <div class= w-[100%]>
                <h2 class="text-sm md:text-1xl font-mons font-bold text-red-100 mt-[10px]">Ticket Price</h2>

                <div class="mt-[10px] shadow-[0_0_10px_0_theme('colors.red.100')]">
                  <p class="pl-[10px] text-sm text-gray-300 font-semibold font-sans">Price: <span class=" italic" id="bashprice-${
                    partyevents._id
                  }">₦${partyevents.ticket}</span></p>
                  <p class="pl-[10px] pb-[3px] text-gray-300">
                  <button id="bashminusIcon-${
                    partyevents._id
                  }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-minus"></i></button
                  ><span id="bashnums-${partyevents._id}">1</span
                 ><button id="bashplusIcon-${
                   partyevents._id
                 }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-plus"></i></button>
                 </p>
                </div>                
              </div>
            </div>

            <div class="bg-neutral-900 pb-[30px] pt-[20px]">
              <button id="payment-${
                partyevents._id
              }" class="flex justify-center items-center bg-red-100 w-[150px] p-[10px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button">Pay For Ticket</button>
            </div>
          </div>
        </div>`;

          bashParty.appendChild(partyCard);

          let bashcount = 1;

          const ticketprice = document.getElementById(
            `bashprice-${partyevents._id}`
          );
          const bashplus = document.getElementById(
            `bashplusIcon-${partyevents._id}`
          );
          const bashminus = document.getElementById(
            `bashminusIcon-${partyevents._id}`
          );
          const bashnums = document.getElementById(
            `bashnums-${partyevents._id}`
          );

          const payment = document.getElementById(`payment-${partyevents._id}`);

          bashplus.addEventListener("click", () => {
            bashcount++;
            bashnums.textContent = bashcount;
            ticketprice.textContent = "₦" + partyevents.ticket * bashcount;
          });

          bashminus.addEventListener("click", () => {
            if (bashcount > 1) {
              bashcount--;
            }
            bashnums.textContent = bashcount;
            ticketprice.textContent = "₦" + partyevents.ticket * bashcount;
          });

          payment.addEventListener("click", () => {
            fetch("http://localhost:5000/api/pay", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: partyevents.ticket * bashcount,
                eventId: partyevents._id,
                eventModel: "bashPartyEvents",
                quantity: bashcount,
              }),
            })
              .then((res) => {
                if (!res.ok) throw new Error("Failed to Start payment");
                return res.json();
              })
              .then((data) => {
                if (data.authorization_url) {
                  window.location.href = data.authorization_url;
                }
              })
              .catch((err) => {
                console.error(err.message);
              });
          });
        });
      });
  }

  // movie event
  const movieEvents = document.getElementById("movieEvents");

  if (movieEvents) {
    fetch("http://localhost:5000/api/movieevents")
      .then((res) => res.json())
      .then((movieEventsCard) => {
        movieEvents.innerHTML = "";

        movieEventsCard.events.forEach((mainMovies) => {
          const mainMoviesCard = document.createElement("div");
          mainMoviesCard.innerHTML = `
          <div class="bg-neutral-900 h-auto pb-[10px] ">

          <div class="w-[100%] h-[200px]">
            <img src="${mainMovies.image}" alt="${
            mainMovies.title
          }" class="w-full h-[200px]">
          </div>

          <div class="flex-col justify-center pt-[20px] pl-[10px] item-align h-full">
            <h2 class="text-1xl font-serif font-bold text-red-100">${
              mainMovies.title
            }</h2>
            <h5 class="text-base font-sans italic text-gray-100 ">${
              mainMovies.description
            }</h5>

            <div class="flex justify-between items-center pr-[10px] mt-[10px]" >
            <h6 class="text-gray-100 font-mons text-xs font-bold">Time: ${
              mainMovies.time
            }</h6>
            <h6 class="text-gray-100 font-mons text-xs font-bold"> Date: ${new Date(
              mainMovies.date
            ).toLocaleDateString()}</h6>
          </div>

          <button onclick="openModal('${
            mainMovies._id
          }')" class="flex justify-center items-center bg-red-100 w-[100px] p-[10px] mt-[20px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button"> Buy Ticket</button>
        </div>

      
        
        
        <div id="modal-${
          mainMovies._id
        }" class="hidden fixed inset-0 bg-black/60  flex justify-center items-center z-50">
          <div class="bg-white  md:w-[500px] h-auto">
            <div class="flex relative justify-between items-center bg-black">

              <div class="w-[90%] flex flex-col justify-center items-center">
               <h3 class="text-red-100 text-center text-sm md:text-1xl font-bold font-mons mt-[10px]">${
                 mainMovies.title
               }</h3>
                <h6 class="text-gray-400 mt-[5px] font-sans italic text-sm">
                <span class="pr-[5px] text-xs"><i class='bx bx-time'></i></span>${
                  mainMovies.time
                }
                </h6>
                <h5 class="text-gray-300 font-bold pb-[15px] text-center mt-[5px] text-sm md:text-base font-serif"><span class="text-xs md:text-base">Venue:</span> ${
                  mainMovies.venue
                }</h5>
              </div>

              <div class="w-[10%] ">
                <button class="text-red-100 absolute text-3xl top-2 hover:text-gray-400 cursor-pointer" type="button" onclick="closeModal('${
                  mainMovies._id
                }')"><i class='bx bx-x'></i></button>
              </div>
              
            </div>

            <div class="flex flex-col bg-neutral-900 p-[15px]">
              <div class="w-[80%] mx-auto">
                <h2 class="text-2xl text-center font-mons font-bold text-red-100">Movie Information</h2>
                <p class="mt-[3px] text-center text-sm md:text-base text-gray-400 font-sans">${
                  mainMovies.details
                } </p>
              
              </div>

              <div class= w-[30%]>
                <h2 class="text-sm md:text-1xl font-mons font-bold text-red-100 mt-[10px]">Ticket Price</h2>

                <div class="mt-[10px] shadow-[0_0_10px_0_theme('colors.red.100')]">
                  <p class="pl-[10px] text-sm text-gray-300 font-semibold font-sans">Price: <span class=" italic" id="movieprice-${
                    mainMovies._id
                  }">₦${mainMovies.ticket}</span></p>
                  <p class="pl-[10px] pb-[3px] text-gray-300">
                  <button id="movieminusIcon-${
                    mainMovies._id
                  }" class=" cursor-pointer p-[5px]" type="button"><i class="bx bx-minus"></i></button
                  ><span id="movienums-${mainMovies._id}">1</span
                 ><button id="movieplusIcon-${
                   mainMovies._id
                 }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-plus"></i></button>
                 </p>
                </div>                
              </div>
            </div>

            <div class="bg-neutral-900 pb-[30px] pt-[20px]">
              <button id="payment" class="flex justify-center items-center bg-red-100 w-[150px] p-[10px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button">Pay For Ticket</button>
            </div>
          </div>
        </div>`;

          movieEvents.appendChild(mainMoviesCard);

          let movieCount = 1;

          const eventTicket = document.getElementById(
            `movieprice-${mainMovies._id}`
          );
          const eventPlus = document.getElementById(
            `movieplusIcon-${mainMovies._id}`
          );
          const eventMinus = document.getElementById(
            `movieminusIcon-${mainMovies._id}`
          );
          const eventNums = document.getElementById(
            `movienums-${mainMovies._id}`
          );
          const payment = document.getElementById("payment");

          eventPlus.addEventListener("click", () => {
            movieCount++;
            eventNums.textContent = movieCount;
            eventTicket.textContent = "₦" + mainMovies.ticket * movieCount;
          });

          eventMinus.addEventListener("click", () => {
            if (movieCount > 1) {
              movieCount--;
            }
            eventNums.textContent = movieCount;
            eventTicket.textContent = "₦" + mainMovies.ticket * movieCount;
          });

          payment.addEventListener("click", () => {
            fetch("http://localhost:5000/api/ticket", {
              method: "GET",
              credentials: "include",
              headers: { "Content-Type": "ap[lication/json" },
            })
              .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch ticket");
                return res.json();
              })
              .then((ticket) => {
                paymentPlatform(ticket);
              })
              .catch((err) => {
                alert("unable to fetch ticket" + err.message);
              });
          });
        });
      });
  }

  // music event

  const musicEvents = document.getElementById("musicEvents");

  if (musicEvents) {
    fetch("http://localhost:5000/api/musicevents")
      .then((res) => res.json())
      .then((musicevents) => {
        musicEvents.innerHTML = "";

        musicevents.events.forEach((mainmusicEvents) => {
          const musiceventCard = document.createElement("div");

          musiceventCard.innerHTML = `
          <div class="bg-neutral-900 h-auto pb-[10px] ">

  <div class="w-[100%] h-[200px]">
    <img src="${mainmusicEvents.image}" alt="${
            mainmusicEvents.title
          }" class="w-full h-[200px]">
  </div>

  <div class="flex-col justify-center pt-[20px] pl-[10px] item-align h-full">
    <h2 class="text-1xl font-serif font-bold text-red-100">${
      mainmusicEvents.title
    }</h2>
    <h5 class="text-sm font-sans italic text-gray-100 ">${
      mainmusicEvents.description
    }</h5>

    <div class="flex justify-between items-center pr-[10px] mt-[10px]">
      <h6 class="text-gray-100 font-mons text-xs font-bold">Time: ${
        mainmusicEvents.time
      }</h6>
      <h6 class="text-gray-100 font-mons text-xs font-bold">Date: ${new Date(
        mainmusicEvents.date
      ).toLocaleDateString()}</h6>
    </div>

    <button onclick="openModal('${
      mainmusicEvents._id
    }')" class="flex justify-center items-center bg-red-100 w-[100px] p-[10px] mt-[20px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button">Buy Ticket</button>
  </div>

  <div id="modal-${
    mainmusicEvents._id
  }" class="hidden fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div class="bg-white md:w-[500px] h-auto">
      <div class="flex relative justify-between items-center bg-black">

        <div class="w-[90%] flex flex-col justify-center items-center">
          <h3 class="text-red-100 text-sm md:text-2xl font-bold font-mons mt-[10px]">${
            mainmusicEvents.title
          }</h3>
          <h6 class="text-gray-400 mt-[5px] font-sans italic text-sm">
            <span class="pr-[5px] text-xs"><i class='bx bx-time'></i></span>${
              mainmusicEvents.time
            }
          </h6>
          <h5 class="text-gray-300 font-bold pb-[15px] text-center mt-[5px] text-sm md:text-base font-serif">
            <span class="text-xs md:text-base">Venue:</span> ${
              mainmusicEvents.venue
            }
          </h5>
        </div>

        <div class="w-[10%]">
          <button class="text-red-100 absolute text-3xl top-2 hover:text-gray-400 cursor-pointer" type="button" onclick="closeModal('${
            mainmusicEvents._id
          }')"><i class='bx bx-x'></i></button>
        </div>
      </div>

      <div class="flex flex-col bg-neutral-900 p-[15px]">
        <div class="w-[80%] mx-auto">
          <h2 class="text-2xl text-center font-mons font-bold text-red-100">Music Information</h2>
          <p class="mt-[3px] text-center text-sm md:text-base text-gray-400 font-sans">${
            mainmusicEvents.details
          }</p>
        </div>

        <div class="w-[100%]">
          <h2 class="text-sm md:text-1xl font-mons font-bold text-red-100 mt-[10px]">Ticket Price</h2>

          <div class="mt-[10px] shadow-[0_0_10px_0_theme('colors.red.100')]">
            <p class="pl-[10px] text-sm text-gray-300 font-semibold font-sans">
              Price: <span class="italic" id="musicprice-${
                mainmusicEvents._id
              }">₦${mainmusicEvents.ticket}</span>
            </p>
            <p class="pl-[10px] pb-[3px] text-gray-300">
              <button id="musicminusIcon-${
                mainmusicEvents._id
              }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-minus"></i></button>
              <span id="musicnums-${mainmusicEvents._id}">1</span>
              <button id="musicplusIcon-${
                mainmusicEvents._id
              }" class="cursor-pointer p-[5px]" type="button"><i class="bx bx-plus"></i></button>
            </p>
          </div>
        </div>
      </div>

      <div class="bg-neutral-900 pb-[30px] pt-[20px]">
        <button id="payment" class="flex justify-center items-center bg-red-100 w-[150px] p-[10px] rounded-3xl ml-auto mr-auto text-sm font-sans text-gray-500 font-bold hover:bg-black hover:text-white" type="button">Pay For Ticket</button>
      </div>
    </div>
  </div>
</div>
`;
          musicEvents.appendChild(musiceventCard);

          let musicCount = 1;

          const muscicTicket = document.getElementById(
            `musicprice-${mainmusicEvents._id}`
          );
          const musicPlus = document.getElementById(
            `musicplusIcon-${mainmusicEvents._id}`
          );
          const musicMinus = document.getElementById(
            `musicminusIcon-${mainmusicEvents._id}`
          );
          const musicNums = document.getElementById(
            `musicnums-${mainmusicEvents._id}`
          );

          const payment = document.getElementById("payment");

          musicPlus.addEventListener("click", () => {
            musicCount++;
            musicNums.textContent = musicCount;
            muscicTicket.textContent =
              "₦" + mainmusicEvents.ticket * musicCount;
          });

          musicMinus.addEventListener("click", () => {
            if (musicCount > 1) {
              musicCount--;
            }
            musicNums.textContent = musicCount;
            muscicTicket.textContent =
              "₦" + mainmusicEvents.ticket * musicCount;
          });
          payment.addEventListener("click", () => {
            fetch("http://localhost:5000/api/ticket", {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch ticket");
                return res.json();
              })
              .then((ticket) => {
                paymentPlatform(ticket);
              })
              .catch((err) => {
                alert("Unable to fetch ticket" + err.message);
              });
          });
        });
      });
  }

  // contact page

  const contact = [
    {
      name: "email",
      value: "salvationazuh@gmail.com",
      icon: "bx bx-envelope",
      link: "mailto:salvationazuh@gmail.com",
    },
    {
      name: "phone",
      value: "+2348131933895",
      icon: "bx bx-phone",
      link: "tel:+2348131933895",
    },
    {
      name: "Office address",
      value: "No 7 Vincent street, Shomolu Lagos, Nigeria",
      icon: "bx bx-map",
      link: "https://www.google.com/maps?q=9+Vincent+St,+Igbobi,+Lagos+101245,+Lagos",
    },
    {
      name: "Live Chat",
      value: "You can chat with us",
      icon: "bx bx-chat",
      link: "https://wa.me/2348131933895",
    },
  ];

  const linksMain = document.getElementById("linksMain");

  contact.forEach((items) => {
    const newLinks = document.createElement("div");
    newLinks.innerHTML = `
            <a href="${items.link}" target="_blank" class="flex items-center gap-4 mt-[20px] hover:bg-neutral-800 w-[80%]">
               <i class="${items.icon} text-red-100 text-4xl "></i>
             <div>
              <h4 class="text-2xl text-red-100 font-mons font-semibold">
                ${items.name}
             </h4>
              <p class="text-gray-400 text-base font-serif mt-[10px]">
              ${items.value}
              </p>
             </div>
            </a>
        `;
    linksMain.appendChild(newLinks);
  });

  // contact form validation

  const form = document.querySelector("form");
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    errorMessage.textContent = "";
    successMessage.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      errorMessage.textContent = "Please fill the required area";
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage.textContent = `please use a vaild email address`;
      return;
    } else {
      fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to send message");
          return res.json();
        })
        .then((data) => {
          successMessage.textContent = "Message sent Successfully!";
          form.reset();
        })
        .catch((err) => {
          console.error(err);
          errorMessage.textContent =
            "An error occurred while sending the message";
        });
    }
  });
});
