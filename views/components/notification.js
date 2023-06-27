const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
    if (isError) {
        div.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 flex justify-end gap-4">
        <p class="bg-red-500 shadow-3xl p-4 w-1/3 rounded-lg font-bold text-violet-50">${message}</p>
    </div>
    `;
    }else{
        div.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 flex justify-end">
            <p class="bg-green-500 p-4 w-3/12 rounded-lg font-bold text-violet-50">${message}</p>
        </div>
        `;
    }
};




