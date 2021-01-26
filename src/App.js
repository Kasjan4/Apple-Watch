import React, { useState, useEffect } from 'react'
import Fade from 'react-reveal/Fade'
import axios from 'axios'



const App = () => {


  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [seconds, setSecond] = useState('')

  const [day, setDay] = useState('')
  const [dayI, setDayI] = useState('')

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']


  const [geo, setGeo] = useState('')
  const [temp, setTemp] = useState('')

  const URL = 'https://ip.nf/me.json'

  const [geoLocation, setGeoLocation] = useState({ ip: '' })

  useEffect(() => {

    fetch(URL, { method: 'get' })
      .then((response) => response.json())
      .then((data) => {
        setGeoLocation({ ...data })
      })

  }, [])

  useEffect(() => {

    setInterval(() => {
      const t = new Date()

      const h = t.getHours()
      if (h < 10) {
        setHour(`0${h}`)
      }
      if (h >= 10) {
        setHour(h)
      }

      const m = t.getMinutes()
      if (m < 10) {
        setMinute(`0${m}`)
      }
      if (m >= 10) {
        setMinute(m)
      }
      const s = t.getSeconds()
      if (s < 10) {
        setSecond(`0${s}`)
      }
      if (s >= 10) {
        setSecond(s)
      }

      const d = t.getDay()
      setDayI(t.getDay())
      setDay(days[d])
      

    }, 1000)

  }, [])


  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoLocation.ip.latitude}&lon=${geoLocation.ip.longitude}&exclude=hourly,minutely&appid=b12529b2552a67b6714b256d3318424c`)
      .then(resp => {
        const data = resp.data
        const temp = String(Math.round(data.current.temp - 273.15) + '°C')
        setGeo(data.timezone)
        setTemp(temp)

      })
  }, [geoLocation])


  return <div className="watch">

    <div className="screen">

      <Fade top spy={day}>
        <div className="cal">
          <h2 className="day" ><span className="nameday">{day}</span> <br />{dayI}</h2>
        </div>
      </Fade>


      <div className="menu">
        <Fade>
          <img src="https://i.imgur.com/4Y70Xdp.png" />
        </Fade>
        <Fade delay={200}>
          <img src="https://i.imgur.com/ucjFERL.png" />
        </Fade>
        <Fade delay={400}>
          <img src="https://i.imgur.com/U3wQqX0.png" />
        </Fade>
      </div>


      <Fade right spy={hour}>
        <div className="time">
          <div ><span className="hour">{hour}</span><br /><span className="minute">{minute}</span><br />{seconds}</div>
        </div>
      </Fade>


      <Fade bottom spy={geo}>
        <div className="region">
          <p>{geo}</p>
          <p>{temp}</p>
        </div>
      </Fade>


      <Fade>
        <div className="charge">
          <img src="https://i.imgur.com/9ycbNAt.png" />
        </div>
      </Fade>

    </div>

  </div>
}

export default App

