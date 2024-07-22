<template>
    <div class="flex flex-col m-auto max-w-[95%] mb-[1rem] rounded overflow-hidden shadow-lg lg:w-[35vw] "  :class="{ 'bg-black text-white': props.postIsPinned }">
        <div class="relative flex justify-center">
            <img class="max-h-[15rem]  self-center lg:max-h-[20rem]" 
                :src="postUrl"
                loading="lazy">
            <div class="absolute top-0 right-0 mt-2 mr-2"  v-if="props.myProfile && !props.postIsPinned" @click="toggleDropdown">
                <div class="bg-white rounded p-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical text-black" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    </svg>
                </div>
                <div class="absolute top-8 right-0 bg-white rounded shadow-lg w-[15rem]" v-show="dropdownOpen">
                    <ul class="flex w-[100%] justify-center">
                        <li class="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black text-sm" @click="openModal">Supprimer la publication</li>
                    </ul>
                </div>                
            </div>
        </div>
        <div class="px-6 py-4 overflow-y-auto" style="height: calc(30vh - 7rem);">
            <div class="flex flex-col justify-between text-gray-700 text-base h-[100%]">
                <p>
                    {{ props.postDescription }}
                </p>
                <p class="text-end text-xs pt-[1rem] font-lightText">{{ props.postDate }}</p>
            </div>
        </div>
    </div>
<ModalComponent v-if="showModal" @closeModals="closeModal" @deleteData="handleDelete" textModal="Voulez-vous vraiment supprimer cette publication ?"></ModalComponent>
<AlertComponent v-if="showAlert" v-model:alertError="alertError" @closeAlert="handleCloseAlert" textAlert="Votre post vient d'être supprimer"></AlertComponent>


</template>

<script setup>
import { defineProps, ref, defineEmits, onMounted} from 'vue';
import ModalComponent from '@/components/toolBox/ModalComponent.vue';
import { useStorePost } from '@/domain/artist/store/PostStore';
import { useGlobalStore } from '@/store/GlobalStore.js';
import { postService } from '@/domain/artist/service/PostService'
import AlertComponent from '@/components/toolBox/AlertComponent.vue';

const postStore = useStorePost();
const storeGlobal = useGlobalStore();

const props = defineProps({
    postDescription: String,
    postDate: String,
    postPictureUrl: String,
    postId: String,
    postIsPinned: Boolean,
    artistId: String,
    myProfile: Boolean
});
const emit  = defineEmits(['postDeleted']);

const dropdownOpen = ref(false);
const showModal = ref(false);
const isPostDeleted = ref(false);
const showAlert = ref(false); 
const alertError = ref(true);
const postUrl = ref(null)

function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
}

onMounted(async ()=> {
    postUrl.value = await postService().getPostAssetWithId(props.postId)
})



// Fonctionnement modal delete
function openModal() {
    showModal.value = true;
    document.body.style.overflow = 'hidden';
}
const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
}

// Affichage Alert
const handleCloseAlert = () => {
    showAlert.value = false;
};


async function handleDelete(deleteStatus) {
    isPostDeleted.value = deleteStatus;
    if (isPostDeleted.value) {
        try {
            showModal.value = false;
            document.body.style.overflow = '';
            let response =  await postStore.deletePost(props.postId);
            if (response.status == 200) {
                alertError.value = false;
                showAlert.value = true;
                emit('postDeleted');

            }
           
        } catch (error) {
            storeGlobal.logError(error, 6);
        }
    } 
}
</script>

