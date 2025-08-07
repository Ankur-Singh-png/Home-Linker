import axios from "axios";

const BASE_URL = 'http://localhost:8080/property';

export async function registerProperty(formDataToSubmit) {
  try {
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:8080/property/addproperty`;
    const response = await axios.post( url , formDataToSubmit , 
        {headers: { Authorization: `Bearer ${token}`
    }}
    );
    return response
  } catch (ex) {
    console.log(`exception occurred: `, ex)
  }
}


export const fetchPropertiesByUserId = async (userId, token) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/myproperties/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};


export const getAllCategories = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:8080/category/getAllCategories`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export const getAllPropertiesByDate = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:8080/property/SortByDate`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("response from getAllPropertiesByDate: ", response);
    return response;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  } 

} 