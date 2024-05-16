import jsonTreeView from "https://esm.sh/gh/zygh0stOG/json-tree-view";

let view = new jsonTreeView("Evolve", null);
let save_data = null;
let isLZString = true;

var encode = document.getElementById("btn-encode"),
    decode = document.getElementById("btn-decode"),
    treeViewDiv = document.getElementById("tree-view"),
    input = document.getElementById("sg-input");

treeViewDiv.appendChild(view.dom);
window.view = view;

encode.addEventListener("click", encode_save);

decode.addEventListener("click", decode_save);

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
  navigator.clipboard
    .readText()
    .then(
      (text) => {
        doSomething(text);
      } //{
      //console.log('Clipboard content: ', text);
      //return text;
      //}
    )
    //.then()
    .catch((err) => {
      console.error("Failed to read clipboard contents: ", err);
    });
  //return bsObj.shit;
};

function doSomething(shit) {
  //console.log(shit);
  bsObj.shit = shit;
  //console.log(bsObj.shit);
  //return bs_str;
  input.value = bsObj.shit;
  return; // bsObj.shit;
}

function decode_save() {
  var raw_str;
  try {
    if (input.value === "") {
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
  } catch (err) {
    console.log(err);
    try {
      var raw_str = atob(input.value);
      save_data = JSON.parse(raw_str);
      isLZString = false;
    } catch (err2) {
      console.log(err2);
      return;
    }
  }
  Cookies.set("savedata", input.value);
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
  Cookies.set("savedata", enc_str);
}

let tmp_str = Cookies.get("savedata");
if (input.value === "" && !tmp_str === "undefined") {
  input.value = tmp_str;
}
