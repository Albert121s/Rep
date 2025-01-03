let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', () => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', () => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', () => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">About Me</h1>
        <p>This is the about page content.</p>
    `;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Contact with me</h1>
        <form id="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Send</button>
        </form>
    `;
    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
    });
}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <div class="gallery"></div>
    `;
    loadImages();
}

function loadImages() {
    const gallery = document.querySelector('.gallery');
    const imageUrls = [
        'https://www.petsure.com/wp-content/uploads/2024/08/Blindness-in-dogs-Symptoms-treatments-and-how-to-give-care-min.png.webp',
        'https://hips.hearstapps.com/hmg-prod/images/livestock-dogs-farm-dogs-german-shepherd-66e8667aed873.jpg?crop=0.6669811320754717xw:1xh;center,top&resize=980:*',
        'https://d2zp5xs5cp8zlg.cloudfront.net/image-33303-800.jpg',
        'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
        'https://tailsntummies.com/cdn/shop/articles/giardia-in-dogs_d53bb18a-af8e-440a-a495-b6025344a007.jpg?v=1699897302',
        'https://joyinchildhoodfoundation.org/wp-content/uploads/bb-plugin/cache/Bark1-scaled-circle.jpg'
    ];

    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Image ${index + 1}`;
        img.classList.add('gallery-image');
        img.addEventListener('click', openModal);
        gallery.appendChild(img);
    });
}

function openModal(event) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = event.target.src;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

document.querySelector('.close-btn').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
});

function popStateHandler() {
    let loc = window.location.href.split('?')[1];
    if (loc === 'contact') RenderContactPage();
    if (loc === 'about') RenderAboutPage();
    if (loc === 'gallery') RenderGalleryPage();
}

window.onpopstate = popStateHandler;

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
