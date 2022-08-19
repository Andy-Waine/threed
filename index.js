const img1_input = document.querySelector('#img1-input')
var uploaded_image = "";

img1_input.addEventListener("change", function() {
    //file reader object
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
})