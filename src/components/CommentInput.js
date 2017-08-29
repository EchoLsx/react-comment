import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {
    static propTypes = {
        username: PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
      }
    static defaultProps = {
        username: ''
    }
    constructor(props){
        super(props)
        this.handleUsernameChange=this.handleUsernameChange.bind(this)
        this.handleContentChange=this.handleContentChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.state = {
            username: props.username,
            content:''
        }
    }
    componentDidMount () {
        this.textarea.focus()
    }
    handleUsernameBlur (event) {
        if (this.props.onUserNameInputBlur) {
            this.props.onUserNameInputBlur(event.target.value)
        }
    }
    handleUsernameChange (event) {
        this.setState({
            username: event.target.value
        })
    }
    handleContentChange (event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit () {
        if (this.props.onSubmit) {
        //   const { username, content } = this.state
          this.props.onSubmit({
              username:this.state.username,
              content:this.state.content,
              createdTime:+new Date()
            })
        }
        this.setState({ content: '' })
    }
    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username}   onChange={this.handleUsernameChange} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea ref={(textarea)=>this.textarea = textarea} value={this.state.content} onChange={this.handleContentChange}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}
export default CommentInput