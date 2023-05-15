import CountryClass from "./countryClass.js";

let counties_ar = [];
let arr_name_countries = [];

export const doApi = async () => {
    try {
        let url = `https://restcountries.com/v3.1/all`;
        let resp = await fetch(url);
        let data = await resp.json();
        counties_ar = data;
        counties_ar = _.sortBy(counties_ar, "name.common")
        console.log(data);
        let a = document.querySelectorAll("a");
        a.forEach(element => {
            arr_name_countries.push(element.getAttribute("data-country"));
        });
        createCountriesStart();
        // console.log(arr_name_countries);
        showSelect();
    } catch (error) {
        console.log(error);
    }

}

export const getCountryByCode = async(_code_country) => {
    try{
        let url = `https://restcountries.com/v3.1/alpha/${_code_country}`;
        let resp = await fetch(url);
        let data = await resp.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
}

export const createCountry = (_name_country) => {
    document.querySelector("#id_parent").innerHTML = "";
    let country_data = counties_ar.find(c => c.name.common.toLowerCase() == _name_country.toLowerCase())
    // console.log(counties_ar);
    // console.log(country_data);
    let country = new CountryClass("#id_parent", country_data, createCountry, getCountryByCode);
    country.render();
}

export const createCountriesCards = (_input) => {
    document.querySelector("#id_parent").innerHTML = "";
    console.log(_input);
    let arr = counties_ar.filter((item) =>
        item.name.common.toLowerCase().includes(_input.toLowerCase())
  );

  console.log(arr);

  if (arr.length == 0) {
    document.querySelector("#id_parent").innerHTML = `
    <div class="display-3">Country ${_input} not found :(</div>`;
  }
  else {
    arr.forEach(element => {
        let country = new CountryClass("#id_parent", element, createCountry, getCountryByCode);
        country.renderCountry();
      });
  }
}

export const createCountriesStart = () => {
    document.querySelector("#id_parent").innerHTML = "";

    let arr = counties_ar.filter((item) =>
    arr_name_countries.includes(item.name.common.toLowerCase())
  );

  arr.forEach(element => {
    let country = new CountryClass("#id_parent", element, createCountry, getCountryByCode);
    country.renderCountry();
  });
}

export const showSelect = () => {
    let select_box = document.querySelector("#id_select");
    counties_ar.forEach(item => {
        select_box.innerHTML += `
        <option value="${item.name.common}">${item.name.common}</option>`;
    })
}