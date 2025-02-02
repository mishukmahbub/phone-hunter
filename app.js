// load data from api
const loadPhoneData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phonesData = data.data;
  displayPhoneData(phonesData);
};
// loadPhoneData();

// display phone data
const cardContainer = document.getElementById("card-container");
const displayPhoneData = (phones) => {
  phones.forEach((phone) => {
    console.log(phone);

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
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
    `;
    cardContainer.appendChild(cardDiv);
  });
};

loadPhoneData();
