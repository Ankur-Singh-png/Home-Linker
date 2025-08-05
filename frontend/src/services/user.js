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