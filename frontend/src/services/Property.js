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

export const addtowishlist = async (propertyId) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/wishlist/${propertyId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    throw error;
  } 
};

export const addtoBooking = async (propertyId) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/booking/${propertyId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to add to Booking:", error);
    throw error;
  } 
};





export const fetchPropertyById = async (userId, propertyId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/myproperties/${userId}/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};


export const updateProperty = async (userId, propertyId, formData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/updateproperty/${userId}/${propertyId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};


export const deleteProperty = async (propertyId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/delete/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};





export const getUserBookings = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`http://localhost:8080/booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const deleteBooking = async (propertyId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`http://localhost:8080/booking/${propertyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export const updateBooking = async (propertyId, newDate) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(`http://localhost:8080/booking/${propertyId}/${newDate}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};