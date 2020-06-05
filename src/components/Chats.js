import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
// var parse = require('date-fns/parse')
// var format = require('date-fns/format')

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