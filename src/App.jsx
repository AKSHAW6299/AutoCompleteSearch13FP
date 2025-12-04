import React, { useEffect, useState } from 'react'
import './index.css'
import { getApiData } from './services/dummyApi'

function App() {
  const [data, setData] = useState([])
  const [input, setInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [cache, setCache] = useState({})

  useEffect(() => {
    // fetchData()
    const timer = setTimeout(fetchData, 400)
    return () => {
      clearTimeout(timer)
    }
  }, [input])

  const fetchData = async () => {
    if(cache[input]) {
      // console.log('CACHE RETERNED:: ', input);
      setData(cache[input])
      return
    }
    
    // console.log('api call:: ', input);    
    const response = await getApiData(input)
    setData(response?.data?.recipes || [])
    setCache((prev) => ({...prev, [input]: response?.data?.recipes}))
  }

  return (
    <div className='main'>
      <h1 className='font-semibold text-purple-500 text-4xl'>Skill Up aacadmy</h1>
      <div>
        <input 
          type="text" 
          placeholder='Google search' 
          className='search-input' 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {
          showResults && (
            <div className='result-container'>
              {
                data.map((item, index) => (
                  <span key={index} className='result'>{item.name}</span>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App