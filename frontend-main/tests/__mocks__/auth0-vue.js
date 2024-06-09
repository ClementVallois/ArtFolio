const loginWithRedirect = jest.fn();
const logout = jest.fn();
const isAuthenticated = jest.fn().mockReturnValue(true);
const user = jest.fn().mockReturnValue({
    name: 'Test User',
    email: 'test@example.com'
});

const useAuth0 = () => {
    return {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
    };
};

export { useAuth0 };