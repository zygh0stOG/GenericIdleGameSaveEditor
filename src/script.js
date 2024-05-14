import jsonTreeView from "https://esm.sh/json-tree-view";
//var JSONTreeView = require('json-tree-view');

//var view = new jsonTreeView('example', {hello: 'world'});

let view = new jsonTreeView('Root',null);
let save_data = null;
let isLZString = true;

var encode = document.getElementById('encode'),
    decode = document.getElementById('decode'),
    output = document.getElementById('output'),
    outputshit = document.getElementById('outputshit'),
    input = document.getElementById('input');

outputshit.appendChild(view.dom);
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
function decode_save() {
  try {
    var raw_str = LZString.decompressFromBase64(input.value);
    //input.value = "";
    save_data = JSON.parse(raw_str);
  } catch (error) { 
    var raw_str = atob(input.value);
    save_data = JSON.parse(raw_str);
    isLZString = false;
  }
  Cookies.set('savedata', input.value);
  //output.value = raw_str;
  //view = new jsonTreeView('Root',save_data);
  view.refresh();
  view.withRootName = false;
  view.showCountOfObjectOrArray = true;
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