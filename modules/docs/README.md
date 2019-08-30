# README

> some text 
> some text



```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import { Button } from 'antd'

import 'antd/dist/antd.css'

const App = () => (
  <div>
  代码示例区
    <Button onClick={()=>alert(213)}>click me</Button>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```
