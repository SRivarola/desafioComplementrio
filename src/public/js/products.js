function nextPage(hasNextPage, nextPage) {
    if(hasNextPage) {
        const location = window.location.href
        const query = location.split('?')
        const title = query[1] ? query[1].includes('title') : false
        window.location.href = `/products/${title ? ('?',query[1],'&') : ''}?page=${nextPage}`
    } 
}

function prevPage(hasPrevPage, prevPage) {
    if(hasPrevPage) {
        const location = window.location.href
        const query = location.split('?')
        const title = query[1].includes('title')
        window.location.href = `/products/${title ? ('?',query[1],'&') : ''}?page=${prevPage}` 
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