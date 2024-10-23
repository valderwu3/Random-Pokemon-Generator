const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');

app.use(express.json());
app.use(express.static('public'));

// 获取反馈列表
app.get('/api/feedback', async (req, res) => {
  try {
    const data = await fs.readFile(FEEDBACK_FILE, 'utf-8');
    const feedback = JSON.parse(data);
    res.json(feedback);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json([]);
    } else {
      console.error('读取反馈文件时出错:', error);
      res.status(500).json({ error: '服务器错误' });
    }
  }
});

// 提交新反馈
app.post('/api/feedback', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: '反馈内容不能为空' });
    }

    let feedback = [];
    try {
      const data = await fs.readFile(FEEDBACK_FILE, 'utf-8');
      feedback = JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    const newFeedback = {
      id: feedback.length + 1,
      text,
      date: new Date().toISOString(),
    };

    feedback.push(newFeedback);
    await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('保存反馈时出错:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

