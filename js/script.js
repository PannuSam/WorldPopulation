document.addEventListener("DOMContentLoaded", function() {
    var count = 1;
    let len = 0;
    const totalPopulation = document.getElementById("totalPopulation");
    const allCountries = document.getElementById("allCountries");
    const searchbutton = document.getElementById("searchbutton");
    const textwp = document.getElementById("text-wp");
    const countrypopulation = document.getElementById("countriesPopulation");
    totalPopulation.addEventListener("click", function() {
        totalPopulationfunc();
    });

    allCountries.addEventListener("click", function() {
        console.log("inside allCountries function");
        if (len >= 1 || count > 1) {
            for (var i = countrypopulation.rows.length - 1; i > 0; i--) {
                countrypopulation.deleteRow(i);
            }
        }
        count = 1;
        allCountriesfunc();

    });

    searchbutton.addEventListener("click", function() {
        console.log("inside searchbutton function" + len + "count" + count);
        if (len >= 1 || count > 1) {
            console.log("yeeee");
            for (var i = countrypopulation.rows.length - 1; i > 0; i--) {
                countrypopulation.deleteRow(i);
                count -= 1;
            }
        }
        searchfun();
    });

    window.onload = function() {
        var reload = sessionStorage.getItem("reload");
        if (reload) {
            sessionStorage.removeItem("reload");
            searchfun();
        }
    }

    function reloadFirst() {
        sessionStorage.setItem("reload", "true");
        document.location.reload();
    }

    function totalPopulationfunc() {
        console.log("inside totalPopulationfunc function");
        fetch("https://world-population.p.rapidapi.com/worldpopulation", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "world-population.p.rapidapi.com",
                    "x-rapidapi-key": "a5772cc4dfmshb29504597ef65bep1f777ejsne4a87dbdf3c2"
                }
            })
            .then((response) => response.json())
            .then(response => {

                displayPopulation(response);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function displayPopulation(resp) {
        console.log("inside displayPopulation function");
        textwp.textContent = "Current Total Population is : " + `${resp.body.world_population}`;


    }

    function allCountriesfunc() {
        console.log("inside allCountriesfunc function");
        fetch("https://world-population.p.rapidapi.com/allcountriesname", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "world-population.p.rapidapi.com",
                    "x-rapidapi-key": "a5772cc4dfmshb29504597ef65bep1f777ejsne4a87dbdf3c2"
                }
            })
            .then((response) => response.json())
            .then(response => {
                displayAllCountries(response);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function displayAllCountries(resp) {
        console.log("inside displayAllCountries function");
        len = resp.body.countries.length;
        for (let count of resp.body.countries) {
            checkByCountry(count, len);
        }
    }

    function checkByCountry(count, len) {
        console.log("inside checkByCountry function");
        fetch("https://world-population.p.rapidapi.com/population?country_name=" + count, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "world-population.p.rapidapi.com",
                    "x-rapidapi-key": "a5772cc4dfmshb29504597ef65bep1f777ejsne4a87dbdf3c2"
                }
            })
            .then((response) => response.json())
            .then(response => {
                displayCountry(response, len);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function displayCountry(resp, len) {
        console.log("inside displayCountry function");
        var table = document.getElementById('countriesPopulation');
        if (count < len && resp.body.country_name) {
            document.getElementById('countriesPopulation').style.display = 'block';
            var row = table.insertRow(1);
            var no = row.insertCell(0);
            var name = row.insertCell(1);
            var pop = row.insertCell(2);
            var rank = row.insertCell(3);
            var share = row.insertCell(4);
            no.innerHTML = count;
            count += 1;
            console.log("response" + `${resp.body.country_name}` + "   " + `${resp.body.population}` + "  " + `${resp.body.ranking}` + "   " + `${resp.body.world_share}`)
            name.innerHTML = `${resp.body.country_name}`;
            pop.innerHTML = `${resp.body.population}`;
            rank.innerHTML = `${resp.body.ranking}`;
            share.innerHTML = `${resp.body.world_share}`;
        }
    }

    function searchfun() {
        console.log("inside searchfun function");
        filter = search.value;
        if (filter) {
            checkByCountry(filter, 2);
        }
    }
});