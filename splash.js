require("dotenv").config();
const axios = require("axios");
const yup = require("yup");
const fs = require("fs");
const yupToJsonSchema = require("./yupToJsonSchema");

const getProductSchema = yup.object({
  product: yup.string().label("product").required("should be a string"),
});
const getProductsJSONSchema = yupToJsonSchema(getProductSchema);
const PRODUCT_FINDER = {
  name: "product_finder",
  description:
    "finds and returns dummy products details from json dummy datas based on the product name passed to it",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getProductsJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ product }) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(product)}`
      );
      return JSON.stringify(data);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};

const weatherCitySchema = yup.object({
  city: yup.string().label("city").required("should be a string"),
});
const weatherCityJSONSchema = yupToJsonSchema(weatherCitySchema);
const WEATHER_FROM_LOCATION = {
  name: "city_weather_data",
  description: "gets the weather details from a given city name",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: weatherCityJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ city }) => {
    const ApiKey = process.env.WEATHER_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
      );
      return JSON.stringify({
        weather: data.weather[0].description,
        main: data.main,
        coords: data.coord,
      });
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};

const getFilePathSchema = yup.object({
  filePath: yup.string().label("filePath").required("should be a file path"),
});
const getFilePathJSONSchema = yupToJsonSchema(getFilePathSchema);
const FILE_READER = {
  name: "file_reader",
  description:
    "returns the contents of a file given its filepath in the repository",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getFilePathJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ filePath }) => {
    try {
      const buffer = fs.readFileSync(filePath);
      const fileContents = buffer.toString("utf8");
      return fileContents;
    } catch (error) {
      return "An error ocured while looking for the file content";
    }
  },
};


const getAgencySaleSchema = yup.object({
    agencyId: yup.number().label("agency ID").required("should be a int"),
  });
  const agencySalesJSONSchema = yupToJsonSchema(getAgencySaleSchema);
  const AGENCY_SALES = {
    name: "agency_sales",
    description: "Returns sales data for all agencies according to agenncy ID ",
    category: "hackathon",
    subcategory: "communication",
    functionType: "backend",
    dangerous: false,
    associatedCommands: [],
    prerequisites: [],
    parameters: agencySalesJSONSchema,
    rerun: true,
    rerunWithDifferentParameters: true,
    runCmd: async ({ agencyId }) => {
      const TOKEN = process.env.TOKEN;
      try {
        const { data } = await axios.get(
          `http://localhost:3001/agencies/${agencyId}/sales`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
          });
          return JSON.stringify({
            data
          });
        } catch (err) {
          return ("Error trying to execute the tool", err);
      }
    },
  };
  const SOLD_UNITS = {
    name: "sold_units",
    description: "Returns all sold units with their information",
    category: "hackathon",
    subcategory: "communication",
    functionType: "backend",
    dangerous: false,
    associatedCommands: [],
    prerequisites: [],
    parameters: [],
    rerun: true,
    rerunWithDifferentParameters: false,
    runCmd: async ({accessToken})=>{
      const TOKEN = process.env.TOKEN;
      try{
        const {data} = await axios.get("http://localhost:3001/agencies/allsales",{
          headers:{Authorization: `Bearer ${TOKEN}`}
        });
        return JSON.stringify({
          data
        });
      }
      catch(error){
        console.error("Error fetching sold units data :" ,error);
        throw new Error("Error Fetching");
      
      }
    }
    
  };
  



const tools = [AGENCY_SALES,SOLD_UNITS];
module.exports = tools;