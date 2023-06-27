const textInfo = document.querySelector('#text-info');
const otherDiv = document.querySelector('#other-div');

(async () => {
try {
    const token = window.location.pathname.split('/')[3];
    const id = window.location.pathname.split('/')[2];
    const {data}= await axios.patch(`/api/users/${id}/${token}`);
    // para cuando se verifique enviarlo al login
    window.location.pathname = '/login/';

    } catch (error) {
        textInfo.innerHTML = error.response.data.error;
        otherDiv.classList.add('hidden');
    };
})();
