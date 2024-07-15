const axios = require("axios");

// Function to fetch agency sales data
async function fetchAgenciesBySales(accessToken) {
  try {
    const response = await axios.get(`http://localhost:3001/agencies/${agencyId}/sales`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const units = response.data;

    // Count units bought by each agency
    const agencySales = units.reduce((acc, unit) => {
      const agencyId = unit.agency_id;
      if (!acc[agencyId]) {
        acc[agencyId] = 0;
      }
      acc[agencyId]++;
      return acc;
    }, {});

    return agencySales;
  } catch (error) {
    console.error("Error Fetching", error);
    throw new Error("Error Fetching");
  }
}

// Tool definition for agency sales data
const agency_sales = {
  name: "agency_sales",
  description: "Returns sales data for all agencies according to agenncy ID",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: [],
  rerun: true,
  rerunWithDifferentParameters: false,
  runCmd: async ({ accessToken }) => {
    try {
      // Fetch agency sales data
      const agencySales = await fetchAgenciesBySales(accessToken);
      return JSON.stringify(agencySales);
    } catch (error) {
      console.error("Error fetching agency sales data:", error);
      return "Error trying to execute the tool";
    }
  },
};

//Start to write tool that Returns all sold units with their information
async function fetchAllSoldUnits(accessToken) {
  try {
    const response = await axios.get("http://localhost:3001/agencies/allsales", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching sold units:", error);
    throw new Error("Error fetching sold units");
  }
}

// Tool definition for all sold units

const SOLD_UNITS = {
  name: "sold_units",
  description: "Returns all sold units with their information",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  prerequisites: [],
  parameters: [],
  rerun: true,
  rerunWithDifferentParameters: false,
  runCmd: async ({ accessToken }) => {
    try {
      return JSON.stringify(await fetchAllSoldUnits(accessToken));
    } catch (error) {
      console.error("Error executing sold_units tool:", error);
      return "Error executing sold_units tool";
    }
  },
};


// Export the agency_sales tool
module.exports = [agency_sales,SOLD_UNITS];
