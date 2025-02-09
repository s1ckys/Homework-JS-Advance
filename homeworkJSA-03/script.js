async function getBorderingCountries(countryCode) {
    try {
        let response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (!response) {
            throw new Error("Failed to fetch country data");
        }
        
        let countryData = await response.json();
        let country = countryData[0];
        console.log("Country:", country);

        if (country.borders && country.borders.length > 0) {
            let borders = country.borders.join(",");
            let neighborsResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`);
            if (!neighborsResponse) {
                throw new Error("Failed to fetch neighboring countries");
            }
            
            let neighbors = await neighborsResponse.json();
            console.log("Neighbours:");
            neighbors.forEach(neighbor => console.log(neighbor));
        } else {
            console.log("No bordering countries.");
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

getBorderingCountries("MK");