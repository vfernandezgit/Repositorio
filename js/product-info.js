

function showProductsImages(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productInfoImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComment(array) {
    let htmlContentToAppend = []

    for(let i= 0; i < array.length; i++) {
        let comment = array [i];

        let starsChecked = `<span class="fa fa-star checked"></span>`.repeat(comment.score)
        let starsUnchecked = `<span class="fa fa-star"></span>`. repeat(5 - comment.score)

        htmlContentToAppend +=

        `<div>
            <p>Calificación de ` + comment.user + '&nbsp;&nbsp;&nbsp;' + starsChecked + starsUnchecked + `</p>
            <div><i>`+ comment.description +`</i><br>`+ comment.dateTime +`<hr> </div>
            </div>
        `

        document.getElementById("productComments").innerHTML = htmlContentToAppend;
    };
};


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productPriceHTML = document.getElementById("productPrice");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldHTML = document.getElementById("productSold")
            let productCriteriaHTML = document.getElementById("productCriteria");
    
            productNameHTML.innerHTML = product.name;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productSoldHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showProductsImages(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comment = resultObj.data;

            showComment(comment);
        }
    });

    $("#sendComment").click(function(){
        let addComment = {
            "user": $("#userComment").val(),
            "date": $("#dateTime").val(),
            "score": $("#score").val(),
            "body": $("#newComment").val(),
        };
    });
});







