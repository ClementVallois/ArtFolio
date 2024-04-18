import { CRUDapi } from "@/api/CrudApi";

////////////
////////////
// Api call management for artists
// all :id is postId
////////////
////////////
function postApi() {
    async function getAssetForPost(id) {
        return await CRUDapi('GET', `posts/${id}/assets`);
    }

    async function createPost(id) {
        return await CRUDapi('POST', `posts`);
    }

    async function deletePost(id) {
        return await CRUDapi('DELETE', `posts/${id}`);
    }


    return {
        getAssetForPost,
        createPost
    };
}


export { postApi };