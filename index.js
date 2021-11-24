let paragraphs = document.getElementsByTagName("p");

console.log(paragraphs);

if(paragraphs >0){
    let paragraph_change = paragraphs[0]; //Asignando el item 0 a paragraph_change
    paragraph_change.innerText = "Bienvenidos al Bootcamp - Texto cambiado con Javascript";
    //Se cambió el contenido de paragraphs[0]
}