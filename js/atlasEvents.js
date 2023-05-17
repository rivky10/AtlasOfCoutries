import { createCountry, createCountriesCards, createCountriesStart } from "./atlasManager.js";

export const declareEvents = () => {
    document.querySelector("#id_search").addEventListener("input", () => {
        let search_value = document.querySelector("#id_search").value;
        console.log(search_value);
        createCountriesCards(search_value);
    })

    let a = document.querySelectorAll(".a-link");
    a.forEach(element => {
         element.addEventListener("click", () => {
        let name = element.getAttribute("data-country");
        console.log(name);
        createCountry(name);
    })
    });
   

    let select_box = document.querySelector("#id_select");
    select_box.addEventListener("change", () => {
        document.querySelector("#id_search").value = select_box.value;
        createCountry(select_box.value);
    })

    let id_home = document.querySelector("#id_home");
    id_home.addEventListener("click", () => {
        createCountriesStart();
    })

}

