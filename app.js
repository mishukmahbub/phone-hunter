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
              <button class="btn btn-primary">Show Details</button>
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

// loadPhoneData("a");
