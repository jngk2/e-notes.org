const get = async(id: number) => {
  const ms = Math.floor((Math.random() * 4000 + 1000) / 1000) * 1000
  console.log(`request ${id} will resolve in ${ms} milliseconds`)
  if (id === 2)
    return Promise.reject()
  await new Promise(resolve => setTimeout(resolve, ms));
  return id
}

const md = () => {
  let count = 0
  let intId = setInterval(async() => {
    count++;
    console.log(`request ${count} start`)
    const id = await get(count)
      .catch(() => {
        console.log('rejected promise!')
      })
    console.log(`request ${id} done`)
    if (count === 3)
      clearInterval(intId)
  }, 1500)
}

md()
