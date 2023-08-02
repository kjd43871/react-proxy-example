const { createProxyMiddleware} = require('http-proxy-middleware');
const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3070;

// place holder for the data
const todos = [{
  todo: "산책하기",
  category: "운동",
  isComplete: true
  }];
  module.exports = function(app) {
    app.use(
      '/api', //proxy가 필요한 path prameter를 입력합니다.
      createProxyMiddleware({
        target: 'http://localhost:3080', //타겟이 되는 api url를 입력합니다.
        changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
      })
    );
  };
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api2/todos', (req, res) => {
  console.log('api/todos called!')
  res.json(todos);
});

app.post('/api2/todo', (req, res) => {
  console.log('Adding user:::::', req.body.todo);
  todos.push(req.body.todo);
  res.json("todo added!");
});

app.get('/', (req,res) => {
  res.send(`<h1>API Running on the port ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});