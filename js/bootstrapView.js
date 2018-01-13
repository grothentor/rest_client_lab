displayDataInHtml = (elementId, data) => {
    let element = document.getElementById(elementId);
    element.innerText = '';
    if (data instanceof Array) {
        renderList(element, data);
    } else {
        renderBook(element, data);
    }
};

const renderBook = (element, book) => {
    let fieldTitles = {
        title: 'Title',
        author: 'Author',
        pagesCount: 'Pages',
        description: 'Description',
    };

    const bookView = document.createElement('dl');
    bookView.classList.add('dl-horizontal');

    Object.keys(fieldTitles).map(field => {
        const title = document.createElement('dt');
        title.innerText = fieldTitles[field];
        const value = document.createElement('dd');
        value.innerText = book[field];
        bookView.appendChild(title);
        bookView.appendChild(value);
    });

    element.appendChild(bookView);
};

const renderList = (element, books) => {
    let fieldTitles = {
        id: 'Id',
        title: 'Title',
        author: 'Author',
        pagesCount: 'Pages',
    };

    const table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-striped');

    const header = document.createElement('thead');
    const headerRow = document.createElement('tr');

    Object.keys(fieldTitles).map(field => {
        const title = document.createElement('th');
        title.innerText = fieldTitles[field];
        headerRow.appendChild(title);
    });

    table.appendChild(header);
    header.appendChild(headerRow);

    const body = document.createElement('tbody');
    books.map(book => {
        const row = document.createElement('tr');
        Object.keys(fieldTitles).map(field => {
            const value = document.createElement('td');
            value.innerText = book[field];
            row.appendChild(value);
        });
        body.appendChild(row);
    });

    table.appendChild(body);
    element.appendChild(table);
};
