import React from 'react'
import Chat from './Chats'
import { graphql, compose, Query } from 'react-apollo'
import gql from 'graphql-tag'

/*
 This component is responsible for GQL queries and displaying thae data from the database. 
*/

// General query to call all chats in the DB.
const FEED_QUERY = gql`
  {
    feed {
        id
        message
    }
  }
`

// Sets subscription call to GQL
const CHAT_SUBSCRIPTION = gql `
  subscription {
    newChat {
        id
        message
    }
  }
`
class ChatsPageList extends React.Component {
  // should make updated messages cause a smooth scroll.
  componentDidUpdate() {
    if(this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
  }
  /* 
  Function to call subscription data. this is where I am having trouble getting the data to propogate. 
  */
  _subscribeToNewMessage = subscribeToMore => {
    subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newChat = subscriptionData.data.newChat
        return Object.assign({}, prev, {
          /* By looking at the console, this is where I am having the trouble pulling data. Console states that the program is unable to read the specific data that should be called below. */
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
        {/* Pulls in the general query with loading and error warnings.  */}
        <Query query={FEED_QUERY}>
          {({ loading, error, data, subscribeToMore}) =>{
            if (loading) return<div>Fetching</div>
            if (error) return <div>Whoops, something went wrong!</div>
            {/* This should call the subscription function */}
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