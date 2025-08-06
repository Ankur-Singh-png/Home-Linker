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