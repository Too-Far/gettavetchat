import React, {Component} from 'react'
import CreateChat from './createchat'
import ChatsPageList from './ChatsPageList'

/*
 This is the main base module for the react component. Sets the main outer container of the front end app. Calls in the required apps to display data.
*/
class App extends Component {
  state = {
    orderBy: 'createdAt_ASC'
  }

  render() {
    
    return (
    <React.Fragment>
      <div id="app" className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">Chatbox</div>
                      <div className="card-body">
                        <ChatsPageList/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <hr></hr>
                    <CreateChat/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )}
}

export default App
