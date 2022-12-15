//event listner
document.querySelector('#animal-form').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    let animalObj = {
        name: event.target.name.value,
        imageURL: event.target.image_url.value,
        description: event.target.description.value,
        donations: 0
    }
    renderOneAnimal(animalObj);
    adoptAnimal(animalObj);

}


//DOM render functions
function renderOneAnimal(animal) {
    //build animal
    let card = document.createElement('li');
    // const ul = document.querySelector('ul');
    card.className = 'card';
    card.innerHTML = `
        <img src="${animal.imageURL}">
        <div class="content">
            <h4>${animal.name}</h4>
            <p>
            $<span class="donation-count">${animal.donations}</span> Donated
            </p>
            <p>${animal.description}</p>
        </div>
        <div class="btns">
            <button class="donation-btn" id="donate"> Donate $10 </button>
            <button class="donation-btn" id="set-free"> Set Free </button>
        </div>
    `;

    card.querySelector('#donate').addEventListener('click', (e) => {
        e.preventDefault();
        animal.donations += 10;
        card.querySelector('.donation-count').textContent = animal.donations;
        updateDonation(animal);
    });
    card.querySelector('#set-free').addEventListener('click', (e)=>{
        e.preventDefault();
        // card.innerHTML = '';
        card.remove();
        deleteAnimal(animal);
    })
    document.querySelector("#animal-list").appendChild(card);


}



//fetch requests
//get fetch for all animal resources
function getAllAnimals() {
    fetch('http://localhost:3000/animals')
        .then(res => res.json())
        .then(animalData => animalData.forEach(animal => renderOneAnimal(animal)))
}

function adoptAnimal(animalObj) {
    fetch('http://localhost:3000/animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    })
    // .then(res => res.json())
    // .then(animal => console.log(animal))
}

function updateDonation(animalObj) {
    fetch(`http://localhost:3000/animals/${animalObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    })
    .then(res => res.json())
    .then(animal => console.log(animal))
}

function deleteAnimal(animalObj) {
    fetch(`http://localhost:3000/animals/${animalObj.id}`, {
    method:'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(res => res.json())
.then(animal => console.log(animal))
}

//initial render
//get data and render our animals to the DOM
function initialize() {
    getAllAnimals();
    // animalData.forEach(animal => renderOneAnimal(animal));
};

initialize();

