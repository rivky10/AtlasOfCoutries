export default class CountryClass {
    constructor(_parent, _item, _createCountry, _getCountryByCode) {
        this.createCountry = _createCountry;
        this.getCountryByCode = _getCountryByCode;

        this.parent = _parent;
        this.name = _item.name.common;
        this.flag = _item.flags.png;
        this.pop = _item.population.toLocaleString();
        this.region = _item.region;
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        this.coin = _item.currencies ? Object.keys(_item.currencies) : "none";
        this.coinDescription = _item.currencies ? Object.values(_item.currencies)[0].name : "none";
        this.capital = _item.capital ? _item.capital : "none";
        this.map = _item.latlng;
        this.borders = _item.borders;
        // this.shortTofullCountry = shortTofullCountry
    }

    renderCountry(){
        document.querySelector(this.parent).className = "row row-cols-1 row-cols-md-3 g-4 justify-content-center mt-5";
        let div = document.createElement("div");
        div.className = "col";
        div.style.cursor = "pointer";
        document.querySelector(this.parent).append(div);

        div.innerHTML += `
        <div class="card h-100 cardCountry" data-aos="zoom-in" data-aos-duration="3000">
        <img src="${this.flag}" class="card-img-top border-bottom border-2" width="100%" height="200px" alt="${this.name}">
        <div class="card-body">
            <h5 class="card-title text-center display-6">${this.name}</h5>
        </div>
        </div>
        `

        div.addEventListener("click", () => {
            this.render();
        })
    }

    render(){
        document.querySelector(this.parent).innerHTML = "";
        document.querySelector(this.parent).className = "w-75 m-auto mt-5";
        let div = document.createElement("div");
        div.className = "card mb-3 cardCountryDetails"
        document.querySelector(this.parent).append(div);

        div.innerHTML = `
        <div class="row g-0 justify-content-between">
            <div class="col-md-6">
                <img src="${this.flag}" class="img-fluid rounded-start img-flag" alt="${this.name}">
            </div>
            <div class="card-body col-md-6">
                <h2 class="card-title">${this.name}</h2>
                <div class="card-text"><u>Population:</u> ${this.pop}</div>
                <div class="card-text"><u>Region:</u> ${this.region}</div>
                <div class="card-text text-wrap"><u>Languages:</u> ${this.languages}</div>
                <div class="card-text"><u>Coin:</u> ${this.coin}, ${this.coinDescription}</div>
                <div class="card-text"><u>Capital:</u> ${this.capital}</div>
                <div id="id_borders" class="card-text"><u>Borders:</u> </div>
            </div>
        </div>

        <iframe class="mt-2 col-12" height="400" src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
        `

        let id_borders = div.querySelector("#id_borders");
        if(this.borders == null) {
            id_borders.innerHTML += "There is no borders"
        }
        console.log(this.borders);
        let i = 0;
        this.borders.forEach(async (element) => {
           let countryByCode = await this.getCountryByCode(element);
           console.log(countryByCode[0].name.common);
           let span = document.createElement("span");
           span.innerHTML = `${countryByCode[0].name.common}`;
           span.style.cursor = "pointer";
           span.style.color = "rgb(1, 74, 1)";
           id_borders.append(span);
           if (i < this.borders.length - 1){
            let s = document.createElement("span");
            s.innerHTML = " | ";
            s.style.color = "rgb(1, 74, 1)";
            span.append(s);
            s.style.fontWeight = "normal";
            i++;
           } 
           else {
            span.innerHTML += ".";
           }
           
           span.addEventListener("click", () => {
            this.createCountry(countryByCode[0].name.common);
           })
        });

    }
}