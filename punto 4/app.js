const tbody = document.querySelector('tbody');
const header = document.querySelector('header');
const selectMenu = document.getElementById('menu')
let cargando = true;
let contenido
let contenidoOficial

const fetchApi = async() => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/prodcts')
            const data = await response.json()
            if(!response.ok) {
                throw new Error(response.statusText) // yo tenia entendido que siempre una peticion traia una respuesta o un error(el cual el catch era el que le daba manejo), no entiendo porque toca crear el error segun el estado de ok?
            }
            contenidoOficial = data
            contenido = data
            showContent(data)
        } catch (error) {
            showError(error)
        }
};

const showError = (error) => {
   tbody.innerHTML = `<div>El error es: ${error.message}</div>`;
}

const showContent = (posts) => {
    tbody.innerHTML = '';
    console.time()
    for(let i = 0; i < 20 ; i++) {
        if(posts[i]) {
            tbody.innerHTML += `
            <tr>
                <th scope="row">${posts[i].title}</th>
                <td>${posts[i].category.name}</td>
                <td>${posts[i].price}</td>
                <td><img src=${posts[i].images[0]} width=130 height=150 alt=${posts[i].title}></td>
            </tr>`;
        }
        }
};



const showFound = (pelicula) => {
    if(pelicula === '') {
        contenido = contenidoOficial
    } else {
        contenido = contenido.filter((elmnt) => elmnt.title.includes(pelicula) );
    }
    showContent( contenido )
};

const showFiltered = (category) => {
    console.log(category);
    if (category) {
        let contentFiltered = contenido.filter((elmnt) => elmnt.category.name === category);
        showContent( contentFiltered );
    } else {
        showContent(contenidoOficial)
    }
};



const buttonSearch = document.createElement('button');
buttonSearch.textContent = 'buscar';
buttonSearch.addEventListener('click', (e) => {
    e.stopPropagation();
    const pelicula = document.querySelector('input').value;
    showFound(pelicula)
})
header.appendChild(buttonSearch);

selectMenu.addEventListener('change', (e) => {
    e.stopPropagation()
    showFiltered(e.target.value)

})





fetchApi()
