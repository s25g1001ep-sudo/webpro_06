"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// 初期データ（spec.mdより）
let insects = [
  { id: 0, name: "ハナアブ", type: "ハエ目・ハナアブ科", place: "新習志野キャンパス図書館前", note: "空中で静止するように飛行するホバリングが可能．人や花に近づく．" },
  { id: 1, name: "キマダラカメムシ", type: "カメムシ目・カメムシ科", place: "新習志野キャンパス3号館・11号館の間の地面や木の幹", note: "台湾から東南アジアを原産地とする外来生物である．近年分布を拡大している．" },
  { id: 2, name: "クロオオアリ", type: "ハチ目・アリ科・ヤマアリ亜科・オオアリ属", place: "新習志野キャンパスおよび津田沼キャンパスのベンチ付近", note: "開けた場所の乾燥した地面を好む．そのため都市部でも多く見られる．" }
];

// 一覧表示
app.get("/insects", (req, res) => {
  res.render('insects_list', { data: insects });
});

// 追加画面へのリダイレクト
app.get("/insects/create", (req, res) => {
  res.redirect('/public/insects_add.html');
});

// 詳細表示
app.get("/insects/:number", (req, res) => {
  const number = req.params.number;
  const detail = insects[number];
  if (!detail) return res.status(404).send("データが見つかりません");
  res.render('insects_detail', { id: number, data: detail });
});

// 編集画面表示
app.get("/insects/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = insects[number];
  res.render('insects_edit', { id: number, data: detail });
});

// 更新処理
app.post("/insects/update/:number", (req, res) => {
  const number = req.params.number;
  insects[number].name = req.body.name;
  insects[number].type = req.body.type;
  insects[number].place = req.body.place;
  insects[number].note = req.body.note;
  res.redirect('/insects');
});

// 追加実行
app.post("/insects/create", (req, res) => {
  const newInsect = {
    id: insects.length,
    name: req.body.name,
    type: req.body.type,
    place: req.body.place,
    note: req.body.note
  };
  insects.push(newInsect);
  res.redirect('/insects');
});

// 削除処理
app.get("/insects/delete/:number", (req, res) => {
  insects.splice(req.params.number, 1);
  res.redirect('/insects');
});

app.listen(8080, () => console.log("Insects app listening on port 8080"));