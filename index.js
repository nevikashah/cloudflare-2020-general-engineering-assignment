//imports
import Router from "./router"
import jsonapi from "./jsonapi"
import landing from "./landing"

//request handler to respond to /links
//utilizes Router class
async function handleRequest(request) {
    //create instance of router class
    const r = new Router()
    r.get("/links", jsonapi)

    //if URL endpoint is anything but /links endpoint, display the landing page
    let res = await r.route(request)
    if (res.status == 404) {
        //return enhanced HTML landing page
        return landing()
    }
    //otherwise return /links end point
    return res
}

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})
