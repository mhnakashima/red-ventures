import { getData } from './components/functions';
import './styles/style.scss';

const sunlightElement: HTMLElement = document.getElementById('select-sunlight');
const waterElement: HTMLElement = document.getElementById('select-water');
const petElement: HTMLElement = document.getElementById('select-pet');
const noResultsFound: HTMLElement = document.getElementById('holder-noResults');
const holderGallery: HTMLElement = document.getElementById('holder-gallery');
const gallery: HTMLElement = document.getElementById('gallery');

Array.from([sunlightElement, waterElement, petElement]).forEach(item => {
    item.addEventListener('change', async () => {
        const sunValue: string = (<HTMLInputElement>sunlightElement).value ? (<HTMLInputElement>sunlightElement).value : 'high';
        const waterValue: string = (<HTMLInputElement>waterElement).value ? (<HTMLInputElement>waterElement).value : 'regularly';
        const petValue: string = (<HTMLInputElement>petElement).value ? (<HTMLInputElement>petElement).value : 'false';

        getData(sunValue, waterValue, petValue)
            .then( async(result: any) => {
                if (result) {
                    let template = '';
                    hideGallery(false);

                    while(gallery.firstChild){
                        gallery.removeChild(gallery.firstChild);
                    }

                    result.data.forEach((item: any, index: number) => {
                        template += 
                        `
                            <div class="gallery-item" style="background-image: ${item.url}">
                                <h2>${item.name}</h2>
                            </div>
                        `
                    })
                    
                    gallery
                        .insertAdjacentHTML('beforeend', template);
                } else {
                    hideGallery(true);
                }
            })
            .catch((error: any) => {
                alert(error);
                hideGallery(true);
            })

    });
});

const hideGallery = (hide: boolean) => {
    if (hide) {
        noResultsFound.classList.remove('d-none');
        noResultsFound.classList.add('d-flex');

        holderGallery.classList.remove('d-flex');
        holderGallery.classList.add('d-none');
    }else{
        noResultsFound.classList.remove('d-flex');
        noResultsFound.classList.add('d-none');

        holderGallery.classList.remove('d-none');
        holderGallery.classList.add('d-flex');
    }
};