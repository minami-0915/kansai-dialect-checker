import React, { useState } from 'react';
import './App.css';


function App() {
  const [input, setInput] = useState('');
  const [translated, setTranslated] = useState('');

  // 簡単な関西弁変換辞書（例）
  const dictionary = {
    'こんにちは': 'まいど',
    '〜だよ': '〜やで',
    '本当': 'ほんま',
    'すごい': 'めっちゃ',
    'ありがとう': 'おおきに',
    'わかる': 'わかるで',
    'じゃあ': 'ほな',
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleTranslate = () => {
    let result = input;
    for (const [key, value] of Object.entries(dictionary)) {
      const regex = new RegExp(key, 'g');
      result = result.replace(regex, value);
    }
    setTranslated(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translated).then(() => {
      alert('コピーしたで！');
    });
  };

return (
  <div className="container">
    <h1>関西弁チェンジャー</h1>

    <textarea
      value={input}
      onChange={handleChange}
      className="textarea"
      rows={6}
      placeholder="なんか言うてみ"
    />

    <button onClick={handleTranslate} className="button">
      関西弁に変換！
    </button>

    <div className="result-box">
      <h2>👇変換結果👇</h2>
      <p>{translated}</p>
        {translated && (
          <button onClick={handleCopy} style={{ marginTop: '1rem' }}>
            コピー📋
          </button>
        )}
      </div>
    </div>
  );

}

export default App;
