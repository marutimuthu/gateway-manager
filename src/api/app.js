import axios from 'axios';
export var data_findByMacid
// export const server_url = "http://localhost:8080"
export const server_url = "http://192.168.23.54:8080"
export const google_map_api_key = ""
// export const server_url = "https://api.iotinfra.link"

// {"action":"system","cmd":"update_url","server_url": "http://192.168.23.54:8080/api/"}

export async function update_findByMacid(url) {
    axios
      .get(
        `${url}`
      ) 
      .then((response) => {
        // console.log('DEBUG zone response', response);
        // console.log(response.data[0]);
        // data_findByMacid = response
        data_findByMacid = response
        // console.log(data_findByMacid.data)
        return data_findByMacid;
        // setDevice(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
}