import { setFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {
    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
        props.setFilter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }


  export default connect(null, { setFilter, })(Filter)