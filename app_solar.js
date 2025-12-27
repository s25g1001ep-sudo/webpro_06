"use strict"; // 必須

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// spec.md に基づくデータ構造
let celestialBodies = [
  { id: 0, name: "太陽", type: "恒星", diameter: "1,392,700", note: "直径は徐々に大きくなっている" },
  { id: 1, name: "水星", type: "惑星", diameter: "4,880", note: "水星の1日は地球における1年の2倍にあたる" },
  { id: 2, name: "金星", type: "惑星", diameter: "12,104", note: "厚さ20kmの濃い硫酸の粒からできた雲に覆われている" },
  { id: 3, name: "地球", type: "惑星", diameter: "12,742", note: "我々の故郷" },
  { id: 4, name: "火星", type: "惑星", diameter: "6,792", note: "赤いのは，地表を錆びた鉄分が覆っているためである" },
  { id: 5, name: "木星", type: "惑星", diameter: "142,984", note: "表面は水素とヘリウムの大気に包まれ，アンモニアを主成分とした雲が浮かんでいる" },
  { id: 6, name: "土星", type: "惑星", diameter: "120,536", note: "木星とよく似た巨大ガス惑星．地球の2倍以上の速さで自転している" },
  { id: 7, name: "天皇星", type: "惑星", diameter: "51,118", note: "イギリスの天文学者ウィリアム・ハーシェルが偶然発見．はじめは惑星とは気づかず，彗星として発表している" },
  { id: 8, name: "海王星", type: "惑星", diameter: "49,528", note: "フランスの数学者ルベリエが「天皇星は未知の惑星によって軌道を歪められている」と予測してベルリン天文台に調査を依頼し，その日のうちに発見された．理論に基づくこの発見は，天文学の勝利だと讃えられた．" },
  { id: 9, name: "冥王星", type: "準惑星", diameter: "2,377", note: "かつては惑星とされていたが，2006年に準惑星に分類し直された．" },
  { id: 10, name: "イトカワ", type: "小惑星", diameter: "0.535", note: "探査機「はやぶさ」が探査．地球と火星の軌道を横切るような公転軌道をもつ．" }
];

// 一覧表示
app.get("/solar", (req, res) => {
  res.render('solar_list', { data: celestialBodies });
});

//Create
app.get("/solar/create", (req, res) => {
  res.redirect('/public/solar_add.html');
});

// 詳細表示
app.get("/solar/:number", (req, res) => {
  const number = req.params.number;
  const detail = celestialBodies[number];
  res.render('solar_detail', { id: number, data: detail });
});

// 編集画面の表示 (京葉線システムの app.get("/keiyo2/edit/:number") に相当)
app.get("/solar/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = celestialBodies[number];
  // 編集用のテンプレート 'solar_edit' を呼び出す
  res.render('solar_edit', { id: number, data: detail });
});

// 更新処理 (京葉線システムの app.post("/keiyo2/update/:number") に相当)
app.post("/solar/update/:number", (req, res) => {
  const number = req.params.number;
  // 入力された内容でデータを上書きする
  celestialBodies[number].name = req.body.name;
  celestialBodies[number].type = req.body.type;
  celestialBodies[number].diameter = req.body.diameter;
  celestialBodies[number].note = req.body.note;
  
  res.redirect('/solar'); // 更新後は一覧に戻る
});

// 追加実行
app.post("/solar/create", (req, res) => {
  const newBody = {
    id: celestialBodies.length,
    name: req.body.name,
    type: req.body.type,
    diameter: req.body.diameter,
    note: req.body.note
  };
  celestialBodies.push(newBody);
  res.redirect('/solar');
});

// 削除処理（GETメソッドで代用）
app.get("/solar/delete/:number", (req, res) => {
  celestialBodies.splice(req.params.number, 1);
  res.redirect('/solar');
});



app.listen(8080, () => console.log("Solar system app listening on port 8080"));