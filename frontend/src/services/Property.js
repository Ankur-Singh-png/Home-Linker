import axios from "axios";

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