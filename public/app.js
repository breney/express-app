$(document).ready(function () {

    function editRequest(id, resource, data) {
        return $.ajax({
            url: `/api/${resource}/${id}`,
            method: 'POST',
            data: data,
        })
    }


    function deleteRequest(id, resource) {

        if(!confirm('Tens a certeza?')) {
            return;
        }

        return $.ajax({
            url: `/api/${resource}/${id}`,
            method: 'DELETE',
        })
    }


    $('.edit-request').click(function (event) {
        event.preventDefault();
        editRequest($(this).data('id'), $(this).data('resource'), $(this).data('info'));
    });

    $('.delete-request').click(function (event) {
        event.preventDefault();
        deleteRequest($(this).data('id'), $(this).data('resource'))
            .then(_ => location.reload());

    });
});
