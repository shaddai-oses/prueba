const navbar = document.querySelector('#navbar')

const createHomeNav = ( ) => {
    navbar.innerHTML= `
    <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-violet-50">Contactify</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-violet-50 md:hidden cursor-pointer">
        <path  class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
        </svg>      
            <div class="hidden  md:flex gap-4 ">
            <a href="/signup/" class=" bg-violet-500  text-violet-50 uppercase font-bold px-4 py-2 rounded-lg hover:bg-violet-400  transition-all">Sign up</a>
            <a href="/login/" class=" text-violet-50  uppercase font-bold px-4 py-2 rounded-lg hover:bg-violet-400 transition-all">Login</a>
            </div>
            <div class="bg-violet-950  p-4  fixed h-screen top-20 bottom-0 -right-12 transition-all">    
            <div class="gap-4 flex-col text-center hidden">
            <a href="/signup/" class=" bg-violet-800 text-violet-50  uppercase font-bold px-4 py-2 rounded-lg hover:bg-violet-700  transition-all">Sign up</a>
            <a href="/login/" class=" text-violet-50 uppercase font-bold px-4 py-2 rounded-lg hover:bg-violet-700  transition-all">Login</a>
            </div>
            </div>
  </div>
    `
};
createHomeNav();

const createSignupNav = ( ) => {
    navbar.innerHTML= `
    <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-violet-50">Contactify</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-violet-50 md:hidden cursor-pointer">
        <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
        </svg>      
            <div class="hidden  md:flex gap-4 ">
            <a href="/login/" class=" text-violet-50  uppercase font-bold px-4 py-2 rounded-lg hover:bg-violet-400 transition-all">Login</a>
            </div>
            <div class="bg-violet-950  p-4  fixed h-screen top-20 bottom-0 -right-12 transition-all">    
            <div class="gap-4 flex-col text-center hidden">
            <a href="/login/" class=" text-violet-50 uppercase font-bold px-4 py-2 rounded-lg hover:bg-violet-700  transition-all">Login</a>
            </div>
            </div>
  </div>
    `
};
createSignupNav();

const createLoginNav = ( ) => {
    navbar.innerHTML= `
    <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-violet-50">Contactify</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-violet-50 md:hidden cursor-pointer ">
        <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
        </svg>      
            <div class="hidden  md:flex gap-4 ">
            <a href="/signup/" class=" bg-violet-500  text-violet-50 uppercase font-bold px-4 py-2 rounded-lg hover:bg-violet-400  transition-all">Sign up</a>
            </div>
            <div class="bg-violet-950  p-4  fixed h-screen top-20 bottom-0 -right-12 transition-all">    
            <div class="gap-4 flex-col text-center hidden">
            <a href="/signup/" class=" bg-violet-800 text-violet-50  uppercase font-bold px-4 py-2 rounded-lg hover:bg-violet-700  transition-all">Sign up</a>
            </div>
            </div>
  </div>
    `
};
createHomeNav();

if (window.location.pathname === '/') {
    createHomeNav( );
}else if (window.location.pathname === '/signup/'){
    createSignupNav();
}else if (window.location.pathname === '/login/'){
    createLoginNav();
}

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener('click', e => {
    const sidebar = e.target.parentElement.children[3];
    const buttons =sidebar.children[0];
    if (sidebar.classList.contains('-right-12')) {
        sidebar.classList.remove('-right-12', 'w-0');
        sidebar.classList.add('right-0', 'w-3/4');
        buttons.classList.remove('hidden');
        buttons.classList.add('flex');
    } else {
        sidebar.classList.add('-right-12', 'w-0');
        sidebar.classList.remove('right-0', 'w-3/4');
        buttons.classList.add('hidden');
        buttons.classList.remove('flex');
    }
});