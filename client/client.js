const SUBSCRIBE_URL = 'http://35.246.154.168/api/subscribe'

function LongPooling({url}) {
  let isSubscribed = false

  const subscribe = (onResponse = (value) => {}) => {
    isSubscribed = true

    if (isSubscribed === true) {
      console.log('isSubscribed')
      fetch(url)
        .then(response => {
          onResponse(response)
          console.log('response')
          subscribe(onResponse)
        })
        .catch(reason => {
          console.error(reason)
          subscribe(onResponse)
        })
    }
  }

  const resubscribe = () => {
    isSubscribed = true
  }

  const unsubscribe = () => {
    isSubscribed = false
  }

  return {resubscribe, unsubscribe, subscribe}
}

const subscription = LongPooling({url: SUBSCRIBE_URL})
subscription.subscribe((r) => console.log(r))

const appendEvent = (eventText) => {
  const target = document.getElementById('events')
  const p = document.createElement('p')
  p.innerText = eventText
  target.appendChild(p)
}

const onSend = (event) => {
  appendEvent('New event')
  console.log('On send button clicked')
  console.log()
}

