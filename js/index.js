

let width = $("#boxLinks").outerWidth(); 
let dataDisplayed = document.getElementById("ContactUS");
let datarows = document.getElementById("datarows");
let SearchingContainer = document.getElementById("SearchingContainer");

$(document).ready(() => {
    $("#loading").fadeOut(3000);
});

$(".OpenDiv").on('click', () => {
    let left = $("#BoxContainer").css('left');

    if (left === "0px") {
        closeSlider();
    } else {
        openSlider();
    }
});


closeSlider();

function closeSlider() {
    $("#links li").css({ top: "50px", opacity: 0 });
    $("#BoxContainer").animate({ left: -width }, 800, function() {
        $(".OpenDiv .fa-x").addClass('d-none');
        $(".OpenDiv .fa-bars").removeClass('d-none');
    });
}

function openSlider() {
    $("#BoxContainer").animate({ left: 0 }, 800);
    $(".OpenDiv .fa-x").removeClass('d-none');
    $(".OpenDiv .fa-bars").addClass('d-none');
    $("#links li").each(function(index) {
        $(this).animate({ top: 0, opacity: 1 }, 300 * index);
    });
}



//meals

async function getALLmeals() {
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let responseData= await response.json()
    $("#loading").fadeOut(3000);
    displayAllMeals( responseData.meals);
   
}

function displayAllMeals(theMeals) {
    let cartona = " ";
    
    for (let i = 0; i < theMeals.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div onclick="getDetails('${theMeals[i].idMeal}')" class="mealContainer position-relative  w-100">
                    <div class="imgContainer">
                        <img src="${theMeals[i].strMealThumb}" class="w-100 imge" alt="">
                        <div class="mealLayer position-absolute d-flex align-items-center text-black p-2 w-100">
                            <h4>${theMeals[i].strMeal}</h4>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    datarows.innerHTML = cartona;
}

getALLmeals()



// category


   async function getCategory(){

let response= await fetch(` https://www.themealdb.com/api/json/v1/1/categories.php`)

 let responseData=await response.json()
 
 $("#loading").fadeOut(3000);
displayCategories(responseData.categories)
   }




    async function getcategoryMeals(item){
        $("#loading").show() ;
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`);
        let responseData = await response.json() ;
         $("#loading").fadeOut(3000) ;
        displayAllMeals(responseData.meals);
    }

 
 function  displayCategories(theCategories){
 
    let cartona = " " ;
    const maxDescriptionLength = 20;
    for(let i = 0 ; i < theCategories.length ; i++){
        const truncatedDescription = theCategories[i].strCategoryDescription.split(' ').splice(0, maxDescriptionLength).join(' ');

        cartona+= `

        
           <div class="col-md-3">
               <div onclick="getcategoryMeals('${theCategories[i].strCategory}')" class="mealContainer position-relative  w-100">
                   <div class="imgContainer">
                       <img src="${theCategories[i].strCategoryThumb}" class="w-100 imge" alt="">
                       <div class="mealLayer position-absolute">
                           <h4>${theCategories[i].strCategory}</h4>
                           <p>${truncatedDescription}</p>
                       </div>
                   </div>
               </div>
           </div>
      `
           datarows.innerHTML = cartona ;
    



    }
    }
//// area------------------

async function getArea(){

let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
let responseData = await response.json()
$("#loading").fadeOut(3000);
displayArea(responseData.meals);

}
 async function getAreaMeals(item) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${item}`)

    let responseData = await response.json()
    displayAllMeals(responseData.meals);
 }


 function displayArea(theArea){


    datarows.innerHTML = " " ;
    let cartona = " " ;
    for(let i = 0 ; i < theArea.length ; i++){
        

        cartona+= `
        
           <div class="col-md-3 p-4 my-3">
               <div onclick="getAreaMeals('${theArea[i].strArea}')" class="mealContainer text-center w-100 text-light ">
                   <div class="iconContainer">
                   <i class="fa-solid fa-house-laptop fs-1 fw-bolder "></i>
                       
                   </div>
                   <div>
                      <h3 class=" fs-1" >${theArea[i].strArea}</h3>
                   </div>
               </div>
           </div>
      
        
           
        `
        datarows.innerHTML = cartona ;

}

 }
 
 /////// ingredianta


 async function getIngrediants() {

let response =  await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
let responseData=  await response.json()
$("#loading").fadeOut(3000);
displayIngrediants(responseData.meals.slice(0, 20));

    
 }
 
 async function getIngediantsMeals(item) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`);
    let responseData = await response.json()
    $("#loading").fadeOut(3000) ;
    displayAllMeals(responseData.meals);
 }



 function displayIngrediants(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getIngediantsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    datarows.innerHTML = cartona ;
}

//// search


async function searchByName(theword){
    $("#loading").show();
    let response =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${theword}`)
    let responseData = await response.json()

    $("#loading").fadeOut(3000) ;
    
    if (responseData.meals) {
        displayAllMeals(responseData.meals) ;

    } else {
        displayAllMeals([]);
        
    }
}
    async function searchByLetter(theletter){
        $("#loading").show();
        if (theletter === "") {
            theletter = "a";
        }
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${theletter}`) ;
    
        let responseData = await response.json();
        $("#loading").fadeOut(3000) ;
        if (responseData.meals) {
            displayAllMeals(responseData.meals) ;
    
        } else {
            displayAllMeals([]);
            
        }
    
    }    


    function displaySearch(){

        datarows.innerHTML = " " ;
    
        SearchingContainer.innerHTML = `
           <div class="row">
               <div class="col-md-6">
                  <input type="text" onkeyup="searchByName(this.value)" class="form-control text-white bg-transparent" placeholder="Search By Name" >  
               </div>
               <div class="col-md-6">
                 <input type="text" onkeyup="searchByLetter(this.value)" class="form-control text-white bg-transparent" placeholder="Search By First letter" maxlength="1" >  
               </div>
           <div>
        
        
    
`
    }



    //// details of meals

    async function getDetails(theId){


        $("#loading").show();
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${theId}`);
        let responseData = await response.json() ;
        $("#loading").fadeOut(3000) ;
        displayTheDetails(responseData.meals[0]);
       
    
    }
    

    function displayTheDetails(details){
        SearchingContainer.innerHTML = " ";
        datarows.innerHTML = " " ;
        let cartona = " " ;
        let recpiesContainer = '';
        let tagsContainer=''
        if (details.strTags) {
            let tagsArray = details.strTags.split(',').map(tag => tag.trim());
            for (let i = 0; i < tagsArray.length; i++) {
                tagsContainer+=`<span class="badge mt-2 bg-secondary">${tagsArray[i]}</span>`
            }
        }
        for (let i = 1; i <= 20; i++) {
            const measureKey = `strMeasure${i}`;
            if (details[measureKey] === " ") {
                break;
            }else{
    
                recpiesContainer+=`
                <span class="badge mt-2 bg-secondary">${details[measureKey]}</span>`
            }
        }
         cartona = `
         <div class="col-md-4 text-white">
         <img src="${details.strMealThumb}" class="w-100 rounded-2 " alt="">
         <h2>${details.strMeal}</h2>
      </div>
      <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${details.strInstructions}</p>
        <h3><span class="fw-bolder ">Area : </span>${details.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${details.strCategory}</h3>
        <h3><span class="fw-bolder">Recipies : </span> <div class='d-flex flex-wrap  gap-3 '>
            ${recpiesContainer}
        </div>
        </h3>
        <h3><span class="fw-bolder">Tags : </span></span> <div class='d-flex flex-wrap  gap-3 '>
        ${tagsContainer}
    </div></h3>
    
        <a href="${details.strSource}" target="_blank" class="btn btn-success ">Source</a>
        <a href="${details.strYoutube}" target="_blank" class="btn btn-danger ">youtube</a>
      </div>
         
         
         `
    
         datarows.innerHTML = cartona ;
    
    
    }
    
    
    
    
    
    
    // contact 

    function showContacts(){
        datarows.innerHTML = " ";
    
        datarows.innerHTML = `
        <div class="container w-75 text-center d-flex flex-column   align-items-center justify-content-center  vh-100 ">
        <div class="row"  id="Data">
            <div class="col-md-6 my-2">
                <input type="text" class="form-control" id="nameInput" onkeyup="checkName()" placeholder="Enter Your Name">
                <div class="NameError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6 my-2">
                <input type="text" class="form-control " id="emailInput" onkeyup="checkemail()" placeholder="Enter Your Email">
                <div class="EmailError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
                
            </div>
            <div class="col-md-6 my-2">
                <input type="text" class="form-control " id="phoneInput" onkeyup="checkPhone()" placeholder="Enter Your Phone">
                <div class="PhoneError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                    Enter valid Phone Number
                </div>
                
            </div>
            <div class="col-md-6 my-2">
                <input type="number" class="form-control " id="ageInput" onkeyup="checkAge()" placeholder="Enter Your Age">
                <div class="ageError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                    Enter valid age
                </div>
                
            </div>
            <div class="col-md-6 my-2">
                <input type="password" class="form-control " id="passwordinput" onkeyup="checkpass()" placeholder="Enter Your Password">
                <div class="passwordError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
                
            </div>
            <div class="col-md-6 my-2">
                <input type="password" class="form-control " id="repasswordinput" onkeyup="checkRepass()" placeholder="Repassword">
                <div class="repassError text-danger  bg-danger-subtle rounded-2 py-3 mt-2 text-center d-none">
                    Enter valid repassword
                </div>
                
            </div>
    
        </div>
        <button class="btn btn-outline-danger  submitting  my-2" disabled >Submit</button>
    </div>
        
        
        `
    
        
      
    
    
         
        
    
    
    }


 
   
   

    function checkName() {
     
        const name = document.getElementById("nameInput").value;
    
        
        const nameRegex = /^[A-Za-z\s]+$/;
    
        
        const nameError = document.querySelector(".NameError");

        if (!nameRegex.test(name)) {
            
            nameError.classList.remove("d-none");
        } else {
        
            nameError.classList.add("d-none");
        }
    
        
        enableSubmit();
    }
    
    function enableSubmit() {
        
        const nameValid = document.querySelector(".NameError.d-none");
        const emailValid = document.querySelector(".EmailError.d-none");
        const phoneValid = document.querySelector(".PhoneError.d-none");
        const ageValid = document.querySelector(".ageError.d-none");
        const passwordValid = document.querySelector(".passwordError.d-none");
        const repassValid = document.querySelector(".repassError.d-none");
    
    
        const submitButton = document.querySelector(".submitting");
    
        
        if (nameValid && emailValid && phoneValid && ageValid && passwordValid && repassValid) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    
    function checkemail() {
        const email = document.getElementById("emailInput").value;
     
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
      
        const emailError = document.querySelector(".EmailError");
    
        if (!emailRegex.test(email)) {
            
            emailError.classList.remove("d-none");
        } else {
    
            emailError.classList.add("d-none");
        }
    
       
        enableSubmit();
    }
    
    function checkPhone() {
        const phone = document.getElementById("phoneInput").value;
    

        const phoneRegex = /^\d{10}$/;
    
  
        const phoneError = document.querySelector(".PhoneError");
    
        if (!phoneRegex.test(phone)) {
            
            phoneError.classList.remove("d-none");
        } else {
        
            phoneError.classList.add("d-none");
        }
    
        enableSubmit();
    }


    function checkRepass() {
        const repassword = document.getElementById("repasswordinput").value;
        const password = document.getElementById("passwordinput").value;
    
     
        const repassError = document.querySelector(".repassError");
    
        if (repassword !== password) {
            
            repassError.classList.remove("d-none");
        } else {
        
            repassError.classList.add("d-none");
        }
    
        enableSubmit();
    }

    function checkpass() {
        const password = document.getElementById("passwordinput").value;
    
        
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    
        const passwordError = document.querySelector(".passwordError");
    
        if (!passRegex.test(password)) {
            passwordError.classList.remove("d-none");
        } else {
            
            passwordError.classList.add("d-none");
        }
    
        
        enableSubmit();
    }


    function checkAge() {
        const age = document.getElementById("ageInput").value;
        
        const ageRegex = /^\d+$/;
        

        const ageError = document.querySelector(".ageError");
    

        if (!ageRegex.test(age) || age < 1 || age > 120) {

            ageError.classList.remove("d-none");
        } else {
         
            ageError.classList.add("d-none");
        }

        enableSubmit();
    }
    