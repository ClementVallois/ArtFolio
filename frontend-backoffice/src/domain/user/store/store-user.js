import { defineStore } from 'pinia'

export const useStoreUser = defineStore('storeUser', () => {

const user = ref(null)





return {
    user
}
})
