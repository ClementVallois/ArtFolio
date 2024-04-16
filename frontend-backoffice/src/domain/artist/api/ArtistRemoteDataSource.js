import { useStoreArtist } from '../store/ArtistStore.js'
import CRUDapi from '@/api/CrudApi.js'

const storeArtist = useStoreArtist();

const getArtist = async (id) => {
    const artistResponseApi = CRUDapi(get, 'artist', id)

    return new Artist 

}

const get

const postArtist = async 