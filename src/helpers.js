const randomWikipediaArticleUrl = 'https://en.wikipedia.org/api/rest_v1/page/random/summary'

export function fetchRandomArticle() {
  return fetch(randomWikipediaArticleUrl)
  .then(data => data.json())
  .then(data => data)
}

export function buildTemplate(article){
  const resultContainer = document.getElementById('result')

  const HTMLTitleInput = createTag('input', ['input'], {
    value: article.title,
    onclick: () => updateClipboard(article.title)
  })

  const HTMLContentTextArea = createTag('textarea', ['textarea'], {
    value: article.extract,
    onclick: () => updateClipboard(article.extract)

  })

  resultContainer.innerHTML = ''
  resultContainer.append(HTMLTitleInput, HTMLContentTextArea)
}

function createTag(name, classes=[], options={}){
  const element = document.createElement(name)
  element.classList.add(...classes)

  for (const optionName in options) {
    if (Object.hasOwnProperty.call(options, optionName)) {
      const value = options[optionName];
      element[optionName] = value
    }
  }

  return element
}

function updateClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    showToaster('copied', 'success')
  }, function() {
    showToaster('failed', 'error')
  });
}

// level can be ['success', 'info', 'error']
function showToaster(message, level='success', timeout=2000) {
  console.log(message)
  const toasterContainer = createTag('div', ['toaster', level], {
    textContent: message
  })

  document.body.appendChild(toasterContainer)

  setTimeout(() => {
    document.body.removeChild(toasterContainer)
  }, timeout);
}
