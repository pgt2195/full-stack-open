const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const baseStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 500
  }

  const style = type === 'bad' 
    ? {...baseStyle, color: 'red'}
    : {...baseStyle, color: 'green'} 

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification