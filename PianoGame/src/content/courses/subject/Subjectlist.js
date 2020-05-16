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
  technologyData: [
    {
      "name": "biology",
      "application": "Make medican for human",
      "url": '/biology'
    },
    {
      "name": "Math",
      "application": "Calculate and Statistic for 經濟",
      "url": '/math'
    },
    {
      "name": "Programming Language",
      "application": "write different product",
      "url": '/program'
    }
  ],
  businessData: [
    {
      "name": "Statistic",
      "application": "A statistic (singular) or sample statistic is any quantity computed from values in a sample, often the mean. Technically speaking, a statistic can be calculated by applying any mathematical function to the values found in a sample of data.",
      "url": '/statistics',
      'img': business1,
      'notes': [
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03', id: 'Statistic_0' },
        { 'title': 'Node JS', 'content': 'It is very interesting', 'date': '2019.11.20', id: 'Statistic_1' },
        { 'title': 'Angular', 'content': 'It is very interesting', 'date': '2019.11.05', id: 'Statistic_2' }
      ]
    },
    {
      "name": "Commercial",
      "application": "Commercial may refer to Advertising, paid messages in newspapers, magazines, flyers, billboards, and paid announcements over radio and television",
      "url": '/Commercial',
      'img': business2,
      'notes': [
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03', id: 'Commercial_0' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03', id: 'Commercial_1' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03', id: 'Commercial_2' }
      ]
    },
    {
      "name": "Stock",
      "application": "Stock (also capital stock) of a corporation, is all of the shares into which ownership of the corporation is divided.",
      "url": '/stock',
      'img': business3,
      'notes': [
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03', id: 'Stock_0' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03', id: 'Stock_1' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03', id: 'Stock_2' }
      ]
    }
  ],
  economicsData: [
    {
      "name": "Fishery",
      "application": "Fishing is the activity of trying to catch fish. Fish are normally caught in the wild. Techniques for catching fish include hand gathering, spearing, netting, angling and trapping. “Fishing” may include catching aquatic animals other than fish, such as molluscs, cephalopods, crustaceans, and echinoderms.",
      "url": '/fish',
      'img': business1,
      'notes': [
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' }
      ]
    },
    {
      "name": "Geology",
      "application": "Geology describes the structure of the Earth on and beneath its surface, and the processes that have shaped that structure. It also provides tools to determine the relative and absolute ages of rocks found in a given location, and also to describe the histories of those rocks.[3] By combining these tools, geologists are able to chronicle the geological history of the Earth as a whole, and also to demonstrate the age of the Earth.",
      "url": '/geology',
      'img': business2,
      'notes': [
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' }
      ]
    },
    {
      "name": "legal",
      "application": "Law is commonly understood as a system of rules that are created and enforced through social or governmental institutions to regulate conduct,[2] although its precise definition is a matter of longstanding debate. It has been variously described as a science and the art of justice.",
      "url": '/legal',
      'img': business3,
      'notes': [
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' },
        { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' }
      ]
    }
  ]
}

export const List = [
  {
    'title': 'Species',
    'key': 'species',
  },
  {
    'title': 'Growth Graph',
    'key': 'growth'
  },
  {
    'title': 'Food',
    'key': 'food'
  }
]

export const catsGrowthData = {
  "Kitty": {
    options : {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Growth of Cats"
      },
      axisY: {
        title: "Cat Weight (kg)",
        logarithmic: true,
        includeZero: false
      },
      data: [{
        type: "spline",
        showInLegend: true,
        legendText: "years old",
        dataPoints: [
          { x: 3, y: 2 },
          { x: 1, y: 2.5 },
          { x: 2, y: 4 },
          { x: 4, y: 6 },
        ]
      }]
    },
    growthlists : [
      {
        'age': '1 ~ 2',
        'weight': 1,
        'character': 'ambitious, brave, funny'
      },
      {
        'age': '3 ~ 5',
        'weight': 2.5,
        'character': 'considerate, dependable, enthusiastic'
      },
      {
        'age': '6 ~ 7',
        'weight': 4,
        'character': 'energetic , diligent, fearless'
      },
      {
        'age': '8 ~ 14',
        'weight': 6,
        'character': 'generous, brave, funny'
      }

    ]
  },
  "Cathy": {
    options : {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Growth of Cats"
      },
      axisY: {
        title: "Cat Weight (kg)",
        logarithmic: true,
        includeZero: false
      },
      data: [{
        type: "spline",
        showInLegend: true,
        legendText: "years old",
        dataPoints: [
          { x: 2, y: 1 },
          { x: 3, y: 2.5 },
          { x: 6, y: 4 },
          { x: 8, y: 6 },
        ]
      }]
    },
    growthlists : [
      {
        'age': '1 ~ 2',
        'weight': 1,
        'character': 'ambitious, brave, funny'
      },
      {
        'age': '3 ~ 5',
        'weight': 2.5,
        'character': 'considerate, dependable, enthusiastic'
      },
      {
        'age': '6 ~ 7',
        'weight': 4,
        'character': 'energetic , diligent, fearless'
      },
      {
        'age': '8 ~ 14',
        'weight': 6,
        'character': 'generous, brave, funny'
      }

    ]
  },
  "KiKi": {
    options : {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Growth of Cats"
      },
      axisY: {
        title: "Cat Weight (kg)",
        logarithmic: true,
        includeZero: false
      },
      data: [{
        type: "spline",
        showInLegend: true,
        legendText: "years old",
        dataPoints: [
          { x: 2, y: 1 },
          { x: 1, y: 2.5 },
          { x: 5, y: 4 },
          { x: 6, y: 6 },
        ]
      }]
    },
    growthlists : [
      {
        'age': '1 ~ 2',
        'weight': 1,
        'character': 'ambitious, brave, funny'
      },
      {
        'age': '3 ~ 5',
        'weight': 2.5,
        'character': 'considerate, dependable, enthusiastic'
      },
      {
        'age': '6 ~ 7',
        'weight': 4,
        'character': 'energetic , diligent, fearless'
      },
      {
        'age': '8 ~ 14',
        'weight': 6,
        'character': 'generous, brave, funny'
      }

    ]
  },
  "WiWi": {
    options : {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Growth of Cats"
      },
      axisY: {
        title: "Cat Weight (kg)",
        logarithmic: true,
        includeZero: false
      },
      data: [{
        type: "spline",
        showInLegend: true,
        legendText: "years old",
        dataPoints: [
          { x: 2, y: 1 },
          { x: 3, y: 2.5 },
          { x: 4, y: 4 },
          { x: 7, y: 6 },
        ]
      }]
    },
    growthlists : [
      {
        'age': '1 ~ 2',
        'weight': 1,
        'character': 'ambitious, brave, funny'
      },
      {
        'age': '3 ~ 5',
        'weight': 2.5,
        'character': 'considerate, dependable, enthusiastic'
      },
      {
        'age': '6 ~ 7',
        'weight': 4,
        'character': 'energetic , diligent, fearless'
      },
      {
        'age': '8 ~ 14',
        'weight': 6,
        'character': 'generous, brave, funny'
      }

    ]
  },
}

export const DishesList = [
  {
    'name': 'Baked Salmon with White Wine',
    'vitaminC': 80,
    'protein': 50,
    'mineral': 70,
    'cellulose': 95,
    'src': bakedsalmon
  },
  {
    'name': 'Buffalo hot wings',
    'vitaminC': 60,
    'protein': 50,
    'mineral': 80,
    'cellulose': 75,
    'src': buffalo
  },
  {
    'name': 'Beef Medallions with Bacon',
    'vitaminC': 90,
    'protein': 83,
    'mineral': 46,
    'cellulose': 80,
    'src': beefmedallions
  },
  {
    'name': 'Spare Rib in Local Wine',
    'vitaminC': 60,
    'protein': 50,
    'mineral': 75,
    'cellulose': 90,
    'src': sparerib
  }
];

