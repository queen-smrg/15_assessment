'use strict';
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const addInput = document.getElementById('add-input');

let userNameInput = null;
let assessmentButton = null;
let dummyButton = document.getElementById('dummy');
let input_titles = ["", "年齢は？", "出身地は？", "性別は？"];
let input_idnames = ["user-name", "user-age", "user-place", "user-fm"];
let button_labels = ["", "診断する", "今度こそ診断する", "今度こそ本当に診断する"];
let button_functions = ["", "dummy_age()", "dummy_place()", "dummy_gender()"];
let button_idnames = ["dummy", "dummy_age", "dummy_place", "dummy_gender"];
let input_velues = [];

let assess_comments = [
  "年齢の隠しコマンドは「0」でした！",
  "出身地の隠しコマンドは「地球」でした！",
  "年齢・出身地に隠しコマンドがあるよ！"
];



function create_input(j) {
  //質問段落の出力
  const p_ques = document.createElement('p');
  p_ques.innerText = input_titles[j];
  addInput.appendChild(p_ques);
  
  //inputの出力
  const div_boot = document.createElement('div');
  div_boot.setAttribute("class", "input-group mb-3");
  div_boot.setAttribute("style", "max-width: 600px;");
  
  const input_add = document.createElement('input');
  input_add.setAttribute("type", "text");
  input_add.setAttribute("size", "40");
  input_add.setAttribute("maxlength", "20");
  input_add.setAttribute("class", "form-control");
  input_add.setAttribute("id", input_idnames[j]);
  
  div_boot.appendChild(input_add);
  
  //再度診断するボタンを作る
  const re_button = document.createElement('button');
  re_button.setAttribute("onclick", button_functions[j]);
  re_button.setAttribute("id", button_idnames[j]);
  re_button.setAttribute("class", "input-group-text");
  re_button.innerText = button_labels[j];
  
  div_boot.appendChild(re_button);

  addInput.appendChild(div_boot);
  
  //ボタンのonclickを削除
  let elm = document.getElementById(button_idnames[j-1]);
  elm.removeAttribute("onclick");
  return;
};


function dummy_name() {
  //名前を取得
  userNameInput = document.getElementById('user-name');
  if (userNameInput.value.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }
  input_velues.push(userNameInput.value);
  console.log(input_velues);

  //次のテキスト入力を出力
  create_input(1);
  return;
};


function dummy_age() {
  //年齢を取得
  const ageInput = document.getElementById('user-age');
  if (ageInput.value.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }
  input_velues.push(ageInput.value);
  console.log(input_velues);

  //次のテキスト入力を出力
  if (ageInput.value == String(0)) {
    assessment_func(0); //0を入力したら終了
  } else {
    create_input(2);
  }
  return;
};


function dummy_place() {
  //場所を取得
  const placeInput = document.getElementById('user-place');
  if (placeInput.value.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }
  input_velues.push(placeInput.value);
  console.log(input_velues);

  //次のテキスト入力を出力
  if (input_velues[2] == "地球") {
    assessment_func(1); //地球を入力したら終了
  } else {
    create_input(3);
  }
  return;
};

function dummy_gender() {
  //性別を取得
  const genderInput = document.getElementById('user-fm');
  if (genderInput.value.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }
  input_velues.push(genderInput.value);
  console.log(input_velues);

  //次のテキスト入力を出力
  assessment_func(2);
  return;
};



function assessment_func(k) {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }
  console.log(userName);
  //ボタンのonclickを削除
  let elm = document.getElementById(button_idnames[k+1]);
  elm.removeAttribute("onclick");
  
  // 診断結果表示エリアの作成
  // headerDivided の作成
  const headerDivided = document.createElement('div');
  headerDivided.setAttribute('class', 'card-header');
  headerDivided.innerText = '診断結果';

  // bodyDivided の作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName)[1];
  paragraph.innerText = result;
  bodyDivided.appendChild(paragraph);

  const p_aori = document.createElement('p');
  p_aori.innerText = "名前だけで良かったのにね(∩´∀｀)∩\n" + assess_comments[k];
  bodyDivided.appendChild(p_aori);

  // resultDivided に Bootstrap のスタイルを適用する
  resultDivided.setAttribute('class', 'card');
  resultDivided.setAttribute('style', 'max-width: 700px;');

  // headerDivided と bodyDivided を resultDivided に差し込む
  resultDivided.appendChild(headerDivided);
  resultDivided.appendChild(bodyDivided);

  console.log(assessment(userName)[0]);

  // ツイートエリアの作成
  tweetDivided.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};


const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName);
  return [index, result];
}



/************************************************************************************* */
//テストコード
console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));

console.assert(
  assessment('太郎')[1] ===
  '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);


console.assert(
  assessment('太郎')[1] ===
  '太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
  assessment('太郎')[1] === assessment('太郎')[1],
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
