
//Search Book with book name in searchbook()

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    toggleSpinner('block');
    toggleSearchDetails('none');
    toggleNoSearchResult('none');
    getData(url);

   
    
}

//get data form API using fetch
const getData = url => {

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data));

}

//toggleSpinner() for display spinner off or on
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//this function using for display overall search details into the screen
const toggleSearchDetails = displayStyle => {
    document.getElementById('search-details').style.display = displayStyle;
}




//calculate search result into the function
const displaySearchResult = books => {

    //cheacking numFound have or not.
    if (!books.numFound) {
        toggleNoSearchResult('block');
        toggleSpinner('none');
    } else {
        
    const searchResult = document.getElementById('search-result');

    searchResult.textContent = '';

    const booksList = books.docs;

    
    // Looping into all books item    
    booksList.forEach(book => {
       
        if (book.cover_i !== undefined && book.author_name !== undefined) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top">
                <div class="card-body ps-1">
                    <h5 class="card-title">${book.title}</h5>
                    <p><span class='fw-bold'>Author:</span> ${book.author_name[0]}<p>
                    <h6>First Publish: ${book.first_publish_year}<h6>
                </div>
            </div>
            `
            searchResult.appendChild(div);
        }
    
    })
    
    toggleSpinner('none');
    toggleSearchDetails('block');
    displayTotalResultInfo(books.numFound)

    }

}


//declare extra result info
const displayTotalResultInfo = (numFound) => {
    const totalResult = document.getElementById('total-result')
    totalResult.style.display = 'block';

    const resultFound = document.getElementById('result-found');
    
    resultFound.innerText = '';
    resultFound.innerText = numFound;


    const footer = document.getElementById('footer');
    footer.style.display = 'block'
}

//declare noSearchResult function
const toggleNoSearchResult = (displayStyle) => {
    document.getElementById('no-result').style.display = displayStyle;
}

