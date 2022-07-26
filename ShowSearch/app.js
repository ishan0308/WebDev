const form = document.querySelector('#searchForm');
const shows = document.querySelector('#shows');
const class1 = 'd-flex flex-column justify-content-center align-items-center my-5'
const class2 = 'img-fluid img-thumbnail';
const class3 = 'container-fluid text-align-center fs-4 border border-3 border-dark mx-3 py-5 px-2'
const class4 = 'col-4 d-flex flex-row justify-content-center align-items-center'
const class5 = 'col-6 d-flex flex-row justify-content-center align-items-center'
const class6 = 'col-3 d-flex flex-row justify-content-center align-items-center'

const genre = (gs) => {
    let str = '';
    for (let g of gs) {
        str += g;
        str += ', ';
    }
    return str;
}
const display = (div, div2, abt, i) => {
    div.addEventListener('mouseover', function () {
        abt.style.display = 'block';
        div.className = class5;
        if (i % 3 === 0) {
            div.previousElementSibling.className = class6;
            div.previousElementSibling.previousElementSibling.className = class6;
        }
        if ((i + 1) % 3 === 0) {
            div.previousElementSibling.className = class6;
            div.nextElementSibling.className = class6;
        }
        else {
            div.nextElementSibling.className = class6;
            div.nextElementSibling.nextElementSibling.className = class6;
        }
    })
    div.addEventListener('mouseout', function () {
        abt.style.display = 'none';
        div.className = class4;
        if (i % 3 === 0) {
            div.previousElementSibling.className = class4;
            div.previousElementSibling.previousElementSibling.className = class4;
        }
        if ((i + 1) % 3 === 0) {
            div.previousElementSibling.className = class4;
            div.nextElementSibling.className = class4;
        }
        else {
            div.nextElementSibling.className = class4;
            div.nextElementSibling.nextElementSibling.className = class4;
        }
    })
}

const putNameImage = (src, title, abt, i) => {
    const div = document.createElement('div');
    div.className = class4;
    const div2 = document.createElement('div');
    div2.className = class1;
    shows.append(div);
    div.append(div2, abt);
    const image = document.createElement('img');
    image.className = class2;
    image.src = src;
    const name = document.createElement('div');
    name.style.fontSize = '20px';
    name.innerText = title;
    div2.append(image, name);
    display(div, div2, abt, i);

}

const getData = async (q) => {
    // const results = await axios.get(`https://api.tvmaze.com/search/shows?q=${q}`);
    const config = { params: { q: q } }
    const results = await axios.get('https://api.tvmaze.com/search/shows', config);
    console.log(results);
    let i = 0;
    for (let data of results.data) {
        const abt = document.createElement('div');
        abt.innerHTML = `<b>LANGUAGE</b> - ${data.show.language}<br><b>GENRES</b> - ${genre(data.show.genres)}`
        abt.className = class3;
        abt.style.display = 'none';
        abt.style.width = '200px';
        abt.style.backgroundColor = '#b7b7a4'
        if (data.show.image.medium) {
            i += 1;
            putNameImage(data.show.image.medium, data.show.name, abt, i);
        }
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    shows.innerHTML = "";
    const q = form.elements.query.value;
    getData(q);
    form.elements.query.value = "";
})