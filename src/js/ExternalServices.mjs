const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }

  static async submitOrder(orderData) {
    const url = `${baseURL}checkout/`; // URL for checkout submission
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData) // Convert the order data to JSON
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data; // Return the response from the server
    } catch (error) {
      console.error("Error submitting order:", error);
      throw new Error("There was an error submitting the order.");
    }
  }
}
