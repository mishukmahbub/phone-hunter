// load data from api
const loadPhoneData = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phonesData = data.data;
  displayPhoneData(phonesData, isShowAll);
};
// loadPhoneData();

// display phone data
const displayPhoneData = (phones, isShowAll) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = "";
  if (phones.length == 0) {
    cardContainer.innerText = "No Match Found, Please try again";
  }
  const btnShowAll = document.getElementById("btn-showAll");
  if (phones.length > 12 && !isShowAll) {
    btnShowAll.classList.remove("hidden");
    phones = phones.slice(0, 12);
  } else {
    btnShowAll.classList.add("hidden");
  }
  phones.forEach((phone) => {
    // console.log(phone);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "w-96", "bg-base-100", "shadow-xl", "mb-6");

    cardDiv.innerHTML = `
          <figure>
            <img src="${phone.image}" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.brand}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" onclick="showdetails.showModal(); handleShowDetails('${phone.slug}')">Show Details</button>
            </div>
          </div>
    `;
    cardContainer.appendChild(cardDiv);
  });
  handleSpinner(false);
};

const handleSearch = (isShowAll) => {
  handleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhoneData(searchText, isShowAll);
};

const handleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  showPhoneDetails(phoneDetails);
};

const showPhoneDetails = (phoneInfo) => {
  const phoneDetailsModal = document.getElementById("showdetails");
  const phoneDetailsContainer = document.createElement("div");
  phoneDetailsContainer.classList.add("modal-box");
  phoneDetailsContainer.innerHTML = `
            <figure><img src="${phoneInfo.image}" alt="" srcset="" /></figure>
            <h3 class="text-lg font-bold">${phoneInfo.name}</h3>

            <p class="py-4">
              <span class="font-bold">Storage:</span>${phoneInfo.mainFeatures?.storage}
            </p>
            <p class="py-4">
              <span class="font-bold">Display Size:</span>${phoneInfo.mainFeatures?.displaySize}
            </p>
            <p class="py-4">
              <span class="font-bold">Chipset:</span>${phoneInfo.mainFeatures?.chipSet}
            </p>
            <p class="py-4">
              <span class="font-bold">Memory:</span>${phoneInfo.mainFeatures?.memory}
            </p>
            <p class="py-4">
              <span class="font-bold">Slug:</span>${phoneInfo.slug}
            </p>
            <p class="py-4">
              <span class="font-bold">Release Date:</span>${phoneInfo.releaseDate}
            </p>
            <p class="py-4">
              <span class="font-bold">Brand:</span>${phoneInfo.brand}
            </p>
            <p class="py-4">
              <span class="font-bold">GPS:</span>${phoneInfo.others?.GPS}
            </p>

            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
  `;
  phoneDetailsModal.appendChild(phoneDetailsContainer);
};

loadPhoneData("iphone");
