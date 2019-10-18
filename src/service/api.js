import {api_blog,api_token,api_url} from '../config/rest_consfig';
export async function getdatablog() {
    try {
let result = await fetch(`${api_url}${api_blog}?token=${api_token}`)
;
let blogs= await result.json();
        result=null;
 return  blogs.blogs.data;

    }
    catch (e) {
        throw e;

    }
}
