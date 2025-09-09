const categoryList = document.getElementById('category-list');
const plantsContainer = document.getElementById('plant-container');
const plantCartContainer = document.getElementById('cart-container');
const modalContainer = document.getElementById('modalContainer');
const plantCartContainerMobile = document.getElementById('plantCartContainerMobile');
const loadCategory = () =>{
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        loadCategoryDataShow(data.categories);
        
    })
}

const loadCategoryDataShow = categories =>{
    categoryList.innerHTML = `<li onclick="loadAllPlants()" class="bg-[#15803D] text-white p-2 rounded-lg  font-medium">All Trees</li>`;

    categories.forEach(category =>{
        
        categoryList.innerHTML += `
            <li id="${category.id}" class="hover:bg-[#15803D] hover:text-white p-2 rounded-lg  font-medium">${category.category_name}</li>
        
        `
    })


    categoryList.addEventListener('click',e =>{
        
        const allLi = document.querySelectorAll('#category-list li');
        
        allLi.forEach(li =>{
            li.classList.remove('bg-[#15803D]');
            li.classList.remove('text-white');
        })

        if(e.target.localName === 'li'){
            e.target.classList.add('bg-[#15803D]');
            e.target.classList.add('text-white');
            // loadPlantsByCategory(e.target.id);
            loadPlantsByCategory(e.target.id ? e.target.id : '' );
        }
    })
    
}

const loadAllPlants = () =>{
    showLoading(true);
    const url = `https://openapi.programming-hero.com/api/plants`
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        // console.log(data.plants);
        
        loadAllPlantsShow(data.plants);
        
        
    })
}

const loadAllPlantsShow =(data) =>{
    plantsContainer.innerHTML ='';
    data.forEach(plant =>{
        plantsContainer.innerHTML +=`
            <div id="${plant.id}" class="bg-white p-4 rounded-xl">
                    <!-- <img src="" alt=""> -->
                    <img class="rounded-xl md:h-[400px] h-[350px] w-full" src="${plant.image}" alt="">

                    <div class="py-3">
                        <h2 onclick="loadPlantModal(${plant.id})" class="font-semibold">${plant.name}</h2>
                        <p class="py-2  text-sm opacity-70 md:h-[90px]">
                            ${plant.description}
                        </p>

                        <div class="flex justify-between items-center">
                            <p class="bg-[#dcfce7] py-2 px-5 rounded-full text-[#15803D] text-sm font-semibold">${plant.category
}</p>
                            <h2 class="text-sm font-semibold">৳ <span> ${plant.price
} </span> </h2>
                        </div>

                    </div>

                    

                    <div>
                        <button onclick="getPrice(${plant.price})" class="btn border-none bg-[#15803d] rounded-full text-white w-full">Add to Cart</button>
                    </div>

                </div>
        `
    })
    showLoading(false);
}

const loadPlantsByCategory = (id) =>{
    showLoading(true);
    const url =`https://openapi.programming-hero.com/api/category/${id}`;

    fetch(url)
    .then(res => res.json())
    .then(data =>{
        loadedPlantsShow(data.plants);
    })
}

const loadedPlantsShow = (plants) =>{
    
    plantsContainer.innerHTML = '';
    if(plants === undefined){
        loadAllPlants();
        return
    }

    plants.forEach(plant =>{
        
        plantsContainer.innerHTML += `
            <div id="${plant.id}" class="bg-white p-4 rounded-xl">
                    <!-- <img src="" alt=""> -->
                    <img class="rounded-xl md:h-[400px] h-[350px] w-full" src="${plant.image}" alt="">

                    <div class="py-3">
                        <h2 onclick="loadPlantModal(${plant.id})" class="font-semibold">${plant.name}</h2>
                        <p class="py-2  text-sm opacity-70 md:h-[90px]">
                            ${plant.description}
                        </p>

                        <div class="flex justify-between items-center">
                            <p class="bg-[#dcfce7] py-2 px-5 rounded-full text-[#15803D] text-sm font-semibold">${plant.category
}</p>
                            <h2 class="text-sm font-semibold">৳ <span> ${plant.price
} </span> </h2>
                        </div>

                    </div>

                    

                    <div>
                        
                        <button onclick="getPrice(${plant.price})" class="btn border-none bg-[#15803d] rounded-full text-white w-full">Add to Cart</button>
                    </div>

                </div>
        `
        
    })
    showLoading(false);
    
}
const totalPrice = document.getElementById('total-price');
const cartTotal = document.getElementById('cart-total');

plantsContainer.addEventListener('click', e =>{

    if(e.target.innerText === 'Add to Cart'){
        const title = e.target.parentNode.parentNode.children[1].children[0].innerText;
        const total = parseInt(totalPrice.innerText)

        const price = e.target.parentNode.parentNode.children[1].children[2].children[1].children[0].innerText;

        plantCartContainer.innerHTML += `
        
        <div class="flex justify-between items-center mt-2 bg-[#f0fdf4] p-5 rounded-xl">
            <div>
                <h3 class="font-semibold text-sm">${title}</h3>
                <p class="text-sm opacity-50 pt-2">${price} x 1</p>
            </div>
            <button class="btn-delete"><i class="fa-solid fa-xmark"></i></button>
        </div>
        `
        const ID = document.querySelectorAll('.btn-delete');
        ID.forEach(btn => {
            btn.addEventListener('click', e => {
                const cartPrice = parseInt(e.target.parentNode.parentNode.children[0].children[1].innerText);
                e.target.parentNode.parentNode.remove();
                
                totalPrice.innerText = parseInt(totalPrice.innerText) - cartPrice;
                
                if(totalPrice.innerText === '0' || totalPrice.innerText < 0 || totalPrice.innerText === NaN){
                    cartTotal.classList.add('hidden');
                }

            })
        })
        
    totalPrice.innerText = total + parseInt(price);

    }
    const total = parseInt(totalPrice.innerText)
    if(total > 0){
        cartTotal.classList.remove('hidden');
    }

})

const loadPlantModal = id =>{
    const url =`https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showModal(data.plants);
    })
    my_modal_1.showModal();
}

const showModal = (onePlant) =>{
    
    modalContainer.innerHTML = '';
    modalContainer.innerHTML += `
        <div id="${onePlant.id}" class="bg-white p-4 rounded-xl">

                    <h2 class="font-semibold mb-3 md:text-2xl">${onePlant.name}</h2>
                    <img class="rounded-xl md:h-[400px] h-[350px] w-full" src="${onePlant.image}" alt="">

                    <div class="py-3">
                        <p class="py-2 text-lg">
                            <span class="font-semibold text-xl">Description:</span> ${onePlant.description}
                        </p>

                        <div class="flex justify-between items-center">
                            <p class="bg-[#dcfce7] py-2 px-5 rounded-full text-[#15803D] text-sm font-semibold">${onePlant.category
}</p>
                            <h2 class="text-sm font-semibold">৳ <span> ${onePlant.price
} </span> </h2>
                        </div>

                    </div>

                </div>
    
    `
    
}

const showLoading = status =>{
    const loading = document.getElementById('loading');

    if(status === true){
        loading.classList.remove('hidden');
        plantsContainer.classList.add('hidden');
    }
    else{
        plantsContainer.classList.remove('hidden');
        loading.classList.add('hidden');
    }
}

let sumOfPrices = 0;
let itemTotal = 0;

function getPrice(price){
    itemTotal++;
    sumOfPrices += price;

    document.getElementById('nav-cart-total').innerText = itemTotal;
    document.getElementById('cart-count').innerText = itemTotal;
    document.getElementById('sum-total').innerText = sumOfPrices;

}

const removeAll = document.getElementById('remove-all');

removeAll.addEventListener('click', e => {


    itemTotal = 0;
    sumOfPrices = 0;
    document.getElementById('nav-cart-total').innerText = 0;
    document.getElementById('cart-count').innerText = 0;
    document.getElementById('sum-total').innerText = 0;

});




loadCategory();
loadAllPlants();