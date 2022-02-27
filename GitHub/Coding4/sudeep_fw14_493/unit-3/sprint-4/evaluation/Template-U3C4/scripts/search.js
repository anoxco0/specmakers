function storeSearchterm(name) {

  let res = await fetch(`https://gnews.io/api/v4/search?q=none&token=520bd38b470b399bd5b6fd69bdb0daa1`)
   let data = await res.json();
   console.log('data:', data);

}

export default storeSearchterm;