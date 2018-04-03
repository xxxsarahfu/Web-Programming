// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the future
const CLIENT_ID = '4cNswoNqM2wVFHPg';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [{name: "我是機器人仔", color: "#ffffff"}];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
      //addMessageToListDOM(automessages[Math.floor(Math.random() * automessages.length)],members[Math.floor(Math.random() * members.length)])
    } else {
      // Message is from server
      
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomName() {
  const adjs = ["台大","台北","桃園","花蓮","南投","高雄","內湖","中和","永和","高雄","台中","台南","台科大","大葉","師大","電機"];
  const nouns = ["第一腿", "石原里美", "柯南", "新垣結衣", "彭于晏", "郭富城", "管中明", "黃中洋", "李鐘碩", "可達鴨", "川普", "小熊維尼", "最速男", "小屁孩", "宋仲基", "金城武", "陳菊","陳先生","王太太","楊小姐","阿明"];
  var _NAME_ = adjs[Math.floor(Math.random() * adjs.length)] +
    nouns[Math.floor(Math.random() * nouns.length)]
    _NAME_.bold;
  return ( _NAME_ );
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

const automessages = ['我先去洗澡咯！', '天氣真的很好呢！', '抱歉很忙，改天聊><', '好唷','嗯嗯','(離開聊天室)','聊天室刷起來！！！','777777','尋找♥️A'];
const randomIndex = Math.round(Math.random(automessages.length-1));
//document.getElementById("your-elements-id").innerHTML = messages[randomIndex];


function sendMessage() {
    const value = DOM.input.value;
    if (value === '') {// input nothing but click enter, auto generate a byebye。 message^^
        //return;
        DOM.input.value = automessages[Math.floor(Math.random() * automessages.length)];
        drone.publish({
            room: 'observable-room',
            message: value,
        });
    }
    // 
    else{
        DOM.input.value = '';
        drone.publish({
            room: 'observable-room',
            message: value,
        });
        addMessageToListDOM(automessages[Math.floor(Math.random() * automessages.length)],members[Math.floor(Math.random() * members.length)]);
        //auto-resp
    }
}

function createMemberElement(member) {
    const { name, color } = member.clientData;
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(name));
    el.className = 'member';
    el.style.color = color;
    return el;
}

function updateMembersDOM() {
    DOM.membersCount.innerText = `${members.length} users in room:`;
    DOM.membersList.innerHTML = '';
    members.forEach(member =>
        DOM.membersList.appendChild(createMemberElement(member))
    );
}

function createMessageElement(text, member) {
    const el = document.createElement('div');
    el.appendChild(createMemberElement(member));
    el.appendChild(document.createTextNode(text));
    el.className = 'message';
    return el;
}

function addMessageToListDOM(text, member) {
    const el = DOM.messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(text, member));
    if (wasTop) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
    }
}

