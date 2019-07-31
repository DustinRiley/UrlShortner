$(function ready() {

    $("#shortenForm").submit(function (event) {
        event.preventDefault();
        
        urlData = JSON.stringify({url:$('#urlInput').val()})
        $.ajax({
            url: '/short',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: urlData,
            success: function (json, status, request) {
                if(json.status=='Success'){
                    $('#short-url-id').val(json.shorturl);
                    $('#myTooltip').text('Click To Copy');
                }
            },
            error: function (request, status) {
                console.log(status +" " +JSON.stringify( request));
            }
        });
    });

   
});

/**
 * Copies the text of an element to the clipboard 
 * 
 * @param {Element} elem elements text you want copied
 */
function copyElem(elem){
    var copyText = $(elem);
    copyText.select();
    document.execCommand("copy");
    $('#myTooltip').text('URL Has Been Copied');
}