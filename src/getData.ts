export const getData = () => {
  return fetch('data.json', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then((response => response.json()))
}
