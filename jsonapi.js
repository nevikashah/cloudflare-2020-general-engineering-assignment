
//create javascript array with name of link + URL
export const linkArray = {
    nevikaLinks: [
        {"name": "Check Out my Upcycled Art Portfolio", "url": "https://www.instagram.com/madebynev/" },{ "name": "Learn More about the Sustainable Fashion Revolution", "url": "https://www.fashionrevolution.org/about/" },{ "name": "Shop Ethical and Eco-Friendly Retail Brands", "url": "https://goodonyou.eco/" }
    ]
}

//return json from workers cript
export default async function () {
    //documentation taken from 'return JSON' examples doc
    const jsonArray = JSON.stringify(linkArray, null)
    return new Response(jsonArray, {
        //change content type header (to indicate to clients that it is a JSON response)
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }
    })
}

