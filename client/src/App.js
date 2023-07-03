import React, { useEffect, useState } from 'react'

const App = () =>{

  useEffect(()=>{

    // const headers = {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // };
    // const body = JSON.stringify({
    //   name: "kicker",
    //   platform: "kick",
    //   description: "xd"
    // })
    // fetch("/streamers", { method: "POST", headers, body })
    //   .then(response => response.json())
    //   .then(data => {
    //       console.log(data)
    //     })
    // fetch("/streamers")
    //   .then(response => response.json())
    //   .then(data => {
    //       console.log(data)
    //     })
    // fetch("/streamer/64a3382dc523dc08e30d6ae3")
    //   .then(response => response.json())
    //   .then(data => {
    //       console.log(data)
    //     })
    // fetch("/streamer/64a3387dc523dc08e30d6ae3/vote/downvote", {method: "PATCH"})
    //   .then(response => response.json())
    //   .then(data => {
    //       console.log(data)
    //     })

  }, [])

  return (
    <div>

    </div>
  )
}

export default App