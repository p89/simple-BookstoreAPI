$(function () {
    var $form = $('#bookAdd');
    var $bookList = $('#booksList');
    let $bookEditSelect = $('#bookEditSelect');
    let $editForm = $('#bookEdit');
    let $editBookId = $('#editId');
    let $editBookTitle = $('#editTitle');
    let $editBookDesc = $('#editDescription');
    let $editBookAuthor = $('#author_id_edit');
    let $authorEditSelect = $('#authorEditSelect');
    let $authorSelectList = $('#authorIdSelect');


    function populateBookList () {

        $.ajax({
            url: '../rest/rest.php/book',
            type: 'GET'
        })
        .done(function (response) {

            [...response.success].forEach( function (status) {
                let option = `<option value="${status.id}">${status.title}</option>`;
                $bookEditSelect.append(option);
            })
        })
        .fail(function (error) {
            console.log('Populate book error', error);
        });
    }

    //populateBookList();

    /// unify both functions to PopulateXList /////
    /////////////////////////////////////////////////

    function populateAuthorList (target, authorId) {

        $.ajax({
            url: '../rest/rest.php/author',
            type: 'GET'
        })
            .done(function (response) {

                [...response.success].forEach( function (status) {
                    let option = `<option value="${status.id}">${status.name} ${status.surname}</option>`;

                    if (status.id == authorId) {
                        option = `<option value="${status.id}" selected>${status.name} ${status.surname}</option>`;
                    }
                    target.append(option);
                })
            })
            .fail(function (error) {
                console.log('Populate author error', error);
            });
    }

    populateAuthorList($authorSelectList);


    function fillEditForm(targetId) {

        $editForm.css('display', 'block');

        $.ajax({
                url: '../rest/rest.php/book/' + targetId,
                type: 'GET'
        })
        .done(function (response) {

            $editBookAuthor.empty();
            populateAuthorList($editBookAuthor, response.success[0].author.id);
            $editBookTitle.val(response.success[0].title);
            $editBookId.val(response.success[0].id);
            $editBookDesc.val(response.success[0].description);

        })
        .fail(function (error) {
            console.log('Filling form error', error);
        });
    }

    $editForm.on('submit', function (event) {
        event.preventDefault();

        var title = $editBookTitle.val(),
            description = $editBookDesc.val(),
            bookId = $editBookId.val(),
            authorId = $('#author_id_edit').val();


        var newBook = {
            id: bookId,
            author_id: authorId,
            title: title,
            description: description
        };



        $
            .ajax({
                url: '../rest/rest.php/book/' + bookId,
                type: 'PATCH',
                dataType: 'json',
                data: newBook
            })
            .done(function (response) {

                console.log(newBook);
                console.log(response);
                $editForm.css('display', 'none');

                // LISTS REFRESH: child nodes of the book select list and book list are removed

                $bookEditSelect.empty();
                $bookList.empty();

                // child nodes are populated again

                getBooks();
            })
            .fail(function (error) {
                console.log('Update book error', error);
                console.log('Author id attr:', $('#author_id_edit').attr("authorId"));
                console.log('Author id val:', );

            });
    });

    $bookEditSelect.on('change', function() {
        let bookId = this.value;
        fillEditForm(bookId);
    });



    $('body').on('click', '.btn-book-remove', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/book/' + id,
                type: 'DELETE'
            })
            .done(function (response) {
                that.closest('.list-group-item').remove();
            })
            .fail(function (error) {
                console.log('Delete book error', error);
            });
    });

    $('body').on('click', '.btn-book-show-description', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/book/' + id,
                type: 'GET'
            })
            .done(function (response) {
                let descElement = that.closest('.list-group-item').find('.book-description');

                descElement.text(response.success[0].description);
                $(descElement).slideToggle("slow");
            })
            .fail(function (error) {
                console.log('Create book error', error);
            });
    });

    function getBooks() {
        $
            .ajax({
                url: '../rest/rest.php/book',
                type: 'GET'
            })
            .done(function (response) {
                [...response.success].forEach( function (status) {
                    renderBook(status);
                    let option = `<option value="${status.id}">${status.title}</option>`;
                    $bookEditSelect.append(option);
                })
            })
            .fail(function (error) {
                console.log('Create book error', error);
            });
    }

    function renderBook(book) {
        let string = `<li class="list-group-item">
				<div class="panel-heading">
				<span class="bookTitle">${book.title}</span>
			<button data-id="${book.id}"
		class="btn btn-danger pull-right btn-xs btn-book-remove"><i
		class="fa fa-trash"></i>
				</button>
				<button data-id="${book.id}"
		class="btn btn-primary pull-right btn-xs btn-book-show-description"><i
		class="fa fa-info-circle"></i>
				</button>
				</div>
				<div class="panel-body book-description">                      
				</div>
				</li>`;

        $bookList.html($bookList.html() + string);
    }

    $form.on('submit', function (event) {
        event.preventDefault();

        let title = $('#title').val();
        let description = $('#description').val();
        let authorId = $('#authorIdSelect option:selected').val();

        var newBook = {
            title: title,
            description: description,
            author_id: authorId
        };

        $.ajax({
                url: '../rest/rest.php/book',
                type: 'POST',
                dataType: 'json',
                data: newBook
            })
            .done(function (response) {
                renderBook(response.success[0]);
                $bookEditSelect.empty();
                populateBookList();
            })
            .fail(function (error) {
                console.log('Create book error :(', error);
            });
    });

    getBooks();
});