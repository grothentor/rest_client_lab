/** Url for work with books */
const apiUrl = 'https://djamaco-restful-api.herokuapp.com/books';

/**
 *  Save book on server
 */
const saveBook = (event) => {
    event.preventDefault();
    const formData = getFormFields('createForm');

    axios
        .post(apiUrl, formData)
        .then((response) => {
             clearForm('createForm');
             alert('Book was created');
        })
        .catch(errorHandler);
};

/**
 * Update existing book
 * @param event default click event
 */
const editBook = (event) => {
    // prevent form submitting
    event.preventDefault();
    const formData = getFormFields('editForm');

    if (formData.id) {
        axios
            .put(`${apiUrl}/${formData.id}`, formData)
            .then((response) => {
                clearForm('editForm');
                alert('Book was updated');
            })
            .catch(errorHandler);
    } else {
        errorHandler({ message: 'First get book with button above' })
    }
};

/**
 * Get list of books from server
 */
const getBooks = () => {
    axios.get(apiUrl).then((response) => {
        displayDataInHtml('displayBooks', response.data);
    }, errorHandler)
};

/**
 * Get book by Id and display it.
 * It has more fields than book in list of books.
 */
const getBookById = () => {
    const bookId = getBookId('getId');
    if (bookId) {
        getBook(bookId)
            .then((response) => {
                displayDataInHtml('displayBook', response.data)
            })
            .catch(errorHandler);
    }
};

/**
 * Get book by Id and fill with it form for editing
 */
const getBookForEdit = () => {
    const bookId = getBookId('getForEditId');
    if (bookId) {
        getBook(bookId)
            .then((response) => {
                const book = response.data;
                Object.keys(book).map((field) => {
                    document.getElementById(`${field}Edit`).value = book[field];
                })
            })
            .catch(errorHandler);
    }
};

/**
 * Delete book by id
 */
const deleteBookById = () => {
    const bookId = getBookId('deleteId');
    if (bookId) {
        axios
            .delete(`${apiUrl}/${bookId}`)
            .then(() => {
                alert(`Book with id ${bookId} was deleted`);
            })
            .catch(errorHandler);
    }
};

/**
 * load book from server by id
 *
 * @param bookId
 * @returns Promise
 */
const getBook = (bookId) => {
    return axios.get(`${apiUrl}/${bookId}`);
};

/**
 * get book id from html element by it's id
 *
 * @param elementId
 * @returns int|boolean
 */
const getBookId = (elementId) => {
    const bookId = document.getElementById(elementId).value;
    if (bookId) {
        return bookId;
    } else {
        errorHandler({ message: 'First get book with button above' });
        return false;
    }
};

/**
 * process errors from server response
 * @param response
 */
const errorHandler = (response) => {
    let message = '';

    if (response.response &&
        response.response.data &&
        response.response.data.message
    ) {
        message = response.response.data.message;
    } else if (response.message) {
        message = response.message;
    }

    if (message) {
        alert(message);
    } else {
        alert('Server error');
    }
};

/**
 * display data in html element by its id
 *
 * @param elementId
 * @param data
 */
let displayDataInHtml = (elementId, data) => {
    document.getElementById(elementId).innerText = JSON.stringify(data, "\t", 2);
};

/**
 * get all input values from form by its id
 *
 * @param elementId
 * @returns object
 */
const getFormFields = (elementId) => {
    const formData = new FormData(document.getElementById(elementId));
    let jsonForm = {};
    let numberFields = ['pagesCount'];

    formData.forEach((value, key) => {
        if (numberFields.includes(key)) {
            value = Number.isInteger(+value) ? +value : value;
        }
        if (value) {
            jsonForm[key] = value;
        }
    });
    return jsonForm;
};

/**
 * clear inputs in form by its id
 * @param elementId
 */
const clearForm = (elementId) => {
    document.getElementById(elementId).reset();
    let idElement = document.querySelector(`#${elementId} [name="id"]`);
    if (idElement) {
        idElement.value = "";
    }
};
