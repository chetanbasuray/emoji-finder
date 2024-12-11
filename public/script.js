let debounceTimer;

document.getElementById('searchInput').addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const query = document.getElementById('searchInput').value.trim();
      if (query.length >= 3) {
        const response = await fetch(`/api/emojis?query=${query}`);
        const emojis = await response.json();
        const emojiResults = document.getElementById('emojiResults');
        emojiResults.innerHTML = emojis.map(emoji => `<span class="emoji" title="${emoji.name}" onclick="copyToClipboard('${emoji.char}');">${emoji.char}</span>`).join('');
        document.getElementById('instruction').style.display = 'block';
        document.getElementById('coffeeButton').style.display = 'block';
      } else {
        document.getElementById('emojiResults').innerHTML = '';
        document.getElementById('instruction').style.display = 'none';
        document.getElementById('coffeeButton').style.display = 'none';
      }
    }, 500);
  });
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    const message = document.getElementById('message');
    message.textContent = 'Emoji copied!';
    setTimeout(() => {
      message.textContent = '';
    }, 3000);
  }
  