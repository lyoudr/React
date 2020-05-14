import cat0 from '../../../../../assets/images/cat_0.jpg';
import cat1 from '../../../../../assets/images/cat_1.jpg';
import cat2 from '../../../../../assets/images/cat_2.jpg';
import cat3 from '../../../../../assets/images/cat_3.jpg';

const AnimalData = {
  cats : [
    {
      "name": "Kitty",
      "describe": "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "imgsrc": cat0,
      "index": 0,
      "detail": 'This is Kitty',
      "title": "Persian cat",
      "show" : false,
      "guide": "In the Middle East, region they are widely known as 'Iranian cat' and in Iran they are known as 'Shirazi cat'. The first documented ancestors of the Persian were imported into Italy from Iran (historically known as Persia in the west) around 1620."
    },
    {
      "name": "Cathy",
      "describe": "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "imgsrc": cat1,
      "index": 1,
      "detail": 'This is Cathy',
      "title": "British Shorthair",
      "show" : false,
      "guide": "The British Shorthair is the pedigreed version of the traditional British domestic cat, with a distinctively chunky body, dense coat and broad face. The most familiar color variant is the 'British Blue', a solid blue-gray with copper eyes, medium tail, but the breed has also been developed in a wide range of other colours and patterns, including tabby and colorpoint."
    },
    {
      "name": "KiKi",
      "describe": "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "imgsrc": cat2,
      "index": 2,
      "detail": 'This is KiKi',
      "title": "Bengal cat",
      "show" : false,
      "guide": "The Bengal cat is a domesticated cat breed created from hybrids of domestic cats, the Asian leopard cat (Prionailurus bengalensis) and the Egyptian Mau, which gives them their golden shimmer – the breed name comes from the taxonomic name."
    },
    {
      "name": "WiWi",
      "describe": "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "imgsrc": cat3,
      "index": 3,
      "detail": 'This is WiWi',
      "title": "Abyssinian cat",
      "show": false,
      "guide": "The Abyssinian is a slender, fisne-boned, medium-sized cat. The head is moderately wedge shaped, with a slight break at the muzzle, and nose and chin ideally forming a straight vertical line when viewed in profile. They have alert, relatively large pointed ears."
    },
  ]
}

export const animal = (state = AnimalData, action) => {
  console.log('state is =>', state);
  switch(action.type) {
    case 'SHOW_CATDETAIL':
      const showcats = state.cats.map((cat, index) => {
        if(index === action.id){
          cat.show = true;
        };
        return cat;
      });
      return Object.assign({}, state, {cats: showcats});
    case 'NOTSHOW_CATDETAIL':
      const notshowcats = state.cats.map((cat, index) => {
        if(index === action.id){
          cat.show = false;
        };
        return cat;
      });
      return Object.assign({}, state, {cats: notshowcats});
    default: 
      return state;
  }
} 


/*Notes => Why Redux doesn't re-render component? */
// should put "state" to return statement to notify "mapStateToProps" to tell component to re-render
