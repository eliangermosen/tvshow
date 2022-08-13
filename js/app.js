const d = document,
    $shows = d.getElementById("shows"),
    $template = d.getElementById("show-template").content,
    $fragment = d.createDocumentFragment(),
    // $card = d.getElementById("card"),
    $btnsearch = d.getElementById("btn-search"),
    $loader = d.querySelector(".loader");
    // $infoTemplate = d.getElementById("info-template");
    // $card = d.querySelector(".container-card");

let showSearch = "",
    showSearchById = "";

const getAllData = async () => {
    try {

        $loader.style.display = "flex";

        let apiAll = `https://api.tvmaze.com/shows`,
            res = await fetch(apiAll),
            json = await res.json();

        // console.log(apiAll, res, json);
        console.log(json);
        
        //si el parametro ok de la respuesta es falsa lanza el objeto
        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        json.forEach(el => {
            // console.log(el);
            // console.log(el.show);
            $template.querySelector("article").id = el.id;
            // dentro del template busca el h2 y en el textContent pon el nombre del show
            $template.querySelector("h2").textContent = el.name;
            // si no tiene imagen le asigno una no encontrada de la misma api
            $template.querySelector("img").src = el.image ? el.image.medium : "http://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            $template.querySelector("img").id = el.id;
            $template.querySelector("img").alt = el.name;

            // $template.querySelector("small").textContent = el.rating.average;
            $template.querySelector("small").innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z" />
            </svg> ${el.rating.average ? el.rating.average : 0}`;

            //importo el nodo template y el true es para que copie la estructura completa del template
            let $clone = d.importNode($template, true);

            //agregamos como hijo al clon
            $fragment.appendChild($clone);

            $loader.style.display = "none";
        });

        //antes de agregar el resultado 
        $shows.innerHTML = "";
        //apendchild agrega despues del ultimo elemento
        $shows.appendChild($fragment);

    } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrio un Error";
        $loader.style.display = "none";
    }
}

// search by params: https://api.tvmaze.com/search/shows?q=stranger
const getByParams = async (e)=> {
    try {

        $loader.style.display = "flex";

        let apiParams = `https://api.tvmaze.com/search/shows?q=${showSearch}`,
            res = await fetch(apiParams),
            json = await res.json();

        console.log(apiParams, res, json);

        //si el parametro ok de la respuesta es falsa lanza el objeto
        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        if (json.length === 0) {
            $shows.innerHTML = `<h2 class="text-w">There are no show results for the search criteria <span class="criteria">${showSearch}</span></h2>`;
        } else {
            json.forEach(el => {
                $template.querySelector("article").id = el.show.id;
                // dentro del template busca el h3 y en el textContent pon el nombre del show
                $template.querySelector("h2").textContent = el.show.name;
                //el summary como viene en HTML se le agrega 
                $template.querySelector("img").src = el.show.image ? el.show.image.medium : "http://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                $template.querySelector("img").id = el.show.id;
                $template.querySelector("img").alt = el.show.name;

                $template.querySelector("small").innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z" />
                    </svg> ${el.show.rating.average ? el.show.rating.average : 0}`;

                //importo el nodo template y el true es para que copie la estructura completa del template
                let $clone = d.importNode($template, true);

                //agregamos como hijo al clon
                $fragment.appendChild($clone);
            });

            //antes de agregar el resultado
            $shows.innerHTML = "";
            //apendchild agrega despues del ultimo elemento
            $shows.appendChild($fragment);
            $loader.style.display = "none";
        }
    } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrio un Error";
        // $shows.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        $loader.style.display = "none";
    }
}

d.addEventListener("click", e => {
    if (e.target.closest("article .btn-search")) {
        e.preventDefault();
        console.log("click a btn");
        console.log(document.querySelector(".input").value.toLowerCase());
        showSearch = document.querySelector(".input").value.toLowerCase();
        console.log(showSearch);
        getByParams();
    }
    else if(e.target.closest(".container-card")){
        e.preventDefault();
        console.log("click card");
        console.log(e.target.id);
        showSearchById = e.target.id;
        console.log(showSearchById);
        console.log(window.location);
        // console.log(`${window.location.pathname}show.html/${showSearchById}`);
        // FUNCIONA
        const url = new URL(`http://127.0.0.1:5500/show.html`);
        url.searchParams.append("id", showSearchById);
        url.searchParams.get("id");
        console.log(url);
        console.log(url.searchParams.get("id"));
        console.log(url.href);
        d.location.href = url.href;
    }
})

d.addEventListener("DOMContentLoaded", e => getAllData());
