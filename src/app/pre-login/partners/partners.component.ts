import { Component, OnInit } from '@angular/core';
import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const contentDesc = document.getElementsByClassName('content_desc');
    const contentEnding = document.getElementsByClassName('content_ending');

    setTimeout(() => {
      for (var i = 0; i < contentDesc.length; i++) {
        let splitted = contentDesc.item(i).textContent.split(' ');
        let tempSplitted = contentDesc.item(i).textContent.split(' ');
        if (window.localStorage.getItem('ef2_lang') == 'zh_CN') {
          splitted = contentDesc.item(i).textContent.split('');
          tempSplitted = contentDesc.item(i).textContent.split('');
        }
        let focusWord = splitted[0] !== '' ? splitted[0] : splitted[1];
        if (splitted[0] !== '') {
          focusWord = splitted[0];
          tempSplitted.splice(0, 1);
        } else {
          focusWord = splitted[1];
          tempSplitted.splice(0, 2);
        }
        contentDesc.item(
          i
        ).innerHTML = `<span style="font-size: 1.5em"><b>${focusWord}</b></span> ${tempSplitted.join(
          ' '
        )}`;
      }
      for (var i = 0; i < contentEnding.length; i++) {
        let splittedEnding = contentEnding.item(i).textContent.split(' ');
        let tempSplittedEnding = contentEnding.item(i).textContent.split(' ');
        if (window.localStorage.getItem('ef2_lang') == 'zh_CN') {
          splittedEnding = contentEnding.item(i).textContent.split('');
          tempSplittedEnding = contentEnding.item(i).textContent.split('');
        }
        let focusWord =
          splittedEnding[0] !== '' ? splittedEnding[0] : splittedEnding[1];
        if (splittedEnding[0] !== '') {
          focusWord = splittedEnding[0];
          tempSplittedEnding.splice(0, 1);
        } else {
          focusWord = splittedEnding[1];
          tempSplittedEnding.splice(0, 2);
        }
        contentEnding.item(
          i
        ).innerHTML = `<span style="font-size: 1.5em"><b>${focusWord}</b></span> ${tempSplittedEnding.join(
          ' '
        )}`;
      }
    }, 1000);

    this.splideInit('.sankalptaru_splide');
    this.splideInit('.eden_splide');
  }

  smoothScrollingTo(target) {
    // document.getElementById('lovetree').style.display = 'none';
    // document.getElementById('earthtree').style.display = 'none';
    // document.getElementById(target).style.display = 'block';
    document.getElementById(target).scrollIntoView({
      behavior: 'smooth',
    });
  }

  splideInit(className) {
    setTimeout(() => {
      const splide = new Splide(className, {
        type: 'loop',
        drag: false,
        focus: 'center',
        perPage: 3,
        arrows: false,
        pagination: false,
        autoScroll: {
          speed: 1,
        },
        breakpoints: {
          768: {
            perPage: 2,
          },
          430: {
            perPage: 1,
          },
        },
      });
      splide.mount({ AutoScroll });
    }, 1000);
  }

  getLoveTreeStoryLang() {
    const lang = !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';

    switch (lang) {
      case 'en':
        return '../../../assets/images/partners/img-love-tree-story.png';
      case 'zh_CN':
        return '../../../assets/images/partners/img-love-tree-story-CHS.png';
      case 'vi':
        return '../../../assets/images/partners/img-love-tree-story-VIET.png';
      case 'ms':
        return '../../../assets/images/partners/img-love-tree-story-BM.png';
      case 'ja':
        return '../../../assets/images/partners/img-love-tree-story-JPN.png';
      case 'id':
        return '../../../assets/images/partners/img-love-tree-story-IDN.png';
      case 'pt':
        return '../../../assets/images/partners/img-love-tree-story-POR.png';
      default:
        return '../../../assets/images/partners/img-love-tree-story.png';
    }
  }

  getEarthTreeStoryLang() {
    const lang = !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';

    switch (lang) {
      case 'en':
        return '../../../assets/images/partners/img-earth-tree-story.png';
      case 'zh_CN':
        return '../../../assets/images/partners/img-earth-tree-story-CHS.png';
      case 'vi':
        return '../../../assets/images/partners/img-earth-tree-story-VIET.png';
      case 'ms':
        return '../../../assets/images/partners/img-earth-tree-story-BM.png';
      case 'ja':
        return '../../../assets/images/partners/img-earth-tree-story-JPN.png';
      case 'id':
        return '../../../assets/images/partners/img-earth-tree-story-IDN.png';
      case 'pt':
        return '../../../assets/images/partners/img-earth-tree-story-POR.png';
      default:
        return '../../../assets/images/partners/img-earth-tree-story.png';
    }
  }

  getLoveTreeTitleLang() {
    const lang = !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';

    switch (lang) {
      case 'en':
        return '../../../assets/images/partners/img-love-tree-title.png';
      case 'zh_CN':
        return '../../../assets/images/partners/img-love-tree-title-CHS.png';
      case 'vi':
        return '../../../assets/images/partners/img-love-tree-title-VIET.png';
      case 'ms':
        return '../../../assets/images/partners/img-love-tree-title-BM.png';
      case 'ja':
        return '../../../assets/images/partners/img-love-tree-title-JPN.png';
      case 'id':
        return '../../../assets/images/partners/img-love-tree-title-IDN.png';
      case 'pt':
        return '../../../assets/images/partners/img-love-tree-title-POR.png';
      default:
        return '../../../assets/images/partners/img-love-tree-title.png';
    }
  }

  getEarthTreeTitleLang() {
    const lang = !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';

    switch (lang) {
      case 'en':
        return '../../../assets/images/partners/img-earth-tree-title.png';
      case 'zh_CN':
        return '../../../assets/images/partners/img-earth-tree-title-CHS.png';
      case 'vi':
        return '../../../assets/images/partners/img-earth-tree-title-VIET.png';
      case 'ms':
        return '../../../assets/images/partners/img-earth-tree-title-BM.png';
      case 'ja':
        return '../../../assets/images/partners/img-earth-tree-title-JPN.png';
      case 'id':
        return '../../../assets/images/partners/img-earth-tree-title-IDN.png';
      case 'pt':
        return '../../../assets/images/partners/img-earth-tree-title-POR.png';
      default:
        return '../../../assets/images/partners/img-earth-tree-title.png';
    }
  }
}
