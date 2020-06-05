import React from 'react'
import Chat from './Chats'
import { graphql, compose, Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    feed {
        id
        message
    }
  }
`

const CHAT_SUBSCRIPTION = gql `
  subscription {
    newChat {
        id
        message
    }
  }
`
class ChatsPageList extends React.Component {

  componentDidUpdate() {
    if(this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
  }
  _subscribeToNewMessage = subscribeToMore => {
    subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newChat = subscriptionData.data.newChat
        return Object.assign({}, prev, {
          feed: {
            chats: [newChat, ...prev.feed],
            count: prev.feed.chats.length + 1,
            __typename: prev.feed.__typename
          }
        })
      }
    })
  }

  render() {
    return (
        <div style={{  height:'350px', overflow: 'scroll' }} className='listChats' >
        <Query query={FEED_QUERY}>
          {({ loading, error, data, subscribeToMore}) =>{
            if (loading) return<div>Fetching</div>
            if (error) return <div>Whoops, something went wrong!</div>

            this._subscribeToNewMessage(subscribeToMore)
            const messagesToRender = data.feed
            return (
              <div>
              {messagesToRender.map(chat => <Chat key={chat.id} message={chat.message} />)}
            </div>
          )
        }}
      </Query>
      </div>
    )
  }
}

// export default ChatsPageList
export default compose(
  graphql(FEED_QUERY, {
    name: 'chatsQueryConnection',
    fetchPolicy: 'network-only',
    })
  )
(ChatsPageList)