import cat0 from '../../../assets/images/cat_0.jpg';
import cat1 from '../../../assets/images/cat_1.jpg';
import cat2 from '../../../assets/images/cat_2.jpg';
import cat3 from '../../../assets/images/cat_3.jpg';
import meat from '../../../assets/images/meat.jpg';
import egg from '../../../assets/images/egg.jpg';
import vagetable from '../../../assets/images/vegetable.jpg'
import fish from '../../../assets/images/fish.jpg';
import cheese from '../../../assets/images/cheese.jpg';
import milk from '../../../assets/images/milk.jpg';
import mushroom from '../../../assets/images/mushroom.jpg';

// Dish Images
import bakedsalmon from '../../../assets/images/bakedsalmon.jpg';
import buffalo from '../../../assets/images/Buffalo.jpg';
import beefmedallions from '../../../assets/images/beefmedallions.jpeg';
import sparerib from '../../../assets/images/sparerib.jpg';

// Buisiness
import business1 from '../../../assets/images/business1.jpg';
import business2 from '../../../assets/images/business2.jpg';
import business3 from '../../../assets/images/business3.jpg';

export const EachSubjectData = {
    technologyData : [
        {
            "name" : "biology",
            "application" : "Make medican for human",
            "url":'/biology'
        },
        {
            "name" : "Math",
            "application": "Calculate and 統計 for 經濟",
            "url":'/math'
        },
        {
            "name" : "Programming Language",
            "application" : "write different product",
            "url":'/program'
        }
    ],
    businessData : [
        {
            "name" : "統計",
            "application" : "可用於商業統計",
            "url":'/statistics',
            'img': business1,
            'notes': [
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03', id : '統計_0'},
                {'title' : 'Node JS', 'content' : 'It is very interesting','date' : '2019.11.20', id : '統計_1'},
                {'title' : 'Angular', 'content' : 'It is very interesting','date' : '2019.11.05', id : '統計_2'}
            ]
        },
        {
            "name" : "commercial",
            "application": "用於廣告",
            "url":'/commercial',
            'img': business2,
            'notes': [
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03', id : 'commercial_0'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03', id : 'commercial_1'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03', id : 'commercial_2'}
            ]
        },
        {
            "name" : "股票",
            "application" : "用於交易",
            "url":'/stock',
            'img': business3,
            'notes': [
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03', id : '股票_0'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03', id : '股票_1'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03', id : '股票_2'}
            ]
        }
    ],
    economicsData : [
        {
            "name" : "Fishery",
            "application" : "Fishing",
            "url":'/fish',
            'img': business1,
            'notes': [
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'}
            ]
        },
        {
            "name" : "Geology",
            "application": "Calculate the height of ground",
            "url":'/geology',
            'img': business2,
            'notes': [
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'}
            ]
        },
        {
            "name" : "legal",
            "application" : "To be a lawer",
            "url":'/legal',
            'img': business3,
            'notes': [
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'},
                {'title' : 'I write JavaScript today', 'content' : 'It is very interesting','date' : '2019.12.03'}
            ]
        }
    ]
}

export const Cats = [
    {
        "name" : "Kitty",
        "describe" : "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "imgsrc" : cat0,
        "index" : 0,
        "detail" : 'This is Kitty',
        "title" : "Persian cat",
        "guide" : "In the Middle East, region they are widely known as 'Iranian cat' and in Iran they are known as 'Shirazi cat'. The first documented ancestors of the Persian were imported into Italy from Iran (historically known as Persia in the west) around 1620."
    },
    {
        "name" : "Cathy",
        "describe" : "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "imgsrc" : cat1,
        "index" : 1,
        "detail" : 'This is Cathy',
        "title" : "British Shorthair",
        "guide" : "The British Shorthair is the pedigreed version of the traditional British domestic cat, with a distinctively chunky body, dense coat and broad face. The most familiar color variant is the 'British Blue', a solid blue-gray with copper eyes, medium tail, but the breed has also been developed in a wide range of other colours and patterns, including tabby and colorpoint."
    },
    {
        "name" : "KiKi",
        "describe" : "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "imgsrc" : cat2,
        "index" : 2,
        "detail" : 'This is KiKi',
        "title" : "Bengal cat",
        "guide" : "The Bengal cat is a domesticated cat breed created from hybrids of domestic cats, the Asian leopard cat (Prionailurus bengalensis) and the Egyptian Mau, which gives them their golden shimmer – the breed name comes from the taxonomic name."
    },
    {
        "name" : "WiWi",
        "describe" : "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "imgsrc" : cat3,
        "index" : 3,
        "detail" : 'This is WiWi',
        "title" : "Abyssinian cat",
        "guide" : "The Abyssinian is a slender, fisne-boned, medium-sized cat. The head is moderately wedge shaped, with a slight break at the muzzle, and nose and chin ideally forming a straight vertical line when viewed in profile. They have alert, relatively large pointed ears."
    },
    
];

export const List = [
    {
        'title' : 'Species',
        'key': 'species',
    },
    {
        'title' : 'Growth Graph',
        'key' : 'growth'
    },
    {
        'title' : 'Food',
        'key' : 'food'
    }
]

export const GrowthList = [
    {
        'age': '1 ~ 2',
        'weight': 1,
        'character':'ambitious, brave, funny' 
    },
    {
        'age': '3 ~ 5',
        'weight': 2.5,
        'character':'considerate, dependable, enthusiastic' 
    },
    {
        'age': '6 ~ 7',
        'weight': 4,
        'character':'energetic , diligent, fearless' 
    },
    {
        'age': '8 ~ 14',
        'weight': 6,
        'character':'generous, brave, funny' 
    }
]

export const FoodList = [
    {
        'type' : 'meat',
        'src' : meat,
        'order' : 'First'
    },
    {
        'type': 'egg',
        'src' : egg,
        'order' : 'Second'
    },
    {
        'type' : 'vagetable',
        'src' : vagetable,
        'order' : 'Third'
    },
    {
        'type' : 'fish',
        'src' : fish,
        'order' : 'Fourth'
    },
    {
        'type' : 'cheese',
        'src' : cheese,
        'order' : 'Fifth'
    },
    {
        'type' : 'milk',
        'src' : milk,
        'order' : 'Sixth'
    },
    {
        'type' : 'mushroom',
        'src' : mushroom,
        'order' : 'Seventh'
    },
];

export const DishesList = [
    {
        'name':'Baked Salmon with White Wine',
        'vitaminC': 80,
        'protein': 50,
        'mineral': 70,
        'cellulose': 95,
        'src': bakedsalmon
    },
    {
        'name':'Buffalo hot wings',
        'vitaminC': 60,
        'protein': 50,
        'mineral': 80,
        'cellulose': 75,
        'src': buffalo
    },
    {
        'name':'Beef Medallions with Bacon',
        'vitaminC': 90,
        'protein': 83,
        'mineral': 46,
        'cellulose': 80,
        'src': beefmedallions
    },
    {
        'name':'Spare Rib in Local Wine',
        'vitaminC': 60,
        'protein': 50,
        'mineral': 75,
        'cellulose': 90,
        'src': sparerib
    }
];

