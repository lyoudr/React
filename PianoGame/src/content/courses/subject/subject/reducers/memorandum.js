const EachSubjectData = {
  businessData: {
    "統計": [
      { 'title': 'I write JavaScript today', 'content': 'You might be thinking that we’d need a separate effect to perform the cleanup. But code for adding and removing a subscription is so tightly related that useEffect is designed to keep it together. If your effect returns a function, React will run it when it is time to clean up', 'date': '2019.12.03', id: '統計_0', textNote: [] },
      { 'title': 'Node JS', 'content': 'This is the optional cleanup mechanism for effects. Every effect may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other. They’re part of the same effect!', 'date': '2019.11.20', id: '統計_1', textNote: [] },
      { 'title': 'Angular', 'content': 'React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time. ', 'date': '2019.11.05', id: '統計_2', textNote: [] }
    ],
    "commercial": [
      { 'title': 'Commercial', 'content': 'It is very good', 'date': '2019.12.03', id: 'commercial_0', textNote: [] },
      { 'title': 'Node JS', 'content': 'It is very interesting', 'date': '2019.11.20', id: 'commercial_1', textNote: [] },
      { 'title': 'Angular', 'content': 'It is very great', 'date': '2019.11.05', id: 'commercial_2', textNote: [] }
    ],
    "股票": [
      { 'title': 'business', 'content': 'It is very abc', 'date': '2019.12.03', id: '股票_0', textNote: [] },
      { 'title': 'Node JS', 'content': 'It is very des', 'date': '2019.11.20', id: '股票_1', textNote: [] },
      { 'title': 'Angular', 'content': 'It is very efsef', 'date': '2019.11.05', id: '股票_2', textNote: [] }
    ],
    "Fishery": [
      { 'title': 'business', 'content': 'It is very abc', 'date': '2019.12.03', id: '股票_0', textNote: [] },
      { 'title': 'Node JS', 'content': 'It is very des', 'date': '2019.11.20', id: '股票_1', textNote: [] },
      { 'title': 'Angular', 'content': 'It is very efsef', 'date': '2019.11.05', id: '股票_2', textNote: [] }
    ],
    "Geology": [
      { 'title': 'business', 'content': 'It is very abc', 'date': '2019.12.03', id: '股票_0', textNote: [] },
      { 'title': 'Node JS', 'content': 'It is very des', 'date': '2019.11.20', id: '股票_1', textNote: [] },
      { 'title': 'Angular', 'content': 'It is very efsef', 'date': '2019.11.05', id: '股票_2', textNote: [] }
    ],
    "legal": [
      { 'title': 'business', 'content': 'It is very abc', 'date': '2019.12.03', id: '股票_0', textNote: [] },
      { 'title': 'Node JS', 'content': 'It is very des', 'date': '2019.11.20', id: '股票_1', textNote: [] },
      { 'title': 'Angular', 'content': 'It is very efsef', 'date': '2019.11.05', id: '股票_2', textNote: [] }
    ]
  },
  economicsData: {
    "統計": [
      { 'title': 'I write JavaScript today', 'content': 'It is very interesting', 'date': '2019.12.03' },
      { 'title': 'Node JS', 'content': 'It is very interesting', 'date': '2019.11.20' },
      { 'title': 'Angular', 'content': 'It is very interesting', 'date': '2019.11.05' }
    ],
    "commercial": [
      { 'title': 'Commercial', 'content': 'It is very interesting', 'date': '2019.12.03' },
      { 'title': 'business', 'content': 'It is very interesting', 'date': '2019.11.20' },
      { 'title': 'Angular', 'content': 'It is very interesting', 'date': '2019.11.05', id: '3' }
    ],
    "股票": [
      { 'title': 'stock', 'content': 'It is very interesting', 'date': '2019.12.03' },
      { 'title': 'Node JS', 'content': 'It is very interesting', 'date': '2019.11.20' },
      { 'title': 'Angular', 'content': 'It is very interesting', 'date': '2019.11.05', id: '3' }
    ]
  }
}

export const memorandum = (state = EachSubjectData.businessData['統計'], action) => {
  switch (action.type) {
    case 'SHOW_SUBJECT':
      return EachSubjectData.businessData[action.name]
    case 'ADD_MEMO':
      return [
        ...EachSubjectData.businessData[action.name],
        action.note
      ]
    case 'SHOW_DETAIL':
      return state.map(memorandum => {
        if (memorandum.id === action.id) {
          memorandum.showdetail = true;
          return memorandum;
        } else {
          memorandum.showdetail = false;
          return memorandum;
        }
      });
    case 'ADD_NOTETOTEXT':
      console.log('action.text is =>', action.text);
      let subject = action.id.split('_')[0];
      EachSubjectData.businessData[subject].forEach(item => {
        if (item.id === action.id) {
          let newnote = {};
          newnote[action.text] = action.note;
          item.textNote.push(newnote);
        }
      });
      return EachSubjectData.businessData[subject]
    default:
      return state
  }
}


