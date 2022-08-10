const d = document,
    $infoTemplate = d.querySelector(".container-show");
    // $infoTemplate = d.getElementById("info-template");

let id = "",
    $show = "";

//search by id para cuando le de click: https://api.tvmaze.com/shows/5
const getById = async e => {
    console.log("pasando datos");
    const url = new URL(window.location);
    console.log(url);
    console.log(url.searchParams.get("id"));
    id = url.searchParams.get("id");
    try {
        let apiById = `https://api.tvmaze.com/shows/${id}`,
            res = await fetch(apiById),
            json = await res.json();

        // console.log(apiById, res, json);
        console.log(json);

        //si el parametro ok de la respuesta es falsa lanza el objeto
        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        $show = `
            <article lass="info-show">
                    <h2 class="ff-krona name-show text-w element">${json.name}</h2>
                    <figure class="test">
                        <img src="${json.image ? json.image.medium : "http://static.tvmaze.com/images/no-img/no-img-portrait-text.png"}" alt="Cover of ${json.name}">
                    </figure>
                    <p class="text-w content-prem-rat element">
                        <span>${json.premiered.slice(0,4)}</span>
                        <span class="separator">·</span>
                        <span>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z" />
                            </svg>
                        </span>
                        <span> ${json.rating.average ? json.rating.average : 0}</span>
                    </p>
                    <div class="text-w content-genres element">
                        <span>${json.genres[0]}</span>
                        <span>${json.genres[1]}</span>
                        <span>${json.genres[2]}</span>
                    </div>
                    <div class="summary-space text-w element">${json.summary}</div>
                </article>
                <figure class="figure-show element">
                    <img src="${json.image ? json.image.medium : "http://static.tvmaze.com/images/no-img/no-img-portrait-text.png"}" alt="Cover of ${json.name}">
                </figure>
        `;

        $infoTemplate.innerHTML = $show;

    } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrio un Error";
    }
}

d.addEventListener("DOMContentLoaded", e => getById());