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
                    let count = 0;
                    hideGallery(false);

                    while(gallery.firstChild){
                        gallery.removeChild(gallery.firstChild);
                    }

                    result.data.forEach((item: any, index: number) => {
                        
                        const sunIcon = item.sun ? `<img class="gallery-price-icon" src="./images/icons/${item.sun}-sun.svg" />` : undefined;
                        const toxicityIcon = item.toxicity ? `<img class="gallery-price-icon" src="./images/icons/toxic.svg" />` : undefined;
                        const waterIcon = item.water ? `<img class="gallery-price-icon" src="./images/icons/${item.water}.svg" />` : undefined;

                        template += 
                        `
                            <div class="gallery-item ${item.staff_favorite ? 'main' : 'item-' + count }">
                                <div class="gallery-holder">
                                    ${item.staff_favorite ? '<span>favourite</span>' : ''}
                                    <div class="gallery-image" style="background-image: url(${item.url})" />
                                    </div>
                                    <h2 class="gallery-name">${item.name}</h2>
                                    <div class="gallery-price">
                                        <h3 class="gallery-price-title">
                                            ${item.price}
                                        </h3>
                                        <div class="gallery-price-icons">
                                            ${sunIcon ? sunIcon : ''}
                                            ${toxicityIcon? toxicityIcon : ''}
                                            ${waterIcon? waterIcon : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `

                        if(!item.staff_favorite){
                            count++;
                        }
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