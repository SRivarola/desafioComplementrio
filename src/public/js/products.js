const nextButton = document.getElementById('right')
function nextPage(hasNextPage, nextPage) {
    if(!hasNextPage) {
        nextButton.setAttribute("disabled");
    } else {
        nextButton.removeAttribute("disabled");
    }
    const location = window.location.href
    const locationArray = location.split("/")
    if(locationArray[locationArray.length - 1] == "products") {
        const newLocation = location + "?page=" + nextPage
        window.location.replace(newLocation);
    } else {
        const newLocation = window.location.protocol + "//localhost:8080/products/?page=" + nextPage;
        window.location.replace(newLocation)
    }

    
}

const prevButton = document.getElementById('left');
function prevPage(hasPrevPage, prevPage) {
    if(!hasPrevPage) {
        prevButton.setAttribute("disabled");
    } else {
        prevButton.removeAttribute("disabled");
    }
    const location = window.location.href
    const locationArray = location.split("/")
    if(locationArray[locationArray.length - 1] == "products") {
        const newLocation = location + "?page=" + prevPage
        window.location.replace(newLocation);
    } else {
        const newLocation = window.location.protocol + "//localhost:8080/products/?page=" + prevPage;
        window.location.replace(newLocation)
    }
}

const filterForm = document.getElementById('filter_form')
filterForm.addEventListener('submit', handleFilterSubmit)


function handleFilterSubmit(e) {
    e.preventDefault();
    const titleInput = document.getElementById('title_input');
    const titleValue = titleInput.value;
    window.location.href = `/products?title=${titleValue}`;
}