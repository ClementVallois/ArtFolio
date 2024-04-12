import { defineStore } from 'pinia';
import { dataSourceUser } from '@/api/userDataSource';
import { Optional } from '@/optionnal';
import { ref, computed } from 'vue';


/////////
///// Artist Store
/////////
export const artistStore = defineStore('artistStore', () => {
    const allUserData = ref(Optional.of(dataSourceUser));


    const getAllArtist = computed(() => {
        return !allUserData.value.isEmpty()
            ? allUserData.value.get().filter(artist => artist.role === "artist")
            : [];
    });


    function setArtist(artist) {
        allUserData.value = Optional.of(artist);
    }

    return {
        allUserData,
        getAllArtist,
        setArtist,
    }
});

