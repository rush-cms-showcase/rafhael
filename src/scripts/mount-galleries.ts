import { mountGallery } from './gallery'

for (const root of document.querySelectorAll<HTMLElement>('[data-gallery]')) {
	mountGallery(root)
}
