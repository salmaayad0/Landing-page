/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/



/**
 * Define Global Variables
 * 
*/

"use strict"
 //section number is 3 on loading at the begiun so it has intializing value 4
 let secNum = 4;  
 const x = 1;

let allSections = Array.from(document.querySelectorAll("section"));
const navigationBar = document.querySelector("#navbar__list");

const navMenu = document.getElementById("navbar__menu");

const button = document.getElementById("button");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//sccroll smooth function 


// this function to add new sections in the html main tag by the button click
function addNewSection () 
{ 
  //html tags that will be added 
  const newSection = 
  `<section id="${secNum}" data-nav="Section ${secNum}">
  <div class="landing__container">
    <h2>Section ${secNum}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
  
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
  </div>
  </section>`;

  //the DOM part to get the html element and adding the new sections
  let main = document.getElementById("main");
  main.insertAdjacentHTML("beforeend",newSection);
  return secNum++; 
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

/*this function creats the orignal list into the nav-bar before adding new elements
 by creating new element in html the output in html file should be as this 
 <li><a href="#section(id number)" class="menu__link">section no.</a></li>
*/

function creatingListElement()
{
  for(let newSection of allSections)
  {
    //initialize the new element and asign it into anchor  html tag:-
    let listElement = document.createElement("li"); 

    //making anchor element by template literals
    let sectionId = newSection.getAttribute("id");
    let sectionText = newSection.getAttribute("data-nav");

    listElement.innerHTML = `<a href='#${sectionId}' class="menu__link">${sectionText}</a>`;

    //insert the new section into the navagation bar or in <ul></ul> element:-
    navigationBar.appendChild(listElement);
  }     
}

//this function update the nav-bar by clicking add new section button
function updateListElement()
{ 
  //calling the allSection variable agian with the click to insert the new section into the array
  allSections = Array.from(document.querySelectorAll("section"));

  //then check the legnth to make sure it's added
  if(allSections.length > 3)
  { //insert th li element as the creating element function once by clicking
    let listElement = document.createElement("li");
    let newSectionVar = allSections.length; 

    listElement.innerHTML = `<a href='#${newSectionVar}' class="menu__link">Section ${newSectionVar}</a>`;

    navigationBar.appendChild(listElement);
  }
}

/* this function cotains an object of intersection observer class 
 which tests if the section is intersecting then it adds the class*/

function creatActiveSection() 
{
  //menu element variable to make the menu elements active as it's in the intersecting 
  let menuElement = Array.from(document.getElementsByTagName("li"));

  const observer = new IntersectionObserver(sections => {
    sections.forEach(section => {

      //get the id for styling the list element later
     let idNum = section.target.getAttribute("id");

      if (section.isIntersecting) 
      {
        //adding active class in section
        section.target.classList.add("your-active-class");
        
        //adding style to the list with the section id
        menuElement[idNum-x].classList.add("active_intersection");
      }
      //incase not intersecting remove classes
      else 
      {
        section.target.classList.remove("your-active-class");
        menuElement[idNum-x].classList.remove("active_intersection");
      }
    })
  }, //threshold value equal 50% of the view port 
  {threshold: 0.5});

  allSections.forEach(section => { observer.observe(section) });
}

// Scroll to anchor ID using scrollTO event
//go up function for go up button
function goUp(){
  button.addEventListener("click", function() {
    window.scrollTo({
      top: 5,
    })
  })
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
//calling the dynamic function to creat the orignal list in navagation bar that contians 3 sections:-
creatingListElement();

// Scroll to section on link click
goUp();

// Set sections as active
/* Add class active to section viewport
seting interval for the function in case adding new section 
go and activiate the function with the new section
*/
setInterval(creatActiveSection,300);

/*smooth scroll  arrow function 
using add event listener on the nav element to handle the element by 
scroll into view method*/

navMenu.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (e.target.classList.contains("menu__link")) 
  {
    let targetID = e.target.getAttribute("href")[1];
    document.getElementById(targetID).scrollIntoView
    ({
      behavior: 'smooth'
    });
  }
});




