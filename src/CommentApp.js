import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
  constructor(){
    super()
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.state = {
      comments: []
    }
  }
  componentWillMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({ comments })
    }
  }

  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  handleDeleteComment (index) {
    const comments = this.state.comments
    comments.splice(index, 1) //删除数组中位置为index的项目
    this.setState({ comments })
    this._saveComments(comments)
  }

  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    const comments = this.state.comments
    comments.push(comment)
    this.setState({comments})
    this._saveComments(comments)
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput
          onSubmit={this.handleSubmitComment} />
        <CommentList 
        comments={this.state.comments}
        onDeleteComment={this.handleDeleteComment}
        />
      </div>
    )
  }
}
export default CommentApp