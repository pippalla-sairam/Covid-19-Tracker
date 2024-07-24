document.addEventListener('DOMContentLoaded', async function() {
    // Fetch and populate country dropdown
    const countryDropdown = document.getElementById('countryDropdown');
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2;
            option.textContent = country.name.common;
            countryDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
});

document.getElementById('countryDropdown').addEventListener('change', async function() {
    const countryCode = this.value;
    if (countryCode) {
        try {
            const response = await fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`);
            const covidData = await response.json();
            document.getElementById('countryName').textContent = covidData.country;
            document.getElementById('cases').textContent = `Cases: ${covidData.cases}`;
            document.getElementById('deaths').textContent = `Deaths: ${covidData.deaths}`;
        } catch (error) {
            console.error('Error fetching COVID-19 data:', error);
        }
    } else {
        document.getElementById('countryName').textContent = '';
        document.getElementById('cases').textContent = '';
        document.getElementById('deaths').textContent = '';
    }
});
