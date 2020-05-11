import {
    fetchEndpoint,
    preparePublicKeyCredentials,
    preparePublicKeyOptions,
} from './common';

const useRegistration = ({actionUrl = '/register', optionsUrl = '/register/options'}) => {
    return async (data) => {
        const optionsResponse = await fetchEndpoint(data, optionsUrl);
        const json = await optionsResponse.json();
        const publicKey = preparePublicKeyOptions(json);
        const credentials = await navigator.credentials.create({publicKey});
        const publicKeyCredential = preparePublicKeyCredentials(credentials);
        const actionResponse = await fetchEndpoint(publicKeyCredential, actionUrl);

        return await actionResponse.json();
    };
};

export default useRegistration;
