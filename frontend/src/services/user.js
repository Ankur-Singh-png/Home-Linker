import axios from 'axios'
export async function registerUser(firstName, lastName, email, phoneNumber, password, dob ) {
  try {
    const url = `http://localhost:8080/user/signup`;
    const body = {
      firstName,
      lastName,
      email,
      phoneNumber, 
      password, 
      dob 
    }
    const response = await axios.post(url, body);
    return response
  } catch (ex) {
    console.log(`exception occurred: `, ex)
  }
}

export async function loginUser(email, password) {
  try {
    const url = `http://localhost:8080/user/signin`
    const body = { email, password }

    // make the api call
    const response = await axios.post(url, body)
    return response
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}




// function to fetch user by ID
export async function getUserById(id, token) {
  try {
    const response = await axios.get(`http://localhost:8080/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (ex) {
    console.log('Failed to fetch user data:', ex);
    throw ex;
  }
}

// function to update user
export async function updateUser(id, updatedData, token) {
  try {
    const response = await axios.put(`http://localhost:8080/user/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (ex) {
    console.log('Failed to update user:', ex);
    throw ex;
  }
}