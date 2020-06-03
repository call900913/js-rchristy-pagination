/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/

const lis = document.querySelectorAll('.student-item');

// number of items to be shown per page
const numofitems = 10;

// create container element div
const paginationLinks = document.createElement("div");
paginationLinks.className = "pagination";

/***
   showPage function
   hide all of the items in the list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/


const showPage = (list, page) => {
  let startindex = page * numofitems - numofitems;
  let endindex = page * numofitems;
  for (i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
    if ((i >= startindex) && (i < endindex)) {
      list[i].style.display = '';
    };
  };
};


/***
   appendPageLinks function
   generate, append, and add functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
  let pageNumber = 1;
  showPage(list, pageNumber);

  const page = document.querySelector(".page");
  paginationLinks.innerHTML = "";
  // create the unordered list
  const pageLinks = document.createElement("ul");

  // number of pages
  const numofpages = Math.ceil(list.length / numofitems);

  for (i = 0; i < numofpages; i++) {
    let pageLink = document.createElement("li");
    if (i == pageNumber-1) {
      pageLink.innerHTML = `<a class="active" href="#">${i+1}</a>`;
    } else {
      pageLink.innerHTML = `<a href="#">${i+1}</a>`;
    };
    pageLinks.appendChild(pageLink);
  };

  // append UL to DIVpagination
  paginationLinks.appendChild(pageLinks);

  // append DIVpagination to .page
  page.appendChild(paginationLinks);

  // add on click event listener, highlight number box there
  paginationLinks.addEventListener('click', (e) => {
    let prevButton = document.querySelector(".active");
    prevButton.className = "";
    selectedPage = e.target.textContent;
    // change the class
    e.target.className = "active";
    showPage(list, Number(selectedPage));
  });


  /***
  create the node

    document.queryselector(.page).appendChild()
    1) determine page number
    2) highlight that number box
    3) determine how many boxes there are going to be
    4) display the boxes
    5) show the page with showPage


    what changes when someone clicks:
    pageNumber
    showPage changes
    the className
  ***/
}

const searchTerm = () => {
  filteredStudents = [];
  if (searchString.length === 0) {
    appendPageLinks(lis);
  } else {
    // do something here for filteredStudents
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.display = 'none';
      let name = lis[i].querySelector('h3').textContent;
      // console.log("name: " + name);
      // console.log("name.includes(searchString): " + name.includes(searchString))
      if (name.includes(searchString)) {
        console.log("lis[i]" + lis[i].style)
        lis[i].style.display = '';
        filteredStudents.push(lis[i]);
      }
    }
    console.log(lis);
    console.log(searchString);
    for (let j = 0; j < filteredStudents.length; j++) {
      filteredStudents[j].style.display = 'none';
      console.log(filteredStudents.style)
    }
    appendPageLinks(filteredStudents);
  };
};

const addSearchFeature = () => {
  // create the container div
  const searchDiv = document.createElement("div");
  searchDiv.className = "student-search";
  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search for students... ";
  searchInput.addEventListener('input', () => {
    searchString = searchInput.value;
    searchTerm();
  });
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchDiv.append(searchInput, searchButton);
  const pageHeader = document.querySelector(".page-header");
  pageHeader.appendChild(searchDiv);
}

appendPageLinks(lis);
addSearchFeature();



/*

// go over the student list
// if the thing contains the searchTerm, add the item to filteredStudents.
//

 */
