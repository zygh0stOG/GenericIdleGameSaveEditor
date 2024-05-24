import jsonTreeView from "https://esm.sh/gh/zygh0stOG/json-tree-view";

let view = new jsonTreeView("Game Save", null);
let save_data = null;
let isLZString = true;
let isMR = false;

const encode = document.getElementById("btn-encode"),
  decode = document.getElementById("btn-decode"),
  reset = document.getElementById("btn-reset"),
  treeViewDiv = document.getElementById("tree-view"),
  input = document.getElementById("sg-input"),
  sgType = document.getElementById("sg-type");

function init() {
  treeViewDiv.appendChild(view.dom);
  window.view = view;

  view.withRootName = false;
  view.showCountOfObjectOrArray = true;
  view.includeTypeInCount = false;

  encode.addEventListener("click", encode_save);
  decode.addEventListener("click", decode_save);
  reset.addEventListener("click", reset_save);
}
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

function gzipAndEncodeString(inputString) {
  try {
    // Convert the input string to a Uint8Array
    const inputData = new TextEncoder().encode(inputString);

    // Compress the data using pako's deflate method
    const compressedData = pako.gzip(inputData);

    // Encode the compressed data to a base64 string
    const base64CompressedString = uint8ArrayToBase64(compressedData);

    return base64CompressedString;
  } catch (err) {
    console.error("Error during compression:", err);
    return null;
  }
}

// Helper function to convert a Uint8Array to a base64 string
function uint8ArrayToBase64(uint8Array) {
  const binaryString = String.fromCharCode.apply(null, uint8Array);
  return btoa(binaryString);
}

function encode_and_gzip(input) {
  // Gzip and encode the input
  const gzippedAndEncoded = gzipAndEncodeString(input);

  // Double encode the result using Base64
  const doubleEncoded = btoa(gzippedAndEncoded);

  return doubleEncoded;
}

function gunzipString(base64CompressedString) {
  try {
    // Decode the base64 string to a Uint8Array
    const compressedData = base64ToUint8Array(base64CompressedString);

    // Decompress the data using pako's inflate method
    const decompressedData = pako.inflate(compressedData);

    // Convert the decompressed data to a string
    const decompressedString = new TextDecoder().decode(decompressedData);

    return decompressedString;
  } catch (err) {
    console.error("Error during decompression:", err);
    return null;
  }
}

// Helper function to convert a base64 string to a Uint8Array
function base64ToUint8Array(base64String) {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

function decode_and_gunzip(input) {
  // Decode input using Base64 twice
  let decoded1 = atob(input);

  let gunzipped = gunzipString(decoded1);

  // Return the result
  return gunzipped;
}

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
  /*
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
    } else {*/
  if (sgType.value === "lzstring") {
    raw_str = LZString.decompressFromBase64(input.value);
  }
  //}
  //input.value = "";
  //save_data = JSON.parse(raw_str);
  /*} catch (err) {
    console.log(err);
    try {*/
  if (sgType.value === "base64") {
    raw_str = atob(input.value);
    //save_data = JSON.parse(raw_str);
    isLZString = false;
  }
  /*} catch (err2) {
      console.log(err2);
      try {*/
  if (sgType.value === "magrsrch") {
    raw_str = decode_and_gunzip(input.value);
    //save_data = JSON.parse(raw_str);
    isMR = true;
    isLZString = false;
  }
  /*} catch (err3) {
        console.log(err3);
        return;
      }*/
  //}
  save_data = JSON.parse(raw_str);
  Cookies.set("savedata", input.value);
  //output.value = raw_str;
  //view = new jsonTreeView('Root',save_data);

  //view.refresh();
  view.value = save_data;
  if (view.value !== "") {
    view.collapse(true, true);
    view.refresh();
  }
  //console.log(view);
  //outputshit.appendChild(view.dom);
  //window.view = view;
  //window.data = view.value;
}

/*
function setGameName(sdata) {
 
}*/

function encode_save() {
  let enc_str = null;
  if (sgType.value === "lzstring") {
    var lz_str = LZString.compressToBase64(JSON.stringify(view.value));
    enc_str = lz_str;
  }
  if (sgType.value === "magrsrch") {
    var mr_str = JSON.stringify(view.value, (key, value) =>
      typeof value === "number" ? value : value
    );
    enc_str = encode_and_gzip(mr_str);
  }
  if (sgType.value === "base64") {
    var b64_str = btoa(JSON.stringify(view.value));
    enc_str = b64_str;
  }
  input.value = enc_str;
  Cookies.set("savedata", enc_str);
}

function reset_save() {
  input.value = '';
  view.collapse(true, true);
  view.value = '';
  view.refresh();
}

let tmp_str = Cookies.get("savedata");
if (input.value === "" && !tmp_str === "undefined") {
  input.value = tmp_str;
}
init();
