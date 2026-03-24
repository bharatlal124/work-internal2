   
   
   
   
   
   
   
   
   
   
   
   // Define the API URL
const apiUrl = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

// Function to fetch and filter data
async function fetchData() {
    try {
        // Fetch data from API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Filter data for "ID Nation" = "01000US"
        const filteredData = data.data.filter(item => item["ID Nation"] === "01000US");

        // Log the filtered data
        console.log("Filtered Data:", filteredData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the function
fetchData();
