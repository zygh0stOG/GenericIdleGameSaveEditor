//import jsonTreeView from "https://esm.sh/json-tree-view";
import jsonTreeView from "https://esm.sh/gh/zygh0stOG/json-tree-view";
//var JSONTreeView = require('json-tree-view');

//var view = new jsonTreeView('example', {hello: 'world'});

let view = new jsonTreeView('Evolve',null);
let save_data = null;
let isLZString = true;

var encode = document.getElementById('btn-encode'),
    decode = document.getElementById('btn-decode'),
    //testbtn = document.getElementById('btn-test'),
    //output = document.getElementById('sg-output'),
    //outputStuff = document.getElementById('container-output'),
    treeViewDiv =
document.getElementById('tree-view'),
    input = document.getElementById('sg-input');

//outputStuff.appendChild(view.dom);
treeViewDiv.appendChild(view.dom);
window.view = view;

function get_value_from_object(...keys) {
  try {
    let value = save_data;
    for (let key of keys) {
      value = value[key];
    }
    return value || 0;
  } catch (error) {
    return 0;
  }
}

function add_to_save(value, ...keys) {
  let current = save_data;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = parseFloat(value);
}

//testbtn.addEventListener('click', readTextFromClipboard);

encode.addEventListener('click',encode_save);
//encode.onclick = encode_save();
  /*function() {
    //output.innerHTML = LZString.compress(input.value);
    input.value = LZString.compressToBase64(output.value);
}*/
    
decode.addEventListener('click', decode_save);
//decode.onclick = decode_save();
  /*function() {
    //var $str = output.innerHTML;
    //output.innerHTML = LZString.decompress($str); 
    output.value = LZString.decompressFromBase64(input.value);
  input.value = "";
    //output.innerHTML = LZString.decompressFromBase64(input.value); 
    
}    
*/

//const bs_arr = [];

/*
function readTextFromClipboard() {
  let bs_str = null;
  //const bs_str;
  navigator.clipboard.readText()
    .then((clipText) => (input.value = clipText)
  );
  doSomething();
};
*/

function readTextFromClipboard() {
//  var bs_str = 
      readTextFromClipboard2();
  //window.alert(bsObj.shit);
  console.log(bsObj.shit);
}

var bsObj = { shit: "whatever" };

const readTextFromClipboard2 = () => {
  //var bsObj = { shit: "whatever" };
  //bsObj.shit = "fuck";
  navigator.clipboard.readText()
    .then(text => {doSomething(text);} //{
      //console.log('Clipboard content: ', text);
      //return text;
    //}
         )
    //.then()
    .catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  //return bsObj.shit;
};

function doSomething(shit) {
  //console.log(shit);
  bsObj.shit = shit;
  //console.log(bsObj.shit);
  //return bs_str;
  input.value = bsObj.shit;
  return;// bsObj.shit;
};

function decode_save() {
  var raw_str;
  try {
    if (input.value === '') {
      navigator.clipboard
      .readText()
      .then((clipText) => (input.value = clipText));
      decode_save();
      //input.value = raw_str;
      //raw_str = LZString.decompressFromBase64(clipText)));
        //raw_str = LZString.decompressFromBase64(clipText);
      //input.value = clipText;
    } else {
      raw_str = LZString.decompressFromBase64(input.value);
    }
    //input.value = "";
    save_data = JSON.parse(raw_str);
  } catch (error) {
    try {
      var raw_str = atob(input.value);
      save_data = JSON.parse(raw_str);
      isLZString = false;
    } catch (error) {
      return;
    }
  }
  Cookies.set('savedata', input.value);
  //output.value = raw_str;
  //view = new jsonTreeView('Root',save_data);
  view.refresh();
  view.withRootName = false;
  view.showCountOfObjectOrArray = true;
  view.includeTypeInCount = false;
  view.value = save_data;
  //console.log(view);
  //outputshit.appendChild(view.dom);
  //window.view = view;
  //window.data = view.value;
}

function encode_save() {
  let enc_str = null;
  if (isLZString) {
    var lz_str = LZString.compressToBase64(JSON.stringify(view.value));
    enc_str = lz_str;
  } else {
    var b64_str = btoa(JSON.stringify(view.value));
    enc_str = b64_str;
  }
  input.value = enc_str;
  Cookies.set('savedata', enc_str);
}
let tmp_str = Cookies.get('savedata');
if (input.value === '' && !tmp_str === 'undefined') {
  input.value = tmp_str;
}