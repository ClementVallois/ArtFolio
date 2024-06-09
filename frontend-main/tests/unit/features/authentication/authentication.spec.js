import { shallowMount } from '@vue/test-utils';
import NavBar from '@/components/layout/NavComponent.vue'
import NavArtistComponent from '@/domain/artist/components/layout/NavArtistComponent.vue';
import { useAuth0 } from '@auth0/auth0-vue';

// jest.mock('@auth0/auth0-vue'); // Mocking the module

describe('Authentication unit testing', () => {

    let loginWithRedirect;
    let logout;

    beforeEach(() => {
        //Get the mocked function from the mock implementation
        loginWithRedirect = useAuth0().loginWithRedirect;
        logout = useAuth0().logout;
    });


    it('calls login action when login button is clicked on', async () => {
        const wrapper = shallowMount(NavBar);
        const signInLink = wrapper.find('p[role="button"]');
        await signInLink.trigger('click');
        expect(loginWithRedirect).toHaveBeenCalled();
    });


    it('calls logout action when Sign Out is clicked in NavBarArtist', async () => {               
        const wrapper = shallowMount(NavArtistComponent);
        const signOutLink = wrapper.find('p[role="button"]'); // Find the link with role="button" and class="dropdown-item"
        await signOutLink.trigger('click');
        expect(logout).toHaveBeenCalled();
    });
})


