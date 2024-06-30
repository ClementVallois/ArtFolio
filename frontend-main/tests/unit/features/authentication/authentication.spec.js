const { shallowMount } = require('@vue/test-utils');
const { ref } = require('vue');
const NavBar = require('@/components/layout/NavComponent.vue').default;
const NavArtistComponent = require('@/domain/artist/components/layout/NavArtistComponent.vue').default;
const { createPinia, setActivePinia } = require('pinia');


// Calls the mock I configured in moduleNameMapper in jestConfig 
// and __mock__ @auth0/auth0-vue module
const { useAuth0, createAuth0 } = require('@auth0/auth0-vue');

describe('Authentication unit testing', () => {


    beforeEach(() => {
        // Create and set active Pinia instance
        const pinia = createPinia();
        setActivePinia(pinia);
    });

    it('calls login action when login button is clicked on', async () => {
        const wrapper = shallowMount(NavBar);
        const signInLink = wrapper.find('p[role="button"]');
        console.log(signInLink.html())
        await signInLink.trigger('click');
        expect(useAuth0().loginWithRedirect).toHaveBeenCalled();
    });

    it('calls logout action when Sign Out is clicked in NavBarArtist', async () => {       
        const wrapper = shallowMount(NavArtistComponent);
        
        //Set the value of isProfileMenu to true so we can see the v-if
        wrapper.vm.isProfileMenuOpen = true
        await wrapper.vm.$nextTick();

        const logoutApp = jest.spyOn(wrapper.vm, 'logoutApp');
    
        const signOutLink = wrapper.find('p[role="button"]');
        await signOutLink.trigger('click');
        expect(logoutApp).toHaveBeenCalled();
        expect(useAuth0().logout).toHaveBeenCalled();

    });
});



