$(function () {

    let $form = $('#authorAdd');
    let $authorList = $('#authorsList');
    let $authorEditSelect = $('#authorEditSelect');
    let $authorEditForm = $('#authorEdit');
    let $editAuthorNameField = $('#editAuthorNameField');
    let $editAuthorSurnameField = $('#editAuthorSurnameField');
    let $editAuthorId = $('#editAuthorId');





    $form.on('submit', function (event) {
        event.preventDefault();

        let name = $('#authorNameAdd').val();
        let surname = $('#authorSurnameAdd').val();

        let newAuthor = {
            name: name,
            surname: surname
        };

        $
            .ajax({
                url: '../rest/rest.php/author',
                type: 'POST',
                dataType: 'json',
                data: newAuthor
            })
            .done(function (response) {
                renderAuthor(response.success[0]);
            })
            .fail(function (error) {
                console.log('Create author error', error);
            });
    });


    $('body').on('click', '.btn-author-books', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/author/' + id,
                type: 'GET'
            })
            .done(function (response) {

                let descElement = that.closest('.list-group-item').find('.authorBooksList');
                $(descElement).empty();

                if (response.success[0].books.length < 1) {
                    let itemLi = `<li>This author has no books assigned.</li>`;
                    descElement.append(itemLi);
                }
                else
                {
                    [...response.success[0].books].forEach( function (status) {
                        let itemLi = `<li>${status.title}</li>`;
                        descElement.append(itemLi);
                    });
                }

                $(descElement).slideToggle("slow");

            })
            .fail(function (error) {
                console.log('Create book error', error);
            });
    });



    function fillAuthorEditForm(targetId) {

        $authorEditForm.css('display', 'block');

        $.ajax({
            url: '../rest/rest.php/author/' + targetId,
            type: 'GET'
        })
            .done(function (response) {

                console.log(response.success[0].id);
                $editAuthorNameField.val(response.success[0].name);
                $editAuthorId.val(response.success[0].id);
                $editAuthorSurnameField.val(response.success[0].surname);
                $authorEditSelect.attr("authorId", response.success[0].id);
            })
            .fail(function (error) {
                console.log('Filling form error', error);
            });
    }

    $authorEditForm.on('submit', function (event) {
        event.preventDefault();

        let name = $editAuthorNameField.val();
        let surname = $editAuthorSurnameField.val();
        let authorId = $editAuthorId.val();

        let newAuthor = {
            id: authorId,
            name: name,
            surname: surname
        };

        $
            .ajax({
                url: '../rest/rest.php/author/' + authorId,
                type: 'PATCH',
                dataType: 'json',
                data: newAuthor
            })
            .done(function (response) {

                console.log(response);
                $authorEditForm.css('display', 'none');

                // LISTS REFRESH: child nodes of the book select list and book list are removed

                $authorEditSelect.empty();
                $authorList.empty();

                // child nodes are populated again

                getAuthors();
            })
            .fail(function (error) {
                console.log('Update book error', error);
            });
    });

    $authorEditSelect.on('change', function() {
        let authorId = this.value;
        fillAuthorEditForm(authorId);
    });


    function getAuthors() {
        $
            .ajax({
                url: '../rest/rest.php/author',
                type: 'GET'
            })
            .done(function (response) {

                [...response.success].forEach( function (status) {
                    renderAuthor(status);
                    let option = `<option value="${status.id}">${status.name} ${status.surname}</option>`;
                    $authorEditSelect.append(option);
                });

            })
            .fail(function (error) {
                console.log('Create book error', error);
            });
    }

    function renderAuthor(author) {
        let string = `<li class="list-group-item">
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="authorTitle">${author.name} ${author.surname}</span>
                                    <button data-id="${author.id}" class="btn btn-danger pull-right btn-xs btn-author-remove"><i
                                                class="fa fa-trash"></i></button>
                                    <button data-id="${author.id}" class="btn btn-primary pull-right btn-xs btn-author-books"><i
                                                class="fa fa-book"></i></button>
                                </div>
                                <ul class="authorBooksList"></ul>
                            </div>
                        </li>`;

        $authorList.html($authorList.html() + string);
    }

    $('body').on('click', '.btn-author-remove', function () {
        let id = $(this).data('id');
        let that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/author/' + id,
                type: 'DELETE'
            })
            .done(function (response) {
                that.closest('.list-group-item').remove();
            })
            .fail(function (error) {
                console.log('Delete book error', error);
            });
    });

    getAuthors();
});