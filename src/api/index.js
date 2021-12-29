import configData from "../config.json";
export async function login({ email, password }) {
  return await fetch(`${configData.SERVER_URL}auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
     
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getServices() {
  const auth = 'Bearer '+ localStorage.getItem("token");
console.log(auth);
  return await fetch(`${configData.SERVER_URL}services/getallPopulatedAdmin`, {
    method: "GET",
    headers: { "Content-Type": "application/json" ,   'Authorization': auth,  },
  
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}


export async function getService(id) {

  const auth = 'Bearer '+ localStorage.getItem("token");
  return await fetch(`${configData.SERVER_URL}services/findPopulatedAdmin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" ,   'Authorization': auth,  },

    body: JSON.stringify({ "text": id }),
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateBookingStatus(id , status) {

  const r = JSON.stringify({ "id": id , "status":status });
  console.log(r);
  const auth = 'Bearer '+ localStorage.getItem("token");
  return await fetch(`${configData.SERVER_URL}services/updateBookingStatus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" ,   'Authorization': auth,  },

    body:r,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function createSlot(id , time , duration) {
  console.log("sss" + id)
  const r = JSON.stringify({ "provider": id , "startTime":time , "duration":duration });
  console.log(r);
  const auth = 'Bearer '+ localStorage.getItem("token");
  return await fetch(`${configData.SERVER_URL}services/createSlot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" ,   'Authorization': auth,  },

    body:r,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}



