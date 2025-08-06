import axios from "axios";

export async function registerProperty(formDataToSubmit) {
  try {
    const url = `http://localhost:8080/user/signup`;
    const response = await axios.post(url, body);
    return response
  } catch (ex) {
    console.log(`exception occurred: `, ex)
  }
}