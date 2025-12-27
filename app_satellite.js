"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// 初期データ（spec.mdより）
let satellites = [
  { id: 0, name: "れいめい", date: "2005年8月24日6時10分", location: "カザフスタン共和国", note: "次世代の先進的な衛星技術の軌道上での実証や，小規模、高頻度の科学観測ミッションの実現を目的としている" },
  { id: 1, name: "ひので", date: "2006年9月23日6時36分", location: "内之浦宇宙空間観測所", note: "太陽の観測を行っている" },
  { id: 2, name: "はやぶさ2", date: "2014年12月3日13時22分", location: "種子島宇宙センター", note: "小惑星リュウグウを目標天体としている" },
  { id: 3, name: "あらせ", date: "2016年12月20日20時00分", location: "内之浦宇宙空間観測所", note: "ヴァン・アレン帯に存在する高エネルギー電子の生成過程を直接観測するための探査衛星" },
  { id: 4, name: "みお", date: "2018年10月20日10時45分", location: "フランス領ギアナ クールー ギアナ宇宙センター", note: "水星の磁場・磁気圏の解明を主な目的とする" }
];

// 一覧表示
app.get("/satellite", (req, res) => {
  res.render('satellite_list', { data: satellites });
});

// 追加画面へのリダイレクト
app.get("/satellite/create", (req, res) => {
  res.redirect('/public/satellite_add.html');
});

// 詳細表示
app.get("/satellite/:number", (req, res) => {
  const number = req.params.number;
  const detail = satellites[number];
  if (!detail) return res.status(404).send("データが見つかりません");
  res.render('satellite_detail', { id: number, data: detail });
});

// 編集画面表示
app.get("/satellite/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = satellites[number];
  res.render('satellite_edit', { id: number, data: detail });
});

// 更新処理
app.post("/satellite/update/:number", (req, res) => {
  const number = req.params.number;
  satellites[number].name = req.body.name;
  satellites[number].date = req.body.date;
  satellites[number].location = req.body.location;
  satellites[number].note = req.body.note;
  res.redirect('/satellite');
});

// 追加実行
app.post("/satellite/create", (req, res) => {
  const newSat = {
    id: satellites.length,
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
    note: req.body.note
  };
  satellites.push(newSat);
  res.redirect('/satellite');
});

// 削除処理
app.get("/satellite/delete/:number", (req, res) => {
  satellites.splice(req.params.number, 1);
  res.redirect('/satellite');
});

app.listen(8080, () => console.log("Satellite app listening on port 8080"));