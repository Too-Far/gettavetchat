import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

/*
 This component creates the individual "cards" that display the message and created at data. Info is called in chatspagelist component.
*/

class Chat extends React.Component {
  
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={<b>{this.props.message}</b>}
            subheader={this.props.createdAt}
          />
        </Card>
      </div>
    )
  }
}

export default Chat