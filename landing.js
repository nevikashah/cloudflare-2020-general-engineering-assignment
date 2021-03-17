//get array from api file
import {linkArray} from "./jsonapi";

//assign links to a variable
let info = linkArray.nevikaLinks

export default async function () {
    const head = {
            //update to html header
            headers: {
                "content-type": "text/html;charset=UTF-8",
            },
        }
    //create template from static page provided
    const template = await fetch('https://static-links-page.signalnerve.workers.dev/static/html', head)

    //view page source to see elements
    //use HTML rewrite/rewrite links docs to create custom class and enhance static page

    //update links on html page from array from json API
    //reformat each link in HTML and append to links element
    class LinksTransformer {
        async element(element) {
            info.forEach(linkSet => {
                element.append(`<a href="${linkSet.url}">${linkSet.name}</a>`, {html: true});
            })
        }
    }

    //create transformer for title, name, background color, avatar and social icons
    class PrettyTransformer {
        element(element){
            //get element tag name
            console.log(element.tagName)
            if (element.tagName === "div") {
                element.removeAttribute("style")
            }
            if(element.tagName === "h1") {
                element.setInnerContent("Nevika Shah", {html: true})
            }
            if(element.tagName === "img") {
                element.setAttribute("src", "https://media-exp1.licdn.com/dms/image/C4E03AQGGqmiL1FR_OA/profile-displayphoto-shrink_800_800/0/1612215188196?e=1621468800&v=beta&t=geXypVqj6vBJTOG6OfBCJ-vl4AFGlelQM_YWRCtPzE8")
            }
            if(element.tagName === "title") {
                element.setInnerContent("Nevika Shah", {html: true})
            }
            if (element.tagName === "body") {
                element.setAttribute("class","bg-green-600")
            }
        }
    }
    //create social links clickable by svg icons
    class SocialTransformer {
        async element(element) {
            element.removeAttribute('style');
            element.append("<a href=\"https://www.instagram.com/madebynev/\"><img src=\"https://simpleicons.org/icons/instagram.svg\"></a>", { html: true })
            element.append("<a href=\"https://www.linkedin.com/in/nevikashah/\"><img src=\"https://simpleicons.org/icons/linkedin.svg\"></a>", { html: true })
        }
    }

    //return new HTMLRewriter by creating new instance of each transformer
    //target each html section by using the '.on' function
    const HTMLrewrite  = new HTMLRewriter()
        .on("div#links", new LinksTransformer())
        .on("div#profile", new PrettyTransformer())
        .on("h1#name", new PrettyTransformer())
        .on("img#avatar", new PrettyTransformer())
        .on("title", new PrettyTransformer())
        .on("body", new PrettyTransformer())
        .on("div#social", new SocialTransformer())
    //final transform
    return HTMLrewrite.transform(template);
}
