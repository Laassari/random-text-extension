import { fetchRandomArticle, buildTemplate } from './helpers.js'

const randomeArticleBtn = document.getElementById('randomeArticleBtn')

randomeArticleBtn.addEventListener('click', handleInputChange)
addEventListener('load', handleExtensionLoad)

async function handleInputChange () {
  let article

  try {
    article = await fetchRandomArticle()

    chrome.storage.sync.set({article});
    buildTemplate(article)
  } catch (e) {
    alert('something went wonrg!')
  }
}


function handleExtensionLoad() {
  chrome.storage.sync.get(["article"], function ({ article }) {
    if (article) buildTemplate(article)
  });
}
